// 前台调用
var $ = function(args) {
  return new Base(args);
}


// 基础库
function Base(args) {
  this.elements = [];
  if (typeof args == 'string') {
    if (args.indexOf(' ') != -1) { //判断是否有空格，有的话，说明在父元素下找元素
      var elements = args.split(' '); //用逗号把每一项分隔开
      var node = [document];
      var childElements = [];
      for (var i = 0; i < elements.length; i++) {
        switch (elements[i].charAt(0)) {
          case '#':
            childElements = [];
            childElements = this.getId(elements[i].substring(1));
            node = [childElements]; //把获得的值赋给node
            break;
          case '.':
            childElements = []
            for (var j = 0; j < node.length; j++) {
              var temp = this.getClass(elements[i].substring(1), node[j]);
              childElements = childElements.concat(temp);
            };
            node = childElements;
            break;
          default:
            childElements = [];
            for (var k = 0; k < node.length; k++) {
              var temp = this.getTagName(elements[i], node[k]);
              childElements = childElements.concat(temp);
            };
            node = childElements;
            break;
        }
      };
      this.elements = node;
    } else {
      switch (args.charAt(0)) { //没有空格的字符串
        case '#':
          this.elements.push(this.getId(args.substring(1)));
          break;
        case '.':
          this.elements = this.getClass(args.substring(1));
          break;
        default:
          this.elements = this.getTagName(args)
      }
    }
  } else if (typeof args == 'object') { //是对象的话，把第一项元素赋值给参数
    if (args != undefined) {
      this.elements[0] = args;
    };
  } else if (typeof args == 'function') { //函数的话，执行DOM操作，在还没有加载图片或链接的时候先执行DOM操作
    this.ready(args);
  }
}


//先加载DOM节点
Base.prototype.ready = function(fn) {
  addDomLoaded(fn);
}



// 获取id
Base.prototype.getId = function(id) {
  return document.getElementById(id);
}


// 获取标签名
Base.prototype.getTagName = function(tag, parentNode) {
  var node = null;
  var temps = [];
  if (arguments.length == 2) { //长度为2，则把父节点赋值给node,在父节点下寻找元素，否则在document下查找
    node = parentNode;
  } else {
    node = document;
  }
  var tags = node.getElementsByTagName(tag);
  for (var i = 0; i < tags.length; i++) {
    temps.push(tags[i]);
  };
  return temps;
}


// 获取class节点
Base.prototype.getClass = function(className, parentNode) {
  var node = null;
  var temps = [];
  if (arguments.length == 2) {
    node = parentNode;
  } else {
    node = document;
  }
  var all = node.getElementsByTagName('*');
  for (var i = 0; i < all.length; i++) {
    if ((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className)) {
      temps.push(all[i]);
    };
  };
  return temps;
}


// 设置css选择器子节点
Base.prototype.find = function(str) {
  var childElements = [];
  for (var i = 0; i < this.elements.length; i++) {
    switch (str.charAt(0)) {
      case '#':
        childElements.push(this.getId(str.substring(1)));
        break;
      case '.':
        var temps = this.getClass(str.substring(1), this.elements[i]);
        for (var j = 0; j < temps.length; j++) {
          childElements.push(temps[j]);
        }
        break;
      default:
        var temps = this.getTagName(str, this.elements[i]);
        for (var j = 0; j < temps.length; j++) {
          childElements.push(temps[j]);
        }
    }
  }
  this.elements = childElements;
  return this;
}




// 获取某一个节点，并返回这个节点对象
Base.prototype.get = function(num) {
  return this.elements[num];
}


// 获取某一个节点，并返回这个节点对象的第一个
Base.prototype.first = function(num) {
  return this.elements[0];
}


// 获取某一个节点，并返回这个节点对象的最后一个
Base.prototype.last = function(num) {
  return this.elements[this.elements.length - 1];
}


// 获取某一个节点的长度
Base.prototype.length = function() {
  return this.elements.length;
}

// 获取某一个节点的属性
Base.prototype.attr = function(attr, value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 1) {
      return this.elements[i].getAttribute(attr);
    } else if (arguments.length == 2) {
      this.elements[i].setAttribute(attr, value);
    }
  }
  return this;
}

// 获取某一个节点在整个节点组中的索引
Base.prototype.index = function() {
  var children = this.elements[0].parentNode.children;
  for (var i = 0; i < children.length; i++) {
    if (this.elements[0] == children[i]) {
      return i;
    };
  };
}

