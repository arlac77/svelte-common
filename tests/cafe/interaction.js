import { Selector } from "testcafe";

const base = "http://localhost:5000";

fixture`interactions`.page`${base}/components/svelte-common/example/index.html`;

test("collapse", async t => {
  const s = Selector("button").withText("Collapse");

  await t.click(s);

  await t.expect(Selector("#collapse-content").visible).ok();

  await t.click(s);
  await t.takeScreenshot();

  //await t.expect(Selector("#collapse-content").visible);
});

test("about service worker", async t => {
  await t
    .expect(Selector("#serviceWorkerScope").innerText)
    .eql(`${base}/components/svelte-common/tests/app/`);
});
