import test from "ava";
import { Action } from "../src/action.mjs";

test("Action resolve", async t => {
    const action = new Action(() => Promise.resolve());

    t.false(action.active);
    t.false(action.failed);
    t.false(action.canceled);
    t.false(action.completed);

    const p = action.start();
    t.true(action.active);
    t.false(action.failed);
    t.false(action.canceled);
    t.false(action.completed);

    await p;

    t.false(action.active);
    t.false(action.failed);
    t.false(action.canceled);
    t.true(action.completed);

});

test("Action reject", async t => {
    const action = new Action(() => Promise.reject(7));

    t.false(action.active);
    t.false(action.failed);
    t.false(action.canceled);
    t.false(action.completed);

    const p = action.start();
    t.true(action.active);
    t.false(action.failed);
    t.false(action.canceled);
    t.false(action.completed);

    await p;
    
    t.false(action.active);
    t.true(action.failed);
    t.false(action.canceled);
    t.false(action.completed);
});