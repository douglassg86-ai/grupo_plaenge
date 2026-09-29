
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // /investidores: apresentação restrita (senha validada no servidor) hospedada no
  // projeto Vercel "plaenge-investidores". O conteúdo não fica neste repositório.
  async rewrites() {
    const INVESTIDORES = 'https://plaenge-investidores.vercel.app';
    return {
      beforeFiles: [
        { source: '/investidores', destination: `${INVESTIDORES}/investidores` },
        { source: '/investidores/:path*', destination: `${INVESTIDORES}/investidores/:path*` },
      ],
    };
  },
};

module.exports = nextConfig;
