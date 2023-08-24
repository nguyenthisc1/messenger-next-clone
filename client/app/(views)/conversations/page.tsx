'use client'

import EmptyState from "@/app/components/empty-state"
import useConversation from "@/app/hooks/useConversation"
import clsx from "clsx"

export default function Conversations() {
    const { isOpen } = useConversation()
  return (
    <div className={clsx(
        'lg:pl-80 h-full lg:block', 
        isOpen ? 'block' : 'hidden'
      )}>
        <EmptyState />
      </div>
  )
}
