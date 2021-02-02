<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	import Actions from '../components/Actions.svelte';

    export let palette: any = {};
    export let title: string = '';

    const dispatch = createEventDispatcher();

    const changeColor = (e) => {
        let id: number = e.target.id.toString().charAt(e.target.id.toString().length - 1);
        palette.colours[id] = e.target.value;
    };

    function selectedColor(indexColor: number) {
        document.getElementById('colorpicker' + indexColor).click();
    }
 
</script>

<div class="main">

    <div class="palette">
        <h1 class="title">{ palette.title }</h1>
    
        <div class="colours ">
            {#each palette.colours as colour, i}
            <div class="colour { palette.colours.length > 3 ? 'col-3' : 'col-4' } " style="background: { colour } ;">
                <input type="color" id="{ 'colorpicker' + i }" 
                    on:input|preventDefault="{ changeColor }">
                <div class="colorpicker">
                    <button on:click|preventDefault="{() => { selectedColor(i) }}">
                        <i class="fas fa-palette"></i>
                    </button>
                </div>
                <div class="code"> { colour }  </div>
            </div>
            {/each}
        </div>
    </div>

    <div class="actions">
        <Actions
            title={ 'Restore' }
            faIcon={ 'fas fa-sync' }
            action=" { 'restore' } "
            on:executeAction={ (e) => dispatch('removePalette', palette) }
        />

        <Actions
            title={ 'Save' }
            faIcon={ 'fas fa-save' }
            action=" { 'save' } "
            on:executeAction={ (e) => dispatch('savePalette', palette) }
        />

        <Actions
            title={ 'Remove' }
            faIcon={ 'fas fa-trash-alt' }
            action=" { 'remove' } "
            on:executeAction={ (e) => dispatch('removePalette', palette) }
        />
    </div>

</div>

<style type="text/scss">
    .main {
        display: grid;
        grid-gap: 2em;
        grid-column-gap: 1em;
        grid-template-columns: 20.4em 2em;

        .palette {
            border: 1px solid #dee2e6;
            border-radius: 12px;
            height: 100%;
            min-height: 15.8em;
            background: #fff;

            .title {
                font-size: 1em;
                margin: 0.8em;
            }

            .colours {
                border: 1px solid #dee2e6;
                border-radius: 12px;
                min-height: 12.5em;
                margin: 0 0.4em;
                min-width: 26em;

                > *:first-child {
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                }

                > *:last-child {
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }

                .colour {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    float: left;
                    min-height: 12.5em;
                    width: 25%;

                    &.col-4 {
                        width: 33.33%;
                    }

                    input[type=color] {
                        position: relative;
                        bottom: 7em;
                        left: 4.4em;
                        opacity: 0;
                    }


                    .colorpicker > button {
                        position: relative;
                        bottom: 7.4em;
                        left: 2.5em;
                        margin: 0.4em 0.4em;
                        border: 1px solid #dee2e6;
                        border-radius: 100%;
                        padding: 2px 6px 4px 6px;
                        background-color: #dee2e6;
                        opacity: 0.6;
                        color: #000;
                        cursor: pointer;

                        i {
                            font-size: 0.8em;
                        }
                    }

                    .code {
                        position: relative;
                        left: -1.8em;
                        transform: rotate(-90deg);
                        border-radius: 12px;
                        font-size: 1em;
                        font-weight: 200;
                        font-family: 'Quicksand', sans-serif;
                        text-transform: uppercase;
                        border: 1px solid #727272;
                        color: #dee2e6;
                        min-width: 96px;
                        text-align: center;
                        background-color: #dee2e6;
                        opacity: 0.5;
                        color: #000;
                        margin-bottom: 3.6em;
                    }
                }
            }
        }

        .actions {
            display: grid;
            align-content: space-between;
            justify-content: flex-start;
        }
    }

    @media (min-width: 320px) {
        .main {
            .palette > .colours {
                width: 19.4em;
                min-width: 19.4em;
            }
        }
    }

    @media (max-width: 600px) {
        .main {
            display: table;

            .actions {
                margin-top: .5em;
                padding: 0 .3em;
                display: grid;
                grid-column-gap: 1em;
                grid-template-columns: repeat(3, minmax(48px, 1fr));
            }
        }
    }

</style>