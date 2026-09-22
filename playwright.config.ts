import { defineConfig, devices } from "@playwright/test";

const setupTestMatch = /.*[\\/]setup[\\/].*\.spec\.ts/;

export default defineConfig({
    testDir: "./tests/tests",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? "dot" : "html",
    use: {
        baseURL: "https://pl.tradingview.com/",
        trace: "on",
        screenshot: "on",
        // trace: "on-first-retry",
        // screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    projects: [
        {
            name: "setup",
            testMatch: setupTestMatch,
        },
        {
            name: "e2e",
            dependencies: ["setup"],
            testIgnore: setupTestMatch,
        },
    ],
});
