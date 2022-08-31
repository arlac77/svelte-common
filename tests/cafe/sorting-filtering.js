import { Selector } from "testcafe";
import { base } from "./constants.js";

fixture`sorting and filtering`.page`${base}`;

test("sorting", async t => {
  const a0 = Selector("#a0");

  const sorta = Selector("#sort-a");
  const ab = Selector("#a > button");
  const sortb = Selector("#sort-b");
  const bb = Selector("#b > button");

  await t.expect(sorta.value).eql("ascending");
  //await t.expect(a0.value).eql("1.1");

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

/*
test("filtering", async t => {
  const a0 = Selector("#a0");
  await t.typeText("#filter-a", "2");
  await t.expect(a0.value).eql("2.1");
});
*/