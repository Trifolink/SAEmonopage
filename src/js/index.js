ScrollReveal().reveal('.headline');

// Animation d'entrée initiale (descend du haut)
ScrollReveal().reveal('.titre', {
    distance: '50px',   // Déplacement vertical
    origin: 'top',      // Vient du haut
    duration: 1000,     // Durée de l'entrée
    delay: 300,         // Délai avant l'animation
    easing: 'ease-out', // Transition fluide
    reset: true         // L'animation se rejoue si on remonte
});

// Animation de sortie (remonte et disparaît au scroll)


