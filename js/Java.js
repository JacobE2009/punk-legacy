// Esperar a que el documento se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const contactForm = document.getElementById('contact-form');
    
    // Función para alternar el menú móvil
    hamburger.addEventListener('click', function() {
        header.classList.toggle('show-nav');
        
        // Animación de las barras del hamburger
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.toggle('active');
        });
    });
    
    // Cerrar el menú al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            header.classList.remove('show-nav');
        });
    });
    
    // Animación para secciones al hacer scroll
    const sections = document.querySelectorAll('section');
    const animateOnScroll = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Animar secciones visibles al cargar
    
    // Efecto de paralaje en la sección hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Animación de la barra de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Manejar el envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validar campos (ejemplo simple)
            if (!name || !email || !message) {
                showNotification('Por favor complete todos los campos requeridos', 'error');
                return;
            }
            
            // Aquí iría la lógica para enviar el formulario a un servidor
            // Simulamos una respuesta exitosa después de 1 segundo
            setTimeout(function() {
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(function() {
            notification.classList.add('fade-out');
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Añadir estilos de notificación dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            animation: slide-in 0.5s forwards;
        }
        
        .success {
            background-color: #00ffcc;
            color: #121212;
        }
        
        .error {
            background-color: #ff3366;
        }
        
        .fade-out {
            animation: fade-out 0.5s forwards;
        }
        
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fade-out {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        header.scrolled {
            background-color: rgba(18, 18, 18, 0.95);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .hamburger .bar.active:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger .bar.active:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger .bar.active:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Animación del logo al cargar la página
    const logo = document.getElementById('logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(function() {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }
});