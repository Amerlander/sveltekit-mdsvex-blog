<script>
    import Typewriter from 'svelte-typewriter'
    import Gap from '$lib/components/Gap.svelte'

    let classes = $$restProps.class ?? ''
    let [template, ...options] = classes?.split(" ") ?? ['', []];
    template = template.toLowerCase();

    // console.log(options)
</script>

{#if template === 'typewriter'}
    <Typewriter {...$$restProps}>
        <slot />
    </Typewriter>
{:else if template === 'gap'}
    <Gap h={options[0]} />
{:else}
    <div class='no-template-found' {...$$restProps}>
        <slot />
    </div>
{/if}

<style>
    .no-template-found {
        background: red;
    }
</style>