import { generateText, checkAndGenerate } from "./util"
import { it, expect, describe } from "vitest"
import puppeteer from "puppeteer"

describe("generateText", () => {
	it("should output name and age", () => {
		const text = generateText("Max", 29)
		expect(text).toBe("Max (29 ans)")

		const text2 = generateText("Anna", 28)
		expect(text2).toBe("Anna (28 ans)")
	})
})

describe("checkAndGenerate", () => {
	it("should return false if inputs are null", () => {
		const text = checkAndGenerate("", null)
		expect(text).toBe(false)
	})

	it("should output text with data", () => {
		const text = checkAndGenerate("Max", 29)
		expect(text).toBe("Max (29 ans)")
	})

	it("should output text with data", () => {
		const text = checkAndGenerate("Anna", 28)
		expect(text).toBe("Anna (28 ans)")
	})
})

// describe("E2E", () => {
// 	it("should add a new user to the list", async () => {
// 		// const browser = await puppeteer.launch({
// 		// 	headless: false,
// 		// 	slowMo: 40,
// 		// 	args: ["--window-size=1920,1080"],
// 		// })
// 		// headless
// 		const browser = await puppeteer.launch()
// 		const page = await browser.newPage()
// 		await page.goto("http://localhost:5173/")
// 		await page.click("input#name")
// 		await page.type("input#name", "Anna")
// 		await page.click("input#age")
// 		await page.type("input#age", "28")
// 		await page.click("#btnAddUser")
// 		const finalText = await page.$eval(".user-item", (el) => el.textContent)
// 		expect(finalText).toBe("Anna (28 ans)")
// 	}, 10000)
// })
