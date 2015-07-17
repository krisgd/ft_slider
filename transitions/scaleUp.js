function scaleUp(p,transitionEnd){
    var numRows = 2;
    var numCols = 2;

    var ft_current_image = p.aImages[p.curArrayPos];
    var ft_next_image = p.aImages[p.nextImg];

    var transition_container = $("<div id='transition-container'></div>").css({
        height: "auto",
        width: "100%",
        position: "absolute"
    });
    transition_container.prependTo(p.container);

    for(var i = 0; i < numRows; i++){
        for(var j = 0; j < numCols; j++){
            
        }
    }
    var div1 = $("<div></div>").css({
        height: 100/numCols + "%",
        width: 100/numRows + "%",
        "margin-left": (p.cWidth/numCols)*j + "px",
        "margin-top": (p.cHeight/numRows)*i + "px",
        display: "inline-block",
    });
    
    /*div1.appendTo(transition_container);

    var img1 = $("<img></img>").attr({
        height: "auto",
        width: "100%",
        src: p.aImages[p.curArrayPos]
    });
    img1.appendTo(div1);

    var div2 = $("<div id='next-image'></div>").css({
        height: "auto",
        width: "50%",
        display: "inline-block",
    });
    div2.appendTo(transition_container);

    var img2 = $("<img></img>").attr({
        height: "auto",
        width: "100%",
        src: p.aImages[p.nextImg]
    });
    img2.appendTo(div2);*/

    //function call when last element finish its transition animation
    $("#next-image").one('transitionend webkitTransitionEnd', function(){ transitionEnd(); });
    //used to recalculate styles as to not override immediately
    window.getComputedStyle(document.getElementById("next-image")).getPropertyValue("top");
    //add css transition animation
    $("#next-image").css({"transition-duration": "0.5s", "transform": "translateX(-100%)"});
}