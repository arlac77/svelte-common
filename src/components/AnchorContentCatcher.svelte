<script>
  import { onMount } from "svelte";

  let a, c;

  let anchorElem;
  let contentElem;
  let pathElem;

  onMount(() => {
    console.log(a.getBoundingClientRect(), c.getBoundingClientRect());

    const anchor = anchorElem.getBBox();
    const content = contentElem.getBBox();

    console.log(anchor, content);

    pathElem.setAttribute(
      "d",
      `M ${anchor.x} ${anchor.y}
    Q ${content.x} ${anchor.y}
      ${content.x} ${content.y}
    v ${content.height}
    Q ${content.x} ${anchor.y + anchor.height}
      ${anchor.x} ${anchor.y + anchor.height}
    h ${anchor.width}
    v ${-anchor.height}
    z`
    );
  });
</script>

<div bind:this={a}>
  <slot name="anchor" />
</div>
<div bind:this={c}>
  <slot name="content" />
</div>
<svg width="100" height="100" viewBox="0 0 100 100">
  <rect
    bind:this={anchorElem}
    fill="#ddd"
    y="10"
    width="100"
    height="30"
    stroke="green"
    stroke-width="5"
    visibility="visible" />
  <rect
    bind:this={contentElem}
    fill="#ddd"
    y="100"
    width="120"
    height="200"
    stroke="green"
    stroke-width="5"
    visibility="visible" />
  <path
    bind:this={pathElem}
    stroke="green"
    fill="#ddd"
    stroke-width="5"
    visibility="visible" />
</svg>
