/** @type {import('next').NextConfig} */

const nextConfig = {

     images: {
    //     domains: ['www.gravatar.com'],
    // },
    remotePatterns: [
        {
          protocol: "https",
          hostname: "www.gravatar.com",
          pathname: '**',
        }
      ],
    },

    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'www.npmhub.vercel.app',
            },
          ],
          destination: 'https://npmhub.vercel.app/:path*',
          permanent: true, 
        },
      ];
    },

};

export default nextConfig;
