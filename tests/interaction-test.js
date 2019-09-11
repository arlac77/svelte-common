import { Selector } from "testcafe";

const base = "http://localhost:5000";

fixture`interactions`.page`${base}/base/index.html`;

test("action", async t => {
  const s = Selector("button");

  await t.click(s);

  await t.expect(Selector("#actionExecuted").innerText).eql("true");
});

