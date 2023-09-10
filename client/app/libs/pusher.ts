import Pusher from 'pusher';
import PusherClient from 'pusher-js';
import storage from '../helpers/localStorage';



export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'ap1',

});

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        channelAuthorization: {
            endpoint: `${process.env.PORT}/api/auth/pusher`,
            // endpoint: `http://localhost:3005/api/auth/pusher`,
            params: {
                user_id: typeof window !== "undefined" && storage.getValueFromKey('user_id')
            },

            transport: 'ajax',

        },
        cluster: 'ap1',
    }

)