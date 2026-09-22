import { test } from "@playwright/test";
import { IndexPage } from "../../pages/indexPage.ts";

test("opens the TradingView homepage", async ({ page }) => {
    const indexPage = new IndexPage(page);
    await indexPage.goto();
});
