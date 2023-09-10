"use client";

import Image from "next/image";
import { useGetListUserQuery } from "../apis/users.api";
import { useAppSelector } from "../redux/store";

interface AvatarProps {
    user?: UserItem | FullProfile;
}

export default function Avatar({ user }: AvatarProps) {
    const { members } = useAppSelector((state) => state.active);
    console.log("🚀 ~ file: avatar.tsx:13 ~ Avatar ~ members:", members)

    useGetListUserQuery()
    const isActive =
        members.indexOf(user?.id!) !== -1;

    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Image
                    fill
                    src={user?.image || "/images/placeholder.jpg"}
                    alt="Avatar"
                />
            </div>
            {isActive ? (
                <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
            ) : null}
        </div>
    );
}
