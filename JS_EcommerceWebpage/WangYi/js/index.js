// 共用方法调用
yx.public.navFn();
yx.public.backUpFn();

let Carousel = function(){
	this.settings = {
		id:'pic',				//轮播图父级的id，必需传的参数
		autoplay:true,			//自动播放，true为自动，false为不自动，默认为true
		intervalTime:1000,		//间隔时间，运动后停顿的时间，默认1s
		loop:true,				//循环播放，true为循环，false为不循环，默认为true
		totalNum:5,				//图片总量
		moveNum:1,				//单次运动的图片数量（图片总量必须为运动数量的整倍数）
		circle:true,			//小圆点功能，true为显示，false为不显示，默认显示
		moveWay:'opacity'		//运动方式，opacity为透明度过渡，position为位置过渡
	}
}

Carousel.prototype = {
	constructor:Carousel,
	init:function(opt){
		opt = opt || this.settings;

		for(let attr in opt){
			this.settings[attr] = opt[attr];

		}
		// 创建轮播图左右按钮
		this.createDom();
	},
	createDom:function(){
		let This=this;
		this.box = document.getElementById(this.settings.id);
		this.prevBtn = document.createElement('div');
		this.prevBtn.className = 'prev';
		this.prevBtn.innerHTML = '<';
		this.prevBtn.onclick = function(){
			This.prev();
		}
		this.box.appendChild(this.prevBtn);

		this.nextBtn = document.createElement('div');
		this.nextBtn.className = 'next';
		this.nextBtn.innerHTML = '>';
		this.nextBtn.onclick = function(){
			This.next();
		}
		this.box.appendChild(this.nextBtn);
		// 创建圆点
		this.circleWrap = document.createElement('div');
		this.circleWrap.className = 'circle';
		this.circleSpan = [];
		for(let i = 0;i < this.settings.totalNum / this.settings.moveNum;i++){
			let span=document.createElement("span");
				span.index=i;
				
				span.onclick=function(){
					This.cn=this.index;
					This[This.settings.moveWay+'Fn']();
				};
				
				this.circleWrap.appendChild(span);
				this.circleSpan.push(span);
		}
		this.circleSpan[0].className='active';

		if(this.settings.circle){
			this.box.appendChild(this.circleWrap);
		}
		
		this.moveInit();	
	},
	// 运动初始化
	moveInit:function(){
			this.cn=0;				//当前的索引
			this.ln=0;				//上一个的索引
			this.canClick=true;		//是否可以再次点击
			this.endNum=this.settings.totalNum/this.settings.moveNum;//停止条件
			this.opacityItem= this.box.children[0].children;			//运动透明度的所有元素
			this.positionItemWrap= this.box.children[0].children[0];	//运动位置的元素的父级
			this.positionItem=this.positionItemWrap.children;		//运动位置的所有元素

			switch(this.settings.moveWay){
				case 'opacity':		//如果走的是透明度，需要设置透明度与transition
					for(let i=0;i<this.opacityItem.length;i++){
						this.opacityItem[i].style.opacity=0;
						this.opacityItem[i].style.transition='.3s opacity';
					}
					this.opacityItem[0].style.opacity=1;
					
					break;
				
				case 'position':		//如果走的是位置，需要设置父级的宽度
					//这里需要注意一下，一定要加上元素的margin
					let leftMargin=parseInt(getComputedStyle(this.positionItem[0]).marginLeft);
					let rightMargin=parseInt(getComputedStyle(this.positionItem[0]).marginRight);
					
					//一个运动元素的实际宽度
					this.singleWidth=leftMargin+this.positionItem[0].offsetWidth+rightMargin;
					
					//如果运动是循环的，需要复制一份内容
					if(this.settings.loop){
						this.positionItemWrap.innerHTML+=this.positionItemWrap.innerHTML;
					}
					
					//复制内容后才能设置宽度
					this.positionItemWrap.style.width=this.singleWidth*this.positionItem.length+'px';
			}
	},
	opacityFn:function(){
		//左边到头
		if(this.cn<0){
			if(this.settings.loop){
				//循环
				this.cn=this.endNum-1;
			}else{
				//不循环
				this.cn=0;
				this.canClick=true;		//解决点击头一张或者最后一张后，不能再次点击。是因为canClick是在transitionend里面设置的，如果不循环的话就会停在最后。再次点击的时候transitionend就不会发生，所以canClick的值就不会改变
			}
		}
		
		//右边到头
		if(this.cn>this.endNum-1){
			if(this.settings.loop){
				//循环
				this.cn=0;
			}else{
				//不循环
				this.cn=this.endNum-1;
				this.canClick=true;
			}
		}
		
			this.opacityItem[this.ln].style.opacity=0;
			this.circleSpan[this.ln].className='';
			
			this.opacityItem[this.cn].style.opacity=1;
			this.circleSpan[this.cn].className='active';

			let This=this;
			let en=0;
			
			this.opacityItem[this.cn].addEventListener('transitionend',function(){
				en++;
				if(en==1){
					This.canClick=true;
					This.ln=This.cn;
					
					
				}
			});
	},
	positionFn:function(){
		//左边到头
		if(this.cn<0){
			if(this.settings.loop){
				//循环
				/*
				 * 在这里需要做两件事情
				 * 	1、先让运动的父级的位置到中间，为了往右走不会出现空白
				 * 	2、同时需要修改索引值（到了中间了，并不是停在那了，而是要运动出前一排，所以cn的值要减个1，为了就是能运动）
				 */
				this.positionItemWrap.style.left=-this.positionItemWrap.offsetWidth/2+'px';
				this.cn=this.endNum-1;
			}else{
				//不循环
				this.cn=0;
			}
		}

		//右边到头
		if(this.cn>this.endNum-1){
			if(this.settings.loop){
									
			}else{
			//不循环
				this.cn=this.endNum-1;
			}
							
		}

		//运动
			//left的值=一个元素的宽度*当前cn的值*一次运动元素的个数
			var This=this;
			move(this.positionItemWrap,{left:-this.cn*this.singleWidth*this.settings.moveNum},300,'linear',function(){
				if(This.cn==This.endNum){
					//这个条件成立，说明现在已经到了第二份的第一屏了
					this.style.left=0;
					This.cn=0;
				}
				
				
				
				This.canClick=true;
				This.ln=This.cn;
			
			});

	},
	prev:function(){			//上一个按钮点击功能
		//能否进行下一次点击，要放在这里面去判断
		if(!this.canClick){
			return;
		}
		this.canClick=false;
		
		this.cn--;
		this[this.settings.moveWay+'Fn']();
	},
	next:function(){			//下一个按钮点击功能
		if(!this.canClick){
			return;
		}
		this.canClick=false;
		
		this.cn++;
		this[this.settings.moveWay+'Fn']();
	},


}




