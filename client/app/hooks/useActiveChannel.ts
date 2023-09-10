import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";
import { ADD_ACTIVE, REMOVE_ACTIVE, SET_ACTIVE } from "../redux/reducer/active.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const useActiveChannel = () => {
    const dispatch = useAppDispatch()
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

    useEffect(() => {
        let channel = activeChannel;

        if (!channel) {
            channel = pusherClient.subscribe('presence-messenger');
            setActiveChannel(channel);
        }

        channel.bind("pusher:subscription_succeeded", (members: Members) => {
            const initialMembers: string[] = [];

            members.each((member: Record<string, any>) => initialMembers.push(member.id));

            dispatch(SET_ACTIVE(initialMembers));
        });

        channel.bind("pusher:member_added", (member: Record<string, any>) => {
            dispatch(ADD_ACTIVE(member.id))
        });

        channel.bind("pusher:member_removed", (member: Record<string, any>) => {
            dispatch(REMOVE_ACTIVE(member.id));
        });

        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe('presence-messenger');
                setActiveChannel(null);
            }
        }
    }, [activeChannel, dispatch]);
}

export default useActiveChannel;