import { Selector } from "testcafe";
import { base } from "./constants.js";

fixture`sorting`.page`${base}`;

test("sorting", async t => {
  const sorta1 = Selector("#sort-a1");
  const a1b = Selector("#a1 > button");
  const sorta2 = Selector("#sort-a2");
  const a2b = Selector("#a2 > button");

  await t.click(a1b);
  await t.expect(sorta1.value).eql("ascending");
  await t.expect(sorta2.value).eql("none");

  await t.click(a1b);
  await t.expect(sorta1.value).eql("descending");
  await t.expect(sorta2.value).eql("none");

  await t.click(a1b);
  await t.expect(sorta1.value).eql("ascending");
  await t.expect(sorta2.value).eql("none");

  await t.click(a2b);
  await t.expect(sorta2.value).eql("ascending");
  await t.expect(sorta1.value).eql("none");
});
