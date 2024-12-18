ScrollReveal().reveal('.headline');

ScrollReveal().reveal('.titre', {
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
let fakeScroll = 0; 
let sectionHeight = 100; 
let isLocked = false; 
let videoEnded = false; 

const isSectionCentered = () => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    return sectionTop >= -0.3 * windowHeight && sectionTop <= 0.3 * windowHeight;
};

const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY); 

    if (isSectionCentered() || isLocked) {
        if (!isLocked) {
            document.body.style.overflow = "hidden";
            isLocked = true;
        }

        fakeScroll += delta * 2; 
        fakeScroll = Math.min(Math.max(fakeScroll, 0), sectionHeight); 

        const progress = fakeScroll / sectionHeight; 
        if (!isNaN(video.duration)) {
            const newTime = progress * video.duration;
            video.currentTime = Math.min(newTime, video.duration); 
        }

        if (fakeScroll === sectionHeight) {
            videoEnded = true;
            isLocked = false;
            document.body.style.overflow = "visible";
        }

        if (fakeScroll === 0 && delta < 0) {
            videoEnded = false;
            isLocked = false;
            document.body.style.overflow = "visible";
        }
    } else {
        document.body.style.overflow = "visible";
        isLocked = false;
    }
};

window.addEventListener("wheel", handleScroll, { passive: false });

window.addEventListener("resize", () => {
    sectionHeight = section.offsetHeight;
});



// vinyle 
const vinyle = document.querySelector('.vinyle');

let rotation = 0; 
let isHovering = false; 

function disableScroll() {
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
}

function enableScroll() {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('keydown', preventScrollKeys);
}

function preventScroll(event) {
    if (!isHovering) return;
    event.preventDefault(); 
    rotation += event.deltaY > 0 ? 10 : -10; 
    vinyle.style.transform = `rotate(${rotation}deg)`; 
}

function preventScrollKeys(event) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; 
    if (!isHovering || !keys.includes(event.keyCode)) return; 
    event.preventDefault();
}

vinyle.addEventListener('mouseenter', () => {
    isHovering = true;
    disableScroll(); 
});

vinyle.addEventListener('mouseleave', () => {
    isHovering = false;
    enableScroll(); 
});



