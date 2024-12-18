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
            const newTime = progress * video.duration;
            // Empêche la vidéo de revenir en arrière après avoir atteint la dernière frame
            video.currentTime = Math.min(newTime, video.duration); // Assure qu'elle ne dépasse pas la durée
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



// vinyle 
// Sélectionne l'image du vinyle
const vinyle = document.querySelector('.vinyle');

let rotation = 0; // Variable pour suivre la rotation
let isHovering = false; // Flag pour détecter le hover

// Fonction pour désactiver le scroll global tout en laissant le vinyle réagir
function disableScroll() {
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
}

// Fonction pour réactiver le scroll global
function enableScroll() {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('keydown', preventScrollKeys);
}

// Empêche le comportement de scroll global
function preventScroll(event) {
    if (!isHovering) return; // Si on ne survole pas l'image, on laisse le scroll normal
    event.preventDefault(); // Bloque le scroll de la page
    rotation += event.deltaY > 0 ? 10 : -10; // Ajuste la rotation selon la direction du scroll
    vinyle.style.transform = `rotate(${rotation}deg)`; // Applique la rotation
}

// Empêche le scroll via les touches clavier (flèches, espace, etc.)
function preventScrollKeys(event) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Codes des touches de défilement
    if (!isHovering || !keys.includes(event.keyCode)) return; // Bloque uniquement si le hover est actif
    event.preventDefault();
}

// Activer l'effet de hover et désactiver le scroll global
vinyle.addEventListener('mouseenter', () => {
    isHovering = true;
    disableScroll(); // Désactiver le scroll global
});

// Désactiver l'effet de hover et réactiver le scroll global
vinyle.addEventListener('mouseleave', () => {
    isHovering = false;
    enableScroll(); // Réactiver le scroll global
});
