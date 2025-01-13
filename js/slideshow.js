document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slideshow img");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length; // Ga naar de volgende afbeelding
    images[currentIndex].classList.add("active");
  }

  // Toon de eerste afbeelding bij het laden van de pagina
  images[currentIndex].classList.add("active");

  // Wissel elke 5 seconden naar de volgende afbeelding
  setInterval(showNextImage, 5000);
});
