// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.benefit-card, .step, .pricing-card, .testimonial-card');
animateElements.forEach(el => {
    el.classList.add('animate-element');
    observer.observe(el);
});

// Typing animation for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.borderRight = '2px solid var(--primary-color)';
        typeWriter(heroTitle, originalText, 30);
        
        // Remove cursor after typing
        setTimeout(() => {
            heroTitle.style.borderRight = 'none';
        }, originalText.length * 30 + 1000);
    }
});

// Pricing card hover effects
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('featured')) {
            card.style.transform = 'scale(1.05)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// WhatsApp chat simulation
const chatMessages = document.querySelectorAll('.message');
let messageIndex = 0;

function showNextMessage() {
    if (messageIndex < chatMessages.length) {
        chatMessages[messageIndex].style.opacity = '0';
        chatMessages[messageIndex].style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatMessages[messageIndex].style.opacity = '1';
            chatMessages[messageIndex].style.transform = 'translateY(0)';
        }, 100);
        
        messageIndex++;
        
        if (messageIndex < chatMessages.length) {
            setTimeout(showNextMessage, 2000);
        } else {
            // Reset animation after all messages shown
            setTimeout(() => {
                messageIndex = 0;
                showNextMessage();
            }, 3000);
        }
    }
}

// Start chat animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(showNextMessage, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form handling (if forms are added later)
function handleFormSubmit(formElement, successMessage = 'Mensaje enviado correctamente') {
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        const loadingText = window.languageMessages?.loading || 'Enviando...';
        submitButton.textContent = loadingText;
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual form handling)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            const successText = window.languageMessages?.success || successMessage;
            showNotification(successText, 'success');
            formElement.reset();
            
        } catch (error) {
            const errorText = window.languageMessages?.error || 'Error al enviar el mensaje. Inténtalo de nuevo.';
            showNotification(errorText, 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Set background color based on type
    const colors = {
        success: '#25D366',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Replace with actual analytics implementation
    console.log('Analytics Event:', eventName, eventData);
    
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            page_section: e.target.closest('section')?.id || 'unknown'
        });
    });
});

// Track WhatsApp float button clicks
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
            source: 'floating_button'
        });
    });
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'var(--primary-color)',
        zIndex: '9999',
        transition: 'width 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add CSS for animations
const animationStyles = `
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .animate-element {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Mobile navigation styles
const mobileNavStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(15px);
        }
    }
`;

// Inject mobile navigation styles
const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileNavStyles;
document.head.appendChild(mobileStyleSheet);

