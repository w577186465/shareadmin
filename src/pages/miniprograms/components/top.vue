<template>
	<div class="top">
		<h1>大连网龙科技</h1>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@function rem( $px) {
	    @return $px*(1/100)*1rem;
	}

	$toph: rem(400);

	.top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: $toph;
		line-height: $toph;
		background: #5272F9;
		text-align: center;

		h1 {
			font-size: 16px;
			color: #fff;
		}
	}

	#app {
		padding-top: $toph;
	}
</style>