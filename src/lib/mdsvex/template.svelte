<script>
    import Typewriter from 'svelte-typewriter'

    let classes = $$restProps.class ?? ''
    let [template, ...options] = classes?.split(" ") ?? ['', []];

    // console.log(options)
</script>

{#if template.toLowerCase() === 'typewriter'}
    <Typewriter {...$$restProps}>
        <slot />
    </Typewriter>
{:else}
    <div {...$$restProps}>
        <slot />
    </div>
{/if}

<style>
    div {
        background: red;
    }
</style>