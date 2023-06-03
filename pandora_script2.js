var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  fadeOutSlides(n);
}

function fadeInSlides(n) {
  var slides = document.getElementsByClassName("tabel");
  var nextSlide = slides[slideIndex - 1];

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

function fadeOutSlides(n) {
  var slides = document.getElementsByClassName("tabel");
  var currentSlide = slides[slideIndex - 1];

  currentSlide.style.transition = "opacity 0.5s";
  currentSlide.style.opacity = 0;

  setTimeout(function() {
    currentSlide.style.display = "none";
    slideIndex += n;
    showSlides(slideIndex);
    fadeInSlides(n);
  }, 600);
}

function currentSlide(n) {
  fadeOutSlides(n - slideIndex);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("tabel");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  } else if (n < 1) {
    slideIndex = slides.length;
  } else {
    slideIndex = n;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.opacity = 0;
    slides[i].style.transition = "";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].style.opacity = 1;
  dots[slideIndex - 1].className += " active";
}
