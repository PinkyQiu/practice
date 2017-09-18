$(function() {

  $('.main-top img').css('opacity', 0);
  $('.main-top img').eq(0).css('opacity', 100);
  $('.main-top span').eq(0).css('background-color', '#000');
  var bannerIndex = 1;
  var bannerTimer = setInterval(bannerFn, 2000);

  $('.main-top span').hover(function() {
    clearInterval(bannerTimer);
    if ($(this).css('background-color') != '#000') {
      banner(this, bannerIndex == 0 ? $('.main-top span').length() - 1 : bannerIndex - 1);
    };
  }, function() {
    bannerIndex = $(this).index() + 1;
    bannerTimer = setInterval(bannerFn, 2000);
  })

  function banner(obj, prev) {
    $('.main-top span').css('background-color', '#656565');
    $(obj).css('background-color', '#000');

    $('.main-top img').eq(prev).animate({
      attr: 'o',
      target: 0,
      t: 30
    }).css('zIndex', 1);

    $('.main-top img').eq($(obj).index()).animate({
      attr: 'o',
      target: 100,
      t: 30
    }).css('zIndex', 2);
  }

  var maxLength = $('.main-top img').length()

  function bannerFn() {
    if (bannerIndex >= maxLength) {
      bannerIndex = 0;
    }
    var line = $('.main-top span').eq(bannerIndex).first()
    var prevIndex = bannerIndex == 0 ? $('.main-top span').length() - 1 : bannerIndex - 1
    banner(line, prevIndex);
    bannerIndex++;
  }
})
