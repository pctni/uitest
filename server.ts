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

  // Serve PMTiles files
  if (url.pathname.startsWith("/static/") && url.pathname.endsWith(".pmtiles")) {
    const filePath = `.${url.pathname}`;
    console.log(`Serving PMTiles file: ${filePath}`);
    try {
      const fileData = await Deno.readFile(filePath);
      return new Response(fileData, {
        headers: { 
          "content-type": "application/octet-stream",
          "cache-control": "public, max-age=3600",
          "access-control-allow-origin": "*"
        }
      });
    } catch (error) {
      console.error(`Error serving PMTiles file ${filePath}:`, error);
      return new Response("PMTiles file not found", { status: 404 });
    }
  }

  // Serve other static files (png, css, js, etc.)
  if (url.pathname.startsWith("/static/")) {
    const filePath = `.${url.pathname}`;
    try {
      const fileData = await Deno.readFile(filePath);
      const ext = filePath.split('.').pop()?.toLowerCase();
      let contentType = "application/octet-stream";
      
      switch (ext) {
        case "png": contentType = "image/png"; break;
        case "jpg": case "jpeg": contentType = "image/jpeg"; break;
        case "css": contentType = "text/css"; break;
        case "js": contentType = "application/javascript"; break;
        case "json": contentType = "application/json"; break;
      }
      
      return new Response(fileData, {
        headers: { 
          "content-type": contentType,
          "cache-control": "public, max-age=3600"
        }
      });
    } catch (error) {
      console.error(`Error serving static file ${filePath}:`, error);
      return new Response("File not found", { status: 404 });
    }
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
