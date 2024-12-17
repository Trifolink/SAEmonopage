ScrollReveal().reveal('.headline');

ScrollReveal().reveal('.titre', {
    // distance: '400px',
    distance: '340%',
    opacity: 1,
    duration: 0,
    reset: true,
    scale: 1,
    easing: 'ease-out',
    beforeReveal: function (el) {
        el.style.position = 'fixed';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
    },

    // afterReveal: function (el) {
    //     el.style.position = 'fixed';
    //     el.style.left = '50%';
    //     el.style.transform = 'translateX(50%)';
    // }

});

// Chargement de page
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);
});


// Bas de page
// Liste des statistiques à afficher
document.addEventListener('scroll', () => {
    const vinyleSection = document.getElementById('vinyle-section');
    const vinyle = document.querySelector('.vinyle');

    const rect = vinyleSection.getBoundingClientRect();

    // Vérifie si la section est visible
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollPosition = window.scrollY - vinyleSection.offsetTop;
        const rotation = scrollPosition * 0.5; // Ajuster le facteur pour la vitesse de rotation
        vinyle.style.transform = `rotate(${rotation}deg)`;
    } else {
        vinyle.style.transform = 'rotate(0deg)'; // Réinitialise la rotation
    }
});

