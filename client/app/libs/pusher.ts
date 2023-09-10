import storage from '@/app/helpers/localStorage';
import Pusher from 'pusher';
import PusherClient from 'pusher-js';

export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'ap1',

});

// const pusherClientOption: PusherClient | any = {
//     channelAuthorization: {
//         endpoint: `${process.env.PORT}/api/auth/pusher`,
//         params: {
//             user_id: storage.getValueFromKey('user_id')
//         },
//         transport: 'ajax',
//     },
//     cluster: 'ap1',
// }


let pusherClient: PusherClient | null = null


export function getPusherClient(user_id: string) {
    if (!pusherClient) {
        pusherClient = new PusherClient(
            process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
            {
                channelAuthorization: {
                    endpoint: `${process.env.PORT}/api/auth/pusher`,
                    params: {
                        user_id
                    },
                    transport: 'ajax',
                },
                cluster: 'ap1',
            }
        )
    }
    return pusherClient;
}


