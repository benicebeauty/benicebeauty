/* ==========================================================================
   BE NICE BEAUTY — SCROLL REVEAL INTEGRATED JAVASCRIPT ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. INTELLIGENS STICKY HEADER DETEKTOR ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function() {
        if (!header) return;
        if (window.scrollY > 20) { 
            header.classList.add('header-scrolled'); 
        } else { 
            header.classList.remove('header-scrolled'); 
        }
    }, { passive: true });

    // --- 2. RESPONSIVE HAMBURGER MENÜ REVEAL MOTOR ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navigation-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // --- 3. GÖRDÜLÉSI ANIMÁCIÓ REVEAL MOTOR (IPHONE GPU READY) ---
    // Összegyűjtjük a Főoldal nagy szekcióit, amiket görgetéskor akarunk életre kelteni
    const scrollSections = document.querySelectorAll('.linear-grid-section, .premium-services-section-old, .museum-monograph-section, .journal-content-section');
    
    function checkSectionReveal() {
        // A képernyő alsó szélétől számított 15%-os biztonsági sáv, hogy ne ugorjon be túl korán
        const triggerBottom = window.innerHeight * 0.85;
        
        scrollSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('revealed');
            }
        });
    }

    // Azonnal lefut az oldal betöltésekor, ha valami már a képernyőn van
    checkSectionReveal();
    
    // Görgetés közben folyamatosan, fagyásmentesen ellenőrzi a pozíciókat
    window.addEventListener('scroll', checkSectionReveal, { passive: true });
});
