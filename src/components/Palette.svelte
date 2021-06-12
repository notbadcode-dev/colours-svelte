<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

    import Actions from '../components/Actions.svelte';
    import Clipboard from '../components/Clipboard.svelte';
    import ToastComponent from './Toast.svelte';
    import TooltipComponent from './Tooltip.svelte';

    import { EViews } from '../common/general.enum';
    import type { Palette } from '../clases/palette.class';

    export let palette: Palette = {
			_id: null, colours: []
	};
    export let activeView: EViews = EViews.viewPalette;
    const dispatch = createEventDispatcher();

    const changeColor = (e) => {
        let id: number = e.target.id.toString().charAt(e.target.id.toString().length - 1);
        palette.colours[id] = e.target.value;
    };

    function selectedColor(indexColor: number) {
        document.getElementById('colorpicker' + indexColor).click();
    }

	function copy(colourCode) {
        let clipboard = colourCode.toUpperCase();
		const app = new Clipboard({
			target: document.getElementById('clipboard'),
			props: { clipboard },
		});
		app.$destroy();
        globalThis.pushSuccessToast('Copy colour on clipboard');
	}

    function generateRanndomColours(numberColours: number): string[] {
        if (numberColours <= 0) {
            return [];
        } else {
            if (numberColours > 1) {
                const colours: string[] = [];
                for (let index = 0; index < numberColours; index++) {
                    colours.push(`#${Math.floor(Math.random()*16777215).toString(16).trim()}`);
                }
                return colours;
            }
        }
    }

    function getBottomTooltip(index: number): number {
        switch (index) {
            case 0:
                return 14;
            case 1:
                return 24;
            case 2:
                return 38;
            case 3:
                return  94;    
            default:
                return 100;
                break;
        }
    }

    onMount(async () => {
        if (activeView === EViews.createPalette) {
            palette['colours'] = generateRanndomColours(4);
        }
    })
 
</script>