// Language Translation System
const translations = {
    es: {
        // Navigation
        'nav-benefits': 'Beneficios',
        'nav-how-it-works': 'Cómo Funciona',
        'nav-pricing': 'Precios',
        'nav-contact': 'Contacto',
        'nav-testimonials': 'Testimonios',
        
        // Hero Section
        'hero-title': 'Impulsa tu negocio con Marketing por WhatsApp',
        'hero-subtitle': 'Automatiza mensajes, conecta con tus clientes de forma rápida y aumenta tus ventas mediante comunicación directa y personalizada.',
        'hero-btn-trial': 'Probar Gratis',
        'hero-btn-whatsapp': 'Hablar por WhatsApp',
        
        // Chat mockup
        'chat-bot-message-1': '¡Hola! 👋 ¿Te interesa aumentar tus ventas?',
        'chat-user-message': '¡Sí, cuéntame más!',
        'chat-bot-message-2': 'Perfecto. Te envío información personalizada...',
        
        // Benefits Section
        'benefits-title': '¿Por qué elegir nuestro servicio?',
        'benefits-subtitle': 'Descubre las ventajas que harán crecer tu negocio',
        'benefit-1-title': 'Automatización Inteligente',
        'benefit-1-desc': 'Automatiza respuestas y campañas de marketing 24/7 sin intervención manual.',
        'benefit-2-title': 'Mayor Conversión',
        'benefit-2-desc': 'Aumenta tus ventas hasta un 300% con comunicación directa y personalizada.',
        'benefit-3-title': 'Fácil Integración',
        'benefit-3-desc': 'Conecta con tus herramientas existentes en minutos, sin complicaciones técnicas.',
        'benefit-4-title': 'Ahorro de Tiempo',
        'benefit-4-desc': 'Reduce el tiempo de gestión de clientes en un 80% con respuestas automáticas.',
        
        // How it Works Section
        'how-it-works-title': '¿Cómo funciona?',
        'how-it-works-subtitle': 'Solo 3 pasos para revolucionar tu marketing',
        'step-1-title': 'Conecta tu WhatsApp',
        'step-1-desc': 'Vincula tu número de WhatsApp Business en menos de 2 minutos.',
        'step-2-title': 'Configura tus Campañas',
        'step-2-desc': 'Crea mensajes automáticos y segmenta tus clientes según sus necesidades.',
        'step-3-title': 'Observa el Crecimiento',
        'step-3-desc': 'Monitorea en tiempo real el aumento de tus ventas y engagement.',
        
        // Pricing Section
        'pricing-title': 'Planes adaptados a tu negocio',
        'pricing-subtitle': 'Elige el plan perfecto para hacer crecer tu empresa',
        'plan-free-title': 'Gratis',
        'plan-pro-title': 'Pro',
        'plan-enterprise-title': 'Empresa',
        'plan-popular-badge': 'Más Popular',
        'plan-free-btn': 'Comenzar Gratis',
        'plan-pro-btn': 'Elegir Pro',
        'plan-enterprise-btn': 'Contactar Ventas',
        'feature-messages-100': '100 mensajes/mes',
        'feature-messages-5000': '5,000 mensajes/mes',
        'feature-messages-unlimited': 'Mensajes ilimitados',
        'feature-campaigns-1': '1 campaña activa',
        'feature-campaigns-unlimited': 'Campañas ilimitadas',
        'feature-support-basic': 'Soporte básico',
        'feature-support-priority': 'Soporte prioritario',
        'feature-support-24-7': 'Soporte 24/7',
        'feature-analytics-advanced': 'Análisis avanzados',
        'feature-integrations': 'Integraciones',
        'feature-api': 'API personalizada',
        'feature-manager': 'Gestor dedicado',
        
        // Testimonials
        'testimonials-title': 'Lo que dicen nuestros clientes',
        'testimonials-subtitle': 'Historias reales de éxito empresarial',
        'testimonial-1-text': '"Aumentamos nuestras ventas un 250% en solo 3 meses. La automatización nos cambió la vida."',
        'testimonial-1-author': 'María González',
        'testimonial-1-role': 'CEO, Boutique Luna',
        'testimonial-2-text': '"Increíble facilidad de uso. En una semana ya estábamos viendo resultados concretos."',
        'testimonial-2-author': 'Carlos Rodríguez',
        'testimonial-2-role': 'Director, Tech Solutions',
        'testimonial-3-text': '"El mejor ROI que hemos tenido. Cada peso invertido se multiplicó por 5."',
        'testimonial-3-author': 'Ana Martínez',
        'testimonial-3-role': 'Fundadora, Eco Store',
        
        // Footer
        'footer-brand-desc': 'Transformamos la manera en que las empresas se conectan con sus clientes a través de WhatsApp.',
        'footer-contact-title': 'Contacto',
        'footer-links-title': 'Enlaces',
        'footer-legal-title': 'Legal',
        'footer-privacy': 'Política de Privacidad',
        'footer-terms': 'Términos de Servicio',
        'footer-cookies': 'Cookies',
        'footer-legal-notice': 'Aviso Legal',
        'footer-copyright': '© 2024 WhatsApp Pro. Todos los derechos reservados.',
        'whatsapp-float-text': 'Contactar por WhatsApp'
    },
    en: {
        // Navigation
        'nav-benefits': 'Benefits',
        'nav-how-it-works': 'How It Works',
        'nav-pricing': 'Pricing',
        'nav-contact': 'Contact',
        'nav-testimonials': 'Testimonials',
        
        // Hero Section
        'hero-title': 'Boost Your Business with <span class="highlight">WhatsApp Marketing</span>',
        'hero-subtitle': 'Automate messages, connect with your customers quickly and increase your sales through direct and personalized communication.',
        'hero-btn-trial': 'Try Free',
        'hero-btn-whatsapp': 'Chat on WhatsApp',
        
        // Chat mockup
        'chat-bot-message-1': 'Hello! 👋 Interested in boosting your sales?',
        'chat-user-message': 'Yes, tell me more!',
        'chat-bot-message-2': 'Perfect. I\'ll send you personalized information...',
        
        // Benefits Section
        'benefits-title': 'Why choose our service?',
        'benefits-subtitle': 'Discover the advantages that will grow your business',
        'benefit-1-title': 'Smart Automation',
        'benefit-1-desc': 'Automate responses and marketing campaigns 24/7 without manual intervention.',
        'benefit-2-title': 'Higher Conversion',
        'benefit-2-desc': 'Increase your sales up to 300% with direct and personalized communication.',
        'benefit-3-title': 'Easy Integration',
        'benefit-3-desc': 'Connect with your existing tools in minutes, without technical complications.',
        'benefit-4-title': 'Time Savings',
        'benefit-4-desc': 'Reduce customer management time by 80% with automatic responses.',
        
        // How it Works Section
        'how-it-works-title': 'How does it work?',
        'how-it-works-subtitle': 'Just 3 steps to revolutionize your marketing',
        'step-1-title': 'Connect Your WhatsApp',
        'step-1-desc': 'Link your WhatsApp Business number in less than 2 minutes.',
        'step-2-title': 'Set Up Your Campaigns',
        'step-2-desc': 'Create automatic messages and segment your customers according to their needs.',
        'step-3-title': 'Watch the Growth',
        'step-3-desc': 'Monitor in real time the increase in your sales and engagement.',
        
        // Pricing Section
        'pricing-title': 'Plans adapted to your business',
        'pricing-subtitle': 'Choose the perfect plan to grow your company',
        'plan-free-title': 'Free',
        'plan-pro-title': 'Pro',
        'plan-enterprise-title': 'Enterprise',
        'plan-popular-badge': 'Most Popular',
        'plan-free-btn': 'Start Free',
        'plan-pro-btn': 'Choose Pro',
        'plan-enterprise-btn': 'Contact Sales',
        'feature-messages-100': '100 messages/month',
        'feature-messages-5000': '5,000 messages/month',
        'feature-messages-unlimited': 'Unlimited messages',
        'feature-campaigns-1': '1 active campaign',
        'feature-campaigns-unlimited': 'Unlimited campaigns',
        'feature-support-basic': 'Basic support',
        'feature-support-priority': 'Priority support',
        'feature-support-24-7': '24/7 support',
        'feature-analytics-advanced': 'Advanced analytics',
        'feature-integrations': 'Integrations',
        'feature-api': 'Custom API',
        'feature-manager': 'Dedicated manager',
        
        // Testimonials
        'testimonials-title': 'What our customers say',
        'testimonials-subtitle': 'Real stories of business success',
        'testimonial-1-text': '"We increased our sales by 250% in just 3 months. Automation changed our lives."',
        'testimonial-1-author': 'María González',
        'testimonial-1-role': 'CEO, Boutique Luna',
        'testimonial-2-text': '"Incredible ease of use. In one week we were already seeing concrete results."',
        'testimonial-2-author': 'Carlos Rodríguez',
        'testimonial-2-role': 'Director, Tech Solutions',
        'testimonial-3-text': '"The best ROI we\'ve ever had. Every dollar invested was multiplied by 5."',
        'testimonial-3-author': 'Ana Martínez',
        'testimonial-3-role': 'Founder, Eco Store',
        
        // Footer
        'footer-brand-desc': 'We transform the way companies connect with their customers through WhatsApp.',
        'footer-contact-title': 'Contact',
        'footer-links-title': 'Links',
        'footer-legal-title': 'Legal',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Service',
        'footer-cookies': 'Cookies',
        'footer-legal-notice': 'Legal Notice',
        'footer-copyright': '© 2024 WhatsApp Pro. All rights reserved.',
        'whatsapp-float-text': 'Contact via WhatsApp'
    }
};

