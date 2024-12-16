ScrollReveal().reveal('.headline');

ScrollReveal().reveal('.titre', {
    // distance: '400px',
    distance: '350%',
    opacity: 1,
    duration: 0,
    reset: true,
    scale: 1,
    easing: 'ease-out',
    beforeReveal: function (el) {
        el.style.position = 'fixed';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
    }

});

// Chargement de page
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 2000);
});

// Bas de page
// Liste des statistiques à afficher
const stats = [
    "Statistique 1",
    "Statistique 2",
    "Statistique 3",
    "Statistique 4",
];

const statsElement = document.querySelector('.stats');

let lastScroll = 0; // Pour suivre la position du scroll

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Calcule quelle statistique afficher en fonction du scroll
    const index = Math.floor(scrollTop / 200) % stats.length;

    // Change le contenu si nécessaire
    if (index !== lastScroll) {
        statsElement.textContent = stats[index];
        lastScroll = index;
    }
});

