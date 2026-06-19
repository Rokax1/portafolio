const repoName = "portafolio"
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true"
const basePath = isGithubPagesBuild ? `/${repoName}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPagesBuild ? "export" : "standalone",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