let bannerPic = new Carousel();
bannerPic.init({
			id:'banner-pic',		
			autoplay:true,			
			intervalTime:3000,		
			loop:true,				
			totalNum:5,				
			moveNum:1,				
			circle:true,			
			moveWay:'opacity'		
})

let newProduct = new Carousel();
newProduct.init({
			id:'new-product',		
			autoplay:false,			
			intervalTime:3000,		
			loop:false,				
			totalNum:8,				
			moveNum:4,				
			circle:false,			
			moveWay:'position'	

})

let allTalk = new Carousel();
allTalk.init({
			id:'sayPic',		
			autoplay:false,			
			intervalTime:3000,		
			loop:true,				
			totalNum:3,				
			moveNum:1,				
			circle:false,			
			moveWay:'position'	

})
// 上方轮播图
// ;(function(){
// 	let right = document.querySelector(".banner-pic .next");
// 	let left = document.querySelector(".banner-pic .prev");
// 	let bannerDiv = document.querySelector(".banner-pic");
// 	let imgContainer = bannerDiv.querySelector(".carouselImgCon");
// 	let imgs = imgContainer.querySelectorAll('img');
// 	let circle = bannerDiv.querySelector(".circle");
// 	let circles = circle.querySelectorAll('span');

// 	let num = 0;
// 	let circleIndex = 0;
// 	right.addEventListener("click",function(){
// 		if(num == imgs.length-1){
// 			imgs[num].style.opacity = 0;
// 			num = -1;
// 		}
// 		num++;
// 		imgs[num].style.opacity = 1;
		