<div class="main">

    <h1>
        {#if activeView === EViews.viewPalette}
            Detail Palette
            {:else if activeView === EViews.createPalette}
            Add palette to collection
            {:else if activeView === EViews.editPalette}
            Edit Palette
        {/if}
    </h1>

    <div class="item" style="animation-delay: 40ms;">

        <div class="palette">
            {#if palette}
                {#each palette.colours as colour, i}
                <div class="colour c{ 5 - (i + 1) }" style="background: { colour } ;">
                    
                    <TooltipComponent
                        tip="Switch color"
                        beforeBottom={ getBottomTooltip(i) }
                        afterBottom={ getBottomTooltip(i) }
                        afterLeft=7>
                        <input type="color" id="{ 'colorpicker' + i }" 
                            on:input|preventDefault="{ changeColor }">
                    </TooltipComponent>

                    <div class="colorpicker">
                        <button on:click|preventDefault="{() => { selectedColor(i) }}" title="Switch colour">
                            <i class="fas fa-palette"></i>
                        </button>
                    </div>

                    <TooltipComponent
                        tip="Copy color on clipboard"
                        beforeBottom={ getBottomTooltip(i) }
                        afterBottom={ getBottomTooltip(i) }
                        afterLeft=32>
                        <div class="colour-code" role="button" on:click|preventDefault="{() => { copy(colour) }}"> { colour }  </div>
                    </TooltipComponent>

                </div>
                {/each}
            {/if}
        </div>
    
    </div>

    <div class="actions">
        {#if activeView === EViews.createPalette}
            <Actions
                title='Add'
                tooltip='Add palette to colecction'
                faIcon={ 'fas fa-plus-circle' }
                action=" { 'add' } "
                on:executeAction={ (e) => dispatch('addPalette', palette) }
            />
            {:else if activeView === EViews.editPalette}
            <Actions
                title={ 'Update' }
                tooltip='Update palette'
                faIcon={ 'fas fa-save' }
                action=" { 'restore' } "
                on:executeAction={ (e) => dispatch('updatePalette', palette) }
            />
        {/if}
    </div>

    <div id="clipboard" hidden></div>

    <ToastComponent />

</div>

<style type="text/scss">
    .main {
        text-align: center;
        letter-spacing: 1px;
        max-width: 1200px;
        margin: 0 auto;
        display: list-item;
        list-style: none;

        h1 {
            color: #899bb4;
			font-size: 32px;
            font-weight: 200;
            text-align: center;
            animation-name: main-title;
            animation-duration: .8s;
            transform-origin: top 
        }

        .item {
            width: 320px;
            height: 360px;
            margin: 8px;
            border-radius: 6px;
            padding: 15px;
            box-sizing: border-box;
            position: relative;
            animation-name: item;
            animation-duration: .4s;
            display: inline-block;
            text-align: left;

            animation-name: item;
            animation-duration: .4s;
            animation-fill-mode: backwards;

            box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);

            .palette {
                max-width: 100%;
                padding-bottom: 100%;
                border-radius: 6px;
                position: relative;
                display: block;

                .colour {
                    position: absolute;
                    width: 100%;
                    border-radius: 20px 20px 0 0;
                    display: flex;
                    justify-content: center;

                    animation-name: colour;
                    transform-origin: top;

                    // TooltipComponent {
                    //     left: 300px;
                    // }

                    input[type=color] {
                        position: relative;
                        right: 62px;
                        width: 20px;
                        height: 23px;
                        opacity: 0;
                    }

                    .colorpicker > button {
                        position: relative;
                        right: 86px;
                        border: 1px solid #dee2e6;
                        border-radius: 100%;
                        padding: 2px 6px 4px 6px;
                        background-color: #fff;
                        color: #000;
                        opacity: 0.8;


                        i {
                            font-size: 0.8em;
                        }

                        &:hover {
                            color: #a9bdd3;
                            background-color: #f5fcff;
                            cursor: pointer;
                        }
                    }

                    .colour-code {
                        position: relative;
                        right: 80px;
                        border-radius: 12px;
                        font-size: 1em;
                        font-weight: 300;
                        font-family: 'Quicksand', sans-serif;
                        text-transform: uppercase;
                        background-color: #fff;
                        color: #000;
                        min-width: 96px;
                        max-height: 22px;
                        text-align: center;
                        opacity: 0.5;
                        cursor: pointer;
                    }

                    &.c1 {
                        padding-bottom: 30%;
                        border-radius: 4px 4px 0 0;
                        animation-duration: 1s;

                        input[type=color] {
                            top: 8px;
                        } 

                        .colorpicker > button {
                            top: 7px;
                        }

                        .colour-code {
                            top: 8px;
                        }
                    }

                    &.c2 {
                        padding-bottom: 58%;
                        animation-duration: .6s;

                        input[type=color] {
                            top: 128px;
                        } 

                        .colorpicker > button {
                            top: 126px;
                        }

                        .colour-code {
                            top: 127px;
                        }
                    }

                    &.c3 {
                        padding-bottom: 82%;
                        animation-duration: .2s;

                        input[type=color] {
                            top: 210px;
                        } 

                        .colorpicker > button {
                            top: 208px;
                        }

                        .colour-code {
                            top: 209px;
                        }
                    }

                    &.c4 {
                        padding-bottom: 100%;
                        border-radius: 20px 20px 4px 4px;
                        animation-duration: 0s;

                        input[type=color] {
                            top: 278px;
                        } 

                        .colorpicker > button {
                            top: 278px;
                        }

                        .colour-code {
                            top: 279px;
                        }
                    }
                }
            }
        }

        .actions {
            display: flex;
            justify-content:  space-around;
            margin: 0 auto;
            margin-top: 24px;
            width: 320px;
        }
    }

    @media (hover: hover) {
        .main {
            .item {
                .palette {
                    .colour {
                        .color-picker {
                            button:hover {
                                color: #a9bdd3;
                                background-color: #f5fcff;
                            }
                        }

                        .colour-code:hover {
                            color: #a9bdd3;
                            background-color: #f5fcff;
                        }
                    }
                }
            }
        }
	}

    @keyframes main-title {
        0% { opacity: 0; }
        25% { opacity: .25; }
        50% { opacity: .5; }
        75% { opacity: .75; }
        100% { opacity: 1; }
    }

    @keyframes item {
        0% {
            opacity: 0;
            transform: translateY(10px)
        }
    }

    @keyframes colour {
        0% {
            transform: scaleY(1.22);
            filter: brightness(320%);
            filter: hue-rotate(52deg)
        }
    }

</style>