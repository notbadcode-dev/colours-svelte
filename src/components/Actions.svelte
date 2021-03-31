<script>
    import { createEventDispatcher } from 'svelte';

    import TooltipComponent from './Tooltip.svelte';

    export let faIcon = '';
    export let title = '';
    export let tooltip = ''
    export let action = '';

    const dispatch = createEventDispatcher();
</script>

<div class="btn-container">
    <TooltipComponent tip={ tooltip } bottom
        beforeWidth=120
        beforeBottom=36
        afterBottom=36>
        <div class="tooltip" on:click|preventDefault={() => { document.getElementById(title + faIcon).click() }}></div>
    </TooltipComponent>

    <button id="{ title + faIcon }" on:click|preventDefault={() => { dispatch('executeAction', action) }}  >
        <i class=" { faIcon } "></i>
        <span> { title } </span>
    </button>
</div>

<style type="text/scss">

    .btn-container {
        display: contents;
        .tooltip {
            position: absolute;
            width: 16.6%;
            height: 56px;
            cursor: pointer;
        }

        button {
            width: 100%;
        }
    }

    button {
        border-radius: 12px;
        border: none;
        padding: 14px 20px 14px 20px;
        color: #899bb4;
		background-color: #fff;
        cursor: pointer;
        font-size: 1.5em;
        width: 100%;

        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);

        span {
            margin-left: 8px;
        }

        &:hover {
            color: #a9bdd3;
			background-color: #f5fcff;
        }
    }

    @media (max-width: 600px) {
        button {
            padding: 12px 16px 12px 16px;
            font-size: 1.2em;
        }
    }

    @media (hover: hover) {
		button:hover {
            color: #a9bdd3;
			background-color: #f5fcff;
		}
	}
</style>