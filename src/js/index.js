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

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    // Simuler un chargement avec un délai (par exemple, 2s pour le test)
    setTimeout(() => {
        loader.style.display = "none"; // Cacher le loader
        content.style.display = "block"; // Afficher le contenu
    }, 2000); // Ajustez selon vos besoins
});

