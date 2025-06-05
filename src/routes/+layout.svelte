<script lang="ts">
	import '../app.css';
  import GuppyBadge from '$lib/components/GuppyBadge.svelte';
	
	let { children } = $props();
</script>

{@render children()}
<GuppyBadge />