'use client'

import EmptyState from "@/app/components/empty-state"
import { PATH } from "@/app/constants/path"
import useConversation from "@/app/hooks/useConversation"
import { useAppSelector } from "@/app/redux/store"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Conversations() {
  const { isOpen } = useConversation()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) {
      return router.push(PATH.HOME)
    }
  }, [isLoggedIn, router])

  return (
    <div className={clsx(
      'lg:pl-80 h-full lg:block',
      isOpen ? 'block' : 'hidden'
    )}>
      <EmptyState />
    </div>
  )
}
