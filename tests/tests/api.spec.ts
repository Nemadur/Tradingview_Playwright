import { test, expect } from "@playwright/test";
import { expectResultsObject } from "../helpers/helpers.ts";

const searchEndpoint =
    "https://symbol-search.tradingview.com/symbol_search/v3/";
const requestHeaders = {
    Origin: "https://www.tradingview.com",
    Referer: "https://www.tradingview.com/",
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

test.describe("TradingView symbol search API", () => {
    test("returns results for a valid symbol", async ({ request }) => {
        const response = await request.get(searchEndpoint, {
            headers: requestHeaders,
            params: {
                text: "PLN",
                hl: "1",
                lang: "pl",
                search_type: "stocks",
            },
        });

        expect(response.status()).toBe(200);
        const results = await response.json();
        expectResultsObject(results);

        expect(
            results.symbols.some((item: { symbol?: string }) =>
                item.symbol?.includes("PLN"),
            ),
        ).toBeTruthy();
    });

    test("filters results by exchange", async ({ request }) => {
        const response = await request.get(searchEndpoint, {
            headers: requestHeaders,
            params: {
                text: "PLN",
                exchange: "NYSE",
                lang: "pl",
                search_type: "stocks",
            },
        });

        expect(response.status()).toBe(200);
        const results = await response.json();
        expectResultsObject(results);

        expect(
            results.symbols.some(
                (item: { exchange?: string }) => item.exchange === "NYSE",
            ),
        ).toBeTruthy();
    });

    test("returns no results for an unknown symbol", async ({ request }) => {
        const response = await request.get(searchEndpoint, {
            headers: requestHeaders,
            params: {
                text: "ZZZ_NOT_A_REAL_SYMBOL_12345",
                lang: "en",
                search_type: "stocks",
            },
        });

        expect(response.status()).toBe(200);
        const results = await response.json();
        expectResultsObject(results);

        expect(await results.symbols).toEqual([]);
    });

    test("returns the expected fields for a search result", async ({
        request,
    }) => {
        const response = await request.get(searchEndpoint, {
            headers: requestHeaders,
            params: {
                text: "MSFT",
                hl: "1",
                lang: "en",
                search_type: "stocks",
            },
        });

        expect(response.headers()["content-type"]).toContain(
            "application/json",
        );
        expect(response.status()).toBe(200);
        const results = await response.json();
        expectResultsObject(results);

        expect(results.symbols[0]).toEqual(
            expect.objectContaining({
                symbol: expect.any(String),
                description: expect.any(String),
                exchange: expect.any(String),
                type: expect.any(String),
            }),
        );
    });
});
