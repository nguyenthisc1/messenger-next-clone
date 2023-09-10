'use client'

import { PATH } from "@/app/constants/path";
import { useAppSelector } from "@/app/redux/store";
import { useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import UserList from "./components/user-list";
import EmptyState from "@/app/components/empty-state";
import { useRouter } from "next/navigation";
import storage from "@/app/helpers/localStorage";

export default function UsersLayout({
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
            <div className="h-full">
                <UserList />
                {children}
            </div>
        </Sidebar>
    );
}
