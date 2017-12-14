<template>
	<div class="bottom">
		<ul class="clearfix">
			<li>
				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-manage_fill"></use>
				</svg>
			</li>
			<li>
				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-workbench_fill"></use>
				</svg>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@function rem( $px) {
	    @return $px*(1/100)*1rem;
	}

	$bottomh: rem(450);

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;

		li {
			height: $bottomh;
			line-height: $bottomh;
			text-align: center;
			float: left;
			width: 50%;
			color: #7673C7;
			font-size: rem(300)
		}
	}

	#app {
		padding-bottom: $bottomh;
	}

</style>