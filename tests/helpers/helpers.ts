import { expect } from "@playwright/test";

export function expectResultsObject(results: unknown): void {
	expect(results).not.toBeNull();
	expect(typeof results).toBe("object");
	expect(Array.isArray(results)).toBeFalsy();
}
