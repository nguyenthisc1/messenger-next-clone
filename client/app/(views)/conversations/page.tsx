'use client'

import EmptyState from "@/app/components/empty-state"
import { PATH } from "@/app/constants/path"
import storage from "@/app/helpers/localStorage"
import useConversation from "@/app/hooks/useConversation"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Conversations() {
  const { isOpen } = useConversation()
  const token = storage.getAccessToken()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push(PATH.HOME)
    }
  }, [router, token])
  
  return (
    <div className={clsx(
      'lg:pl-80 h-full lg:block',
      isOpen ? 'block' : 'hidden'
    )}>
      <EmptyState />
    </div>
  )
}
