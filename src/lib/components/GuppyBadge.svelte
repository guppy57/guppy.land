<script>
	import logo from '$lib/assets/GUPPY-icon.png';
</script>

<div>
	<div class="dflow-badge-container dflow-hvr-shrink">
		<a href="https://guppy.land" class="dflow-badge-link" rel="noopener">
			<div class="dflow-logo">
				<img alt="" src={logo} class="" />
			</div>
      <svg class="dflow-text" viewBox="0 0 233 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Built by Guppy</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="Satoshi-Bold, Satoshi" font-size="36" font-weight="bold" letter-spacing="-1.1">
            <text id="Built-by-Guppy" fill="#333333">
                <tspan x="0" y="36">Built by Guppy</tspan>
            </text>
        </g>
    </svg>
		</a>
	</div>
</div>

<style>
	.dflow-badge-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 9999;
	}

	.dflow-badge-link {
    box-shadow: 9px 6px 12px rgb(0 0 0 / 0.2);
		display: flex;
		align-items: center;
		padding: 6px 8px;
		background-color: rgb(255 255 255);
		border: 1px solid #90909056;
		border-radius: 8px;
		text-decoration: none;
	}

	.dflow-logo {
		width: 28px;
		height: 28px;
		margin-right: 3px;
	}

	.kbl-logo {
		width: 21px;
		height: 21px;
		margin-right: 4px;
	}

	.dflow-text {
    width: 112px;
    height: auto;
    padding-right: 2px;
	}

	.dflow-hvr-shrink {
		display: inline-block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-property: transform;
		transition-property: transform;
	}

	.dflow-hvr-shrink:hover,
	.dflow-hvr-shrink:focus,
	.dflow-hvr-shrink:active {
		-webkit-transform: scale(0.9);
		transform: scale(0.9);
	}
</style>
