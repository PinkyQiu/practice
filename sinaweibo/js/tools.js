// 跨浏览器获取视口大小
function getInner() {
  if (typeof window.innerWidth != 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}


//跨浏览器获取滚动条高度
function getScroll() {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}




// 跨浏览器获取style
function getStyle(element, attr) {
  var value;
  if (typeof window.getComputedStyle != 'undefined') {
    value = window.getComputedStyle(element, null)[attr];
  } else if (typeof element.currentStyle != 'undefined') { //ie
    value = element.currentStyle[attr];
  };
  return value;

}


// 判断class是否存在
function hasClass(element, className) {
  return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}


//跨浏览器添加link
function insertRule(sheet, selectorText, cssText, position) {
  if (typeof sheet.insertRule != 'undefined') { //w3c
    sheet.insertRule(selectorText + '{' + cssText + '}', position);
  } else if (typeof sheet.addRule != 'undefined') {
    sheet.addRule(selectorText, cssText, position);
  }

}


//跨浏览器移除link
function deleteRule(sheet, index) {
  if (typeof sheet.deleteRule != 'undefined') { //w3c
    sheet.deleteRule(index);
  } else if (typeof sheet.removeRule != 'undefined') {
    sheet.removeRule(index);
  }
}



//获取event对象
function getEvent(ev) {
  return window.event || ev;
}



// 阻止默认行为
function preDef(event) {
  var ev = getEvent(event);
  if (typeof ev.preventDefalt != 'undefined') { //w3c
    ev.preventDefalt();
  } else { //ie
    ev.returnValue = false;
  }

}


// 浏览器检测   获取版本号
(function() {
  window.sys = [];
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/mise ([\d.]+)/)) ? sys.ie = s[1]:
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] :
    (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 0;
  if (/wekit/.test(ua)) {
    sys.wekit = ua.match(/wekit\/([\d.]+)/)[1];
  };

})();


//DOM加载
function addDomLoaded(fn) {
  var timer = null;
  var isReady = false;

  function doReady() {
    if (timer) {
      clearInterval(timer);
    };
    if (isReady) {
      return;
    };
    isReady = true;
    fn();
  }

  //非主流浏览器
  if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.wekit && sys.wekit < 525)) {
    timer = setInterval(function() {
      if (document && document.getElementById && document.getElementsByTagName && document.body) {
        doReady();
      }
    }, 1)
  } else if (document.addEventListener) { //w3c
    addEvent(document, 'DOMContentLoaded', function() {
      fn();
      removeEvent(document, 'DOMContentLoaded', arguments.callee);
    })
  } else if (sys.ie && sys.ie < 9) {
    var timer = null;
    timer = setInterval(function() {
      try {
        document.documentElement.doScroll('left');
        doReady();
      } catch (e) {}
    }, 1)
  }
}






// 跨浏览器事件绑定
function addEvent(obj, type, fn) {
  if (typeof obj.addEventListener != 'undefined') {
    obj.addEventListener(type, fn, false);
  } else if (typeof obj.attachEvent != 'undefined') {
    obj.attachEvent('on' + type, function() {
      fn.call(obj, window.event);
    });
  }
}


// 跨浏览器移除事件
function removeEvent(obj, type, fn) {
  if (typeof obj.removeEventListener != 'undefined') {
    obj.removeEventListener(type, fn, false);
  } else if (typeof obj.detachEvent != 'undefined') {
    obj.detachEvent('on' + type, fn);
  }
}


// 跨浏览器获取innerText
function getInnerText(element) {
  return (typeof element.textContent == 'string') ? element.textContent : element.innerText
}


// 跨浏览器设置innerText
function setInnerText(element, text) {
  if (typeof element.textContent == 'string') {
    return element.textContent = text;
  } else {
    return element.innerText = text;
  }
}


// 获取某一元素到最外层顶点的位置
function offsetTop(element) {
  var top = element.offsetTop;
  var parent = element.offsetParent;
  while (parent != null) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return top;
}


// 删除左右空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}


//某一个值是否存在某一个数组中
function inArray(array, value) {
  return array.indexOf(value) > -1;
}



// 选中目标
function getTarget(ev) {
  var ev = ev || window.event;
  if (ev.target != 'undefined') {
    return ev.target;
  } else if (ev.srcElement != 'undefined') {
    return ev.srcElement;
  };
}


// 获取某一节点的上一节点的索引
function prevIndex(current,parent) {
	var length=parent.children.length;
  if (current==0) {
  	return length-1;
  };
  return parseInt(current)-1;
}

// 获取某一节点的下一节点的索引
function nextIndex(current,parent) {
	var length=parent.children.length;
  if (current==length-1) {
  	return 0;
  };
  return parseInt(current)+1;
}


//滚动条固定
function fixScroll() {
	setTimeout(function() {
		window.scrollTo(fixScroll.left,fixScroll.top);
	},100)
}

// 阻止默认行为
function preDef(ev) {
  var ev = ev || window.event;
  ev.preventDefault();
}


// 设置cookie
function setCookie(name, value, expires, path, domain, secure) {
  var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires instanceof Date) {
    cookieName += ';expires' + expires;
  };
  if (path) {
    cookieName += ';path' + path;
  };
  if (domain) {
    cookieName += ';domain' + domain;
  };
  if (secure) {
    cookieName += ';secure';
  };
  document.cookie = cookieName;

}


//获取cookie
function getCookie(name) {
  var cookieName = encodeURIComponent(name) + '=';
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieValue=null;
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    };
    cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
  };
  return cookieValue;
}
// alert(encodeURIComponent(getCookie('url')));



//过期时间
function setCookieDate(day) {
  var date = null;
  if (typeof day == 'number' && day > 0) {
    date = new Date();
    date.setDate(date.getDate() + day);
  } else {
    throw new Error('您传递是天数不合法，请传递数字');
  }
  return date;
}


// 滚动条清零
// function scroolTop() {
//   document.documentElement.scrollTop = 0;
//   document.body.scrollTop = 0;
// }
