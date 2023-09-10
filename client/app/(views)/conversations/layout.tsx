'use client'

import Sidebar from '@/app/components/sidebar/sidebar'
import React from 'react'
import ConversationList from './components/conversation-list';
import { PATH } from '@/app/constants/path';
import { useAppSelector } from '@/app/redux/store';
import { useRouter } from 'next/navigation';
import storage from '@/app/helpers/localStorage';

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const token = storage.getAccessToken()
  const router = useRouter()

  if (!isLoggedIn || !token) {
    return router.push(PATH.HOME)
  }

  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList />
        {children}
      </div>
    </Sidebar>
  )
}
