<template>
	<div class="select-box" v-bind:class="stylesel">
		<input type="text" class="inputtext" v-model="keyword" v-on:keyup="get()" name="keyword" v-bind:placeholder="placeholder" />
		<ul v-if="list.length > 0">
			<li v-for="v of list" v-on:click="select(v)">{{v.name}}</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'

	var queryDelay = null // 用于存放查询的timeout

	export default {
		name: 'search-select',
		props: {
			placeholder: String,
			url: String,
			wordkey: {
				type: String,
				default: 'q'
			}, // 查询的get键名
			pragma: {
				type: Object,
				default: function () {
					return {}
				}
			},
			stylesel: {
				type: String,
				default: 'default'
			},
			default: String
		},
		data: function () {
			return {
				keyword: '',
				list: []
			}
		},
		created: function() {
			
		},
		watch: {
			default: function (val) {
				this.keyword = val
			}
		},
		methods: {
			get: function () {
				var word = this.keyword
				clearTimeout(queryDelay)
				var vm = this
				queryDelay = setTimeout(function(){
					var params = {
						params: vm.pragma
					}
					params.params[vm.wordkey] = word

					axios.get(vm.url, params).then(function(res){
						vm.list = res.data.data
					})
					.catch(function(err){
						console.log(err)
					})

				}, 500)
			},
			select: function(v) {
				this.keyword = v.name
				this.$emit('callback', v)
				this.list = []
			}
		}
	}
</script>

<style lang="scss">
	.select-box {
		position: relative;

		ul {
			position: absolute;
			top: 100%;
			z-index: 999;
		}
	}

	.default {
		
		ul {
			width: 100%;
			background: #fff;
			padding: 5px 0;

			li {
				height: 25px;
				line-height: 25px;
				overflow: hidden;
				padding: 0 10px;
				cursor: pointer;
				color: #333;
			}
		}
	}
</style>