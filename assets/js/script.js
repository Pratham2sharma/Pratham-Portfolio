const ANIMATION_DURATION = 300;
const SCROLL_OFFSET = 80;

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initEmailJS();
    initTypewriter();
});

function initEmailJS() {
    emailjs.init('Pl5H7tBlpeCxk4om3');
}

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
                updateActiveNavLink(this);
            }
        });
    });
}

function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - SCROLL_OFFSET;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                highlightNavLink(entry.target.id);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in, .stagger-animation');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for multiple elements
                if (entry.target.classList.contains('stagger-animation')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                } else {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
}

function highlightNavLink(sectionId) {
    const activeNavLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeNavLink) {
        updateActiveNavLink(activeNavLink);
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        const inputs = contactForm.querySelectorAll('.glass-input');
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formInputs = e.target.querySelectorAll('input, textarea');
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    if (validateForm(formInputs)) {
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        emailjs.sendForm('service_portfolio', 'template_contact', e.target)
            .then(function(response) {
                showSuccessMessage();
                resetForm(e.target);
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }, function(error) {
                showFormFeedback('Failed to send message. Please try again.', 'error');
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            });
    } else {
        showFormFeedback('Please fill in all required fields.', 'error');
    }
}

function validateForm(inputs) {
    return Array.from(inputs).every(input => {
        if (input.hasAttribute('required')) {
            return input.value.trim() !== '';
        }
        return true;
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function showFormFeedback(message, type) {
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = `form-feedback alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    feedback.textContent = message;
    feedback.style.background = type === 'success' 
        ? 'rgba(40, 167, 69, 0.2)' 
        : 'rgba(220, 53, 69, 0.2)';
    feedback.style.border = `1px solid ${type === 'success' ? '#28a745' : '#dc3545'}`;
    feedback.style.borderRadius = '10px';
    feedback.style.color = '#ffffff';
    
    document.getElementById('contactForm').appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

function resetForm(form) {
    form.reset();
    form.querySelectorAll('.glass-input').forEach(input => {
        input.classList.remove('focused');
    });
}

function handleInputFocus(e) {
    e.target.classList.add('focused');
}

function handleInputBlur(e) {
    if (!e.target.value) {
        e.target.classList.remove('focused');
    }
}

function initAnimations() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.placeholder-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.placeholder-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

function createParticleEffect() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

window.addEventListener('load', () => {
    createParticleEffect();
    
    const loadingElements = document.querySelectorAll('.glass-card');
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const text = 'Pratham Sharma';
    let index = 0;
    let isDeleting = false;
    
    function typeEffect() {
        if (!isDeleting && index < text.length) {
            typewriterElement.textContent = text.slice(0, index + 1);
            typewriterElement.classList.add('typewriter');
            index++;
            setTimeout(typeEffect, 150);
        } else if (isDeleting && index > 0) {
            typewriterElement.textContent = text.slice(0, index - 1);
            index--;
            setTimeout(typeEffect, 100);
        } else if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        } else if (isDeleting && index === 0) {
            setTimeout(() => {
                isDeleting = false;
                typeEffect();
            }, 500);
        }
    }
    
    typeEffect();
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});