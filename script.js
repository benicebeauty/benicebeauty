/* ==========================================================================
   BE NICE BEAUTY — PURIFIED & LIGHTWEIGHT CORE JAVASCRIPT ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. INTELLIGENS STICKY HEADER DETEKTOR ---
    const header = document.querySelector('.site-header');
    
    // Passzív eseményfigyelőt használunk, amit az iPhone 15 Pro Max videóchipje imádni fog
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        // Amint 20 pixelnél lejjebb görget a vendég, azonnal aktiválódik a felragadás
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
            e.stopPropagation(); // Azonnali ujjbegy-reakció mobilon fagyás nélkül
            
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }
});
