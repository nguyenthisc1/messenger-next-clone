'use client'

import { useGetConversationsQuery } from "@/app/apis/conversations.api"
import { useAppSelector } from "@/app/redux/store";

export default function ConversationList() {
    const { user } = useAppSelector((state) => state.auth);
    const conversationsApi = useGetConversationsQuery(user.email)
    console.log("🚀 ~ file: conversation-list.tsx:9 ~ ConversationList ~ conversationsApi:", conversationsApi)
    
  return (
    <div>conversationList</div>
  )
}
