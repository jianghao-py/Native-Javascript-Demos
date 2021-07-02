// 共用方法调用
yx.public.navFn();
yx.public.backUpFn();

// 上方轮播图
;(function(){
	let right = document.querySelector(".banner-pic .next");
	let left = document.querySelector(".banner-pic .prev");
	let bannerDiv = document.querySelector(".banner-pic");
	let imgContainer = bannerDiv.querySelector(".carouselImgCon");
	let imgs = imgContainer.querySelectorAll('img');
	let circle = bannerDiv.querySelector(".circle");
	let circles = circle.querySelectorAll('span');

	let num = 0;
	let circleIndex = 0;
	right.addEventListener("click",function(){
		if(num == imgs.length-1){
			imgs[num].style.opacity = 0;
			num = -1;
		}
		num++;
		imgs[num].style.opacity = 1;
		
		if (num>0){
			imgs[num-1].style.opacity = 0;
		}

		
		if(circleIndex == imgs.length-1){
			circleIndex = -1;
		}
		circleIndex++;
		for(let i = 0;i<circles.length;i++){
			circles[i].className = '';
		}	
		circles[circleIndex].className = 'active';
		
	});

	left.addEventListener("click",function(){
		if(num == 0){
			num = imgs.length;
			imgs[0].style.opacity = 0;
		}
		num--;
		imgs[num].style.opacity = 1;
		if(num<4){
			imgs[num+1].style.opacity = 0;
		}

		if(circleIndex == 0){
			circleIndex = imgs.length;
		}
		circleIndex--;
		for(let i = 0;i<circles.length;i++){
			circles[i].className = '';
		}	
		circles[circleIndex].className = 'active';	
	});

	let timer;

	function auto(){
		for(let i = 0;i<circles.length;i++){
			circles[i].className = '';
		}	
		circles[circleIndex].className = 'active';
		timer = setInterval(function(){
			right.click();
		  },3000);
		
	}
	auto();
	
	
	bannerDiv.onmouseenter = function(){
		clearInterval(timer);
	}

	bannerDiv.onmouseleave = function(){
		auto();
		
	}
})();


//新品首发轮播图
function animate(obj,target){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
	  var step = (target - obj.offsetLeft);
	  if(obj.offsetLeft = target){
		clearInterval(obj.timer);
	  }
	  obj.style.left = obj.offsetLeft + step + 'px';
	},15);
}

;(function(){
	let div = document.querySelector("#new-product");
	let ul = div.querySelector("ul");
	let left = div.querySelector(".prev");
	let right = div.querySelector(".next");
	let divWidth = div.offsetWidth;

	right.addEventListener("click",function(){
		animate(ul,-divWidth);
		right.style.display = "none";
	});

	left.addEventListener("click",function(){
		right.style.display = "block";
		animate(ul,0);
		left.style.display = "none";
	});
})();

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


