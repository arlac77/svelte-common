import { Selector } from "testcafe";
import { base } from "./constants.js";

fixture`sorting`.page`${base}`;

test("sorting", async t => {
  const sorta = Selector("#sort-a");
  const ab = Selector("#a > button");
  const sortb = Selector("#sort-b");
  const bb = Selector("#b > button");

  await t.expect(sorta.value).eql("ascending");

  await t.click(ab);
  await t.expect(sorta.value).eql("descending");
  await t.expect(sortb.value).eql("none");

  await t.click(ab);
  await t.expect(sorta.value).eql("ascending");
  await t.expect(sortb.value).eql("none");

  await t.click(bb);
  await t.expect(sorta.value).eql("none");
  await t.expect(sortb.value).eql("ascending");
});
