var slideIndex = {
  tabel: 1,
  tabel1: 1,
  ct3_container: 1,
  picture_cont: 1,
  picture_cont1: 1,
  text_cont: 1,
  content4: 1,
  image_ctn: 1,
  image_ctn1: 1,
  image_ctn2: 1,
  image_ctn3: 1,
  slide2: 1

};

showSlides('tabel', slideIndex.tabel);
showSlides('tabel1', slideIndex.tabel1);
showSlides('ct3_container', slideIndex.ct3_container);
showSlides('picture_cont', slideIndex.picture_cont);
showSlides('picture_cont1', slideIndex.picture_cont1);
showSlides('text_cont', slideIndex.text_cont);
showSlides('content4', slideIndex.content4);
showSlides('image_ctn', slideIndex.image_ctn);
showSlides('image_ctn1', slideIndex.image_ctn1);
showSlides('image_ctn2', slideIndex.image_ctn2);
showSlides('image_ctn3', slideIndex.image_ctn3);
showSlides('slide2', slideIndex.slide2);

function plusSlides(n, tableClass) {
  fadeOutSlides(n, tableClass);
}

function fadeInSlides(n, tableClass) {
  var slides = document.getElementsByClassName(tableClass);
  var nextSlide = slides[slideIndex[tableClass] - 1];

  nextSlide.style.opacity = 0;
  nextSlide.style.display = "flex";

  setTimeout(function() {
    nextSlide.style.transition = "opacity 0.5s";
    nextSlide.style.opacity = 1;
  }, 100);

  setTimeout(function() {
    nextSlide.style.transition = ""; // Reset transition property
  }, 600);
}

function fadeOutSlides(n, tableClass) {
  var slides = document.getElementsByClassName(tableClass);
  var currentSlide = slides[slideIndex[tableClass] - 1];

  currentSlide.style.transition = "opacity 0.5s";
  currentSlide.style.opacity = 0;

  setTimeout(function() {
    currentSlide.style.display = "none";
    slideIndex[tableClass] += n;
    showSlides(tableClass, slideIndex[tableClass]);
    fadeInSlides(n, tableClass);
  }, 600);
}

function currentSlide(n, tableClass) {
  fadeOutSlides(n - slideIndex[tableClass], tableClass);
}

function showSlides(tableClass, n) {
  var i;
  var slides = document.getElementsByClassName(tableClass);
  var dots = document.getElementsByClassName(
    tableClass === 'tabel' ? 'dot' : tableClass === 'tabel1' ? 'dot1' : tableClass === 'ct3_container' ? 'dot2' : tableClass === 'picture_cont' ? 'dot3' : tableClass === 'picture_cont1' ? 'dot4' : tableClass === 'text_cont' ? 'dot5' : tableClass === 'content4' ? 'dot6' : tableClass === 'image_ctn' ? 'dot7' : tableClass === 'image_ctn1' ? 'dot8' : tableClass === 'image_ctn2' ? 'dot9' : tableClass === 'image_ctn3' ? 'dot10' : 'dot11'
);


  if (n > slides.length) {
    slideIndex[tableClass] = 1;
  } else if (n < 1) {
    slideIndex[tableClass] = slides.length;
  } else {
    slideIndex[tableClass] = n;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.opacity = 0;
    slides[i].style.transition = "";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex[tableClass] - 1].style.display = "flex";
  slides[slideIndex[tableClass] - 1].style.opacity = 1;
  dots[slideIndex[tableClass] - 1].className += " active";
}


// Non Function 
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active1");
    } else {
      reveals[i].classList.remove("active1");
    }
  }
}
window.addEventListener("scroll", reveal);
// To check the scroll position on page load
reveal();
// Non-Function 