// 		if (num>0){
// 			imgs[num-1].style.opacity = 0;
// 		}

		
// 		if(circleIndex == imgs.length-1){
// 			circleIndex = -1;
// 		}
// 		circleIndex++;
// 		for(let i = 0;i<circles.length;i++){
// 			circles[i].className = '';
// 		}	
// 		circles[circleIndex].className = 'active';
		
// 	});

// 	left.addEventListener("click",function(){
// 		if(num == 0){
// 			num = imgs.length;
// 			imgs[0].style.opacity = 0;
// 		}
// 		num--;
// 		imgs[num].style.opacity = 1;
// 		if(num<4){
// 			imgs[num+1].style.opacity = 0;
// 		}

// 		if(circleIndex == 0){
// 			circleIndex = imgs.length;
// 		}
// 		circleIndex--;
// 		for(let i = 0;i<circles.length;i++){
// 			circles[i].className = '';
// 		}	
// 		circles[circleIndex].className = 'active';	
// 	});

// 	let timer;

// 	function auto(){
// 		for(let i = 0;i<circles.length;i++){
// 			circles[i].className = '';
// 		}	
// 		circles[circleIndex].className = 'active';
// 		timer = setInterval(function(){
// 			right.click();
// 		  },3000);
		
// 	}
// 	auto();
	
	
// 	bannerDiv.onmouseenter = function(){
// 		clearInterval(timer);
// 	}

// 	bannerDiv.onmouseleave = function(){
// 		auto();
		
// 	}
// })();


// //新品首发轮播图
// function animate(obj,target){
// 	clearInterval(obj.timer);

// 	obj.timer = setInterval(function(){
// 	  var step = (target - obj.offsetLeft);
// 	  if(obj.offsetLeft = target){
// 		clearInterval(obj.timer);
// 	  }
// 	  obj.style.left = obj.offsetLeft + step + 'px';
// 	},15);
// }

// ;(function(){
// 	let div = document.querySelector("#new-product");
// 	let ul = div.querySelector("ul");
// 	let left = div.querySelector(".prev");
// 	let right = div.querySelector(".next");
// 	let divWidth = div.offsetWidth;

// 	right.addEventListener("click",function(){
// 		animate(ul,-divWidth);
// 		right.style.display = "none";
// 	});

// 	left.addEventListener("click",function(){
// 		right.style.display = "block";
// 		animate(ul,0);
// 		left.style.display = "none";
// 	});
// })();

//倒计时
;(function(){
	let time = document.querySelector("#timer");
	let timeBox = time.querySelector(".time-box");
	let hour = timeBox.querySelector("#hour");
	let minute = timeBox.querySelector("#minute");
	let sec = timeBox.querySelector("#sec");

	setInterval(set,1000);
	
	function set(){
		let nowTime = new Date().getTime(); //毫秒形式
		let endTime = new Date('2022/6/23 21:08').getTime();
		let total = (endTime - nowTime);  


		let h = parseInt(total/(60*60*1000)%24);
        let m = parseInt(total/(60*1000)%60);
        let s = parseInt(total/1000%60);

		
		hour.innerHTML = h;
		minute.innerHTML = m;
		sec.innerHTML = s;
	}

	
})();



