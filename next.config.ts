import type { NextConfig } from "next";

// Automatically configure basePath for GitHub Pages when running in GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let autoBasePath = "";

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  // If the repository is named <user>.github.io, basePath should be empty
  if (!repoName.endsWith(".github.io")) {
    autoBasePath = `/${repoName}`;
  }
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? autoBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
