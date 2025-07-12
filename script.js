// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Product card interactions
document.querySelectorAll('.product-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info
        const card = this.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        // Show product details (you can customize this)
        showProductModal(productName, productPrice);
    });
});

// Product modal function
function showProductModal(name, price) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${name}</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p><strong>Precio:</strong> ${price}</p>
                <p><strong>Disponibilidad:</strong> En stock</p>
                <p><strong>Información:</strong> Producto premium de alta calidad.</p>
                <div class="age-verification">
                    <p><strong>⚠️ Verificación de Edad Requerida</strong></p>
                    <p>Este producto solo puede ser adquirido por personas mayores de 18 años.</p>
                </div>
                <div class="modal-actions">
                    <button class="contact-btn" onclick="contactWhatsApp('${name}')">
                        Consultar por WhatsApp
                    </button>
                    <button class="reserve-btn">Reservar Producto</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
            color: var(--primary-color);
            font-family: 'Playfair Display', serif;
        }
        
        .close-modal {
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        
        .close-modal:hover {
            color: var(--primary-color);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .age-verification {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .contact-btn, .reserve-btn {
            flex: 1;
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .contact-btn {
            background: #25D366;
            color: white;
        }
        
        .contact-btn:hover {
            background: #128C7E;
        }
        
        .reserve-btn {
            background: var(--primary-color);
            color: white;
        }
        
        .reserve-btn:hover {
            background: var(--accent-color);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Reserve button functionality
    const reserveBtn = modal.querySelector('.reserve-btn');
    reserveBtn.addEventListener('click', () => {
        alert(`Producto "${name}" reservado exitosamente. Nos contactaremos contigo pronto.`);
        document.body.removeChild(modal);
    });
}

// WhatsApp contact function
function contactWhatsApp(productName) {
    const phoneNumber = '123456789'; // Replace with actual WhatsApp number
    const message = `Hola, estoy interesado en el producto: ${productName}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Age verification popup on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        showAgeVerification();
    }, 1000);
});

function showAgeVerification() {
    const ageModal = document.createElement('div');
    ageModal.className = 'age-modal';
    ageModal.innerHTML = `
        <div class="age-modal-content">
            <h2>🔞 Verificación de Edad</h2>
            <p>Este sitio web contiene información sobre bebidas alcohólicas.</p>
            <p><strong>¿Eres mayor de 18 años?</strong></p>
            <div class="age-buttons">
                <button class="age-yes" onclick="acceptAge()">Sí, soy mayor de 18</button>
                <button class="age-no" onclick="rejectAge()">No, soy menor de 18</button>
            </div>
            <p class="age-warning">⚠️ El consumo de alcohol es perjudicial para la salud</p>
        </div>
    `;
    
    // Age modal styles
    const ageStyles = `
        .age-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(44, 24, 16, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
        }
        
        .age-modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        
        .age-modal-content h2 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-family: 'Playfair Display', serif;
        }
        
        .age-buttons {
            display: flex;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .age-yes, .age-no {
            flex: 1;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .age-yes {
            background: var(--primary-color);
            color: white;
        }
        
        .age-yes:hover {
            background: var(--accent-color);
        }
        
        .age-no {
            background: #dc3545;
            color: white;
        }
        
        .age-no:hover {
            background: #c82333;
        }
        
        .age-warning {
            font-size: 0.9rem;
            color: var(--warning-color);
            font-weight: 600;
            margin-top: 1rem;
        }
    `;
    
    // Add age verification styles
    if (!document.querySelector('#age-styles')) {
        const ageStyleSheet = document.createElement('style');
        ageStyleSheet.id = 'age-styles';
        ageStyleSheet.textContent = ageStyles;
        document.head.appendChild(ageStyleSheet);
    }
    
    document.body.appendChild(ageModal);
}

function acceptAge() {
    const ageModal = document.querySelector('.age-modal');
    if (ageModal) {
        document.body.removeChild(ageModal);
    }
    localStorage.setItem('ageVerified', 'true');
}

function rejectAge() {
    alert('Lo sentimos, debes ser mayor de 18 años para acceder a este sitio.');
    window.location.href = 'https://www.google.com';
}

// Check if age was already verified
if (localStorage.getItem('ageVerified') === 'true') {
    // Don't show age verification
} else {
    // Show age verification after page load
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation to page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});