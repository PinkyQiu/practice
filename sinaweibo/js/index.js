$(function() {

	//轮播器
	$('.main .main-title img').css('opacity',0);
	$('.main .main-title img').eq(0).css('opacity',100);
	$('.main .main-title ul li').eq(0).css('color','#5db5ec');
  

  // 轮播计数器
  var bannerIndex=1;
  
  var bannerTimer=setInterval(bannerFn,3000);
  

  $('.main .main-title ul li').hover(function() {
  	clearInterval(bannerTimer);
  	if ($(this).css('color')!='#5db5ec') {
  		banner(this,bannerIndex == 0 ? $('.main .main-title ul li').length() - 1 : bannerIndex - 1);
  	};
  },function() {
  	bannerIndex=$(this).index()+1;
  	bannerTimer=setInterval(bannerFn,3000);
  })


  function banner(obj,prev) {
  	$('.main .main-title ul li').css('color','#0463b6');
  	$(obj).css('color','#5db5ec');
  	
  	$('.main .main-title img').eq(prev).animate({
        attr: 'o',
        target: 0,
        step: 10,
        t: 50
      }).css('zIndex', 1);
      $('.main .main-title img').eq($(obj).index()).animate({
        attr: 'o',
        target: 100,
        step: 10,
        t: 30
      }).css('zIndex', 2);
  }


  function bannerFn() {
  	if (bannerIndex >= $('.main .main-title ul li').length()) {
      bannerIndex = 0;
    };
    banner($('.main .main-title ul li').eq(bannerIndex).first(), bannerIndex == 0 ? $('.main .main-title ul li').length() - 1 : bannerIndex - 1);
    bannerIndex++;
  }



  // 点击图片出现对应文字
  var lastPara=$('.text-last .last-para');
  var lastListSpan=$('.text-last .last-list span');
  lastPara.hide();
  lastListSpan.hide();
  lastPara.eq(0).show();
  lastListSpan.eq(0).show();

  function hoverFn(container) {
    var parent=container.parentNode.parentNode;
    var index=$(parent).index();
    lastPara.hide();
    lastListSpan.hide();
    lastPara.eq(index).show();
    lastListSpan.eq(index).show();
  }

  $('.last-list .list-pic img').hover(function() {
  	hoverFn(this);
  },function() {
    hoverFn(this);
  })



})