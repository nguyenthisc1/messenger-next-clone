'use client'

import { useSeenConversationQuery } from '@/app/apis/conversations.api';
import { useGetMessagesQuery } from '@/app/apis/messages.api';
import useConversation from '@/app/hooks/useConversation';
import { useAppSelector } from '@/app/redux/store';
import { find } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './messages-box';
import { getPusherClient } from '@/app/libs/pusher';


export default function Body() {
    const { user } = useAppSelector((state) => state.auth)
    const { conversationId } = useConversation();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<FullMessageType[]>([])
    const pusherClient = getPusherClient()
    const messagesApi = useGetMessagesQuery(conversationId);
    const getSeenConversationsApi = useSeenConversationQuery({ conversationId, email: user.email })

    useEffect(() => {
        if (messagesApi.isSuccess) {
            setMessages(messagesApi.data?.data)
        }
    }, [messagesApi.data?.data, messagesApi.isSuccess])

    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current
                }

                return [...current, message]
            })

            bottomRef?.current?.scrollIntoView();
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }))
        };

        pusherClient.bind('messages:new', messageHandler)
        pusherClient.bind('messages:update', updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new')
        }

    }, [conversationId, getSeenConversationsApi, getSeenConversationsApi.isFetching, messagesApi, user.email])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message: FullMessageType, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    )
}
