
(function(){
    
    // 共用方法调用
    yx.public.navFn();
    yx.public.backUpFn();

    
    
        

    let bigImg = document.querySelector('#productImg .left img');
    let smallImgs = document.querySelectorAll('#productImg .smallImg img');

    bigImg.src = smallImgs[0].src;

    let oldPic = smallImgs[0];
    for(let i = 0;i<smallImgs.length;i++){
        smallImgs[i].onmouseover = function(){
            bigImg.src = smallImgs[i].src;
            oldPic.className = '';
            smallImgs[i].className = 'active';

            oldPic = this;
        }
         
    }

    let phoneType = document.querySelectorAll(".format .one dd");
    let phoneColor = document.querySelectorAll(".format .two dd");

    for(let i=0;i<phoneType.length;i++){
        phoneType[i].onclick = function(){
            if(i == 0){
                phoneType[1].className = ''
            }else{
                phoneType[0].className = ''
            }
            phoneType[i].className = 'active';
        }
    }

    for(let i=0;i<phoneColor.length;i++){
        phoneColor[i].onclick = function(){
            if(i == 0){
                phoneColor[1].className = ''
            }else{
                phoneColor[0].className = ''
            }
            phoneColor[i].className = 'active';
        }
    }
    
})();