// Language Detection and Management
class LanguageManager {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.init();
    }
    
    detectLanguage() {
        // Check for stored preference first
        const storedLang = localStorage.getItem('preferred-language');
        if (storedLang && translations[storedLang]) {
            return storedLang;
        }
        
        // Detect based on browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.toLowerCase();
        
        // English for US and other English-speaking countries
        if (langCode.startsWith('en')) {
            return 'en';
        }
        
        // Spanish for Spanish-speaking countries (including Latin America)
        if (langCode.startsWith('es')) {
            return 'es';
        }
        
        // Check timezone for Americas (rough geolocation)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) {
            // US timezones - default to English
            if (timezone.includes('America/New_York') || 
                timezone.includes('America/Chicago') || 
                timezone.includes('America/Denver') || 
                timezone.includes('America/Los_Angeles') ||
                timezone.includes('US/')) {
                return 'en';
            }
            
            // Latin American timezones - default to Spanish
            if (timezone.includes('America/') && 
                !timezone.includes('America/New_York') && 
                !timezone.includes('America/Chicago') && 
                !timezone.includes('America/Denver') && 
                !timezone.includes('America/Los_Angeles')) {
                return 'es';
            }
        }
        
        // Default to Spanish
        return 'es';
    }
    
    init() {
        this.applyTranslations(this.currentLanguage);
        this.createLanguageToggle();
        this.updatePageLanguage();
    }
    
    applyTranslations(lang) {
        const translation = translations[lang];
        if (!translation) return;
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translation[key]) {
                // Check if translation contains HTML
                if (translation[key].includes('<') && translation[key].includes('>')) {
                    element.innerHTML = translation[key];
                } else {
                    element.textContent = translation[key];
                }
            }
        });
        
        // Update page title and meta tags
        if (lang === 'en') {
            document.title = 'WhatsApp Marketing - Boost Your Business';
            document.querySelector('meta[name="description"]')?.setAttribute('content', 
                'Boost your business with WhatsApp marketing. Automate messages, connect with customers and increase sales with direct communication.');
            document.querySelector('meta[property="og:title"]')?.setAttribute('content', 
                'Boost Your Business with WhatsApp Marketing');
            document.querySelector('meta[property="og:description"]')?.setAttribute('content', 
                'Automate messages, connect with customers quickly and increase sales through direct communication.');
        } else {
            document.title = 'Marketing por WhatsApp - Impulsa tu Negocio';
            document.querySelector('meta[name="description"]')?.setAttribute('content', 
                'Impulsa tu negocio con marketing por WhatsApp. Automatiza mensajes, conecta con clientes y aumenta ventas con comunicación directa.');
            document.querySelector('meta[property="og:title"]')?.setAttribute('content', 
                'Impulsa tu negocio con Marketing por WhatsApp');
            document.querySelector('meta[property="og:description"]')?.setAttribute('content', 
                'Automatiza mensajes, conecta con clientes de forma rápida y aumenta ventas mediante comunicación directa.');
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('preferred-language', lang);
    }
    
    updatePageLanguage() {
        document.documentElement.setAttribute('lang', this.currentLanguage);
    }
    
    createLanguageToggle() {
        // Create language toggle button
        const langToggle = document.createElement('div');
        langToggle.className = 'language-toggle';
        langToggle.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'es' ? 'active' : ''}" data-lang="es">
                🇪🇸 ES
            </button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                🇺🇸 EN
            </button>
        `;
        
        // Add to navigation
        const nav = document.querySelector('.nav-menu');
        if (nav) {
            nav.appendChild(langToggle);
        }
        
        // Add event listeners
        langToggle.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedLang = e.target.getAttribute('data-lang');
                this.switchLanguage(selectedLang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (translations[lang]) {
            this.applyTranslations(lang);
            this.updatePageLanguage();
            
            // Update active language button
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });
            
            // Re-run form validation messages if forms exist
            this.updateFormMessages(lang);
        }
    }
    
    updateFormMessages(lang) {
        // Update any dynamic form messages
        const successMessages = {
            'es': 'Mensaje enviado correctamente',
            'en': 'Message sent successfully'
        };
        
        const errorMessages = {
            'es': 'Error al enviar el mensaje. Inténtalo de nuevo.',
            'en': 'Error sending message. Please try again.'
        };
        
        const loadingMessages = {
            'es': 'Enviando...',
            'en': 'Sending...'
        };
        
        // Store these for use in form handling
        window.languageMessages = {
            success: successMessages[lang],
            error: errorMessages[lang],
            loading: loadingMessages[lang]
        };
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language manager
let languageManager;

// Page load optimization
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading state if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Initialize language management
    languageManager = new LanguageManager();
    
    // Initialize all interactive features
    console.log('WhatsApp Marketing Landing Page loaded successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Optional: Send errors to analytics service
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}