function gridSlideIn(p,transitionEnd){
    var numRows = 2;
    var numCols = 2;

    var ft_current_image = p.aImages[p.curArrayPos];
    var ft_next_image = p.aImages[p.nextImg];
    
    var arrNextImages = [];

    var transition_container = $("<div id='transition-container'></div>").css({
        height: "auto",
        width: "100%",
        position: "absolute"
    });
    transition_container.prependTo(p.container);

    //starts at random sides instead of the default 0 top side
    var poscounter = 1 //Math.round(Math.random()*3); //0=top, 1=right, 2=bottom, 3=left 
    //var poscounter = 0;
    for(var i = 0; i < numRows; i++){
        for(var j = 0; j < numCols; j++){
            
            var div1 = $("<div></div>").css({
            background: "transparent url('"+ft_current_image+"') no-repeat ",
            "background-position": (j*(-p.cWidth/numCols)) + "px " + (i*(-p.cHeight/numRows)) + "px ",
            "background-size": p.cWidth+"px "+p.cHeight+"px",
            display: "inline-block",
            position: "absolute",
            overflow: "hidden",
            height: p.cHeight/numCols + "px",
            "top": (p.cHeight/numRows)*i + "px",
            width: p.cWidth/numRows + "px",
            "left": (p.cWidth/numCols)*j + "px",
            });
            div1.appendTo(transition_container);
            
            var top = {left: "0px", top: (p.cHeight/numRows)*-1 + "px"};
            var right = {left: (p.cWidth/numCols) + "px", top: "0px"};
            var bottom = {left: "0px", top: (p.cHeight/numRows) + "px"};
            var left = {left: (p.cWidth/numCols)*-1 + "px", top: "0px"};
            var arrayPos = [top, right, bottom, left]
            
            //poscounter = Math.round(Math.random()*3); //uncomment if random insteam of clockwise
            if(i == 1 && j == 0){poscounter = 0} //needs to be commented out if row and col are > 2
            if(i == 1 && j == 1){poscounter = 3} //needs to be commented out if row and col are > 2
            var pos = arrayPos[poscounter]; //cockwise motion
            
            
            
            var div2 = $("<div id='next-image"+i+""+j+"'></div>").css({
                display: "block",
                position: "absolute",
                background: "transparent url('"+ft_next_image+"') no-repeat ",
                "background-position": (j*(-p.cWidth/numCols)) + "px " + (i*(-p.cHeight/numRows)) + "px ",
                "background-size": p.cWidth+"px "+p.cHeight+"px",
                height: p.cHeight/numCols + "px",
                width: p.cWidth/numRows + "px",
                "left": pos.left,
                "top": pos.top
            });
            div2.appendTo(div1);
            div2.pos = poscounter;
            arrNextImages.push(div2);
            
         poscounter = (poscounter < 3) ? poscounter+1 : 0;
        }
    }
    //function call when last element finish its transition animation
    $("#next-image"+(numRows-1)+""+(numCols-1)).one('transitionend webkitTransitionEnd', function(){ transitionEnd(); });
    var delaycounter = 0;
    
    for(item in arrNextImages){
        //used to recalculate styles as to not override immediately
        arrNextImages[item].css("top");
        
        var tr;
        if(arrNextImages[item].pos == 0){tr = ("translate3d(0,"+p.cHeight/numRows+"px,0)")}
        else if(arrNextImages[item].pos == 1){tr = ("translate3d(-"+p.cWidth/numRows+"px,0,0)")}
        else if(arrNextImages[item].pos == 2){tr = ("translate3d(0,-"+p.cHeight/numRows+"px,0)")}
        else if(arrNextImages[item].pos == 3){tr = ("translate3d("+p.cWidth/numRows+"px,0,0)")}
        arrNextImages[item].css({/*"transition-delay": (0.01*item)+ "s",*/ "transition-duration": "0.5s", transform: tr});
    }
}