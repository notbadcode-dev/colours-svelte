<script lang="ts">
	import { onMount } from 'svelte';

	import CollectionComponent from './components/Collection.svelte';
	import PaletteComponent from './components/Palette.svelte';
	import AboutComponent from './components/About.svelte';

	import ToastComponent from './components/Toast.svelte';
	import TooltipComponent from './components/Tooltip.svelte';

	import { clickOutside } from './functions/clickOutside.js';

	import * as appAuthService from './services/app-auth.http.service';
	import * as localStorageService from './services/localStorage.service';
	import * as paletteService from './services/pallete.http.service'

	import type { Palette } from './clases/palette.class';
	import { EViews } from './common/general.enum';
	import type { Response } from './clases/reponse.class';
	
	export let activePalette: Palette = null;
	export let activeView: EViews = EViews.generalCollection;

	export let collection: Palette[] = [];

	export let dropdownNavDisplay: boolean = false;
	export let dropdownDisplay: boolean = false;
	
	$: _collection = collection;
	$:_reloadCollection = false;

    onMount(async () => {
		if (localStorageService.getWithExpiry('token') === null) {
			const res = await appAuthService.getToken();
			localStorageService.setWithExpiry('token', res.token, 86400);
		}
    })

	function addPalette(paletteToSave: any): void {
		try {
			if (paletteToSave.colours.length !== new Set(paletteToSave.colours).size) {
				globalThis.pushToast('Duplicate colors on palette');
			} else if (collection.filter(palette => palette.colours === paletteToSave.colours).length > 1) {
				globalThis.pushToast('Already exists palette with same title or colours');
			} else {
				if (paletteToSave._id === null) {
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
			paletteService.createPalette(paletteToCreate).then((response: Response) => {
				if (response.data) {
					collection = [...collection, paletteToCreate];
					switchView(EViews.generalCollection);
					

					globalThis.pushToast(response.messages[1]);
				}
			});
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function updatePalette(paletteToUpdate: Palette): void {
		try {
			for (const palette of collection) {
				if (palette._id === paletteToUpdate._id) {
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
				_id: null,
				colours: ['#fff', '#fff', '#fff', '#fff']
			}
			switchView(EViews.createPalette)
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function moveToDetailPalette(paletteToDetail): void {
		try {
			activePalette = paletteToDetail;
			switchView(EViews.viewPalette);
		} catch (error) {
			globalThis.pushToast(error);
		}
	}

	function reloadCollection() {
		_reloadCollection = true;
		setTimeout(() => {
			_reloadCollection = false;
		}, 300);
	}

	function switchView(newView: EViews): void {
		if (activeView !== newView) {
			setTimeout(() => {
				activeView = newView;
			}, 300);
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

		{:else if activeView === EViews.createPalette || activeView === EViews.editPalette || activeView === EViews.viewPalette}
			<PaletteComponent
				activeView={  activeView }
				palette={activePalette}
				on:updatePalette={ (e) => { updatePalette(e.detail) }}
				on:addPalette={ (e) => { addPalette(e.detail) }}
				on:removePalette={ (e) => { removePalette(e.detail) }}
			/>

		{:else if activeView === EViews.generalCollection && !_reloadCollection}
			<CollectionComponent
				activeView={  activeView }
				on:detailPalette={ e => moveToDetailPalette(e.detail) }
			/>

		{:else if activeView === EViews.famousCollection && !_reloadCollection}
			<CollectionComponent
				activeView={  activeView }
				on:detailPalette={ e => moveToDetailPalette(e.detail) }
			/>
	
		{:else if activeView === EViews.likesCollection && !_reloadCollection}
			<CollectionComponent
				activeView={  activeView }
				on:detailPalette={ e => moveToDetailPalette(e.detail) }
			/>

	{/if}

</div>

<div class="float">
	<TooltipComponent tip="Reload collections"
		hidden={ activeView !== EViews.generalCollection && activeView !== EViews.famousCollection && activeView !== EViews.likesCollection }>
		<button class="btn-float"
			on:click|preventDefault={() => { reloadCollection() }}
			disabled='{ activeView !== EViews.generalCollection && activeView !== EViews.famousCollection && activeView !== EViews.likesCollection }'>
			<i class="fas fa-sync"></i>
		</button>
	</TooltipComponent>
	<TooltipComponent tip="Add new palette" left
		hidden={ activeView === EViews.createPalette || activeView === EViews.about }>
		<button class="btn-float"
			on:click|preventDefault={() => { moveToCreatePalette() }}
			disabled='{ activeView === EViews.createPalette || activeView === EViews.about }'>
			<i class="fas fa-plus"></i>
		</button>
	</TooltipComponent>
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

	.float{
		position:fixed;
		bottom: 30px;
		right: 30px;
		display: inline-grid;

		.btn-float {
			width: 60px;
			height: 60px;
			color: #ff3e00;
			background-color: #fff;
			border-radius: 50px;
			border-color: rgba(0, 64, 128, 0.2);
			text-align: center;
			box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
			cursor: pointer;

			&:not(:last-child) {
				margin-bottom: 32px;
			}


			&:disabled {
				opacity: 0.3;
				color: #899bb4;
				cursor: initial;
			}
		}
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
						font-size: 20px;
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

	@media (hover: hover) {
		.float {
			.btn-float:not(:disabled) {
				&:hover {
					color: #a9bdd3;
					background-color: #f5fcff;
				}
			}
		}
	}

</style>