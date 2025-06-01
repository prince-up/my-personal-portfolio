// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Contrast Toggle
const contrastToggle = document.querySelector('.contrast-toggle');

// Check for saved contrast preference
const savedContrast = localStorage.getItem('highContrast');
if (savedContrast === 'true') {
    body.classList.add('high-contrast');
}

contrastToggle.addEventListener('click', () => {
    body.classList.toggle('high-contrast');
    // Save preference
    localStorage.setItem('highContrast', body.classList.contains('high-contrast'));
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.style.display = isMenuOpen ? 'flex' : 'none';
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.navbar')) {
        isMenuOpen = false;
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            if (isMenuOpen) {
                isMenuOpen = false;
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Typing Animation
const dynamicText = document.querySelector('.dynamic-text');
const words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    // Add cursor effect
    dynamicText.innerHTML += '<span class="typing-cursor">|</span>';

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation
type();

// Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message with animation
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    contactForm.appendChild(successMessage);

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
        contactForm.reset();
    }, 3000);
});

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        
        if (isVisible) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }
    });
};

// Initial check for progress bars
animateProgressBars();

// Check progress bars on scroll
window.addEventListener('scroll', animateProgressBars);

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Initialize Particles
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3b82f6'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Enhanced Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const floatingIcons = document.querySelectorAll('.floating-icons i');
    
    if (heroSection) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * -0.5}px)`;
        
        floatingIcons.forEach((icon, index) => {
            const speed = 0.1 + (index * 0.05);
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Advanced Cursor Effect
const cursor = {
    el: document.querySelector('.cursor-trail'),
    x: 0,
    y: 0,
    targets: [],
    init() {
        this.targets = document.querySelectorAll('a, button, .project-card, .blog-card, .skill-card');
        this.bindEvents();
        this.animate();
    },
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
        
        this.targets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursor.style.transform = 'scale(1.5)';
            });
            
            target.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursor.style.transform = 'scale(1)';
            });
        });
    },
    animate() {
        const dx = this.x - this.cursor.x;
        const dy = this.y - this.cursor.y;
        
        this.cursor.x += dx * 0.1;
        this.cursor.y += dy * 0.1;
        
        this.cursor.style.left = this.cursor.x + 'px';
        this.cursor.style.top = this.cursor.y + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
};

cursor.init();

// Advanced Scroll Animations
const scrollAnimations = {
    init() {
        this.animateOnScroll();
        this.parallaxEffect();
        this.stickyHeader();
    },
    animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    if (entry.target.classList.contains('animate-once')) {
                        observer.unobserve(entry.target);
                    }
                } else if (!entry.target.classList.contains('animate-once')) {
                    entry.target.classList.remove('animated');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    },
    parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
            });
        });
    },
    stickyHeader() {
        const header = document.querySelector('.navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
};

scrollAnimations.init();

// Advanced Project Card Interactions
const projectInteractions = {
    init() {
        this.cards = document.querySelectorAll('.project-card');
        this.bindEvents();
    },
    bindEvents() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
            card.addEventListener('click', (e) => this.handleClick(e, card));
        });
    },
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const content = card.querySelector('.project-info');
        
        gsap.to(card, {
            duration: 0.3,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            ease: 'power2.out'
        });
        
        gsap.to(image, {
            duration: 0.3,
            z: 50,
            rotateX: rotateX * -0.5,
            rotateY: rotateY * -0.5,
            ease: 'power2.out'
        });
        
        gsap.to(overlay, {
            duration: 0.3,
            z: 75,
            rotateX: rotateX * -0.5,
            rotateY: rotateY * -0.5,
            ease: 'power2.out'
        });
        
        gsap.to(content, {
            duration: 0.3,
            z: 100,
            rotateX: rotateX * -0.5,
            rotateY: rotateY * -0.5,
            ease: 'power2.out'
        });
    },
    handleMouseLeave(e, card) {
        gsap.to(card, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'power2.out'
        });
        
        gsap.to(card.querySelectorAll('.project-image, .project-overlay, .project-info'), {
            duration: 0.5,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out'
        });
    },
    handleClick(e, card) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        card.appendChild(ripple);
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 1000);
    }
};

projectInteractions.init();

// Advanced Blog Card Interactions
const blogInteractions = {
    init() {
        this.cards = document.querySelectorAll('.blog-card');
        this.bindEvents();
    },
    bindEvents() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    },
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        const image = card.querySelector('.blog-image');
        const content = card.querySelector('.blog-content');
        
        gsap.to(image, {
            duration: 0.3,
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.1,
            ease: 'power2.out'
        });
        
        gsap.to(content, {
            duration: 0.3,
            rotateX: rotateX * -0.5,
            rotateY: rotateY * -0.5,
            z: 20,
            ease: 'power2.out'
        });
    },
    handleMouseLeave(e, card) {
        gsap.to(card.querySelectorAll('.blog-image, .blog-content'), {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            z: 0,
            ease: 'power2.out'
        });
    }
};

blogInteractions.init();

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Cursor Trail Effect
const cursorTrail = document.querySelector('.cursor-trail');
const trailParticles = [];
const particleCount = 5;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    document.body.appendChild(particle);
    trailParticles.push({
        element: particle,
        x: 0,
        y: 0,
        delay: i * 2
    });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateTrail() {
    trailParticles.forEach((particle, index) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        
        particle.x += dx * 0.2;
        particle.y += dy * 0.2;
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        particle.element.style.opacity = 1 - (index * 0.2);
        particle.element.style.transform = `scale(${1 - (index * 0.15)})`;
    });
    
    requestAnimationFrame(updateTrail);
}

updateTrail();

// Scroll Progress
const scrollProgress = document.querySelector('.scroll-progress .progress-bar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    const scrollDirection = window.scrollY > lastScrollTop ? 'down' : 'up';
    
    scrollProgress.style.width = scrolled + '%';
    
    // Add gradient based on scroll direction
    if (scrollDirection === 'down') {
        scrollProgress.style.background = 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))';
    } else {
        scrollProgress.style.background = 'linear-gradient(to left, var(--gradient-end), var(--gradient-start))';
    }
    
    lastScrollTop = window.scrollY;
});

// Skill Showcase Animation
const showcaseItems = document.querySelectorAll('.showcase-item');

showcaseItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(item.querySelector('i'), {
            rotation: 360,
            duration: 1,
            ease: 'power2.inOut'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Enhanced Parallax Effect with GSAP
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100
});

gsap.to('.hero-image', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: -100
});

// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate skill cards on scroll
gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2
    });
});

// Animate project cards on scroll
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2
    });
});

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function updateTestimonialVisibility() {
    testimonialCards.forEach((card, index) => {
        card.style.opacity = index === currentTestimonial ? '1' : '0.5';
        card.style.transform = index === currentTestimonial ? 'scale(1)' : 'scale(0.95)';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialVisibility();
}

// Initialize testimonial slider
if (testimonialCards.length > 0) {
    updateTestimonialVisibility();
    setInterval(nextTestimonial, 5000);
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.testimonial-card, .blog-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animation
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.btn');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Smooth Reveal Animation for Sections
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Enhanced Skill Progress Animation
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    const progress = card.querySelector('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = progress.getAttribute('data-progress');
                progress.style.width = target + '%';
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(card);
});

// Advanced Section Interactions
const sectionInteractions = {
    init() {
        this.addParallaxEffect();
        this.addScrollReveal();
        this.addHoverEffects();
        this.addSectionProgress();
    },
    
    addParallaxEffect() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const speed = section.dataset.parallaxSpeed || 0.5;
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && 
                    scrolled < sectionTop + sectionHeight) {
                    const yPos = -(scrolled - sectionTop) * speed;
                    section.style.backgroundPosition = `center ${yPos}px`;
                }
            });
        });
    },
    
    addScrollReveal() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    if (entry.target.classList.contains('skill-card')) {
                        this.animateSkillProgress(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    },
    
    animateSkillProgress(card) {
        const progress = card.querySelector('.progress');
        const target = progress.dataset.progress;
        progress.style.width = target + '%';
    },
    
    addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .blog-card, .testimonial-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                gsap.to(card, {
                    duration: 0.3,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    },
    
    addSectionProgress() {
        const sections = document.querySelectorAll('section');
        const progressBar = document.querySelector('.scroll-progress .progress-bar');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / totalHeight) * 100;
            
            progressBar.style.width = progress + '%';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrolled >= sectionTop - 100 && scrolled < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + section.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
};

sectionInteractions.init();

// Advanced Resume Button Interaction
const resumeButton = document.querySelector('.resume-btn');
if (resumeButton) {
    resumeButton.addEventListener('mousemove', (e) => {
        const rect = resumeButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        gsap.to(resumeButton, {
            duration: 0.3,
            rotateX: angleX,
            rotateY: angleY,
            scale: 1.1,
            ease: 'power2.out'
        });
        
        gsap.to(resumeButton.querySelector('i'), {
            duration: 0.3,
            y: -5,
            ease: 'power2.out'
        });
    });
    
    resumeButton.addEventListener('mouseleave', () => {
        gsap.to(resumeButton, {
            duration: 0.5,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'power2.out'
        });
        
        gsap.to(resumeButton.querySelector('i'), {
            duration: 0.5,
            y: 0,
            ease: 'power2.out'
        });
    });
}

// Advanced Features
const advancedFeatures = {
    init() {
        this.addParticleEffect();
        this.addScrollToTop();
        this.addPageLoader();
        this.addCursorEffect();
    },
    
    addParticleEffect() {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#3b82f6' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3b82f6',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    },
    
    addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
    
    addPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(loader);
        
        window.addEventListener('load', () => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.remove();
            }, 500);
        });
    },
    
    addCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        document.body.appendChild(cursorTrail);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let trailX = 0;
        let trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animate = () => {
            // Cursor movement
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            
            // Trail movement
            const trailDx = cursorX - trailX;
            const trailDy = cursorY - trailY;
            trailX += trailDx * 0.2;
            trailY += trailDy * 0.2;
            cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .blog-card, .testimonial-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorTrail.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorTrail.classList.remove('cursor-hover');
            });
        });
    }
};

advancedFeatures.init(); 