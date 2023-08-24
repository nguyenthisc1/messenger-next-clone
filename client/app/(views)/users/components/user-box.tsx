"use client";

import { useConversationMutation } from "@/app/apis/conversations.api";
import Avatar from "@/app/components/avatar";
import LoadingModal from "@/app/components/modals/loading-modal";
import { useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
    data: UserItem | FullProfile;
}

export default function UserBox({ data }: UserBoxProps) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(false);
    const [converstationApi] = useConversationMutation();
    const handleClick = useCallback(async () => {
        setIsLoading(true);
        await converstationApi({ userId: data.id as string, email: user.email })
            .unwrap()
            .then(() => {
                router.push(`/conversations/${data.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [converstationApi, data.id, router, user.email]);

    return (
        <>
            {isLoading && <LoadingModal />}
            <div
                onClick={handleClick}
                className="
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        bg-white 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      "
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium text-gray-900">
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
