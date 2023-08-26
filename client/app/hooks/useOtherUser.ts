import { useMemo } from "react"
import { useAppSelector } from "../redux/store"


export const useOtherUser = (conversation: FullConversationType | { users: User[] | FullProfile[] } | any) => {
    const { user } = useAppSelector((state) => state.auth)

    const otherUser = useMemo(() => {
        const currentUser = user

        const otherUser = conversation.users.filter((user: User | FullProfile) => user.id !== currentUser.id);

        return otherUser[0];
    }, [conversation.users, user])

    return otherUser
}