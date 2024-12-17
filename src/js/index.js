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
    const features = document.querySelectorAll('.feature');

    const rect = vinyleSection.getBoundingClientRect();

    // Vérifie si la section est visible
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrollPosition = window.scrollY - vinyleSection.offsetTop;
        const rotation = scrollPosition * 0.5; // Ajuster le facteur pour la vitesse de rotation
        vinyle.style.transform = `rotate(${rotation}deg)`;

        // Synchronise les caractéristiques avec le défilement
        features.forEach((feature, index) => {
            const offset = index * 100; // Décalage entre chaque caractéristique
            const featurePosition = scrollPosition - offset;

            if (featurePosition > 0 && featurePosition < 200) {
                feature.style.opacity = 1;
                feature.style.transform = 'translateY(0)';
            } else {
                feature.style.opacity = 0;
                feature.style.transform = 'translateY(50px)';
            }
        });
    } else {
        vinyle.style.transform = 'rotate(0deg)'; // Réinitialise la rotation
    }
});

