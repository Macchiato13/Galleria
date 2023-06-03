document.addEventListener("DOMContentLoaded", function() {
    const mainSection = document.querySelector(".main-section");
    const guestSection = document.querySelector(".guest-section");
  
    // Fade in effect for the main section
    mainSection.classList.add("fade-in");
  
    // Delay the transition to the guest section
    setTimeout(function() {
      // Smoothly fade out the main section
      mainSection.style.transition = "opacity 2s ease-out";
      mainSection.style.opacity = "0";
  
      // Remove the main section after the transition
      setTimeout(function() {
        mainSection.remove();
      }, 6000); // Delay the removal of main section for 1 second
  
      // Show the guest section after a delay
      setTimeout(function() {
        guestSection.classList.add("fade-in");
      }, 4000); // Delay the appearance of the guest section for 2 seconds
  
    }, 6000); // Delay the transition for 3 seconds
  
    // Prevent the title animation from playing separately
    title.style.animation = "none";
  });
  