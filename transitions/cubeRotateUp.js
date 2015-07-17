//creates multiple sliced cubes from image then rotates up to reveal next image
function cubeRotateUp(p,transitionEnd){
    
    var numSlices = 8;

    var ft_current_image = p.aImages[p.curArrayPos];
    var ft_next_image = p.aImages[p.nextImg];

    //hide fallback image till animation is finished
    p.container.find("img").css("opacity", "0");

    var transition_container = $("<div id='transition-container'></div>").css({
        height: "100%",
        width: "100%",
        position: "absolute",
        perspective: "800px"
    });
    transition_container.prependTo(p.container);

    var z = 0;
    console.clear();
console.log((100/numSlices) + " " + p.cWidth);
    for(var i = 0; i < numSlices; i++){
        var cube = $("<div id='cube"+i+"'></div>").css({
            "transform-style": "preserve-3d",
            //position: "relative",
            position: "absolute",
            display: "inline-block",
            width: (100/numSlices)+"%",
            height: "100%",
            transform: "translateZ("+ ((p.cHeight/2)*-1)+ "px)", 
            //left: (p.cWidth/numSlices)*i + "px",
            //"margin-left": (p.cWidth/numSlices)*i + "px",
            "margin-left": ((100/numSlices)*i)+"%",
            "z-index": z = ((i) >= (numSlices/2)) ? (i*-1) : 0 //no clip bug fix
        });
        cube.appendTo(transition_container);

        var cube_front = $("<div></div>").css({
            //background: "transparent url("+ft_current_image+") no-repeat " + ((100/numSlices)*i)+"%",
            background: "transparent url('"+ft_current_image+"') no-repeat " + (i*(-p.cWidth/numSlices)) + "px",
            "background-size": p.cWidth+"px "+p.cHeight+"px",
            "backface-visibility": "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "translateZ("+ (p.cHeight/2) + "px) rotateY(0deg)"
        });
        cube_front.appendTo(cube);

        var cube_bottom = $("<div></div>").css({
            background: "transparent url('"+ft_next_image+"') no-repeat " + i*(-p.cWidth/numSlices) + "px",
            "background-size": p.cWidth+"px "+p.cHeight+"px",
            "backface-visibility": "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateX(-90deg) translateZ("+ (p.cHeight/2) + "px)"
        });
        cube_bottom.appendTo(cube);

        var cube_right = $("<div></div>").css({
            background: '#444',
            width: p.cHeight + "px",
            height: p.cHeight + "px",
            position: "absolute",
            transform: "rotateY(90deg) translateZ("+((p.cHeight/2) - (p.cWidth/numSlices))*-1+"px)"
            //"backface-visibility": "hidden",
        });
        cube_right.appendTo(cube);

        var cube_left = $("<div></div>").css({
            background: '#444',
            width: p.cHeight + "px",
            height: p.cHeight + "px",
            position: "absolute",
            transform: "rotateY(-90deg) translateZ("+(p.cHeight/2)+"px)",
            //"backface-visibility": "hidden",
        });
        cube_left.appendTo(cube);
    }

    //function call when last element finish its transition animation
    $("#cube"+(numSlices-1)).one('transitionend webkitTransitionEnd', function(){
        p.container.find("img").css("opacity", "1");
        transitionEnd();

    });

    //add css transition animation
    for(var j = 0; j < numSlices; j++){
        //used to recalculate styles as to not override immediately
        window.getComputedStyle(document.getElementById("cube"+j)).getPropertyValue("top");
        $("#cube"+j).css({"transition-delay": (0.1*j) + "s", "transition-duration": "0.5s", "transform": "translateZ("+ (p.cHeight/2)*-1+ "px) rotateX(90deg)", "transition-timing-function": "ease-out"});
    }

}