const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('header nav a');
const subtitleElement = document.querySelector('.subtitle');
const subtitles = ["Web Developer", "Software Developer", "Android App Developer"];
let subtitleIndex = 0;

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Smooth scroll for navigation links
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }

                // Update active class in navigation
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Update active class on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3) && scrollY < (sectionTop + sectionHeight - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        } else if (current === '' && link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
});

// Change subtitle text every second
setInterval(() => {
    subtitleElement.textContent = subtitles[subtitleIndex];
    subtitleIndex = (subtitleIndex + 1) % subtitles.length;
}, 1000);
