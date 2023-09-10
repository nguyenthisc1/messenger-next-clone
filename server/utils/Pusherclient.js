import Pusher from 'pusher';

const pusherClient = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'ap1',
    useTLS: true
});

// const pusherClient = new Pusher({
//     appId: "1660971",
//     key: "4347c7804bf431133929",
//     secret: "5a4fb5a89fc5c6f0bacf",
//     cluster: "ap1",
//     useTLS: true
//   });
  

export default pusherClient