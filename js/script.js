document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('#navbar .nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('#navbar .nav-links');
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('header[id], section[id]'); // Includes header and all sections with an ID
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navbarHeight - 60; // Adjusted offset for better accuracy
            let sectionId = current.getAttribute('id');
            const navLinkForSection = document.querySelector('#navbar .nav-links a[href*=' + sectionId + ']');

            if (navLinkForSection) { // Check if the link exists
                if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinkForSection.classList.add('active');
                } else {
                    navLinkForSection.classList.remove('active');
                }
            }
        });
         // Ensure "Home" is active when at the very top or hero is mostly visible
        const heroSection = document.getElementById('hero');
        const homeLink = document.querySelector('#navbar .nav-links a[href="#hero"]');
        if (heroSection && homeLink) {
            if (window.scrollY < (heroSection.offsetTop + heroSection.offsetHeight - navbarHeight - 100)) {
                 // If not already handled by the loop, make home active
                if (!homeLink.classList.contains('active') && document.querySelectorAll('#navbar .nav-links a.active').length === 0 && window.scrollY < 200) {
                     homeLink.classList.add('active');
                }
            }
        }
    }


    // Update footer year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Basic contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Form data submitted:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});