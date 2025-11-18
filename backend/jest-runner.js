#!/usr/bin/env node
// This script enables experimental VM modules and runs Jest
process.env.NODE_OPTIONS = "--experimental-vm-modules";
import("./node_modules/jest/bin/jest.js").catch((err) => {
  console.error(err);
  process.exit(1);
});
