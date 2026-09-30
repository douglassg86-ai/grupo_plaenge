
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
  // /investidores e /investidores2: apresentações restritas (senha validada no servidor)
  // hospedadas no projeto Vercel "plaenge-investidores". O conteúdo não fica neste repositório.
  async rewrites() {
    const INVESTIDORES = 'https://plaenge-investidores.vercel.app';
    return {
      beforeFiles: ['investidores', 'investidores2'].flatMap(base => [
        { source: `/${base}`, destination: `${INVESTIDORES}/${base}` },
        { source: `/${base}/:path*`, destination: `${INVESTIDORES}/${base}/:path*` },
      ]),
    };
  },
};

module.exports = nextConfig;
