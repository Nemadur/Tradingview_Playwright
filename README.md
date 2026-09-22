# TradingView Playwright

Playwright searchbar and API tests for the Polish TradingView website.

## Setup

```powershell
npm install
npm run install:browsers
```

## Run tests

```powershell
npm run test
```

The default command runs the `e2e` project, including its required setup project.

Useful commands:

```powershell
npm run report
```

If port `9323` is already in use, start the report on another port:

```powershell
npx playwright show-report --port 9324
```

## Symbol search API

The tests use this endpoint:

```text
GET https://symbol-search.tradingview.com/symbol_search/v3/
```

Requests include the `Origin`, `Referer`, and browser-like `User-Agent` headers required by the endpoint.

Supported query parameters used by the tests:

- `text=PLN` — wyszukiwana fraza lub symbol;
- `hl=1` — włączenie podświetlania wyników;
- `exchange=` — filtrowanie po giełdzie; pusta wartość oznacza brak filtra;
- `lang=pl` — język odpowiedzi i wyszukiwania;
- `search_type=undefined` — typ wyszukiwania nie został określony;
- `domain=production` — środowisko produkcyjne;
- `enable_grouping=true` — grupowanie wyników;
- `sort_by_country=PL` — priorytet wyników z Polski;
- `promo=true` — uwzględnienie wyników promowanych.

```json
{
    "0": {
        "symbol": "<em>PLN</em>",
        "description": "Planetel S.p.A.",
        "type": "stock",
        "exchange": "MIL",
        "found_by_isin": false,
        "found_by_cusip": false,
        "ipo_offer_time": 1609315200,
        "isin": "IT0005430951",
        "currency_code": "EUR",
        "currency-logoid": "country/EU",
        "logoid": "planetel",
        "logo": {
            "style": "single",
            "logoid": "planetel"
        },
        "provider_id": "ice",
        "source_logoid": "source/MIL",
        "source2": {
            "id": "MIL",
            "name": "Euronext Milan",
            "description": "Euronext Milan"
        },
        "source_id": "MIL",
        "country": "IT",
        "is_primary_listing": true,
        "typespecs": ["common"]
    }
}
```

- `symbol` — znaleziony symbol, tutaj `PLN`;
- `description` — nazwa instrumentu: `Planetel S.p.A.`;
- `type` — typ instrumentu: `stock`;
- `exchange` i `source2` — giełda oraz jej nazwa: `MIL`, czyli `Euronext Milan`;
- `isin` — unikalny identyfikator instrumentu: `IT0005430951`;
- `currency_code` — waluta notowania: `EUR`;
- `country` — kraj instrumentu: `IT`;
- `is_primary_listing` — informacja, czy jest to główne notowanie;
- `typespecs` — dodatkowa klasyfikacja instrumentu, tutaj `common`.
