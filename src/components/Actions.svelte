<script>
    import { createEventDispatcher } from 'svelte';

    export let faIcon = '';
    export let title = '';
    export let action = '';

    const dispatch = createEventDispatcher();
</script>

<button title=" { title } " on:click|preventDefault={() => {
    dispatch('executeAction', action)
}}  >
    <i class=" { faIcon } "></i>
    <span> { title } </span>
</button>

<style type="text/scss">
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
		    cursor: pointer;
        }
    }

    @media (max-width: 600px) {
        button {
            padding: 12px 16px 12px 16px;
            font-size: 1.2em;
        }
    }
</style>