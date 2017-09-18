$(function() {
  // 微连接下拉列表
  $('.heading .heading-middle .connect-list').hover(function() {
    $('#micro-connect').show().animate({
      t: 30,
      start: 0,
      mul: {
        o: 100,
        h: 120
      }
    })
  }, function() {
    $('#micro-connect').animate({
      t: 30,
      start: 0,
      mul: {
        o: 0,
        h: 0
      }
    }).hide();
  })

  // 微服务下拉列表
  $('.heading .heading-middle .sercice-list').hover(function() {
    $('#micro-sercice').show().animate({
      t: 30,
      start: 0,
      mul: {
        o: 100,
        h: 180
      }
    })
  }, function() {
    $('#micro-sercice').animate({
      t: 30,
      start: 0,
      mul: {
        o: 0,
        h: 0
      }
    }).hide();
  })
})
