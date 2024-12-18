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

// Fonction pour vérifier si la section est centrée dans la fenêtre
const isSectionCentered = () => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Vérifie si la section qui contient la vidéo est centrée dans la fenêtre
    return sectionTop >= -0.2 * windowHeight && sectionTop <= 0.2 * windowHeight;
};

// Fonction pour gérer le scroll
const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY); // Détecte le sens du scroll (haut ou bas)

    // Bloquer le scroll si la section est centrée ou si la vidéo est en cours
    if (isSectionCentered() || isLocked) {
        if (!isLocked) {
            document.body.style.overflow = "hidden"; // Empêche le scroll pendant la lecture
            isLocked = true;
        }

        // Mise à jour de la progression de la vidéo en fonction du scroll
        fakeScroll += delta * 2; // Ajuste la vitesse du scroll (2 est un facteur ajustable)
        fakeScroll = Math.min(Math.max(fakeScroll, 0), sectionHeight); // Limite à 0-100%

        const progress = fakeScroll / sectionHeight; // Convertit la position simulée en pourcentage

        if (!isNaN(video.duration)) {
            video.currentTime = progress * video.duration; // Synchronise la vidéo avec le scroll
        }

        // Si la vidéo est terminée, on la bloque sur la dernière frame
        if (fakeScroll === sectionHeight) {
            videoEnded = true;
            video.currentTime = video.duration; // Figer la vidéo sur la dernière frame
            isLocked = false;
            document.body.style.overflow = "visible"; // Permettre le scroll normal de la page
        }

        // Si l'utilisateur scroll vers le haut et que la vidéo est revenue au début
        if (fakeScroll === 0 && delta < 0) {
            videoEnded = false;
            isLocked = false;
            document.body.style.overflow = "visible"; // Permettre le scroll normal de la page
        }
    } else {
        // Autoriser le scroll natif lorsque la section n'est pas centrée dans la fenêtre
        document.body.style.overflow = "visible";
        isLocked = false;
    }
};

// Écouteur pour le scroll
window.addEventListener("wheel", handleScroll, { passive: false });

// Ajuste la section si la fenêtre est redimensionnée
window.addEventListener("resize", () => {
    sectionHeight = section.offsetHeight;
});
