export default {
  async fetch(request) {
    // Parse the incoming request URL
    const url = new URL(request.url);
    // Build the target URL (the backend you want to proxy to)
    const targetBase = "https://pstream.mov";
    // Preserve the full path and search from the incoming request
    const targetUrl = targetBase + url.pathname + url.search;

    // Clone method, headers, body, etc.
    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      redirect: "manual"
    });
    const response = await fetch(proxyRequest);
    return response;
  }
}