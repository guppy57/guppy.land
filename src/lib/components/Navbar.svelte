<script>
	import { onMount } from 'svelte';
	import { HandWaving, EnvelopeSimple, GithubLogo, XLogo, Hammer, Scroll } from 'phosphor-svelte';
	import logo from '$lib/assets/GUPPY-icon.png';

	export let activeLink = '';

	let colorChange = false;
	onMount(() => {
		const changeNavbarColor = () => {
			if (window.scrollY >= 10) {
				colorChange = true;
			} else {
				colorChange = false;
			}
		};
		window.addEventListener('scroll', changeNavbarColor);

		return () => {
			window.removeEventListener('scroll', changeNavbarColor);
		};
	});
</script>

<div>
	<div class="fixed top-0 right-0 z-[43] w-full">
		<nav
			class="navbar-transition flex w-[100%] items-center justify-between px-4 py-1 {colorChange
				? 'border-b border-black/6 bg-[#fdf6e3]/75 backdrop-blur-sm'
				: 'border-b border-transparent bg-transparent'}"
		>
			<a
				href="/"
				class="transition-transform duration-75 motion-safe:hover:scale-105 motion-safe:active:scale-92"
			>
				<div class="flex items-center">
					<div class="mr-1.5 -ml-2 block h-auto w-9">
						<img alt="Guppy.land Icon" src={logo} />
					</div>
          <p class="font-family-advercase hidden text-2xl xl:block">GUPPY</p>
				</div>
			</a>
			<div class="nav-width">
				<div>
					<div class="flex items-baseline justify-start space-x-4">
						<div
							class="transition-transform duration-100 motion-safe:hover:scale-97 motion-safe:active:scale-92"
						>
							<a
								href="/"
								class="flex items-center space-x-1 {activeLink === 'about' ? '' : 'opacity-[50%]'}"
							>
								<HandWaving color="black" weight="bold" size={17} />
								<p
									class="hidden text-sm sm:block {activeLink === 'about'
										? 'font-bold'
										: 'font-medium'}"
								>
									About
								</p>
							</a>
						</div>
						<div
							class="transition-transform duration-100 motion-safe:hover:scale-97 motion-safe:active:scale-92"
						>
							<a
								href="/projects"
								class="flex items-center space-x-1 {activeLink === 'projects'
									? ''
									: 'opacity-[50%]'}"
							>
								<Hammer color="black" weight="bold" size={17} />
								<p
									class="hidden text-sm sm:block {activeLink === 'projects'
										? 'font-bold'
										: 'font-medium'}"
								>
									Projects
								</p>
							</a>
						</div>
						<div
							class="transition-transform duration-100 motion-safe:hover:scale-97 motion-safe:active:scale-92"
						>
							<a
								href="/blog"
								class="flex items-center space-x-1 {activeLink === 'blog' ? '' : 'opacity-[50%]'}"
							>
								<Scroll color="black" weight="bold" size={17} />
								<p
									class="hidden text-sm sm:block {activeLink === 'blog'
										? 'font-bold'
										: 'font-medium'}"
								>
									Blog
								</p>
							</a>
						</div>
					</div>
				</div>
				<div class="flex items-center justify-end space-x-4">
					<a href="https://github.com/guppy57">
						<GithubLogo color="grey" weight="bold" size={20} />
					</a>
					<a href="https://x.com/itsguppy57">
						<XLogo color="grey" weight="bold" size={20} />
					</a>
					<button
						class="flex h-6 cursor-pointer items-center justify-center rounded-full bg-[#FF7C00] px-3 py-1 text-xs text-white shadow-2xl inset-shadow-sm transition-all hover:scale-105 active:scale-95"
					>
						<EnvelopeSimple color="white" weight="bold" size={14} class="mr-1 -mb-0.25" />
						<span class="hidden sm:block">Email me</span>
					</button>
				</div>
			</div>
		</nav>
	</div>
</div>

<style>
	.navbar-transition {
		transition:
			background-color 250ms ease-in-out,
			backdrop-filter 250ms ease-in-out,
			border-color 250ms ease-in-out;
	}
</style>
