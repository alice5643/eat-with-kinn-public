// Cloudflare Pages build configuration
export const onRequest = async ({ request, env }) => {
  // Handle routing for SPA
  const url = new URL(request.url)

  // Serve static files directly
  if (url.pathname.startsWith('/static/') ||
      url.pathname.startsWith('/images/') ||
      url.pathname.includes('.')) {
    return env.ASSETS.fetch(request)
  }

  // For all other routes, serve index.html (SPA routing)
  const indexResponse = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request))
  return indexResponse
}