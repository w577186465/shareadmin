<template>
	<div class="upload">
		<div class=""><img :src="thumb" width="120" height="120" /></div>
		<input type="button" @click="add($event)" :value="upname" id="addimgbutton"/>
		<input type="file" class="addfile" @change="uploaded" multiple style="display: none;"/>
	</div>
</template>

<script>
	import axios from 'axios'

	var token = window.token
	var vm
	export default {
		name: 'upload',
		components: {
			
		},
		props: {
			upname: {
				type: String,
				default: "上传文件"
			},
			defthumb: {},
			idname: String
		},
		data: function () {
			return {
				file: null,
				thumb: null
			}
		},
		created: function() {
			vm = this
		},
		computed: {
		},
		watch: {
			defthumb: function (val) {
				this.thumb = val
			}
		},
		methods: {
			add: function (e) {
				$(e.target.parentNode).find('.addfile').trigger('click');
				return false;
			},
			uploaded: function (e) {
				var editfiles = e.target.files || e.dataTransfer.files
				if(!editfiles.length) return
				this.readfile(editfiles)
			},
			readfile: function (file) {
				if(typeof FileReader === 'undefined') {
					alert('您的浏览器不支持图片上传，请升级您的浏览器');
					return false;
				}

				var image = new Image();

				var reader = new FileReader()
				reader.onload = function(e) {
					var data = e.target.result
					vm.thumb = data
				}

				reader.readAsDataURL(file[0])

				this.$emit('callback', file[0])
				// this.uploadFile(file[0])
			},
			uploadFile: function (f, callback) {
				const formData = new FormData()
				formData.append('file', f)
				formData.append('_token', token)
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				axios.post('/filemanage/upload', formData, config).then(function(res) {
					// callback(res.data.data)
				}, function(res) {
					alert(res.status)
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>