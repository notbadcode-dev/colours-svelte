<script lang="ts">
	import type { Palette } from './clases/palette.class';
	import { EViews } from './common/general.enum';

	import CollectionComponent from './components/Collection.svelte';
	import PaletteComponent from './components/Palette.svelte';
	import AboutComponent from './components/About.svelte';

	import ToastComponent from './components/Toast.svelte';

	import { clickOutside } from './functions/clickOutside.js';

	export let activePalette: Palette = {
        id: null, number: 3, title: 'One', colours: ['#15192f', '#b11e31', '#faf2d1', '#096344'], likes: 88, since: new Date('2021-02-18'), tags: ['#red', '#blue', '#green', '#black'] 
	};

	export let activeView: EViews = EViews.generalCollection;

	export let collection: Palette[] = [
        { id: null, number: 2, title: 'Black', colours: ['#000', '#515151', '#727272', '#fff'], likes: 100, since: new Date('2018-02-19'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 3, title: 'One', colours: ['#15192f', '#b11e31', '#faf2d1', '#096344'], likes: 88, since: new Date('2017-02-18'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 4, title: 'Two', colours: ['#fb6c6d', '#1e86ff', '#3b4351', '#ffffff'], likes: 999, since: new Date('2016-01-19'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 5, title: 'Fantasy', colours: ['#3959a2', '#e8e8e8', '#16181e', '#ffffff'], likes:2, since: new Date('2015-05-20'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 6, title: 'Three', colours: ['#4faa84', '#d3ede8', '#3c7168', '#f9f9fa'], likes: 230, since: new Date('2019-02-19'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 7, title: 'Gradient', colours: ['#0e8ff7', '#32e2f1', '#d8fecd', '#727272'], likes: 128, since: new Date('2021-02-01'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 8, title: 'Four', colours: ['#7ccfe3', '#aaeae8', '#c3f1f0', '#faf7ed'], likes: 752, since: new Date('2014-02-15'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 9, title: 'Five', colours: ['#ef8154', '#fcf6f0', '#ffd586', '#f6c15d'], likes: 987, since: new Date('2020-02-19'), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 10, title: 'Six', colours: ['#3c3c42', '#98cf66', '#f5f9e2', '#dfdecb'], likes: 133, since: new Date(), tags: ['#red', '#blue', '#green', '#black'] },
        { id: null, number: 11, title: 'Red Velvet', colours: ['#d12a48', '#ed4c64', '#fbeee8', '#f4d5c4'], likes: 657, since: new Date(),tags: ['#red', '#blue', '#green', '#black'] },
		{ id: null, number: 12, title: 'Sweet', colours: ['#ffd273', '#fee686', '#fec5e6', '#deb5d7'], likes: 444, since: new Date(), tags: ['#red', '#blue', '#green', '#black'] },
		{ id: null, number: 12, title: 'Sweet Alternative', colours: ['#faa999', '#fea111', '#fec532', '#deb666'], likes: 258, since: new Date(), tags: ['#red', '#blue', '#green', '#black'] },
	];

	export let dropdownNavDisplay: boolean = false;
	export let dropdownDisplay: boolean = false;
	
	$: _collection = collection;

	function savePalette(paletteToSave: any): void {
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

	function createPalette(paletteToCreate): void {
		try {
			collection = [...collection, paletteToCreate];
			switchView(EViews.generalCollection);
			globalThis.pushToast('Create palette succesfully');
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function updatePalette(paletteToUpdate): void {
		try {
			for (const palette of collection) {
				if (palette.number === paletteToUpdate.number) {
					palette.colours = paletteToUpdate.colours;
				}
			}

			collection = [...collection];
			globalThis.pushToast('Update palette succesfully');
			switchView(EViews.generalCollection);
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function removePalette(paletteToRemove: any): void {
		try {
			collection = [ ...collection.filter(palette => palette.title !== paletteToRemove.title)];
			switchView(EViews.generalCollection);
			globalThis.pushToast('Delete palette succesfully');
		} catch (error) {
			globalThis.pushToast(error);
		}
	}
	
	function moveToCreatePalette(): void {
		try {
			activePalette = {
				id: null, number: 12, title: 'Sweet', colours: ['#ffd273', '#fee686', '#fec5e6', '#deb5d7'], tags: ['#red', '#blue', '#green', '#black']
			};
			switchView(EViews.createPalette)
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function moveToEditPalette(paletteToEdit): void {
		try {
			activePalette = paletteToEdit;
			switchView(EViews.editPalette);
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function likedPalette(likedPalette): void {
		console.log(likedPalette);
	}

	function switchView(newView: EViews): void {
		if (activeView !== newView) {
			setTimeout(() => {
				activeView = newView;
			}, 200);
		}
		fakeClick();
	}

	function fakeClick() {
		dropdownDisplay = false;
		document.getElementById('fake').click();
	}

</script>

<div class="header">
	<div class="menu">
		<span id="fake" class="title">colours</span>
		<span class="breadcum">
			{#if activeView === EViews.about}
				About
				{:else}
				Collection
				<i class="fas fa-chevron-right arrow"></i>
				<span on:click="{ () => { dropdownNavDisplay = !dropdownNavDisplay; } }">
					{#if activeView === EViews.generalCollection}
					<span> All palettes </span>
					{:else if activeView === EViews.famousCollection}
					<span> Famous palettes </span>
					{:else if activeView === EViews.likesCollection}
					<span> Palettes that you liked! </span>
					{:else if activeView === EViews.createPalette || activeView === EViews.editPalette }
						New Palette
				{/if}
				<i id="toggle" class="fas fa-chevron-down arrow"></i>
				</span>
				<div id="dropdown-nav">
					<div id="dropdown-menu-nav" style="display: { dropdownNavDisplay ? 'block' : 'none' };"
						use:clickOutside on:click_outside={ () => { dropdownNavDisplay = false } }>
						<button
							on:click|preventDefault={() => { moveToCreatePalette() }}
							title="Add new palette"
							disabled={ activeView === EViews.createPalette}>
							New!
						</button>
						<button
							on:click|preventDefault={() => { switchView(EViews.generalCollection) }}
							title="View all palettes"
							disabled={ activeView === EViews.generalCollection }>All palettes</button>
						<button
							on:click|preventDefault={() => { switchView(EViews.famousCollection) }}
							title="View famous palettes"
							disabled={ activeView === EViews.famousCollection }>Famous palettes
						</button>
						<button
							on:click|preventDefault={() => { switchView(EViews.likesCollection) }}
							title="View You liked palettes"
							disabled={ activeView === EViews.likesCollection }>Palettes that you liked!
						</button>
					</div>
				</div>
			{/if}
		</span>

		<div id="dropdown">
			<span id="points" on:click="{ () => { dropdownDisplay = !dropdownDisplay } }" >...</span>
			<div id="dropdown-menu" style="display: { dropdownDisplay ? 'block' : 'none' };"
				use:clickOutside on:click_outside={ () => { dropdownDisplay = false } }>
				<button
					on:click|preventDefault={() => { switchView(EViews.generalCollection) }}
					title="View collections"
					disabled={ activeView === EViews.generalCollection }>Collections
				</button>
				<div class="separator"></div>
				<button
					on:click|preventDefault={() => { switchView(EViews.about) }}
					title="About"
					disabled={ activeView === EViews.about }>About
				</button>
			</div>
		</div>
	</div>
</div>

<div class="content">
	{#if activeView === EViews.about}
		<AboutComponent />

		{:else if activeView === EViews.createPalette || activeView === EViews.editPalette}
			<PaletteComponent
				palette={ activePalette }
				activeView={  activeView }
				on:updatePalette={ (e) => { updatePalette(e.detail) }}
				on:savePalette={ (e) => { savePalette(e.detail) }}
				on:removePalette={ (e) => { removePalette(e.detail) }}
			/>

		{:else if activeView === EViews.generalCollection}
			<CollectionComponent
				collection={ _collection }
				activeView={  activeView }
				on:likedPalette={e => likedPalette(e.detail)}
				on:editPalette={ e => moveToEditPalette(e.detail) }
			/>

		{:else if activeView === EViews.famousCollection}
			<CollectionComponent
				collection={ _collection }
				activeView={  activeView }
				on:likedPalette={e => likedPalette(e.detail)}
				on:editPalette={ e => moveToEditPalette(e.detail) }
			/>
	
		{:else if activeView === EViews.likesCollection}
			<CollectionComponent
				collection={ _collection }
				activeView={  activeView }
				on:likedPalette={e => likedPalette(e.detail)}
				on:editPalette={ e => moveToEditPalette(e.detail) }
			/>

	{/if}

</div>

<ToastComponent />

<style type="text/scss">
	.header {
		position: fixed;
		top: 0;
		display: block;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #fff;
		box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
		z-index: 2;

		.menu {
			position: relative;
			max-width: 1640px;
    		margin: 0 auto;

			span {
				&.title {
					margin: 0 16px;
					color: #ff3e00;
					text-transform: uppercase;
					font-size: 20px;
					font-weight: 400;
				}

				&.breadcum {
					position: relative;
					bottom: .5px;
					margin-left: 8px;
					color: #899bb4;
					font-size: 14px;
					font-weight: 400;
					text-align: center;

					#dropdown-nav {
						position: absolute;
						top: -30px;
    					right: -128px;
						padding: 0 10px;

						#dropdown-menu-nav {
							position: absolute;
							display: none;
							right: 0;
							top: 62px;
							width: 240px;
							min-width: 128px;
							background-color: #fff;
							border-top: 1px solid #e9f2f9;
							border-radius: 0 0 4px 4px;
							box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
							transition: box-shadow .3s;
							font-size: 14px;
							margin-right: 12px;
							animation-name: drop;
							animation-duration: .2s;
							transform-origin: top;
							z-index: 100;
							overflow: hidden;

							button {
								position: relative;
								display: block;
								width: 100%;
								margin: 0;
								line-height: 36px;
								padding: 0 80px 0 20px;
								color: #000;
								background-color: #fff;
								border: none;
								border-radius: 0;
								text-align: left;
								text-decoration: none;
								cursor: default;

								&:hover {
									color: #a9bdd3;
									background-color: #f5fcff;
								}

								&:disabled {
									color: #ccc;
								}
							}

							.separator {
								height: 1px;
								background-color: #e9f2f9;
							}
						}
					}


					i {
						&.arrow {
							margin: 0 8px;
							font-size: 10px;
						}
					}
				}
			}

			#dropdown {
				position: absolute;
				top: -12px;
				right: 0;
				padding: 0 10px;
				cursor: default;

				#points {
					color: #bccddf;
    				font-size: 40px;
				}

				#dropdown-menu {
					position: absolute;
					right: 0;
					top: 62px;
					overflow: hidden;
					display: none;
					min-width: 128px;
					margin-right: 12px;
					background-color: #fff;
					border-top: 1px solid #e9f2f9;
					box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
    				transition: box-shadow .3s;
					border-radius: 0 0 4px 4px;
					font-size: 14px;
					z-index: 100;
					animation-name: drop;
					animation-duration: .2s;
					transform-origin: top;

					 button {
						position: relative;
						display: block;
						width: 100%;
						padding: 0 80px 0 20px;
						margin: 0;
						line-height: 36px;
						color: #000;
						background-color: #fff;
						border: none;
						border-radius: 0;
						text-align: left;
						text-decoration: none;

						&:hover {
							color: #a9bdd3;
							background-color: #f5fcff;
						}

						&:disabled {
							color: #ccc;
						}
					}

					.separator {
						height: 1px;
						background-color: #e9f2f9;
					}
				}
			}
		}
	}

	.content {
		margin: 64px 0 32px 0;
	}

	@keyframes drop {
    0% {
        transform: scaleY(.5);
        opacity: 0
    }
}

	@media screen and (max-width: 1360px) {
		.header {
			.menu {
				max-width: 1080px;
			}
		}
	}

	@media screen and (max-width: 1640px) {
		.header {
			.menu {
				max-width: 1360px;
			}
		}
	}

	@media only screen and (max-width: 780px) {
		.header {
			.menu {
				span {
					&.title {
						font-size: 16px;
					}

					&.breadcum {
						position: relative;
						bottom: 1px;
						font-size: 12px;

							i {
								&.arrow {
									position: relative;
									bottom: 1px;
									font-size: 6px;
								}
							}
						}
					}
			}
		}
	}

	@media screen and (min-width: 320px) {
		.header {
			.menu {
				span {
					&.title {
						margin: 0 8px;
						font-size: 12px;
					}

					&.breadcum {
						position: relative;
						bottom: 1px;
						margin-left: 2px;
						font-size: 12px;

						#dropdown-nav {
							position: absolute;
							top: -30px;
							right: -64px;
							padding: 0 10px;

							#dropdown-menu-nav {
								button {
									font-size: 12px;	
								}
							}
						}		

						i {
							&.arrow {
								font-size: 6px;
								position: relative;
								bottom: 1px;
								margin: 0 2px;
							}
						}
					}
				}


				#dropdown {
					#dropdown-menu {
						button {
							font-size: 12px;
						}
					}
				}
			}
		}
    }

</style>