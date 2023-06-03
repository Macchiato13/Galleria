// Unlocker
document.addEventListener('DOMContentLoaded', function() {
    var section1 = document.getElementById('header');
    var section2 = document.getElementById('section1');
  
    // Add event listener to section1's animation end
    section1.addEventListener('animationend', function() {
      // Delay the removal of the hidden class from section2
    setTimeout(function() {
        section2.classList.remove('hidden');
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    });
  });

// Text Generation 
document.addEventListener('DOMContentLoaded', function() {
    var generateBtn = document.getElementById('generate-btn');
    var textBox = document.getElementById('text-box');
    
    var textList = [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor incididunt",
      "Ut labore et dolore magna aliqua",
      "Ut enim ad minim veniam",
      "Quis nostrud exercitation ullamco",
      "Laboris nisi ut aliquip ex ea commodo consequat"
    ];
    
    generateBtn.addEventListener('click', function() {
      var randomIndex = Math.floor(Math.random() * textList.length);
      var randomText = textList[randomIndex];
      textBox.textContent = randomText;
    });
  });
  