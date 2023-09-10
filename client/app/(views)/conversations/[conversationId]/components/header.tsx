import Avatar from '@/app/components/avatar'
import AvatarGroup from '@/app/components/avatar-group'
import { useOtherUser } from '@/app/hooks/useOtherUser'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './profile-drawer'
import { useAppSelector } from '@/app/redux/store'

export default function Header({ conversation }: { conversation: ConversationItem | undefined}) {
    
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { members } = useAppSelector((state) => state.active);
    const isActive = members.indexOf(otherUser?.id!) !== -1;
    const statusText = useMemo(() => {
        if (conversation?.isGroup) {
            return `${conversation?.users.length} members`;
        }

        return isActive ? 'Online' : 'Offline'
    }, [conversation, isActive]);

    return (
        <>
            <ProfileDrawer
                data={conversation!}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link href="/conversations" className="hover:text-sky-600 transition cursor-pointer">
                        <HiChevronLeft size={32} />
                    </Link>
                    {conversation?.isGroup ? (
                        <AvatarGroup users={conversation?.users} />
                    ) : (
                        <Avatar user={otherUser} />
                    )}
                    <div className="flex flex-col">
                        <div>{conversation?.name || otherUser.name}</div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal size={32} onClick={() => setDrawerOpen(true)} className="text-sky-500 cursor-pointer hover:text-sky-600 transition" />
            </div>
        </>
    )
}
