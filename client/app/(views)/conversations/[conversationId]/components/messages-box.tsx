'use client'

import Avatar from '@/app/components/avatar';
import { useAppSelector } from '@/app/redux/store';
import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image'
import { useState } from 'react';
import ImageModal from './image-modal';


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

export default function MessageBox({ data, isLast }: MessageBoxProps) {
    const { user } = useAppSelector(state => state.auth)
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const isOwn = user.email === data?.sender?.email
    const seenList = (data.seen || [])
        .filter((user) => user.id !== data?.sender?.id)
        .map((user) => user.name)
        .join(', ');

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const avatar = clsx(isOwn && 'order-2');
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                    {data.image ? (
                        <Image
                            alt="Image"
                            height="288"
                            width="288"
                            onClick={() => setImageModalOpen(true)}
                            src={data.image}
                            className="object-cover cursor-pointer hover:scale-110 transition translate" />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}
