/* ==========================================================================
   BE NICE BEAUTY — ULTIMATE MASTER JAVASCRIPT ENGINE (100% HIÁNYTALAN)
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

    // --- 3. CUSTOM DROPDOWN SELECTION MOTOR (AZONNALI JAVÍTÁS) ---
    const dropdownContainer = document.getElementById('custom-inquiry-dropdown');
    const hiddenInput = document.getElementById('contact-type-hidden');
    
    if (dropdownContainer) {
        const trigger = dropdownContainer.querySelector('.custom-select-trigger');
        const options = dropdownContainer.querySelectorAll('.custom-options-list li');

        // Kattintásra vagy ujjérintésre kinyitjuk/bezárjuk a listát
        dropdownContainer.addEventListener('click', function(e) {
            e.stopPropagation(); // Megakadályozza, hogy az oldal más része bezárja
            this.classList.toggle('menu-open');
        });

        // Kiválasztás kezelése a listában
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const value = this.getAttribute('data-value');
                const text = this.textContent;

                // Beírjuk a látható szöveget és a láthatatlan háttér-értéket az űrlapnak
                if (trigger) trigger.textContent = text;
                if (hiddenInput) hiddenInput.value = value;

                // Bezárjuk a lenyíló ablakot
                dropdownContainer.classList.remove('menu-open');
            });
        });

        // Ha a vendég mellé kattint a képernyőn, elegánsan bezáródik a lista
        document.addEventListener('click', function() {
            dropdownContainer.classList.remove('menu-open');
        });
    }

    // --- 4. GÖRDÜLÉSI ANIMÁCIÓ REVEAL MOTOR (IPHONE GPU READY) ---
    const scrollSections = document.querySelectorAll('.linear-grid-section, .premium-services-section-old, .museum-monograph-section, .journal-content-section');
    
    function checkSectionReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        scrollSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('revealed');
            }
        });
    }

    checkSectionReveal();
    window.addEventListener('scroll', checkSectionReveal, { passive: true });
});

