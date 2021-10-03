
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

    let add = document.querySelector('.number .noClick .t');
    let minus = document.querySelector('.number .noClick .o');
    let number = document.getElementById('in');
    
    let val = 1;
    number.setAttribute("value",val);
    console.log(number);

    add.onclick = function(){
        number.value++;
    }

    minus.onclick = function(){
        if(number.value >0){
            number.value--;
        }
        
    }

    //详情与评价选项卡
	let as=yx.ga('#bottom .title a');
	let tabs=yx.ga('#bottom .content>div');
	let ln=0;
	
	for(let i=0;i<as.length;i++){
		as[i].onclick=function(){
			as[ln].className='';
			tabs[ln].style.display='none';
			
			this.className='active';
			tabs[i].style.display='block';
			
			ln=i;
		};
	}

    let comment = yx.ga('.evaluate .border .eTitle>div');
    let currentIndex = 0;
    for(let i=0;i<comment.length;i++){
        comment[i].onclick = function(){
            comment[currentIndex].className = '';
            
            comment[i].className = 'active';
            currentIndex = i;
        }
    }

    let smallPic = yx.ga('.smallImg span');
    
    for(let i=0;i<smallPic.length;i++){
        smallPic[i].onclick = function(){
            let bigPic = this.parentNode.parentNode.lastElementChild;
            bigPic.style.opacity = 1;
            bigPic.style.height = '510px';
            
            let prev = bigPic.querySelector('.prev');
            let next = bigPic.querySelector('.next');
            picArry = bigPic.querySelectorAll('.carouselImgCon ul li')
            
            prev.onclick = function(){
                picArry[0].style.display = 'block';
            }

            next.onclick = function(){
                picArry[0].style.display = 'none';
                
                
            }
            
            let close = bigPic.querySelector('.close');
            close.onclick = function(){
                bigPic.style.opacity = 0;
                bigPic.style.height = '0';
            }
        }
    }
    


    
})();

