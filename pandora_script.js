
//Auto Scroll
if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
    document.addEventListener("DOMMouseScroll", MouseWheelHandler, false); //Firefox
  } else {
    document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
  }
  
  var i = 1;
  var mouseWheel = true;
  function MouseWheelHandler(e) {
    if (!mouseWheel) {
      return false;
    }
    mouseWheel = false;
    setTimeout(function() {
      mouseWheel = true;
    }, 1500); // Stop mouse wheel event for 3 seconds
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    var h = window.innerHeight;
    var section = document.getElementsByClassName("section");
    console.log(i);
    if (i <= section.length && i >= 0) {
      //scrolling down?
      if (delta < 0) {
        window.scrollTo({
          top: h * i,
          behavior: "smooth"
        });
        i++;
      } else {
        //scrolling up?
        window.scrollTo({
          top: h * i,
          behavior: "smooth"
        });
        i--;
      }
    } else {
      i = 1;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

//Slide 1 Color switch
