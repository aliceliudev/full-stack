export function createFetchRequest(req) {
  const protocol = req.protocol || "http";
  const host = req.headers?.host || req.get?.("host") || "localhost:5173";
  const origin = `${protocol}://${host}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();

  // Only add close listener if req has the method
  if (req.on && typeof req.on === "function") {
    req.on("close", () => controller.abort());
  }

  const headers = new Headers();
  const reqHeaders = req.headers || {};
  for (const [key, values] of Object.entries(reqHeaders)) {
    if (!values) continue;
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value);
      }
    } else {
      headers.set(key, values);
    }
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }
  return new Request(url.href, init);
}
