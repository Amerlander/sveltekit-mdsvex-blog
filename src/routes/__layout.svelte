<script>
	import { page } from '$app/stores';
	import lazyload from 'vanilla-lazyload';
  	import { browser } from '$app/env';

  if (browser && !document.lazyloadInstance) {
    document.lazyloadInstance = new lazyload();
  }
  


</script>

<header>
	<hgroup>
		<a href="/">
			<h1 class:small={$page.url.pathname !== '/'}>Oral History Projekt </h1>
		</a>
		<p>Bundesstiftung Aufarbeitung</p>
	</hgroup>
</header>

<main>
	<slot />
</main>

<footer>
<hr>
	<p><i>Die Interviews haben Tine Lippert, Nancy Göhring und Irina Maslennikova geführt. Die redaktionelle Zusammenfassung ist von Sven Bardua</i></p>

	<p>Copyright &#169; <a href="https://papierfabrik-hohenofen.de" target="_blank">PPH</a>, {new Date().getFullYear()}</p>

</footer>

<style>
	:global(:root) {
		--spacing-unit: 4px;
		--color-background: #e5e5e5;
		--color-text-primary: #212121;
		--color-text-secondary: #5a5a5a;
	}

	:global(body) {
		margin: 0 auto;
		max-width: 75ch;
		padding: calc(var(--spacing-unit) * 8);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--color-background);
		color: var(--color-text-primary);
		line-height: 1.51;
		font-size: 18px;
	}

	:global(a, a:visited, a:active) {
		text-decoration: none;
		color: var(--color-text-primary);
		font-weight: 700;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	.small {
		font-size: 1.6rem;
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
	}

	hgroup h1, hgroup p {
		margin: 0px;
	}

	:global(img) {
		max-width: 100%;
		height: auto;
	}
</style>
