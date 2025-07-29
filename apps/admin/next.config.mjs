/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   unoptimized: true,
  // },
  images: {
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'cdn.sendexa.co',
       port: '',
       pathname: '/**',
     },
   ],
  },
}

export default nextConfig
