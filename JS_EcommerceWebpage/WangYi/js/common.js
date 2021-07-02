window.yx={
    g:function(name){
        return document.querySelector(name);
    },

    ga:function(name){
        return document.querySelectorAll(name);
    },
    addEvent:function(obj,ev,fn){
        obj.addEventListener(ev,fn);
    },
    removeEvent:function(obj,ev,fn){
        obj.removeEventListener(ev,fn);
    },
    public:{
        navFn:function(){
            var nav = yx.g('.nav');
            var lis = yx.ga('.nav-bar li');
            var subNav = yx.g('.sub-nav');
            var ul =yx.g('.sub-nav ul');
            var newLis = [];        //存储下拉菜单li

            // 首页，专题和众筹没有下拉菜单
            for(var i = 1;i < lis.length-3;i++){
                newLis.push(lis[i]);
            }

            for(var i = 0;i<newLis.length;i++){
                newLis[i].onmouseenter = ul.onmouseenter=function(){
                    subNav.style.display='block';
                };

                newLis[i].onmouseleave = ul.onmouseleave=function(){
                    subNav.style.display='none';
                };
            }
            // 吸顶式导航
            yx.addEvent(window,'scroll',setNavPos);
            setNavPos();
            function setNavPos(){
                if(window.pageYOffset>nav.offsetTop){
                    nav.id='nav-fix';
                }else{
                    nav.id='';
                }
            }   
        },
        // 回到顶部
        backUpFn:function(){
            var back = yx.g('.back');
            var timer;
            back.onclick = function(){
                var top = window.pageYOffset;
                timer = setInterval(function(){
                    top-=150;
                    if(top<=0){
                        top=0;
                        clearInterval(timer);
                    }
                    window.scrollTo(0,top);
                },16);
            };
        }
    }
}
    
