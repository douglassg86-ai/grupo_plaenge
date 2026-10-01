
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
  // /serena: apresentação Serena by Breton para corretores (link aberto), projeto Vercel "plaenge-serena".
  async rewrites() {
    const INVESTIDORES = 'https://plaenge-investidores.vercel.app';
    const SERENA = 'https://plaenge-serena.vercel.app';
    const proxy = (base, host) => [
      { source: `/${base}`, destination: `${host}/${base}` },
      { source: `/${base}/:path*`, destination: `${host}/${base}/:path*` },
    ];
    return {
      beforeFiles: [
        ...['investidores', 'investidores2'].flatMap(base => proxy(base, INVESTIDORES)),
        ...proxy('serena', SERENA),
      ],
    };
  },
};

module.exports = nextConfig;
