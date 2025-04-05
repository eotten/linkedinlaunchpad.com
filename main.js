document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.image-slider');
    
    if (slider) {
        // Get the first slide's width including margin
        const slideWidth = document.querySelector('.image-slide').offsetWidth;
        
        // Calculate the full width (all slides)
        const fullWidth = slideWidth * (document.querySelectorAll('.image-slide').length / 2);
        
        // Animation duration (in seconds) - adjust as needed
        const animationDuration = 30;
        
        slider.style.animation = `slideAnimation ${animationDuration}s linear infinite`;
        
        // Create the keyframes animation
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes slideAnimation {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${fullWidth}px);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle display of answer
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
                icon.textContent = '-';
            } else {
                answer.style.display = 'none';
                icon.textContent = '+';
            }
        });
    });
    
    // Track UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmCampaign) {
        console.log('UTM Campaign:', utmCampaign);
        
        // Store UTM in localStorage for cross-page tracking
        localStorage.setItem('utm_campaign', utmCampaign);
        
        // Add UTM parameter to all CTA links
        const ctaLinks = document.querySelectorAll('a[href*="typeform.com"]');
        ctaLinks.forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('utm_campaign', utmCampaign);
            link.href = url.toString();
        });
    }
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