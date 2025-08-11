import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Redireciona chamadas /api/flask/* para o backend em http://localhost:5000
  async rewrites() {
    return [
      {
        source: '/api/flask/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ]
  },

  // Configurações de imagens
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  // Configurações de experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
