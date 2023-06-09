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

    // Initialize AOS
    AOS.init({
      once: true, // Only animate elements once
      offset: 50, // Offset (in pixels) from the top of the element to start the animation
      duration: 800, // Duration of the animation (in milliseconds)
    });
  }, 1600); // Total delay from start to end of preloader animation
});

function handleScroll() {
  // Delay invoking handleIndicatorVisibility to throttle the scroll event
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(function() {
    handleIndicatorVisibility();
  }, 100);
}

function handleIndicatorVisibility() {
  var sectionIndicator = document.getElementById("section-indicator");
  var sectionIndicatorBullets = document.querySelectorAll(".indicator-bullet");
  var currentSection = getCurrentSection();

  // Hide all bullets initially
  sectionIndicatorBullets.forEach(function(bullet) {
    bullet.style.display = "none";
    bullet.style.opacity = "1"; // Reset opacity
    bullet.classList.remove("previous", "next", "active"); // Remove classes
  });

  if (currentSection && currentSection.id !== "section1") {
    sectionIndicator.style.display = "block";

    // Get the index of the current section
    var currentIndex = Array.from(sectionIndicatorBullets).findIndex(function(bullet) {
      return bullet.getAttribute("data-target") === currentSection.id;
    });

    if (currentIndex > -1) {
      // Show the current bullet
      sectionIndicatorBullets[currentIndex].style.display = "block";
      sectionIndicatorBullets[currentIndex].classList.add("active");

      // Calculate the start and end indices for visible bullets
      var maxVisibleBullets = 3;
      var startIndex = Math.max(0, currentIndex - 1);
      var endIndex = Math.min(sectionIndicatorBullets.length - 1, startIndex + maxVisibleBullets - 1);

      // Show the previous bullets with 40% opacity
      for (var i = startIndex; i < currentIndex; i++) {
        sectionIndicatorBullets[i].style.display = "block";
        sectionIndicatorBullets[i].classList.add("previous");
      }

      // Show the next bullets with 40% opacity
      for (var j = currentIndex + 1; j <= endIndex; j++) {
        sectionIndicatorBullets[j].style.display = "block";
        sectionIndicatorBullets[j].classList.add("next");
      }
    }
  } else {
    sectionIndicator.style.display = "none";
  }

  handleSectionVisibility(currentSection);
}

function handleSectionVisibility(currentSection) {
  var sections = document.getElementsByClassName("section");

  // Loop through all sections
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];

    if (section === currentSection) {
      if (section.id === "section1") {
        // Fade out the current section
        section.classList.add("fade-out");
      } else {
        // Fade in other sections
        section.classList.remove("fade-out");
      }
    } else {
      // Fade in other sections
      section.classList.remove("fade-out");
    }
  }
}

// Call handleIndicatorVisibility() initially to set the initial state
handleIndicatorVisibility();

// Call handleIndicatorVisibility() on window resize and scroll events
window.addEventListener("resize", handleIndicatorVisibility);
window.addEventListener("scroll", handleIndicatorVisibility);

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

