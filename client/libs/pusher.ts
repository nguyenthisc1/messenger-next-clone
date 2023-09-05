import Pusher from 'pusher'
import PusheClient from 'pusher-js'

export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: 'ap1',
});

export const pusherClient = new PusheClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
        // channelAuthorization: {
        //     endpoint: '/api/pusher/auth',
        //     transport: 'ajax',
        // },
        cluster: 'ap1',
    }

)