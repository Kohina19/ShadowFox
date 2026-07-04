document.addEventListener("DOMContentLoaded", () => {
    
    // Smooth scrolling monitoring for navigation clicks
    const navLinks = document.querySelectorAll('.nav-link, .btn-contact-me');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Check if it's an anchor point
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Handle Contact Form Submission Lifecycle
    const contactForm = document.getElementById('portfolioContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input strings
            const nameInput = document.getElementById('name').value;
            const emailInput = document.getElementById('email').value;
            
            // Output demonstration response layout
            alert(`Thank you for reaching out, ${nameInput}! I will get back to your email (${emailInput}) shortly.`);
            
            // Reset form inputs cleanly
            contactForm.reset();
        });
    }
});