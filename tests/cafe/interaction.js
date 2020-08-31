import { Selector } from "testcafe";

const base = "http://localhost:5000";

fixture`interactions`.page`${base}/components/svelte-common/example/index.html`;

test("action", async t => {
  const s = Selector("button").withText('Long Running Action');

  await t.click(s);

  await t.expect(Selector("#actionExecuted").innerText).eql("true");
});


test("failing action", async t => {
  const s = Selector("button").withText('Failing Action');

  await t.click(s);
});


test("collapse", async t => {
  const s = Selector("button").withText('Collapse');

  await t.click(s);

  await t.expect(Selector("#collapse-content").visible).ok();

  await t.click(s);

  //await t.expect(Selector("#collapse-content").visible);
});

