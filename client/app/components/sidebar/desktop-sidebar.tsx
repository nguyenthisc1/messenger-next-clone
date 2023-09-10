"use client";

import { useGetProfileQuery } from "@/app/apis/auth.api";
import useRoutes from "@/app/hooks/useRoutes";
import { useAppSelector } from "@/app/redux/store";
import { useState } from "react";
import Avatar from "../avatar";
import DesktopItem from "./desktop-item";
import SettingsModal from "./settings-modal";


export default function DesktopSidebar() {
    const routes = useRoutes();
    const { user } = useAppSelector((state) => state.auth)
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useGetProfileQuery(user.email);

    return (
        <>
            {currentUser.isSuccess ? <SettingsModal currentUser={currentUser.data} isOpen={isOpen} onClose={() => setIsOpen(false)} /> : null}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between">
                    <ul
                        role="list"
                        className="flex flex-col items-center space-y-1"
                    >
                        {routes.map((route) => (
                            <DesktopItem
                                key={route.label}
                                label={route.label}
                                href={route?.href}
                                icon={route.icon}
                                active={route.active}
                                onClick={route.onClick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                    <div
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer hover:opacity-75 transition"
                    >
                        <Avatar user={currentUser.data} />
                    </div>
                </nav>
            </div>
        </>
    );
}
