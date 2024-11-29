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

};

export default nextConfig;
