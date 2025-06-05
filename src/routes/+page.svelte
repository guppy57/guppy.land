<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Container from "$lib/components/Container.svelte";
</script>

<Navbar activeLink="about" />
<Container>
  <h1 class="text-3xl mt-20">Welcome to SvelteKit</h1>
  <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
  <button class="px-10 py-4 rounded-2xl bg-[#FF7C00] shadow-2xl">
    Click me
  </button>
</Container>

