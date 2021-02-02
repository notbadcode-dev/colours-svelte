<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let collection: any[] = [];

    const dispatch = createEventDispatcher();
</script>

<div class="palettes">

    {#each collection as palette}
    <div class="palette">
    
        <div class="colours">
            {#each palette.colours as colour}
                <div class="colour { palette.colours.length > 3 ? 'col-3' : 'col-4' } " style="background: { colour } ;"></div>
            {/each}
        </div>

        <div class="footer">
            <h1 class="title">{ palette.title }</h1>
            <button on:click|preventDefault={() => {
                dispatch('editPalette', palette)
            }}>
                <i class="fas fa-pen"></i>
            </button>
        </div>

    </div>
    {/each}

</div>

<style type="text/scss">

    .palettes {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-gap: 2em;
        grid-column-gap: 1em;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

        .palette {
            border: 1px solid #dee2e6;
            border-radius: 12px;
            background: #fff;

            .colours {
                border: 1px solid #dee2e6;
                border-radius: 12px;
                min-height: 5.6em;

                > *:first-child {
                    border-top-left-radius: 12px;
                    border-bottom-left-radius: 12px;
                }

                > *:last-child {
                    border-top-right-radius: 12px;
                    border-bottom-right-radius: 12px;
                }

                .colour {
                    float: left;
                    min-height: 5.6em;
                    width: 25%;

                    &.col-4 {
                        width: 33.33%;
                    }
                }
            }

            .footer {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                .title {
                    font-size: 1em;
                    margin: 0.8em;
                }

                button {
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
            }
        }
    }

    @media (min-width: 600px) {
        .palettes { grid-template-columns: repeat(2, 1fr); }
    }

    @media (min-width: 900px) {
        .palettes { grid-template-columns: repeat(3, 1fr); }
    }

    @media (min-width: 1200px) {
        .palettes { grid-template-columns: repeat(4, 1fr); }
    }

</style>