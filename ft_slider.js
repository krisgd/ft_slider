/**
 * @Kris Doromal
 * Feature Slider
 *
 */



function ft_slider(opt){
    
    //VARIABLES
    //============================================
    //============================================
    
    //options default values
    if(typeof opt === "undefined"){
        this.autoplay = false;
        this.delay = 5;
        this.restart_delay = 5;
        this.transition = "default";
    }else{
        this.autoplay = typeof opt.autoplay !== "undefined" ? opt.autoplay : false;
        this.delay = typeof opt.delay !== "undefined" ? opt.delay : 5;
        this.restart_delay = typeof opt.restart_delay !== "undefined" ? opt.restart_delay : 5;
        this.transition = typeof opt.transition !== "undefined" ? opt.transition : "default";
    }
    var _this = this;
    this.container; //dom element container of the images specified by user
    this.cHeight = 0; //dimension of the container element
    this.cWidth = 0; //dimension of the container element
    this.aImages = []; //array that holds the images
    this.curArrayPos = 0; //current image 
    this.bAnimating = false; //boolean not allowing new transition until current one is finished
    this.ftInt; //feature slideshow setinterval
    this.ftTimeout; //timeout var used for reseting
    this.queueNextImage = 'none'; //if user clicks on menu item while animating it will queue up target image to go after animation is completed
    this.menu; //dom element that will contain the menu navigation specified by user
    this.externalFileLoaded = false; //used to check if external transition file is available if not, use defaul transition
    
    
    //INITIALIZE
    //============================================
    //============================================
    
    //init slider container (required)
    if($("#ft-slider")){
        this.container = $("#ft-slider");
        slideInit();
    }else{
        console.log("container is not specified (need a div element with the id of #ft-slider)");
    }
    
    //if #ft-slider-menu exists then create slider menu (optional)
    if($("#ft-slider-menu")){
        createFtMenu();
    }
    
    //if #ft-btn-next then create a next button (optional)
    if($("#ft-btn-next")){
        $("#ft-btn-next").click(function(){nextImage("next");});
    }
    
    //if #ft-btn-prev then create a previous button (optional)
    if($("#ft-btn-prev")){
        $("#ft-btn-prev").click(function(){nextImage("prev");});
    }
    
    $.getScript("transitions/"+_this.transition+".js", function() {
        _this.externalFileLoaded = true;
    //script is loaded and executed put your dependent JS here
        //_this.transitionFunction = window[_this.transition];
    });
    
    //setup slider
    function slideInit(){
        //find all images, load into array, and remove all images
        //WARNING MIGHT NEED AN ONLOAD LISTENER FOR THE IMAGES
        _this.container.find("img").each(function(){
            _this.aImages.push($(this).attr("src"));
        });
        
        //load first image of array
        _this.container.html("<image src='" + _this.aImages[_this.curArrayPos] + "'></image>");
        
        //auto slideshow
        if(_this.autoplay){
            _this.ftInt = setInterval(function(){nextImage('next', false)}, _this.delay * 1000);
        }
    }
    
    //which image of the array to load next "next" "prev" or specify a number
    function nextImage(pos, stop_int){
        //stop setInterval if true default is true
        //used for autoplay to continue setInterval if false
        stop_int = typeof stop_int !== 'undefined' ? stop_int : true;


        if(_this.autoplay && stop_int){
            //stop autoplay slide show
            clearInterval(_this.ftInt);
            //restart delay timer to start autoplay again
            clearTimeout(_this.ftTimeout);
            //restart slideshow after 5 sec
            _this.ftTimeout = setTimeout(function(){
                _this.ftInt = setInterval(function(){nextImage('next', false)}, _this.delay * 1000);
            }, _this.restart * 1000)
        }
        //don't load next image if still animating or if its the same image
        if (!_this.bAnimating && pos != _this.curArrayPos){
            
            //if external transition file is not availabe default to slideIn animation
            if(_this.transition == "default" || !_this.externalFileLoaded){
                slideIn(pos);
            }else if(_this.transition && _this.externalFileLoaded){
                _this.bAnimating = true;
                _this.cHeight = _this.container.height();
                _this.cWidth = _this.container.width();
                window[_this.transition]({
                    container: _this.container,
                    cWidth: _this.cWidth,
                    cHeight: _this.cHeight,
                    bAnimating: _this.bAnimating,
                    curArrayPos: _this.curArrayPos,
                    aImages: _this.aImages,
                    nextImg: arrayPos(pos)
                },transitionEnd);
            }
            //flipUp(pos);
        }else if(_this.bAnimating && pos != _this.curArrayPos){
            //queue next image if still animating and load if after animation is complete
            _this.queueNextImage = pos;
        }
    }
            
    //cycle position in array
    function arrayPos(pos){
        if(pos == "next"){
            _this.curArrayPos = (_this.curArrayPos < _this.aImages.length - 1) ? (_this.curArrayPos + 1) : 0;
        }
        else if(pos == "prev"){
            _this.curArrayPos = (_this.curArrayPos > 0) ? (_this.curArrayPos - 1) : _this.aImages.length - 1;
        }
        else if(typeof pos == 'number' && pos >= 0 && pos <= _this.aImages.length - 1){
            _this.curArrayPos = pos;
        }
        else{
            console.log("incorrect arrayPos parameter " + pos + " array length is " + _this.aImages.length);
        }
        
        //if menu navigation element is defined
        if(_this.menu){
            select(_this.curArrayPos);
        }
        return _this.curArrayPos;
    }
    
    //creates navigation menu
    //uses ul with li as buttons for navigating the different images
    function createFtMenu(){
        _this.menu = $(".ft-slider-menu");
        var list;
        list = "<ul>"
        for(item in _this.aImages){
            list += "<li class='ft-menu-item ft-unselected' id='ft-"+ item +"'></li>";
        }
        list += "</ul>";
        _this.menu.append(list);

        for(item in _this.aImages){
            $("#ft-" + item).click(function(){
                nextImage($(this).index());
            });
        }
        //default selection is the first one
        select(0);
    }
    
    //show indication of which item is currently showing in the menu
    function select(target){
        for(item in _this.aImages){
            if($("#ft-" + item).hasClass("ft-selected")){
                $("#ft-" + item).removeClass("ft-selected");
                $("#ft-" + item).addClass("ft-unselected");
            }
        }
        $("#ft-" + target).removeClass("ft-unselected");
        $("#ft-" + target).addClass("ft-selected");
    }
    
    
    
    //DEFAULT TRANSITION
    //============================================
    //============================================
    
    function slideIn(pos){
        
        var transition_container = $("<div id='transition-container'></div>").css({
            height: "auto",
            width: "100%",
            position: "absolute",
            overflow: "hidden"
        });
        transition_container.prependTo(_this.container);
        
        var inner_container = $("<div></div>").css({
            height: "auto",
            width: "200%",
        });
        inner_container.prependTo(transition_container);

        var div1 = $("<div></div>").css({
            height: "auto",
            width: "50%",
            display: "inline-block",
            position: "relative",
        });
        div1.appendTo(inner_container);

        var img1 = $("<img></img>").attr({
            height: "auto",
            width: "100%",
            src: _this.aImages[_this.curArrayPos]
        });
        img1.appendTo(div1);

        var div2 = $("<div id='next-image'></div>").css({
            height: "auto",
            width: "50%",
            display: "inline-block",
            position: "relative"
        });
        div2.appendTo(inner_container);

        var img2 = $("<img></img>").attr({
            height: "auto",
            width: "100%",
            src: _this.aImages[arrayPos(pos)]
        });
        img2.appendTo(div2);

        //function call when last element finish its transition animation
        $("#next-image").one('transitionend webkitTransitionEnd', function(){ transitionEnd(); });
        //used to recalculate styles as to not override immediately
        window.getComputedStyle(document.getElementById("next-image")).getPropertyValue("top");
        //add css transition animation
        $("#next-image").css({"transition-duration": "0.5s", "transform": "translateX(-100%)"});
    }
    
    //function called when transition finishes
    function transitionEnd(){
        //change main image to the next image 
        _this.container.html("<image src='" + _this.aImages[_this.curArrayPos] + "'></image>");
        _this.bAnimating = false;
        
        if(_this.queueNextImage != 'none'){
            nextImage(_this.queueNextImage);
            _this.queueNextImage = 'none';
        }
    }
    
}//ft_slider


//public method used to change transition type
ft_slider.prototype.changeTransition = function(newDefinedTransition){
    var _this = this;
    this.transition = newDefinedTransition;
    $.getScript("transitions/"+_this.transition+".js", function() {
        _this.externalFileLoaded = true;
    });
}