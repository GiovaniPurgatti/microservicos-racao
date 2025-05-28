/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/catalogo/:path*',
        destination: 'http://localhost:8084/api/v1/catalogo/:path*',
      },
      {
        source: '/api/v1/pedidos/:path*',
        destination: 'http://localhost:8081/api/v1/pedidos/:path*',
      },
      {
        source: '/api/v1/pagamentos/:path*',
        destination: 'http://localhost:8082/api/v1/pagamentos/:path*',
      },
      {
        source: '/api/v1/usuarios/:path*',
        destination: 'http://localhost:8083/api/v1/usuarios/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 