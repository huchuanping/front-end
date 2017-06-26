$(document).ready(function(){
	var imalist=['images/img11.jpg','images/img12.jpg','images/img13.jpg','images/img14.jpg']
	var slider=$('.target').slider({data:imalist})
	$('.pre').click(function(){
		slider.prev()
	})
	$('.next').click(function(){
		slider.next()
	})
})