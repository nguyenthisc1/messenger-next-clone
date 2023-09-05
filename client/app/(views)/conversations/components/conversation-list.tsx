'use client'

import { useGetConversationsQuery } from '@/app/apis/conversations.api'
import useConversation from '@/app/hooks/useConversation'
import { useAppSelector } from '@/app/redux/store'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './conversation-box'
import GroupChatModal from '@/app/components/modals/group-chat-modal'
import { useGetListUserNotCurrentQuery } from '@/app/apis/users.api'
import LoadingModal from '@/app/components/modals/loading-modal'

export default function ConversationList() {
  const { user } = useAppSelector((state) => state.auth)
  const getUsersApi = useGetListUserNotCurrentQuery(user.email)
  const conversationsApi = useGetConversationsQuery(user.email)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()
  const { conversationId, isOpen } = useConversation()

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
          {!conversationsApi.isSuccess
            ? <LoadingModal /> :
            (<>
              {conversationsApi.data.data.map((item: any) => (
                <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
              ))}
            </>)
          }

        </div>
      </aside>
    </>
  )
}