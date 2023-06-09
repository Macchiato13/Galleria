// Preloader
window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.style.display = "none";
  }, 500);
});

// Section Indicator Animation
function handleSectionVisibility() {
  var sectionIndicator = document.getElementById("section-indicator");
  var currentSection = getCurrentSection();

  if (currentSection && currentSection.id !== "section1") {
    sectionIndicator.style.display = "block";
    sectionIndicator.classList.add("fade-left");
    sectionIndicator.classList.remove("fade-right");
  } else {
    sectionIndicator.classList.remove("fade-left");
    sectionIndicator.classList.add("fade-right");
    setTimeout(function () {
      sectionIndicator.style.display = "none";
    }, 500);
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

// Get the current visible section
function getCurrentSection() {
  var sections = document.getElementsByClassName("section");
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  var currentSection = null;

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionBottom = sectionTop + sectionHeight;

    var isSectionVisible = sectionTop <= scrollPosition + (windowHeight / 2) && sectionBottom >= scrollPosition + (windowHeight / 2);

    if (isSectionVisible) {
      currentSection = section;
      break;
    }
  }

  return currentSection;
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
