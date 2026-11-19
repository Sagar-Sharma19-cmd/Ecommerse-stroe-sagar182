import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Cache Components / Partial Prefetching force every dynamic route into
  // Suspense boundaries, which fights a cart that depends on client state.
  // Disabled to keep the focus on the assignment's 3 core concepts.
};

export default nextConfig;
