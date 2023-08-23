
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";
import { useLogout } from "./useLogout";

const useRoutes = () => {
    const pathname = usePathname();
    const onLogout = useLogout()
    const { conversationId } = useConversation();

    const routes = useMemo(
        () => [
            {
                label: "Chat",
                href: "/conversations",
                icon: HiChat,
                active: pathname === "/conversations" || !!conversationId,
            },
            {
                label: "Users",
                href: "/users",
                icon: HiUsers,
                active: pathname === "/users",
            },
            {
                label: "Logout",
                onClick: onLogout,
                icon: HiArrowLeftOnRectangle,
            },
        ],
        [pathname, conversationId, onLogout]
    );

    return routes;
};

export default useRoutes;
