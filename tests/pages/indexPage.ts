import { Page, Locator } from "@playwright/test";
import { SymbolSearchID } from "../types/searchTypes.ts";

export class IndexPage {
    readonly page: Page;
    readonly searchbarButton: Locator;
    readonly searchInputField: Locator;
    readonly symbolSearchButtons: Locator;
    readonly listContainer: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // This search button is awfull. There is no id or data attribute to select it. The only way to select it is by using a class that contains 'tv-header-search-container'. This is not a good practice, but it's the only way to select it.
        // there are two buttons within this div. The search button is the first one, so we can use :first-child to select it. second button is used for mobile view, so we don't need to select it.
        this.searchbarButton = page.locator(
            "div[class*='tv-header-search-container'] button:first-child",
        );
        this.searchInputField = page.locator('input[name="query"]');
        this.symbolSearchButtons = page.locator("#symbol-search-tabs");
        this.listContainer = page.locator('[class*="listContainer"]');
        this.loginButton = page.getByRole("button", { name: "Log in" });
    }

    async goto() {
        await this.page.goto("https://pl.tradingview.com/");
    }

    async fillSearchBar(searchTerm: string) {
        await this.searchbarButton.click();
        await this.searchInputField.fill(searchTerm);
    }

    getButtonById(id: SymbolSearchID): Locator {
        return this.symbolSearchButtons.locator(`button#${id}`);
    }
}
