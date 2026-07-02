// ===== CONFIGURACIÓN PRINCIPAL =====
const WHATSAPP_NUMBER = '573156702081'; // Número de WhatsApp de Colombia

// ===== FUNCIONES PRINCIPALES =====

// Función para abrir WhatsApp con mensaje predefinido
function openWhatsApp(message) {
    const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    const fullMessage = encodeURIComponent(`Hola, ${message}`);
    const url = `${baseUrl}?text=${fullMessage}`;
    window.open(url, '_blank');
}

// Función para hacer scroll suave a una sección
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para abrir/cerrar FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ===== ANIMACIONES AVANZADAS =====

// Partículas animadas para el fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animation = `float ${duration}s ${delay}s infinite`;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Colores aleatorios entre azul, dorado y morado
    const colors = ['#00d4ff', '#ffd700', '#8b5cf6', '#00ff88'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;
    particle.style.boxShadow = `0 0 ${size * 2}px ${randomColor}`;
    
    container.appendChild(particle);
}

// Contador animado para las estadísticas
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Efecto de easing (salto)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// Observador de intersección para animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar elementos que aparecen
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar contadores si los hay
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                }
                
                // Dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones y elementos
    const animateElements = document.querySelectorAll('.problem-card, .tech-card, .cert-card, .product-card, .testimonial-card, .faq-item, .benefit-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observar las secciones de estadísticas
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

// Animación para la barra de navegación
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.8)';
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Efecto 3D para tarjetas
function initCardEffects() {
    const cards = document.querySelectorAll('.tech-card, .product-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Animación para la invitación
function initInvitationAnimation() {
    const invitation = document.querySelector('.invitation-envelope');
    
    if (invitation) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.boxShadow = '0 0 60px rgba(255, 215, 0, 0.3)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(invitation);
    }
}

// Efecto de brillo para botones
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-glow');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Biohacking Website inicializado!');
    
    createParticles();
    initScrollAnimations();
    initNavbar();
    initCardEffects();
    initInvitationAnimation();
    initButtonEffects();
    
    // Pequeño delay para las animaciones iniciales
    setTimeout(() => {
        document.querySelectorAll('.stat-number').forEach(counter => {
            counter.style.opacity = '1';
        });
    }, 500);
});

// ===== KEYFRAMES DINÁMICOS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        50% {
            transform: translateY(-100px) translateX(20px);
        }
    }
`;
document.head.appendChild(style);
