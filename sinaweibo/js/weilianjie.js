$(function() {

  var caseRight = $('.content-product .case-nav .case-right')
  var arrow = $('.content-product .case-nav span')
  // 图片hover展现对应右图
  caseRight.hide();
  arrow.hide();
  caseRight.eq(0).show();
  arrow.eq(0).show();

  function hoverFn(container) {
    var parent = container.parentNode.parentNode;
    var index = $(parent).index();
    caseRight.hide();
    arrow.hide();
    caseRight.eq(index).show();
    arrow.eq(index).show();
  }

  $('.case-left .case-pic img').hover(function() {
  	hoverFn(this)
  }, function() {
    hoverFn(this)
  })
})
