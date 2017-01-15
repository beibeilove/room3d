window.onload=function () {
    var sence=document.querySelector(".sence");
    var room=document.querySelector(".room");
    //屏幕的宽高
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    room.style.transformOrigin="center center "+clientw/2+"px";
    // room.style.transform="rotate3d(0,1,0,180deg)";
    //最后一个面  设置位置
    var lastpanel=document.querySelector(".panel:last-child");
    lastpanel.style.transform="translate3d(0,0,"+clientw+"px)";
    //天花板  地板  设置宽高
    var floor=document.querySelector(".panel:first-child");
    var ceil=document.querySelector(".panel:nth-child(5)");
    floor.style.width=floor.style.height=ceil.style.width=ceil.style.height=clientw+"px";
    ceil.style.top=-(clientw-clienth)+"px";

    room.style.transform="rotate3d(0,1,0,180deg)";
    lastpanel.onclick=function(){
        room.style.transition="transform 2s ease";
        room.style.transform="translate3d(0,0,"+-clientw/3+"px)  rotate3d(0,1,0,0deg)";
    }

    var angle=0,angle1=0;
    var flag1=false;
    document.onmousedown=function(e){
        var startx=e.clientX;
        var starty=e.clientY;
        document.onmousemove=function(e){
            flag1=true;
            room.style.transition="none";
            var movex=e.clientX;
            var movey=e.clientY;
            e.preventDefault();
            console.log(angle);
            angle=Math.abs(movex-startx)>Math.abs(movey-starty)?movex-startx:movey-starty;
            room.style.transform="translate3d(0,0,"+-clientw/3+"px) rotate3d(0,1,0,"+(angle+angle1)+"deg)";
        }
        document.onmouseup=function () {
            if(flag1){
                angle1+=angle;
                console.log(angle1+"onclick");
            }
            flag1=false;
            document.onmousemove=null;
            document.onmouseup=null;
        }
        e.preventDefault();
    }

    var panel=document.querySelectorAll(".panel");
    var flag=true;
    for (var i=0;i<panel.length;i++){
        if(i<(panel.length-1)){
            panel[i].ondblclick=function(){
                console.log(angle1+"ondblclick");
                room.style.transition="transform 2s ease";
                if(flag){
                    room.style.transform="translate3d(0,0,100px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=false;
                }else{
                    room.style.transform="translate3d(0,0,"+-clientw/3+"px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=true;
                }

            }
        }
    }

}