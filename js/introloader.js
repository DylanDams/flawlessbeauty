document.addEventListener("DOMContentLoaded", function () {
  // Verberg de intro na 2 seconden, maar wacht tot de DOM geladen is
  setTimeout(function () {
    document.getElementById("intro").classList.add("swipe-out");
  }, 1500);
});

document.addEventListener("DOMContentLoaded", function () {
  // Wacht 1,5 seconden voordat het logo uitfade
  setTimeout(function () {
    document.querySelector(".intro-logo").style.opacity = 0;
  }, 1200); // 1,5 seconden wachten
});
