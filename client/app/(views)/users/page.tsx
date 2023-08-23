"use client";

import { PATH } from "@/app/constants/path";
import storage from "@/app/helpers/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmptyState from "../../components/empty-state";

export default function Users() {
    const token = storage.getAccessToken()
    const router = useRouter()

    useEffect(() => {
        if(!token) {
            router.push(PATH.HOME)
        }
    }, [router, token])

    return (
        <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState />
        </div>
    );
}
