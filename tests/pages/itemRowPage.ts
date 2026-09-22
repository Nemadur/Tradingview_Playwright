import { Locator } from "@playwright/test";

export class ItemRowsPage {
    readonly rows: Locator;

    constructor(page: Locator) {
        this.rows = page.locator('[class*="itemRow"]');
    }

    async count() {
        return this.rows.count();
    }

    async getDataTypes() {
        return this.rows.evaluateAll((rows) =>
            rows.map((row) => row.getAttribute("data-type")),
        );
    }

    getRow(index: number) {
        return this.rows.nth(index);
    }

    getSymbolCount(symbol: string) {
        const symbolLocator = this.rows.locator(`text=${symbol}`);
        return symbolLocator.count();
    }

    getRowByName(name: string) {
        return this.rows.filter({ hasText: name });
    }
}
