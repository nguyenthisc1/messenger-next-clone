'use client'

import { useGetConversationsQuery } from '@/app/apis/conversations.api'
import { useGetListUserNotCurrentQuery } from '@/app/apis/users.api'
import GroupChatModal from '@/app/components/modals/group-chat-modal'
import LoadingModal from '@/app/components/modals/loading-modal'
import useConversation from '@/app/hooks/useConversation'
import { useAppSelector } from '@/app/redux/store'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './conversation-box'
import { find } from 'lodash'
import { pusherClient } from '@/app/libs/pusher'

export default function ConversationList() {
  const [items, setItems] = useState<FullConversationType[]>([])
  const { user } = useAppSelector((state) => state.auth)
  const getUsersApi = useGetListUserNotCurrentQuery(user.email)
  const conversationsApi = useGetConversationsQuery(user.email)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { conversationId, isOpen } = useConversation()

  useEffect(() => {
    if (conversationsApi.isSuccess) {
      setItems(conversationsApi.data.data)
    }
  }, [conversationsApi.data?.data, conversationsApi.isSuccess])

  useEffect(() => {

    pusherClient.subscribe(user.email);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)
  }, [user.email]);

  return (
    <>
      <GroupChatModal
        users={getUsersApi.data?.data || []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? 'hidden' : 'block w-full left-0',
        )}>
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item: any) => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
          ))}
        </div>
      </aside>
    </>
  )
}
