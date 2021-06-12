<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	import { ToastTypeClass } from '../common/general.enum';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

	let toasts = [];
	let retainMs = 7200;

	let toastId = 0;
	const pushToast = (msg: string, typeClass?: ToastTypeClass) => {
		toasts = [...toasts, {
			_id : ++toastId,
			class: typeClass !== undefined ? typeClass : ToastTypeClass.default,
			message: msg
		}];
		setTimeout(() => {
			unshiftToast();
		}, retainMs);
	};

	function pushInfoToast(msg: string): void {
		this.pushToast(msg, ToastTypeClass.info);
	}

	function pushSuccessToast(msg: string): void {
		this.pushToast(msg, ToastTypeClass.success);
	}

	function pushWarningToast(msg: string): void {
		this.pushToast(msg, ToastTypeClass.warning);
	}

	function pushErrorToast(msg: string): void {
		this.pushToast(msg, ToastTypeClass.error);
	}

	function pushCriticalToast(msg: string): void {
		this.pushToast(msg, ToastTypeClass.critical);
	}

	function removeToast(toast) {
		toasts = toasts.filter(remove => remove._id !== toast._id)
	}

	const unshiftToast = () => {
		toasts = toasts.filter((a, i) => i > 0);
	};

	onMount(() => {
		window['pushToast'] = pushToast;
		window['pushInfoToast'] = pushInfoToast;
		window['pushSuccessToast'] = pushSuccessToast;
		window['pushWarningToast'] = pushWarningToast;
		window['pushErrorToast'] = pushErrorToast;
		window['pushCriticalToast'] = pushCriticalToast;
	});
</script>

<div class="toast-wrapper">
	{#each toasts as toast (toast._id)}
	<div class="toast-item { toast.class }" in:fly="{{ delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut }}" out:fade={{ duration:500 }}>
		<span>{ toast.message }</span>
		<i class="fas fa-times close" on:click|preventDefault={() => { removeToast(toast) }}></i>
	</div>
	{/each}
</div>

<style type="text/scss">
	.toast-wrapper {
		position: fixed;
		left: 0;
		right: 0;
        bottom: 0;
        margin: 0 1em;
		text-align: center;
        z-index: 9999;

        .toast-item {
            border-radius: 6px;
            padding: 12px 10px;
            margin: 10px auto;
            max-width: 400px;

			display: flex;
    		justify-content: space-between;
    		align-items: center;	

			&:not(.info),
			&:not(.success),
			&:not(.warning),
			&:not(.error),
			&:not(.critical) {
				background: rgba(0, 0, 0, 0.7);
            	color: #fff;
			}

			&.info {
				// Light #33b5e5
				// Dark #0099CC
				border: 1px solid rgba(51, 181, 229, 0.9);
				background: rgba(51, 181, 229, 0.7);
            	// color: #0099CC;
			}

			&.success {
				// Light #00C851
				// Dark #007E33
				border: 1px solid rgba(0, 200, 81, 0.8);
				background: rgba(0, 200, 81, 0.7);
            	color: #007E33;

				&.close {
					color: #007E33;
				}
			}

			&.warning {
				// Light #ffbb33
				// Dark #FF8800
				border: 1px solid rgba(255, 187, 51, 0.8);
				background: rgba(255, 187, 51, 0.7);
            	// color: #FF8800;
			}

			&.error {
				// Light #ff4444
				// Dark #CC0000
				border: 1px solid rgba(255, 68, 68, 0.8);
				background: rgba(255, 68, 68, 0.7);
            	// color: #CC0000;
			}

			&.critical {
				// Light #CC0000
				border: 1px solid rgba(204, 0, 0, 0.9);
				background: rgba(204, 0, 0, 0.7);
			}

			.close {
				font-size: 12px;
				border-radius: 8px;
    			padding: 3px 4px 2px 4px;
				background: rgba(0,0,0, 0.1);
				cursor: pointer;

				&:hover{
					background: rgba(0,0,0, 0.2);
				}
			}
        }
	}
</style>
