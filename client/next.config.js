/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // swcMinify: false,
    swcPlugins: [["next-superjson-plugin", {}]]
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  },
  env: {
    PORT: 'http://localhost:3005',
    NEXT_PUBLIC_PUSHER_APP_KEY: '4347c7804bf431133929',
    PUSHER_APP_ID: '1660971',
    PUSHER_SECRET: '5a4fb5a89fc5c6f0bacf',
    PUSHER_CLUSTER: 'ap1',
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'drqm0rwor',
    GITHUB_ID: '9e702f31c8f169e974f8',
    GITHUB_SECRET: 'e02a5964aec9e2fe19d4d8df1784f41e5120da13',
  },
}

module.exports = nextConfig