import { Selector } from "testcafe";

export const base = "http://localhost:5173/";

fixture`sorting and filtering`.page`${base}`;

test("sorting", async t => {
  const a0 = Selector("#a0");
  const b0 = Selector("#b0");

  const sorta = Selector("#sort-a");
  const ab = Selector("#a > button");
  const sortb = Selector("#sort-b");
  const bb = Selector("#b > button");
  const sortc = Selector("#sort-c");
  const cb = Selector("#c > button");
  const sorte = Selector("#sort-e");
  const eb = Selector("#e > button");

  await t.expect(sorta.value).eql("ascending");
  await t.expect(sortb.value).eql("");
  await t.expect(sortc.value).eql("");
  await t.expect(sorte.value).eql("");
  await t.expect(a0.innerText).eql("1.1");

  await t.click(ab);
  await t.expect(sorta.value).eql("descending");
  await t.expect(sortb.value).eql("");
  await t.expect(sortc.value).eql("");
  await t.expect(sorte.value).eql("");
  await t.expect(a0.innerText).eql("8.1");

  await t.click(ab);
  await t.expect(sorta.value).eql("ascending");
  await t.expect(sortb.value).eql("");
  await t.expect(sortc.value).eql("");
  await t.expect(sorte.value).eql("");
  await t.expect(a0.innerText).eql("1.1");

  await t.click(bb);
  await t.expect(sorta.value).eql("");
  await t.expect(sortb.value).eql("ascending");
  await t.expect(sortc.value).eql("");
  await t.expect(sorte.value).eql("");

  await t.click(bb);
  await t.expect(sorta.value).eql("");
  await t.expect(sortb.value).eql("descending");
  await t.expect(sortc.value).eql("");
  await t.expect(sorte.value).eql("");
  await t.expect(b0.innerText).contains("2015");
});

test("filtering", async t => {
  await t.typeText("#filter-a", "1");

  const a0 = Selector("#a0");
  await t.expect(a0.innerText).eql("1.1");

  await t.typeText("#filter-a", "2", { replace: true });
  await t.expect(a0.innerText).eql("2.1");
});
