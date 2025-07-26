#!/usr/bin/env -S deno run -A

// Simple Deno script to set up and run the Svelte app
import { existsSync } from "jsr:@std/fs/exists";

console.log("🦕 Deno Svelte App Setup");

// Check if node_modules exists
if (!existsSync("./node_modules")) {
  console.log("📦 Installing dependencies with Deno...");
  
  // Install dependencies using Deno's npm compatibility
  const installProcess = new Deno.Command("deno", {
    args: ["install", "--allow-scripts"],
    stdout: "inherit",
    stderr: "inherit"
  });
  
  const { success } = await installProcess.output();
  
  if (!success) {
    console.error("❌ Failed to install dependencies");
    Deno.exit(1);
  }
}

console.log("🚀 Starting development server...");

// Start the development server
const devProcess = new Deno.Command("deno", {
  args: ["run", "-A", "npm:vite@latest", "dev"],
  stdout: "inherit",
  stderr: "inherit"
});

const { success } = await devProcess.output();

if (!success) {
  console.error("❌ Failed to start development server");
  Deno.exit(1);
}
