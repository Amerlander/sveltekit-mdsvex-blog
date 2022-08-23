
<script>
	import { page } from '$app/stores'

    let navHeight;
	let y = 0;
	$: navShadow = (y > 200) ? true : false;

	let menuOpen = false;

	$: active = $page.url.pathname;

</script>

<svelte:window bind:scrollY={y}/>

<nav class:navShadow bind:clientHeight={navHeight}>

	<div class="burger-container mobile {menuOpen}" on:click={()=>{menuOpen = !menuOpen;}}>
		<div id="burger">
			<div class="bar topBar"></div>
			<div class="bar btmBar"></div>
		</div>
	</div>

	<div class='menu {menuOpen}'  on:click={()=>{menuOpen = false;}}>
		<ul>
			<li class:active={active === '/'}><a sveltekit:prefetch href="/" on:click={()=>{active='/'}}>LandAnker</a></li>
			<li class:active={active === '/galerie/'}><a sveltekit:prefetch href="/galerie/" on:click={()=>{active='/galerie/'}}>Galerie</a></li>
			<li class:active={active.startsWith('/modelle/')}><a sveltekit:prefetch href="/modelle/" on:click={()=>{active='/modelle/'}}>Modelle</a></li>
		</ul>
	</div>

	<div class=dimmer></div>

</nav>




<style type='scss'>
    
    nav {
        position: sticky;
        top: -2px;
        z-index: 99;
        padding: 1em 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: transparent;
        transition: background-color .1s;
        background-color: var(--background-color);
        
        &.navShadow {
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
    
        ul {
            li {
                margin: 0.2em;
                position: relative;
                a {
                    padding: .2em .8em;
                    font-family: var(--font-family-headings);
                    min-height: 2.1em;
                }
                &::after {
                    content: '';
                    background: var(--primary);
                    width: 0%;
                    height: 2px;
                    position:absolute;
                    left: 50%;
                    bottom: 0px;
                    transition: all .5s ease-out;
                }
                &:hover, &.active {
                    &::after {
                        width: 100%;
                        left: 0%;
                    }
                }
            }
    
        }
    }
    
    .dimmer {
        display: none;
        opacity: 0;
        pointer-events: none;
        background: var(--primary);
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: ' ';
        position: fixed;
        transition: opacity .3s;
        z-index: 999999999;
    }
    .burger-container {
    position: relative;
    display: inline-block;
    height: 50px;
    width: auto;
    cursor: pointer;
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    -webkit-tap-highlight-color: transparent;
    z-index: 20;
    display: none;
    opacity: 1;
    
        &.true {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    
            ~ .dimmer {
                opacity: 1;
                z-index: 10;
                pointer-events: all;
            }
    
            ~ .menu.mobile {
                display: flex;
                opacity: 1;
            }
            #burger .bar {
                background-color: var(--primary-inverse);
                -webkit-transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
                transition: all 0.4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
                -webkit-transition-delay: 0.2s;
                transition-delay: 0.2s;
                &.topBar {
                    -webkit-transform: translateY(4px) rotate(45deg);
                    transform: translateY(4px) rotate(45deg);
                }
    
                &.btmBar {
                    -webkit-transform: translateY(3px) rotate(-45deg);
                    transform: translateY(3px) rotate(-45deg);
                }
            }
        }
        #burger {
        width: 18px;
        height: 8px;
        position: relative;
        display: block;
        margin: -4px auto 0;
        top: 50%;
            .bar {
            width: 100%;
            height: 1px;
            display: block;
            position: relative;
            background: var(--primary);
            -webkit-transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
            transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
            -webkit-transition-delay: 0s;
                    transition-delay: 0s;
                &.topBar {
                -webkit-transform: translateY(0px) rotate(0deg);
                        transform: translateY(0px) rotate(0deg);
                }
                &.btmBar {
                -webkit-transform: translateY(6px) rotate(0deg);
                        transform: translateY(6px) rotate(0deg);
                }
            }
        }
    
    }
    
    @media only screen and (max-width: 720px) {
    
        .logo {
            z-index: 999;
            .icon.white {
                color: white;
            }
        }
    
        .menu {
            position: absolute;
            margin-top: 24rem;
            z-index: -1;
            display: none;
            opacity: 0;
    
            &.true {
                display: block;
                opacity: 1;
                z-index: 190;
            }
            ul {
                display: flex;
                flex-direction: column;
                li {
                    opacity: .5;
                    font-size: 1.2rem;
                    &:hover {
                        opacity: 1;
                    }
    
                    &.active {
                        border-bottom: 1px solid var(--primary-inverse);
                    }
                    a{
                        color: var(--primary-inverse);
                    }
                }
            }
        }
    
        .dimmer {
            display: block;
        }
    
        .burger-container {
            display: block;
        }
    
    }
    
</style>
    