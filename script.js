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
