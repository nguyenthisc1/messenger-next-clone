import Sidebar from '@/app/components/sidebar/sidebar'
import React from 'react'
import ConversationList from './components/conversation-list';

export default function ConversationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <Sidebar>
        <div className='h-full'>
        <ConversationList/>
        {children}
        </div>
    </Sidebar>
  )
}
