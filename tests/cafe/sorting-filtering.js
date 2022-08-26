import { Selector } from "testcafe";

const base = "http://localhost:4173/examples/svelte-common/";

fixture`sorting`.page`${base}`;

test("sorting", async t => {
  const sorta1 = Selector("#sort-a1");
  const a1b = Selector("#a1 > button");

  await t.click(a1b);
  await t.expect(sorta1.value).eql("ascending");

  await t.click(a1b);
  await t.expect(sorta1.value).eql("descending");
});
