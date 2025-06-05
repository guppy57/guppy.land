<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Container from "$lib/components/Container.svelte";
  import buttonBg from "$lib/assets/button-bg.png";
</script>

<Navbar activeLink="about" />
<Container>
  <h1 class="font-advercase text-3xl mt-20">
    <span>Hi, my name is Armaan but I go by Guppy.</span> Software engineer and designer based in Ames, IA. Currently helping with data pipelines at John Deere, studying Ancient Western Philosophy, and building out GitBar for Macintosh.
  </h1>
  <button 
    class="text-white font-medium py-2 px-6 text-lg rounded-md mt-6 cursor-pointer transition-all hover:scale-105 active:scale-95"
    style="
      background-color: #FF7C00;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25), 0 -3px 6px -2px inset rgba(0, 0, 0, 0.67);
    "
    onclick={() => window.location.href='mailto:armaan@guppy.im'}
  >
    Drop a line
  </button>
</Container>