// 设置某一个节点的透明度
Base.prototype.opacity = function(num) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.opacity = num / 100;
    this.elements[i].style.filter = 'alpha(opacity=' + num + ')'
  };
  return this;
}



// 获取某一个节点，并且返回Base对象
Base.prototype.eq = function(num) {
  var element = this.elements[num];
  return $(element);
}



// 获取某一个节点的上一个节点
Base.prototype.pre = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i] = this.elements[i].previousSibling;
    if (this.elements[i] == null) {
      throw new Error('找不到上一个同级元素节点');
    };
    if (this.elements[i].nodeType == 3) {
      this.pre();
    };
  }
  return this;
}



// 获取某一个节点的下一个节点
Base.prototype.next = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i] = this.elements[i].nextSibling;
    if (this.elements[i] == null) {
      throw new Error('找不到下一个同级元素节点');
    };
    if (this.elements[i].nodeType == 3) {
      this.next();
    };
  }
  return this;
}



// 设置css
Base.prototype.css = function(attr, value) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 1) { //w3c
      return getStyle(this.elements[i], attr);
    };
    this.elements[i].style[attr] = value; // 长度为1，直接获取，长度为2，赋值
  };
  return this;
}


// 设置动画
Base.prototype.animate = function(obj) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    var attr = obj['attr'] == 'x' ? 'left' :
      obj['attr'] == 'y' ? 'top' :
      obj['attr'] == 'w' ? 'width' :
      obj['attr'] == 'h' ? 'height' :
      obj['attr'] == 'o' ? 'opacity' :
      obj['attr'] != undefined ? obj['attr'] : 'left'; //设置方向
    var start = obj['start'] != undefined ? obj['start'] :
      obj['attr'] = 'opacity' ?
      parseFloat(getStyle(element, attr)) * 100 :
      parseInt(getStyle(element, attr));
    var step = obj['step'] != undefined ? obj['step'] : 10;
    var target = obj['target'];
    var alter = obj['alter']; //alter是增长量   
    var t = obj['t'] != undefined ? obj['t'] : 10;
    var speed = obj['speed'] != undefined ? obj['speed'] : 6;
    var type = obj['type'] == 0 ? 'constant' :
      obj['type'] == 1 ? 'buffer' : 'buffer'; //0表示匀速，1表示缓冲，默认缓冲
    var mul = obj['mul'];


    if (alter != undefined && target == undefined) {
      target = obj['alter'] + start;
    } else if (alter = undefined && target == undefined && mul == undefined) {
      throw newError('alter增量或target目标量必须有一个值');
    };


    if (start > target) { //如果初始值大于目标，则步数为负
      step = -step;
    };

    if (attr == 'opacity') {
      element.style.opacity = parseInt(start) / 100;
      element.style.filter = 'alpha(opacity=' + parseInt(start) + ')';
    } else {
      element.style[attr] = start + 'px';
    }

    if (mul == undefined) {
      mul = {};
      mul[attr] = target;
    };



    clearInterval(element.timer)
    element.timer = setInterval(function() {
      var isflag = true;
      for (var i in mul) {
        attr = i == 'x' ? 'left' : i == 'y' ? 'top' :
          i == 'w' ? 'width' : i == 'h' ? 'height' :
          i == 'o' ? 'opacity' : i !== undefined ? i : 'left';
        target = mul[i];
        if (type == 'buffer') {
          step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
            (target - parseInt(getStyle(element, attr))) / speed;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
        };


        if (attr == 'opacity') {

          if (step == 0) {
            setOpacity()
          } else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
            setOpacity()
          } else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
            setOpacity()
          } else {
            var temps = parseFloat(getStyle(element, attr)) * 100;
            element.style.opacity = parseInt(temps + step) / 100;
            element.style.filter = 'alpha(opacity=' + parseInt(temps + step) + ')';
          }
          if (parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)) {
            isflag = false;
          };
        } else {
          if (step == 0) {
            setStep();
          } else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
            setStep();
          } else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
            setStep();
          } else {
            element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
          }
          if (parseInt(target) != parseInt(getStyle(element, attr))) {
            isflag = false;
          };
        }
      }

      if (isflag) {
        clearInterval(element.timer);
        if (obj.fn) {
          obj.fn();
        };
      };



    }, t);


    function setStep() {
      element.style[attr] = target + 'px';
    }


    function setOpacity() {
      element.style.opacity = parseInt(target) / 100;
      element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
    }

  };
  return this;
}





// 添加css属性
Base.prototype.addClass = function(className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (!hasClass(this.elements[i], className)) {
      this.elements[i].className += " " + className;
    }
  }
  return this;
}


