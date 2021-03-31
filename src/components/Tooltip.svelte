<script lang="ts">
    export let tip = '';
    export let hidden = false;

    // Position
    export let bottom = false;
    export let left = false;

    // Before atributes
    export let beforeWidth: any = null;
    export let beforeBottom: any = 100;

    // After attributes
    export let afterBottom: any = 100;
    export let afterLeft: any = 50;

</script>


<div data-tooltip={ tip }
    style="
        --before-width: { beforeWidth !== null ? `${beforeWidth}px` : `${ 100 }%` };
        --before-bottom: { `${beforeBottom}%` };
        --after-bottom: { `${afterBottom}%` };
        --after-left: { `${afterLeft}%` };"
    class:hidden
    class:bottom
    class:left>
    <slot />
</div>

  <style type="text/scss">

    [data-tooltip]:not(.hidden) {
        // position: relative;
        z-index: 9998;
        display: block;

        slot {
            width: 1200px;
        }

        &::before,&::after {
            z-index: 9999;
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
            margin-top: 12px;
            transition: .2s ease-out;
            transform: translate(-50%, 5px);
        }

        &::before {
            position: absolute;
            bottom: var(--before-bottom);
            left: 50%;
            margin-bottom: 8px;
            padding: 7px;
            width: var(--before-width);
            min-width: 70px;
            max-width: 320px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            background-color: rgba(59, 72, 80, 0.9);
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
            color: #fff;
            content: attr(data-tooltip);
            text-align: center;
            font-size: 14px;
            line-height: 1.2;
            white-space: pre-wrap;
            transform: translate(-50%, -5px) scale(0.5);
        }

        &::after {
            position: absolute;
            bottom: var(--after-bottom);
            margin-bottom: 3px;
            left: var(--after-left);
            width: 0;
            border-style: solid;
            border-width: 5px 5px 0px 5px;
            border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
            transition-duration: .2s;
            transform: translate(-50%, -5px) scale(0.5);
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            content: " ";
            font-size: 0;
            line-height: 0;
        }
    }

    [data-tooltip].bottom {
        &::before {
            bottom: 23.58%;
        }

        &::after {
            bottom: 29%;
            display: inline-block;
            transform: rotate(180deg) !important;
        }
    }

    [data-tooltip].left {
        &::before {
            bottom: 0;
            left: -100%;
        }

        &::after {
            bottom: 20%;
            left: -35%;
            display: inline-block;
            transform: rotate(270deg) !important;
        }
    }

    @media (hover: hover) {
        [data-tooltip]:hover {
            &::before, &::after {
                visibility: visible;
                opacity: 1;
                transform: translate(-50%, -5px) scale(1);
                transition-delay: 0.3s;
            }
        }

        [data-tooltip=false]:hover {
            &::before, &::after {
                visibility: hidden;
                opacity: 0;
                transition-delay: 0.5s;
                transition-duration: 0.2s;
                transform: translateX(-50%) scaleY(1);
            }
        }
	}

  </style>