import { Channel, Members } from "pusher-js";
import { useEffect, useState } from "react";
import { getPusherClient } from "../libs/pusher";
import { ADD_ACTIVE, REMOVE_ACTIVE, SET_ACTIVE } from "../redux/reducer/active.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const useActiveChannel = () => {
    const dispatch = useAppDispatch()
    const [activeChannel, setActiveChannel] = useState<Channel | any>(null);
    const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            const pusherClient = getPusherClient(user.id)
            let channel = activeChannel;

            if (!channel && user) {
                channel = pusherClient.subscribe('presence-messenger');
                setActiveChannel(channel);
            }

            // if(channel.members.myID === null) {
            //     pusherClient.channels.remove('presence-messenger')
            // }

            channel?.bind("pusher:subscription_succeeded", (members: Members) => {
                const initialMembers: string[] = [];
                members.each((member: Record<string, any>) => initialMembers.push(member.id));

                dispatch(SET_ACTIVE(initialMembers));
            });

            channel?.bind("pusher:member_added", (member: Record<string, any>) => {
                dispatch(ADD_ACTIVE(member.id))
            });

            channel?.bind("pusher:member_removed", (member: Record<string, any>) => {
                dispatch(REMOVE_ACTIVE(member.id));
            });

            return () => {
                if (activeChannel) {
                    pusherClient.unsubscribe('presence-messenger');
                    setActiveChannel(null);
                }
            }
        }

    }, [activeChannel, dispatch, user]);
}

export default useActiveChannel;