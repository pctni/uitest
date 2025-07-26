#!/usr/bin/env -S deno run --allow-net --allow-read

const PORT = 5173;

async function serveFile(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // Serve the Northern Ireland map for the root path
  if (url.pathname === "/" || url.pathname === "/index.html") {
    const html = await Deno.readTextFile("./ni-map.html").catch(() =>
      "Error loading Northern Ireland map page"
    );
    return new Response(html, {
      headers: { "content-type": "text/html", "cache-control": "no-cache" },
    });
  }

  // Serve the original simple page at /simple
  if (url.pathname === "/simple") {
    const html = await Deno.readTextFile("./index.html").catch(() =>
      "Error loading simple page"
    );
    return new Response(html, {
      headers: { "content-type": "text/html", "cache-control": "no-cache" },
    });
  }

  // Serve favicon
  if (url.pathname === "/favicon.png") {
    const favicon = await Deno.readFile("./static/favicon.png").catch(() =>
      null
    );
    return favicon
      ? new Response(favicon, { headers: { "content-type": "image/png" } })
      : new Response("Not found", { status: 404 });
  }

  return new Response("Not found", { status: 404 });
}

console.log("🦕 Deno server starting...");
console.log(`🌐 http://localhost:${PORT}/ - Northern Ireland Map`);
console.log(`⚡ http://localhost:${PORT}/simple - Simple Version`);

const server = Deno.serve({ port: PORT }, serveFile);

// Graceful shutdown
Deno.addSignalListener("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  server.shutdown();
});
