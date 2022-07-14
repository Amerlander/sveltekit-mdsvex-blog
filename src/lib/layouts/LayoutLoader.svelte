<script context="module">

    async function loadLayouts() {
        const files = await import.meta.globEager(`./*.{svelte,md,svx}`);
        return files;
    }

    const layouts = loadLayouts();

</script>

<script>
    export let meta;
    export let template = meta.template ?? '';
    let [currentLayout, ...restLayouts] = template.split(',');
    template = restLayouts.join(',')
    let LayoutComponent;

    if(currentLayout != ''){
        layouts.then(function(value) {
            let match;
            for (const [path, resolver] of Object.entries(value)) {
                let filename = path.slice(0, path.lastIndexOf("."));
                // console.log(filename)
                if (filename === `./__layout-${currentLayout}`) {
                    match = [path, resolver];
                    break;
                }
            }
            // console.log(match)
            if(match){
                LayoutComponent = match[1]?.default;
            }
        });
    }

</script>

{#if currentLayout != ''}
    {#if LayoutComponent != undefined}
        <svelte:component this={LayoutComponent} {meta}>
                <svelte:self {template} {meta}>
                    <slot />
                </svelte:self>
        </svelte:component>
    {:else}
        <svelte:self {template} {meta}>
            <slot />
        </svelte:self>
    {/if}
{:else}
    {#if LayoutComponent != undefined}
        <svelte:component this={LayoutComponent} {meta}>
            <slot />
        </svelte:component>
    {:else}
        <slot />
    {/if}
{/if}
