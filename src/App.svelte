<script lang="ts">
	import Palette from './components/Palette.svelte';
	import Collection from './components/Collection.svelte';
	import Toast from './components/Toast.svelte';

	export let activePalette: any = {
		number: null,
		title: 'Undefined',
		colours: ['#fff', '#fff', '#fff', '#fff']
	};

	export let collection: any[] = [
		{ number: 1, title: 'Black', colours: ['#000', '#515151', '#727272'] },
        { number: 2, title: 'Black', colours: ['#000', '#515151', '#727272', '#fff'] },
        { number: 3, title: 'One', colours: ['#15192f', '#b11e31', '#faf2d1', '#096344'] },
        { number: 4, title: 'Two', colours: ['#fb6c6d', '#1e86ff', '#3b4351', '#ffffff'] },
        { number: 5, title: 'Fantasy', colours: ['#3959a2', '#e8e8e8', '#16181e', '#ffffff'] },
        { number: 6, title: 'Three', colours: ['#4faa84', '#d3ede8', '#3c7168', '#f9f9fa'] },
        { number: 7, title: 'Gradient', colours: ['#0e8ff7', '#32e2f1', '#d8fecd', '#727272'] },
        { number: 8, title: 'Four', colours: ['#7ccfe3', '#aaeae8', '#c3f1f0', '#faf7ed'] },
        { number: 9, title: 'Five', colours: ['#ef8154', '#fcf6f0', '#ffd586', '#f6c15d'] },
        { number: 10, title: 'Six', colours: ['#3c3c42', '#98cf66', '#f5f9e2', '#dfdecb'] },
        { number: 11, title: 'Red Velvet', colours: ['#d12a48', '#ed4c64', '#fbeee8', '#f4d5c4'] },
		{ number: 12, title: 'Sweet', colours: ['#ffd273', '#fee686', '#fec5e6', '#deb5d7'] },
		{ number: 12, title: 'Sweet Alternative', colours: ['#faa999', '#fea111', '#fec532', '#deb666'] },
	]
	
	$: _collection = collection;

	function savePalette(paletteToSave: any) {
		try {
			if (paletteToSave.colours.length !== new Set(paletteToSave.colours).size) {
				globalThis.pushToast('Duplicate colors on palette');
			} else if (collection.filter(palette => palette.colours === paletteToSave.colours).length > 1) {
				globalThis.pushToast('Already exists palette with same title or colours');
			} else {
				if (paletteToSave.number === null) {
					createPalette(paletteToSave);
				} else {
					updatePalette(paletteToSave);
				}
			}
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function createPalette(paletteToCreate) {
		collection = [...collection, paletteToCreate];
		globalThis.pushToast('Create palette succesfully')
	}

	function updatePalette(paletteToUpdate) {
		try {
			for (const palette of collection) {
				if (palette.number === paletteToUpdate.number) {
					palette.colours = paletteToUpdate.colours;
				}
			}

			collection = [...collection];
			globalThis.pushToast('Update palette succesfully');
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function removePalette(paletteToRemove: any) {
		collection = [ ...collection.filter(palette => palette.title !== paletteToRemove.title)];
		globalThis.pushToast('Delete palette succesfully')
	}

</script>

<div class="header">
	<h1>colours</h1>
</div>

<div class="palette">
	<Palette
		palette={ activePalette }
		on:savePalette={ (e) => { savePalette(e.detail) }}
		on:removePalette={ (e) => { removePalette(e.detail) }}
	/>
</div>

<div class="collection">
	<Collection
		collection={ _collection }
		on:editPalette={ e => activePalette = e.detail }
	/>
</div>

<Toast />

<style type="text/scss">
	.header {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
		padding: 0.5em 0;

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 3em;
			font-weight: 100;
		}
	}

	.palette {
		display: flex;
    	justify-content: center;
		padding: 0 1em;
	}

	.collection {
		padding: 0 1em 2em 1em;
		margin-top: 32px;
		margin-bottom: 32px;
	}
</style>