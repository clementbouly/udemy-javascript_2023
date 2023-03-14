import { describe, it, expect, vi } from "vitest"
import { loadTitle } from "./app2"

// mock http with vitest
vi.mock("./http")

describe("loadTitle", () => {
	it("should print title", async () => {
		const title = await loadTitle()
		expect(title).toBe("DELECTUS AUT AUTEM")
	})
})
