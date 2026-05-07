document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    
    // ============================================
    // ANIMATED COUNTER
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function animateCounters() {
        if (countersStarted) return;
        
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY + window.innerHeight > heroBottom - 100) {
            countersStarted = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    stat.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
    
    // ============================================
    // SCROLL ANIMATIONS (AOS-like)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 80) {
                // Add delay if specified
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations(); // Check on load
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ============================================
    // ORDER FORM HANDLING
    // ============================================
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!data.username || !data.server || !data.service || !data.contact || !data['contact-info']) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Order Submitted!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            showNotification('Your order request has been submitted! We will contact you within 30 minutes.', 'success');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                orderForm.reset();
            }, 3000);
        }, 1500);
    });
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(139, 92, 246, 0.95)'};
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(10px);
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }
    
    // ============================================
    // PARALLAX EFFECT FOR HERO PARTICLES
    // ============================================
    const particles = document.querySelectorAll('.particle');
    
    function parallaxEffect() {
        const scrollY = window.scrollY;
        
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.05);
            particle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // ============================================
    // SERVICE CARD HOVER EFFECT
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ============================================
    // PRICING CARD POPULAR PULSE
    // ============================================
    const popularCard = document.querySelector('.pricing-card.popular');
    
    if (popularCard) {
        setInterval(() => {
            popularCard.style.boxShadow = '0 0 40px rgba(139, 92, 246, 0.4)';
            setTimeout(() => {
                popularCard.style.boxShadow = '';
            }, 1000);
        }, 3000);
    }
    
    // ============================================
    // TYPING EFFECT FOR HERO TITLE (Optional)
    // ============================================
    // Uncomment below if you want a typing effect
    /*
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.innerHTML = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    }
    setTimeout(typeWriter, 500);
    */
    
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #3b82f6, #fbbf24);
        z-index: 10001;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ============================================
    // INTERSECTION OBSERVER FOR BETTER PERFORMANCE
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // ============================================
    // PRELOADER (Optional - can be enabled)
    // ============================================
    /*
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    */
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c AetherBoost ', 'background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Fast & Trusted Genshin Impact Boosting Services ', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c Let professionals handle your grind while you enjoy the game ', 'color: #94a3b8; font-size: 12px;');
    
});

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURATION - Ganti nomor WhatsApp di sini
    // ============================================
    const WHATSAPP_NUMBER = '6285148249927'; // Ganti dengan nomor WhatsApp admin
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    
    // ============================================
    // ANIMATED COUNTER
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function animateCounters() {
        if (countersStarted) return;
        
        const heroSection = document.querySelector('.hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY + window.innerHeight > heroBottom - 100) {
            countersStarted = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    stat.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
    
    // ============================================
    // SCROLL ANIMATIONS (AOS-like)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 80) {
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimations);
    checkAnimations();
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ============================================
    // WHATSAPP ORDER FORM INTEGRATION
    // ============================================
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validation
        if (!data.username || !data.server || !data.region || !data['service-type'] || !data.contact || !data['contact-info']) {
            showNotification('Mohon isi semua field yang wajib diisi.', 'error');
            return;
        }
        
        // Build WhatsApp message
        const message = buildWhatsAppMessage(data);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Show loading state
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Membuka WhatsApp...';
        submitBtn.disabled = true;
        
        // Simulate processing delay
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp Terbuka!';
            submitBtn.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
            
            showNotification('WhatsApp akan terbuka dengan detail pesanan Anda!', 'success');
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                orderForm.reset();
            }, 3000);
        }, 1000);
    });
    
    // ============================================
    // BUILD WHATSAPP MESSAGE
    // ============================================
    function buildWhatsAppMessage(data) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Get readable labels
        const serverLabels = {
            'asia': 'Asia',
            'europe': 'Europe',
            'america': 'America',
            'tw-hk-mo': 'TW, HK, MO'
        };
        
        const regionLabels = {
            'mondstadt': 'Mondstadt',
            'liyue': 'Liyue',
            'inazuma': 'Inazuma',
            'sumeru': 'Sumeru',
            'fontaine': 'Fontaine',
            'natlan': 'Natlan',
            'all': 'Semua Region'
        };
        
        const serviceLabels = {
            'all-region': 'All Region (100%)',
            'per-region': 'Per Region',
            'persenan': 'Persenan (%)',
            'special': 'Area Spesial'
        };
        
        const contactLabels = {
            'whatsapp': 'WhatsApp',
            'discord': 'Discord',
            'email': 'Email',
            'telegram': 'Telegram'
        };
        
        const serverLabel = serverLabels[data.server] || data.server;
        const regionLabel = regionLabels[data.region] || data.region;
        const serviceLabel = serviceLabels[data['service-type']] || data['service-type'];
        const contactLabel = contactLabels[data.contact] || data.contact;
        
        let message = `*🎮 PESANAN BARU - AETHERBOOST*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
        message += `*📅 Tanggal:* ${dateStr}\n\n`;
        message += `*👤 UID Genshin:* ${data.username}\n`;
        message += `*🌍 Server:* ${serverLabel}\n`;
        message += `*📍 Region:* ${regionLabel}\n`;
        message += `*📝 Tipe Layanan:* ${serviceLabel}\n\n`;
        
        if (data.details && data.details.trim() !== '') {
            message += `*📋 Detail Tambahan:*\n${data.details}\n\n`;
        }
        
        message += `*📱 Kontak:*\n`;
        message += `• Metode: ${contactLabel}\n`;
        message += `• Info: ${data['contact-info']}\n\n`;
        message += `━━━━━━━━━━━━━━━━━━━━━\n`;
        message += `Mohon konfirmasi ketersediaan dan harga total. Terima kasih! 🙏`;
        
        return message;
    }
    
    // ============================================
    // REGION CARD "PESAN" BUTTONS - Quick Order
    // ============================================
    const regionButtons = document.querySelectorAll('.region-btn');
    
    regionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get region info from parent card
            const card = this.closest('.region-card');
            const regionName = card.querySelector('.region-header h3').textContent.trim();
            
            // Build quick order message
            const message = `*🎮 PESANAN CEPAT - AETHERBOOST*\n\n`;
            message += `Halo Admin AetherBoost! 👋\n\n`;
            message += `Saya mau pesan jasa exploration untuk region *${regionName}*.\n\n`;
            message += `Mohon info harga dan cara ordernya. Terima kasih! 🙏`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                     type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(139, 92, 246, 0.95)'};
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(10px);
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }
    
    // ============================================
    // PARALLAX EFFECT FOR HERO PARTICLES
    // ============================================
    const particles = document.querySelectorAll('.particle');
    
    function parallaxEffect() {
        const scrollY = window.scrollY;
        
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.05);
            particle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // ============================================
    // REGION CARD HOVER EFFECT
    // ============================================
    const regionCards = document.querySelectorAll('.region-card');
    
    regionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ============================================
    // PRICING CARD POPULAR PULSE
    // ============================================
    const popularCard = document.querySelector('.pricing-card.popular');
    
    if (popularCard) {
        setInterval(() => {
            popularCard.style.boxShadow = '0 0 40px rgba(139, 92, 246, 0.4)';
            setTimeout(() => {
                popularCard.style.boxShadow = '';
            }, 1000);
        }, 3000);
    }
    
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8b5cf6, #3b82f6, #fbbf24);
        z-index: 10001;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ============================================
    // INTERSECTION OBSERVER
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c AetherBoost ', 'background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c WhatsApp Order Integration Active ', 'color: #25D366; font-size: 14px;');
    console.log('%c Nomor WhatsApp: ' + WHATSAPP_NUMBER, 'color: #94a3b8; font-size: 12px;');
    
});
