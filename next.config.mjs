/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    runtime: 'nodejs',
  },
};

export default nextConfig;
