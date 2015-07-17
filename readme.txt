Feature Slider - Image slideshow with multiple transitions using css

Requirements:
jQuery
same size images

Usage
add css to header
<link rel="stylesheet" href="ft_slider.css"/>

add script before closing body tag
<script src="ft_slider.js" type="text/javascript"></script>

create div with id of ft-slider

insert images inside the ft-slider div
<div id="ft-slider">
   <image src="image01.jpg"></image>
   <image src="image02.jpg"></image
   <image src="image03.jpg"></image>
</div>

(optional)
create next button by adding the id of ft-btn-next
<button id="ft-btn-next">NEXT</button>

(optional)
create previous button by adding the id of ft-btn-next
<button id="ft-btn-prev">PREVIOUS</button>

(optional)
create navigation menu by adding the id of ft-slider-menu to a div
<div id="ft-slider-menu"></div>