(function(global){
	var template=`<div class="slieder" style="position: relative;overflow: hidden">
				<div class="slider_imgs" ></div>
			</div>`
	function Main($el,opts){
		this.opts=Object.assign({},opts)
		this.curr=1
		this.total=opts.data.length
	}
})(this)