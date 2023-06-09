// Preloader
window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.style.display = "none";
  }, 500);
});

// Section Indicator Animation
function handleIndicatorVisibility() {
  var sectionContainer = document.getElementById("section-container");
  var currentSection = getCurrentSection();

  if (currentSection && currentSection.id !== "section1") {
    sectionContainer.style.display = "block";
    sectionContainer.classList.add("fade-left");
    sectionContainer.classList.remove("fade-right");
  } else {
    sectionContainer.classList.remove("fade-left");
    sectionContainer.classList.add("fade-right");
    setTimeout(function() {
      sectionContainer.style.display = "none";
    }, 500); // Adjust the delay if needed
  }
}

// Smooth scrolling effect
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var scrollY = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function - easeInOutCubic
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

 requestAnimationFrame(animation);
  
  // Call handleIndicatorVisibility after scrolling
  setTimeout(function() {
    handleIndicatorVisibility();
  }, duration);
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  handleSectionVisibility();
});

window.addEventListener("scroll", function () {
  handleSectionVisibility();
});

// Smooth scroll to sections
var links = document.querySelectorAll(".smooth-scroll");

links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var target = this.getAttribute("href");
    var duration = 1000;
    smoothScroll(target, duration);
  });
});