// 移除属性
Base.prototype.removeClass = function(className) {
  for (var i = 0; i < this.elements.length; i++) {
    if (hasClass(this.elements[i], className)) {
      this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '')
    };
  }
  return this;
}



// 增加外部css样式
Base.prototype.addRule = function(num, selectorText, cssText, position) {
  var sheet = document.styleSheets[num];
  insertRule(sheet, selectorText, cssText, position);
  return this;
}


// 删除css外部样式
Base.prototype.removeRule = function(num, index) {
  var sheet = document.styleSheets[num];
  deleteRule(sheet, index);
  return this;
}


// 设置表单字段
Base.prototype.form = function(name) {
  for (var i = 0; i < this.elements.length; i++) {
    if(this.elements[i][name]) {
      this.elements[i] = this.elements[i][name];
    }
  };
  return this;
}



// 设置表单内容获取
Base.prototype.value = function(str) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].value;
    };
    this.elements[i].value = str;
  };
  return this;
}





// 设置innerhtml
Base.prototype.html = function(str) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return this.elements[i].innerHTML;
    };
    this.elements[i].innerHTML = str;
  };
  return this;
}


// 设置innerText
Base.prototype.text = function(text) {
  for (var i = 0; i < this.elements.length; i++) {
    if (arguments.length == 0) {
      return getInnerText(this.elements[i]);
    };
    setInnerText(this.elements[i], text)
  };
  return this;
}


// 设置事件发生器
Base.prototype.bind = function(event, fn) {
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i], event, fn);
  };
  return this;
}




// hover事件
Base.prototype.hover = function(over, out) {
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i], 'mouseenter', over);
    addEvent(this.elements[i], 'mouseleave', out);
  };
  return this
}


// 设置点击切换方法
Base.prototype.toggle = function() {

  for (var i = 0; i < this.elements.length; i++) {
    (function(element, args) {
      var count = 0;
      addEvent(element, 'click', function() {
        args[count++ % (args.length)].call(this);
      });
    })(this.elements[i], arguments)
  };
  return this;
}


// 设置显示事件
Base.prototype.show = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'block';
  };
  return this;
}

// 设置隐藏事件
Base.prototype.hide = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
  };
  return this;
}


// 设置center
Base.prototype.center = function(width, height) {
  var left = (getInner().width - width) / 2 + getScroll().left;
  var top = (getInner().height - height) / 2 + getScroll().top;
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.top = top + 'px';
    this.elements[i].style.left = left + 'px';
  };
  return this;
}


// 设置浏览器窗口事件
Base.prototype.resize = function(fn) {
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i]; //窗口放大缩小时元素保持可见
    addEvent(window, 'resize', function() {
      fn;
      if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth) {
        element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
        if (element.offsetLeft<=0+getScroll().left) {
          element.style.left=0+getScroll().left+'px';
        };
      };
      if (element.offsetTop > getInner().height + getScroll().top - element.offsetHeight) {
        element.style.top = getInner().height + getScroll().top - element.offsetHeight + 'px';
        if (element.offsetTop<=0+getScroll().top) {
          element.style.top=0+getScroll().top+'px';
        };
      };
    })
  }
  return this;
}



// 设置点击事件
Base.prototype.click = function(fn) {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].onclick = fn;
  }
  return this;
}

// 锁屏
Base.prototype.lock = function() {
  for (var i = 0; i < this.elements.length; i++) {
    fixScroll.top=getScroll().top;
    fixScroll.left=getScroll().left;
    this.elements[i].style.width = getInner().width + getScroll().left + 'px';
    this.elements[i].style.height = getInner().height + getScroll().top + 'px';
    this.elements[i].style.display = 'block';
    parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' :
     document.documentElement.style.overflow = 'hidden';

    addEvent(this.elements[i],'mousedown',preDef);
    addEvent(this.elements[i],'mouseup',preDef);
    addEvent(this.elements[i],'selectstart',preDef);
    addEvent(window,'scroll',fixScroll);


  }
  return this;
}



// 解锁
Base.prototype.unlock = function() {
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].style.display = 'none';
    parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : 
    document.documentElement.style.overflow = 'auto';
    removeEvent(this.elements[i],'mousedown',preDef);
    removeEvent(this.elements[i],'mouseup',preDef);
    removeEvent(this.elements[i],'selectstart',preDef);
    removeEvent(window,'scroll',fixScroll);

  }
  return this;
}


// 插件入口
Base.prototype.extend = function(name, fn) {
  Base.prototype[name] = fn;
}
