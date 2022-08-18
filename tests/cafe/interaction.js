import { Selector } from "testcafe";

const base = "http://localhost:4173/examples/svelte-common/";

fixture`interactions`.page`${base}`;

test("collapse", async t => {
  const s = Selector("button").withText("Collapse");

  await t.click(s);

  await t.expect(Selector("#collapse-content").visible).ok();

  await t.click(s);
  await t.takeScreenshot();

  //await t.expect(Selector("#collapse-content").visible);
});

/*
test("about service worker", async t => {
  const s = Selector("a").withText("About");

  await t.click(s);

  await t
    .expect(Selector("#serviceWorkerScope").innerText)
    .eql(`${base}`);
});
*/