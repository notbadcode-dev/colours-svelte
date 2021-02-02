<script>
    import { createEventDispatcher } from 'svelte';

    export let faIcon = '';
    export let title = '';
    export let action = '';

    const dispatch = createEventDispatcher();
</script>

<button title=" { title } " on:click|preventDefault={() => {
    dispatch('executeAction', action)
}}>
    <i class=" { faIcon } "></i>
</button>

<style>
    button {
        border: 1px solid #fbfcfc;
        border-radius: 12px;
        padding: 14px 20px 14px 20px;
        background-color: #c5cdd6;
        opacity: 0.6;
        color: #000;
        cursor: pointer;
        font-size: 1.5em;
    }

    @media (max-width: 600px) {
        button {
            padding: 12px 16px 12px 16px;
            font-size: 1.2em;
        }
    }
</style>