// ===== FUNCIONES EXISTENTES =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function openWhatsApp(message) {
    const phoneNumber = '573000000000'; // Reemplaza con tu número principal si es necesario
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ===== MODAL DE VISITADORES MÉDICOS =====
const modal = document.getElementById('visitadoresModal');
const closeModal = document.querySelector('.close-modal');

// Función para abrir el modal
function openVisitadoresModal() {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
    }
}

// Función para cerrar el modal
function closeVisitadoresModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

// Evento para cerrar el modal con el botón X
if (closeModal) {
    closeModal.addEventListener('click', closeVisitadoresModal);
}

// Evento para cerrar el modal al hacer clic fuera del contenido
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVisitadoresModal();
        }
    });
}

// Evento para cerrar el modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeVisitadoresModal();
    }
});

// ===== ANIMACIÓN DE ESTADÍSTICAS DEL HERO =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

// Ejecutar animación de stats cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Animar stats después de un pequeño delay
    setTimeout(animateStats, 500);
});

// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const colors = ['#00d4ff', '#ffd700', '#ff4444', '#8b5cf6', '#00ff88'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Crear partículas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createParticles);

// ===== INTERACTIVE TOUR =====
const tourSteps = [
    {
        message: "¡Bienvenido a Biohacking Technology! 👋 Soy tu guía para explorar la página.",
        highlight: null
    },
    {
        message: "Aquí puedes ver los problemas que solucionamos: estrés, contaminación y más. 🚨",
        highlight: "#biohacking",
        scrollTo: "#biohacking"
    },
    {
        message: "Estos son los pilares de nuestra tecnología basados en la naturaleza. 🌿🔥💧🧲",
        highlight: "#tech",
        scrollTo: "#tech"
    },
    {
        message: "Descubre nuestros productos innovadores! 📦 Cada botón te conecta con un visitador médico.",
        highlight: "#products",
        scrollTo: "#products"
    },
    {
        message: "Aquí están las experiencias de nuestros clientes. ¡Son reales! ✨",
        highlight: "#testimonials",
        scrollTo: "#testimonials"
    },
    {
        message: "¿Tienes preguntas? Revisa la sección de Preguntas Frecuentes. ❓",
        highlight: "#faq",
        scrollTo: "#faq"
    },
    {
        message: "¡Listo! Si necesitas más ayuda, los visitadores médicos están siempre disponibles. ¡Gracias por visitarnos! 🙌",
        highlight: null
    }
];

let currentTourStep = 0;
const tourContainer = document.getElementById('tourContainer');
const tourMessage = document.getElementById('tourMessage');
const tourPrevBtn = document.getElementById('tourPrevBtn');
const tourNextBtn = document.getElementById('tourNextBtn');
const tourCloseBtn = document.getElementById('tourCloseBtn');

// Function to start the tour
function startTour() {
    if (!localStorage.getItem('tourCompleted')) {
        showTourStep(0);
        tourContainer.style.display = 'flex';
    }
}

// Function to show a specific tour step
function showTourStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= tourSteps.length) return;
    
    currentTourStep = stepIndex;
    const step = tourSteps[currentTourStep];
    
    // Update message
    tourMessage.textContent = step.message;
    
    // Show/hide previous button
    tourPrevBtn.style.display = currentTourStep === 0 ? 'none' : 'inline-block';
    
    // Update next button text
    if (currentTourStep === tourSteps.length - 1) {
        tourNextBtn.textContent = 'Finalizar';
    } else {
        tourNextBtn.textContent = 'Siguiente';
    }
    
    // Highlight element
    clearHighlights();
    if (step.highlight) {
        const el = document.querySelector(step.highlight);
        if (el) {
            el.style.position = 'relative';
            el.style.zIndex = '9999';
            el.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            el.style.transition = 'box-shadow 0.3s ease';
        }
    }
    
    // Scroll to element
    if (step.scrollTo) {
        scrollToSection(step.scrollTo.replace('#', ''));
    }
}

// Function to clear highlights
function clearHighlights() {
    tourSteps.forEach(step => {
        if (step.highlight) {
            const el = document.querySelector(step.highlight);
            if (el) {
                el.style.boxShadow = '';
                el.style.zIndex = '';
                el.style.position = '';
            }
        }
    });
}

// Function to close the tour
function closeTour() {
    tourContainer.style.display = 'none';
    clearHighlights();
    localStorage.setItem('tourCompleted', 'true');
}

// Event listeners for tour buttons
tourPrevBtn.addEventListener('click', () => showTourStep(currentTourStep - 1));
tourNextBtn.addEventListener('click', () => {
    if (currentTourStep === tourSteps.length - 1) {
        closeTour();
    } else {
        showTourStep(currentTourStep + 1);
    }
});
tourCloseBtn.addEventListener('click', closeTour);

// Start tour when DOM loads
document.addEventListener('DOMContentLoaded', startTour);
