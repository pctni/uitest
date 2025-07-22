#!/usr/bin/env -S deno run --allow-net --allow-read

const PORT = 5173;

async function serveFile(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Serve the Northern Ireland map for the root path
    if (url.pathname === "/" || url.pathname === "/index.html") {
        try {
            const html = await Deno.readTextFile("./ni-map.html");
            return new Response(html, {
                headers: { 
                    "content-type": "text/html",
                    "cache-control": "no-cache"
                },
            });
        } catch (error) {
            console.error("Error reading ni-map.html:", error);
            return new Response("Error loading Northern Ireland map page", { status: 500 });
        }
    }
    
    // Serve the original simple page at /simple
    if (url.pathname === "/simple") {
        try {
            const html = await Deno.readTextFile("./index.html");
            return new Response(html, {
                headers: { 
                    "content-type": "text/html",
                    "cache-control": "no-cache"
                },
            });
        } catch (error) {
            console.error("Error reading index.html:", error);
            return new Response("Error loading simple page", { status: 500 });
        }
    }
    
    // Serve favicon
    if (url.pathname === "/favicon.png") {
        try {
            const favicon = await Deno.readFile("./static/favicon.png");
            return new Response(favicon, {
                headers: { "content-type": "image/png" },
            });
        } catch {
            return new Response("Not found", { status: 404 });
        }
    }
    
    return new Response("Not found", { status: 404 });
}

console.log("🦕 Deno Web Server with Northern Ireland Map starting...");
console.log(`🌐 Server running at http://localhost:${PORT}/`);
console.log(`🗺️  Northern Ireland Map: http://localhost:${PORT}/`);
console.log(`⚡  Simple Version: http://localhost:${PORT}/simple`);
console.log("Press Ctrl+C to stop the server");

const server = Deno.serve({ port: PORT }, serveFile);

// Graceful shutdown
Deno.addSignalListener("SIGINT", () => {
    console.log("\n👋 Shutting down server...");
    server.shutdown();
});
