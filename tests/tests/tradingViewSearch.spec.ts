import { test, expect } from "@playwright/test";
import { IndexPage } from "../pages/indexPage.ts";
import { ItemRowsPage } from "../pages/itemRowPage.ts";
import { symbolSearchTypes } from "../types/searchTypes.ts";

test.beforeEach(async ({ page }) => {
    await new IndexPage(page).goto();
});

test("fills the TradingView search bar", async ({ page }) => {
    const indexPage = new IndexPage(page);

    await indexPage.fillSearchBar("PLN");

    const matchingRows = new ItemRowsPage(page);

    await expect(matchingRows.rows.first()).toBeVisible();
    expect(await matchingRows.count()).toBeGreaterThan(0);

    const firstRow = matchingRows.getRow(0);
    await expect(firstRow).toBeVisible();

    expect(await matchingRows.getSymbolCount("PLN")).toBeGreaterThan(0);
});

for (const { id, dataType } of symbolSearchTypes) {
    test(`filters search results by ${id}`, async ({ page }) => {
        const indexPage = new IndexPage(page);
        // we need to fill the search bar with a term that will return results for all data types. "PLN" is a good term because it is the currency code for the Polish Zloty, and it is used in many different financial instruments.
        await indexPage.fillSearchBar("PLN");
        await indexPage.getButtonById(id).click();

        const filteredRows = new ItemRowsPage(page);
        const rowCount = await filteredRows.count();

        if (rowCount === 0) {
            return;
        }

        const dataTypes = await filteredRows.getDataTypes();
        expect(dataTypes).toContain(dataType);
    });
}
