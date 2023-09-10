"use client";

import { useCreateConversationMutation } from "@/app/apis/conversations.api";
import Avatar from "@/app/components/avatar";
import LoadingModal from "@/app/components/modals/loading-modal";
import { useAppSelector } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
    data: UserItem;
}

export default function UserBox({ data }: UserBoxProps) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(false);
    const [createConverstationApi] = useCreateConversationMutation();
    const handleClick = useCallback(async () => {
        setIsLoading(true);
        await createConverstationApi({ userId: data.id as string, email: user.email })
            .unwrap()
            .then((data) => {
                console.log("🚀 ~ file: user-box.tsx:26 ~ .then ~ data:", data)
                router.push(`/conversations/${data.data.id}`);
            }).catch((error) => { console.log(error) })
            .finally(() => setIsLoading(false));
    }, [createConverstationApi, data.id, router, user.email]);

    return (
        <>
            {isLoading && <LoadingModal />}
            <div onClick={handleClick} className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
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
