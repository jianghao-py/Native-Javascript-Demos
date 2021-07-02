// function animate(obj,target){
//     clearInterval(obj.timer);

//     obj.timer = setInterval(function(){
//       var step = (target - obj.offsetLeft) / 10;
//       if(step > 0){
//         step = Math.ceil(step);
//       }else {
//         step = Math.floor(step);
//       }
//       if(obj.offsetLeft == target){
//         clearInterval(obj.timer);
//       }
//       obj.style.left = obj.offsetLeft + step + 'px';
//     },15);
//   }


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

var div = document.querySelector(".center");
var ul = document.querySelector('.img-box');
var ol = document.querySelector('.circle');
var circles = ol.querySelectorAll('li');
var left = document.querySelector('.left');
var right = document.querySelector('.right');

for(var i = 0;i<circles.length;i++){
    circles[i].setAttribute('index',i);
    // 小圆圈排他思想
    circles[i].addEventListener('click',function(){
        for(var i = 0;i<circles.length;i++){
            circles[i].className = '';
        }
        this.className='current';

        var index = this.getAttribute('index');
        var divWidth = div.offsetWidth;
        
        animate(ul,-index*divWidth);
        console.log(-index*divWidth);
    });
}

var index = 0;
var divWidth = div.offsetWidth;
let circleIndex = 0;


right.addEventListener('click',function(){
    if(index==ul.children.length-1){
        ul.style.left = 0;
        index = 0;     
    }
        index++;
        animate(ul,-index*divWidth);
        console.log(ul.offsetLeft);
        console.log(-index*divWidth);

        circleIndex ++;

        if(circleIndex == ul.children.length-1){
            circleIndex = 0;
        }
       
        for(var i = 0;i<circles.length;i++){
                circles[i].className = '';
        }
        circles[circleIndex].className = 'current';
           
        
});



left.addEventListener('click',function(){
    
    
    if(index==0){
        ul.style.left = -(ul.children.length-1) * divWidth + "px";
        index = ul.children.length-1;     
    }
        index--;
        animate(ul,-index*divWidth);
        

        circleIndex--;
        if(circleIndex<0){
            circleIndex = circles.length-1;
        }

        for(var i = 0;i<circles.length;i++){
            circles[i].className = '';
    }
    circles[circleIndex].className = 'current';

});

function auto(){

  for(var i = 0;i<circles.length;i++){
    circles[i].className = '';
  }
  circles[circleIndex].className = 'current';

  var timer = setInterval(function(){
    right.click();
  },2000);
}

auto();



