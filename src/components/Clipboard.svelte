<script>
	import { onMount } from 'svelte';

	export let clipboard;

	let textarea;
	
	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={clipboard} bind:this={textarea}></textarea>