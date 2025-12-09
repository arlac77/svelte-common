import { test, expect } from "@playwright/test";

test("collapse", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "Collapse" }).click();
  await expect(page.getByText("1st.")).toBeVisible();
  await page.getByRole("button", { name: "Collapse" }).click();
  await expect(page.getByText("1st.")).not.toBeVisible();
});
