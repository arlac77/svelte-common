import resolve from "@rollup/plugin-node-resolve";
import dev from "rollup-plugin-dev";
import svelte from "rollup-plugin-svelte";
import virtual from "@rollup/plugin-virtual";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";

const port = 5000;
const basedir = "tests/app";
const production = !process.env.ROLLUP_WATCH;

export default {
  input: `${basedir}/src/index.mjs`,
  treeshake: production,
  output: {
    sourcemap: true,
    format: "esm",
    file: `${basedir}/public/bundle.main.mjs`
  },
  plugins: [
    virtual({
      "node-fetch": "export default fetch",
      stream: "export class Readable {}",
      buffer: "export class Buffer {}"
    }),
    postcss({
      extract: true,
      sourceMap: true,
      minimize: production,
      plugins: [postcssImport]
    }),
    svelte({
      compilerOptions: {
        dev: !production
      }
    }),
  resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    dev({
      port,
      dirs: [`${basedir}/public`],
      spa: `${basedir}/public/index.html`,
      basePath: "/"
    })
  ]
};
