<script>
    // import Image from "svelte-image";
    import { Image } from '@rodneylab/sveltekit-components';
    // import exifParser from "fast-exif";
    export let src;
    export let alt = '';
    export let defaultAlt = 'Bild ohne Titel';
    export let figcaption = true;
    if (alt.startsWith('!')) {
        figcaption = false;
        alt = alt.replace('!', '')
    }

    if((alt.startsWith('exif.') || alt === '') && typeof src === 'object' && typeof src.exif === 'object') {
        switch(alt) {
            case '':
                alt = src.exif?.description || src.exif?.title || defaultAlt;
                break;
            case 'exif.title':
                alt = src.exif?.title || defaultAlt;
                break;
            case 'exif.description':
                alt = src.exif?.description || defaultAlt;
            case 'exif.artist':
                alt = src.exif?.artist || defaultAlt;
            case 'exif.copyright':
                alt = src.exif?.copyright || defaultAlt;
                break;
        } 
    }
</script>

{#if typeof src === 'string'}

    <figure>
        <img {src} {alt} {...$$restProps} />
        <figcaption>{alt}</figcaption>
    </figure>

{:else if typeof src === 'object' && typeof src.meta === 'object'}
    {@const sources = [
        { srcset: src.srcsetJpeg, type: 'image/webp' },
        { srcset: src.srcsetWebp, type: 'image/jpeg' },
    ]}

    <figure>
        <Image {alt} width={src.meta.width} height={src.meta.height} src={src.meta.src} {sources} maxWidth='100%' />
        {#if figcaption}
            <figcaption>{alt}</figcaption>
        {/if}
    </figure>

{:else if Array.isArray(src.files)}

    {#each src.files as file}
        {@const newSrc = Object.values(file)[0]}
        <svelte:self src={newSrc} {alt} />
    {/each}

{/if}