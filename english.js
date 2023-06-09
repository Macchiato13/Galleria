window.addEventListener("load", function() {
  // Restore the scroll position
  var scrollPosition = sessionStorage.getItem("scrollPosition");
  window.scrollTo(0, scrollPosition);

  // Remove preloader after animation finishes
  setTimeout(function() {
    var preloader = document.getElementById("preloader");
    preloader.style.opacity = "0"; /* Set opacity to 0 for smooth transition */
    preloader.style.pointerEvents = "none"; /* Disable pointer events to prevent interaction */

    // Reveal all sections
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.add("visible");
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Return to section1 after refresh
    window.scrollTo(0, document.getElementById("section1").offsetTop);

    // Call handleIndicatorVisibility after preloader removal
    handleIndicatorVisibility();
  }, 1600); // Total delay from start to end of preloader animation
});

function handleScroll() {
  // Delay invoking handleIndicatorVisibility to throttle the scroll event
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(function() {
    handleIndicatorVisibility();
  }, 100);
}

// Define the sound element
var soundElement = document.getElementById("sound3");
var activeBulletIndex = -1; // Track the index of the active bullet

function handleIndicatorVisibility() {
  var sectionIndicator = document.getElementById("section-indicator");
  var sectionIndicatorBullets = document.querySelectorAll(".indicator-bullet");
  var currentSection = getCurrentSection();

  // Reset all bullets to initial state
  sectionIndicatorBullets.forEach(function (bullet) {
    bullet.classList.remove("previous", "next", "active");
    bullet.style.display = "none"; // Hide all bullets initially
  });

  if (currentSection && currentSection.id !== "section1") {
    sectionIndicator.classList.remove("get-out");
    sectionIndicator.classList.add("get-in");

    var currentIndex = Array.from(sectionIndicatorBullets).findIndex(function (bullet) {
      return bullet.getAttribute("data-target") === currentSection.id;
    });

    if (currentIndex > -1) {
      sectionIndicatorBullets[currentIndex].classList.add("active");

      var maxVisibleBullets = 3;
      var startIndex = Math.max(0, currentIndex - Math.floor(maxVisibleBullets / 2));
      var endIndex = Math.min(sectionIndicatorBullets.length - 1, startIndex + maxVisibleBullets - 1);

      for (var i = startIndex; i <= endIndex; i++) {
        var bullet = sectionIndicatorBullets[i];
        bullet.style.display = "flex";

        if (i === currentIndex) {
          bullet.style.opacity = "1";

          if (i !== activeBulletIndex && currentSection.id !== "section1") {
            // Play the sound effect only when the active bullet shifts and not in section1
            soundElement.play();
          }
          activeBulletIndex = i;
        } else {
          bullet.style.opacity = "0.4";
        }
      }
    }
  } else {
    sectionIndicator.classList.add("get-out");
    activeBulletIndex = -1; // Reset the active bullet index when transitioning back to section1
  }
}

// Wait for the page to load before initializing
window.addEventListener("load", function () {
  activeBulletIndex = -1; // Reset the active bullet index on page load
});

// Add scroll event listener to handle indicator visibility
window.addEventListener("scroll", handleIndicatorVisibility);

function getCurrentSection() {
  var sections = document.getElementsByClassName("section");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  var windowHeight = window.innerHeight;
  var currentSection = null;

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop;
    var sectionBottom = sectionTop + section.offsetHeight;

    // Adjust sectionTop and sectionBottom based on scroll position and window height
    if (sectionTop > scrollPosition + windowHeight / 2) {
      sectionBottom = sectionTop + windowHeight;
    } else if (sectionBottom < scrollPosition + windowHeight / 2) {
      sectionTop = sectionBottom - windowHeight;
    }

    // Adjust sectionTop and sectionBottom to account for header height (if needed)
    var header = document.querySelector(".header");
    var headerHeight = header ? header.offsetHeight : 0;
    sectionTop -= headerHeight;
    sectionBottom -= headerHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section;
      break;
    }
  }

  return currentSection;
}

// Smooth scrolling effect
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var scrollY = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Call smoothScroll function when clicking on an indicator-bullet
var indicatorBullets = document.querySelectorAll(".indicator-bullet");

indicatorBullets.forEach(function (bullet) {
  bullet.addEventListener("click", function () {
    var target = this.getAttribute("data-target");
    smoothScroll(target, 1000);
  });
});

var hoverSound = document.getElementById('sound1');

function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play();
}

var dropdown = document.querySelector('.dropdown-author');

dropdown.addEventListener('mouseenter', playHoverSound);

var clickSound = document.getElementById('sound2');
var indicatorIcon = document.querySelector('.indicator-link');

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

indicatorIcon.addEventListener('click', playClickSound);

var indicatorBullets = document.querySelectorAll('.indicator-bullet');
var activeSound = document.getElementById('sound3');

function playActiveSound() {
  activeSound.currentTime = 0;
  activeSound.play();
}

// Add event listener to each indicator bullet
indicatorBullets.forEach(function(indicatorBullet) {
  indicatorBullet.addEventListener('click', function() {
    // Check if the clicked bullet doesn't have the 'active' class
    if (!this.classList.contains('active')) {
      playActiveSound();
    }
  });
});
