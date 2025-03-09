document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.image-slider');
    
    if (slider) {
        // Set initial position
        slider.style.transform = 'translateX(0)';
        
        // Calculate total width of original slides (not including duplicates)
        const slides = document.querySelectorAll('.image-slide');
        let totalWidth = 0;
        for (let i = 0; i < slides.length / 2; i++) {
            totalWidth += slides[i].offsetWidth + parseInt(getComputedStyle(slides[i]).marginLeft) + 
                         parseInt(getComputedStyle(slides[i]).marginRight);
        }
        
        // Create animation
        slider.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(-${totalWidth}px)` }
            ],
            {
                duration: 20000,
                iterations: Infinity,
                easing: 'linear'
            }
        );
        
        // Pause animation on hover
        slider.addEventListener('mouseenter', () => {
            slider.getAnimations().forEach(animation => animation.pause());
        });
        
        slider.addEventListener('mouseleave', () => {
            slider.getAnimations().forEach(animation => animation.play());
        });
    }
    
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
});

$(document).ready(function() {
    $('.fade-up').first().addClass('visible');
    $(window).on('scroll', function() {
        $('.fade-up').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (elementTop < windowBottom - 20) {
                $(this).addClass('visible');
            }
        });
    });

    let likeCount = 12928;
    function addTerminalText() {
        const terminalContent = $('#terminal-content');
        const newText = $('<div class="terminal-text">').text(`Sent like #${likeCount}`);
        terminalContent.append(newText);
        setTimeout(() => newText.addClass('visible'), 10);
        likeCount++;
        if (terminalContent.children().length > 15) {
            terminalContent.children().first().remove();
        }
        setTimeout(addTerminalText, Math.random() * (250 - 150) + 150);
    }
    addTerminalText();
});