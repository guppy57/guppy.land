<script>
  import { onMount } from 'svelte';
  import { HandWaving, EnvelopeSimple, GithubLogo, XLogo, Hammer, Scroll } from "phosphor-svelte";
  
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
  <div class="fixed w-full top-0 right-0 z-[43]">
    <nav class="navbar-transition flex w-[100%] items-center justify-between px-4 py-1 {colorChange ? 'backdrop-blur-sm bg-[#fdf6e3]/75 border-b border-black/6' : 'bg-transparent border-b border-transparent'}">
      <a href="/" class="motion-safe:hover:scale-105 motion-safe:active:scale-92 transition-transform duration-75">
        <div class="flex items-center">
          <div class="mr-4 block h-auto w-4">
            <svg class="w-full h-auto" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="6" />
            </svg>
          </div>
          <div class="hidden h-auto w-32 xl:block">
            <svg class="w-full h-auto" viewBox="0 0 128 32" fill="currentColor">
              <text x="0" y="24" font-family="Arial, sans-serif" font-size="16" font-weight="bold">DocuVet</text>
            </svg>
          </div>
        </div>
      </a>
      <div class="nav-width">
        <div>
          <div class="flex items-baseline justify-start space-x-4">
            <div class="motion-safe:hover:scale-97 motion-safe:active:scale-92 transition-transform duration-100">
              <a href="/" class="flex items-center space-x-1 {activeLink === 'about' ? '' : 'opacity-[50%]'}">
                <HandWaving color="black" weight="bold" size="{17}" />
                <p class="hidden text-sm sm:block {activeLink === 'about' ? 'font-bold' : 'font-medium'}">About</p>
              </a>
            </div>
            <div class="motion-safe:hover:scale-97 motion-safe:active:scale-92 transition-transform duration-100">
              <a href="/projects" class="flex items-center space-x-1 {activeLink === 'projects' ? '' : 'opacity-[50%]'}">
                <Hammer color="black" weight="bold" size="{17}" />
                <p class="hidden text-sm sm:block {activeLink === 'projects' ? 'font-bold' : 'font-medium'}">Projects</p>
              </a>
            </div>
            <div class="motion-safe:hover:scale-97 motion-safe:active:scale-92 transition-transform duration-100">
              <a href="/blog" class="flex items-center space-x-1 {activeLink === 'blog' ? '' : 'opacity-[50%]'}">
                <Scroll color="black" weight="bold" size="{17}" />
                <p class="hidden text-sm sm:block {activeLink === 'blog' ? 'font-bold' : 'font-medium'}">Blog</p>
              </a>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-4">
          <a href="https://github.com/guppy57">
            <GithubLogo color="grey" weight="bold" size="{20}" />
          </a>
          <a href="https://x.com/itsguppy57"> 
            <XLogo color="grey" weight="bold" size="{20}" />
          </a>
          <button class="text-xs h-6 rounded-full flex items-center justify-center px-3 py-1 bg-blue-800 hover:bg-blue-900 text-white transition-colors motion-safe:hover:scale-105 motion-safe:active:scale-95">
            <EnvelopeSimple color="white" weight="bold" size="{14}" class="mr-1 -mb-0.25" />
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