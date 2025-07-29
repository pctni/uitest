#!/usr/bin/env -S deno run --allow-net --allow-read

const PORT = 5174;

async function serveFile(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, HEAD, OPTIONS",
        "access-control-allow-headers": "Range, Content-Type",
        "access-control-max-age": "86400"
      }
    });
  }

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

  // Serve the test simple PMTiles page at /test
  if (url.pathname === "/test") {
    const html = await Deno.readTextFile("./test-simple.html").catch(() =>
      "Error loading test page"
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

  // Serve PMTiles files with Range Request support
  if (url.pathname.startsWith("/static/") && url.pathname.endsWith(".pmtiles")) {
    const filePath = `.${url.pathname}`;
    console.log(`Serving PMTiles file: ${filePath}`);
    try {
      const fileInfo = await Deno.stat(filePath);
      const fileSize = fileInfo.size;
      
      // Check for Range header
      const rangeHeader = request.headers.get("range");
      
      if (rangeHeader) {
        // Parse Range header (e.g., "bytes=0-1023")
        const rangeMatch = rangeHeader.match(/bytes=(\d+)-(\d*)/);
        if (rangeMatch) {
          const start = parseInt(rangeMatch[1]);
          const end = rangeMatch[2] ? parseInt(rangeMatch[2]) : fileSize - 1;
          
          console.log(`Range request: bytes ${start}-${end} of ${fileSize}`);
          
          // Read the specific byte range
          const file = await Deno.open(filePath, { read: true });
          await file.seek(start, Deno.SeekMode.Start);
          const chunk = new Uint8Array(end - start + 1);
          await file.read(chunk);
          file.close();
          
          return new Response(chunk, {
            status: 206, // Partial Content
            headers: {
              "content-type": "application/octet-stream",
              "content-range": `bytes ${start}-${end}/${fileSize}`,
              "content-length": (end - start + 1).toString(),
              "accept-ranges": "bytes",
              "cache-control": "public, max-age=3600",
              "access-control-allow-origin": "*",
              "access-control-allow-headers": "Range"
            }
          });
        }
      }
      
      // Regular full file request
      const fileData = await Deno.readFile(filePath);
      return new Response(fileData, {
        headers: { 
          "content-type": "application/octet-stream",
          "content-length": fileSize.toString(),
          "accept-ranges": "bytes",
          "cache-control": "public, max-age=3600",
          "access-control-allow-origin": "*",
          "access-control-allow-headers": "Range"
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
console.log(`🧪 http://localhost:${PORT}/test - Test PMTiles`);

const server = Deno.serve({ port: PORT }, serveFile);

// Graceful shutdown
Deno.addSignalListener("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  server.shutdown();
});
