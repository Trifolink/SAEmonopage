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




// histoire

const video = document.querySelector(".background-video");
const section = document.querySelector("#histoire");
let fakeScroll = 0; // Position simulée (en %)
let sectionHeight = 100; // Hauteur logique de la section (100% pour la vidéo)
let isLocked = false; // Si la section bloque le scroll
let videoEnded = false; // Si la vidéo est terminée

// Détecte si la section a atteint environ 30% du bas de la fenêtre
const isSectionCentered = () => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Déclenche le comportement quand la section atteint environ 30% de la hauteur de la fenêtre
    return sectionTop >= -0.3 * windowHeight && sectionTop <= 0.3 * windowHeight;
};

const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY); // Détecte haut/bas (-1 ou +1)

    if (isSectionCentered() || isLocked) {
        // Bloquer le scroll natif lorsque la section est centrée
        if (!isLocked) {
            document.body.style.overflow = "hidden";
            isLocked = true;
        }

        // Mise à jour de la progression
        fakeScroll += delta * 2; // Ajuste la vitesse (2 est ajustable)
        fakeScroll = Math.min(Math.max(fakeScroll, 0), sectionHeight); // Limite à 0-100%

        const progress = fakeScroll / sectionHeight; // Convertit en %
        if (!isNaN(video.duration)) {
            video.currentTime = progress * video.duration; // Synchronise avec le scroll
        }

        // Libérer le scroll si la vidéo est terminée (en bas)
        if (fakeScroll === sectionHeight) {
            videoEnded = true;
            isLocked = false;
            document.body.style.overflow = "visible";
        }

        // Libérer le scroll si la vidéo est revenue au début (en haut)
        if (fakeScroll === 0 && delta < 0) {
            videoEnded = false;
            isLocked = false;
            document.body.style.overflow = "visible";
        }
    } else {
        // Autoriser le scroll natif hors de la section
        document.body.style.overflow = "visible";
        isLocked = false;
    }
};

// Écoute le scroll
window.addEventListener("wheel", handleScroll, { passive: false });

// Ajuste la section si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    sectionHeight = section.offsetHeight;
});
