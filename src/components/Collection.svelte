<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { getSinceFromDate } from '../functions/days';

    import type { Palette } from '../clases/palette.class';
    import { EViews } from '../common/general.enum';

    export let collection: Palette[] = [];
	export let activeView: EViews = EViews.generalCollection;

    const dispatch = createEventDispatcher();

    function _getSinceFromDate(date: Date) {
        console.log(getSinceFromDate(date));
        return getSinceFromDate(date);
    }
</script>


<div> { activeView } </div>

<div class="feed">

    {#each collection as palette, i}
    <div class="item" style="animation-delay: { (i + 1) * 40 }ms;">
    
        {#if activeView === EViews.famousCollection}
            <div class="title">
                <span> { palette.title } </span>
            </div>
        {/if}

        <div class="palette" on:click|preventDefault={() => {
                dispatch('editPalette', palette)
            }}>
            {#each palette.colours.reverse() as colour, j}
                <div class="colour c{ 5 - (j + 1) }" style="background: { colour } ;"></div>
            {/each}
        </div>

        <div class="footer">
            <button on:click|preventDefault={() => {
                dispatch('likedPalette', palette)
            }}>
                <i class="fas fa-heart"></i>
                <span class="likes"> { palette.likes } </span>
            </button>

            <span class="since"> { _getSinceFromDate(palette.since) } </span>
        </div>

        <!-- <div class="collection-tags">
            {#each palette.tags as tag, i}
                <span class="tag" style="animation-delay: .{ (i + 1) }s"> { tag } </span>
            {/each}
        </div> -->

    </div>
    {/each}

</div>

<style type="text/scss">
    .feed {
        text-align: center;
        letter-spacing: 1px;
        max-width: 1200px;
        margin: 0 auto;

        .item {
            width: 260px;
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

            .title {
                margin: 4px 0 6px 0;
                color: #899bb4;
                animation-name: fade;
                animation-duration: 0.5s;
                animation-fill-mode: backwards;
            }

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

                    &:hover {
                        cursor: pointer;
                    }

                    .colour-code {
                        border-radius: 12px;
                        font-size: 16px;
                        letter-spacing: 4px;
                        font-weight: 200;
                        font-family: 'Quicksand', sans-serif;
                        text-transform: uppercase;
                        border: 1px solid #727272;
                        color: #dee2e6;
                        text-align: center;
                        background-color: #dee2e6;
                        opacity: 0.5;
                        color: #000;
                        padding: 2px;
                        width: 80%;
                    }

                    &.c1 {
                        padding-bottom: 41%;
                        border-radius: 4px 4px 0 0;
                            animation-duration: 1s;
                    }

                    &.c2 {
                        padding-bottom: 67%;
                        animation-duration: .6s;
                    }

                    &.c3 {
                        padding-bottom: 85%;
                        animation-duration: .2s;
                    }

                    &.c4 {
                        padding-bottom: 100%;
                        border-radius: 20px 20px 4px 4px;
                        animation-duration: 0s;
                    }
                }
            }
        
            .footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8px;

                button {
                    line-height: 35px;
                    padding: 0 12px;
                    display: inline-block;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all .1s;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: #fff;
                    border: 1px solid #e9f2f9;
                    font-size: 14px;
                    position: relative;

                    transition: all .1s;

                    &:hover {
                        cursor: pointer;
                        background-color: #e9f2f9;
                        color: #899bb4;
                        //opacity: 0.8;
                    }

                    i {
                        font-size: 1em;
                        animation-name: heart;
                        animation-duration: .5s;
                        animation-delay: .3s;
                        animation-fill-mode: backwards;
                    }

                    span {
                        margin-left: 4px;
                    }
                }

                .since {
                    margin-right: 8px;
                    font-size: 12px;
                    text-transform: capitalize;
                    color: #899bb4;
                    animation-name: fade;
                    animation-duration: 0.3s;
                    animation-delay: .3s;
                    animation-fill-mode: backwards
                }
            }

            .collection-tags {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                margin-top: 4px;

                .tag {
                    margin-left: 10px;
                    color: #899bb4;

                    animation-name: fade;
                    animation-duration: 0.2s;
                    animation-fill-mode: backwards;

                    &:hover {
                        color: initial;
                        cursor: pointer;
                    }
                }
            }
        }
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

    @keyframes heart {
        0% {
            transform: scale(0)
        }

        50% {
            transform: scale(1.4)
        }
    }

    @keyframes fade {
        0% {
            opacity: 0
        }

        20% {
            opacity: 0.2
        }

        40% {
            opacity: 0.4
        }

        60% {
            opacity: 0.6
        }

        80% {
            opacity: 0.8
        }
    }

    @media screen and (max-width: 1080px) {
        .feed {
            .item {
                width: 240px;
                padding: 10px;
            }
        }
    }

    @media screen and (min-width: 320px) {
        .feed {
            .item {
                width: 220px;
                padding: 10px;
            }
        }
    }

    // @media (min-width: 320px) {
    //     .feed { grid-template-columns: repeat(2, 1fr); }
    // }

    // @media (min-width: 900px) {
    //     .feed { grid-template-columns: repeat(3, 1fr); }
    // }

    // @media (min-width: 1200px) {
    //     .feed { grid-template-columns: repeat(4, 1fr); }
    // }

</style>