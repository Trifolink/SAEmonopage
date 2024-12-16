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
