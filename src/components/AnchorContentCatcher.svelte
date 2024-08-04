<script>
  import { onMount } from "svelte";

  let { close } = $props();

  let anchor;
  let content;
  let path;

  const OFFSET = 9;

  function layoutPath() {
    const a = anchor.getBoundingClientRect();
    const c = content.getBoundingClientRect();

    console.log("A", a);
    console.log("C", c);

    a.x -= OFFSET;
    a.y -= OFFSET;
    c.x -= OFFSET;
    c.y -= OFFSET;

    let ax1, ax2, aw, ah, ay1, ay2, cx1;

    ax1 = a.x;
    aw = a.width;
    ah = a.height;
    ay1 = a.y;
    ay2 = a.y + a.height;
    cx1 = c.x;

    if (a.x + a.width > c.x + c.width) {
      ax1 = a.x + a.width;
      aw = -a.width;
      cx1 = c.x + c.width;
    }

    ax2 = ax1;

    if (a.y < c.y) {
      ax2 = a.x + a.width;
    }

    if (a.y + a.height > c.y + c.height) {
      ax1 = a.x + a.width;
      aw = 0;
    }

    const d = `M${ax2} ${ay1}
   Q${cx1} ${ay1}
    ${cx1} ${c.y}
   v${c.height}
   Q${cx1} ${ay2}
    ${ax1} ${ay2}
   h${aw}
   v${-ah}
   z`;

    path.setAttribute("d", d);
  }

  onMount(() => {
    layoutPath();
    path.onmouseout = e => {
      close();
    };
  });
</script>

<svg class="acc" width="10000" height="10000">
  <path bind:this={path} />
</svg>
<div bind:this={anchor} onmouseleave={close} role="none">
  <slot name="anchor" />
</div>
<div bind:this={content}>
  <slot name="content" />
</div>
