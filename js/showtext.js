document.addEventListener("DOMContentLoaded", function () {
  // Maak een nieuwe IntersectionObserver aan
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Als de sectie in beeld komt (threshold 50% van de sectie zichtbaar)
        if (entry.isIntersecting) {
          // wacht 1 seconde
          setTimeout(function () {
            entry.target.querySelector("h1").classList.add("animate"); // Voeg de animatie class toe aan h1
            // Wacht 1 seconde voor de tekst om in beeld te komen
            setTimeout(function () {
              entry.target.querySelector("p").classList.add("animate"); // Voeg de animatie class toe aan de p
            }, 300); // Dit zorgt ervoor dat de p 0.5s later komt
            observer.unobserve(entry.target); // Stop de observatie nadat de animatie is gestart
          }, 600);
        }
      });
    },
    {
      threshold: 0.5, // 50% van de sectie moet zichtbaar zijn om de animatie te starten
    }
  );

  // Observeer de welkomstsectie
  const welcomeText = document.querySelector(".welcome-text");
  if (welcomeText) {
    observer.observe(welcomeText);
  }
});
