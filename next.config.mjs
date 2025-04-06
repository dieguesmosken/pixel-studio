let userConfig = undefined
try {
  // tentar importar como ESM primeiro
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback para CJS
    userConfig = await import('./v0-user-next.config')
  } catch (innerError) {
    // ignorar erro
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: 'export', // necessário para next export automático
}

// Mescla as configs personalizadas do usuário, se existirem
if (userConfig) {
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
