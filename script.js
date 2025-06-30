// APY Chat - Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mobile Hamburger Menu
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Pricing Toggle
    function initPricingToggle() {
        const toggle = document.getElementById('pricing-toggle');
        if (toggle) {
            toggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('annual-pricing');
                } else {
                    document.body.classList.remove('annual-pricing');
                }
            });
        }
    }

    // Form Handling
    function initForms() {
        // Contact Form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }

        // Newsletter Form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for subscribing!');
                this.reset();
            });
        }
    }

    // Amsterdam Time
    function initAmsterdamTime() {
        function updateTime() {
            const timeElement = document.getElementById('amsterdam-time');
            if (timeElement) {
                const now = new Date();
                const amsterdamTime = new Intl.DateTimeFormat('en-US', {
                    timeZone: 'Europe/Amsterdam',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).format(now);
                timeElement.textContent = amsterdamTime;
            }
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // Statistics Animation
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateStat = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateStat();
            });
        }

        // Trigger animation when stats section is visible
        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    // Scroll Animations Removed for visibility

    // Navbar Scroll Effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero');
        
        if (navbar && heroSection) {
            window.addEventListener('scroll', function() {
                const heroHeight = heroSection.offsetHeight;
                const scrollY = window.scrollY;
                
                // 히어로 섹션이 끝나면 검정색 배경, 다시 히어로 섹션으로 돌아오면 투명
                if (scrollY >= heroHeight - 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                } else {
                    navbar.style.background = 'transparent';
                }
            });
        }
    }

    // Search Chips Functionality
    function initSearchChips() {
        const chips = document.querySelectorAll('.chip');
        const searchInput = document.querySelector('.search-input');
        
        if (chips && searchInput) {
            chips.forEach(chip => {
                chip.addEventListener('click', function() {
                    const chipText = this.textContent.trim();
                    searchInput.value = chipText;
                    searchInput.focus();
                    
                    // Add visual feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
        }
    }

    // Search functionality
    window.selectChip = function(chipText) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = chipText;
            searchInput.focus();
        }
    };

    window.handleSearch = function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            alert(`Searching for: ${searchInput.value}`);
        }
    };

    // Fast Typewriter Effect
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (!typewriterElement) return;
        
        const text = 'Let Your Money Think For You.';
        let charIndex = 0;
        
        function typeCharacter() {
            if (charIndex < text.length) {
                typewriterElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, 50); // 빠른 타이핑 속도 (50ms)
            } else {
                // 타이핑 완료 후 커서 제거
                typewriterElement.style.borderRight = 'none';
            }
        }
        
        // 커서 스타일 추가
        typewriterElement.style.borderRight = '3px solid #0077EA';
        typewriterElement.style.paddingRight = '5px';
        
        // 타이핑 시작
        setTimeout(typeCharacter, 500); // 0.5초 후 타이핑 시작
    }

    // Video Seamless Loop Control
    function initVideoLoop() {
        const video = document.getElementById('hero-video');
        if (!video) return;
        
        let isReverse = false;
        let animationId;
        
        function updateVideoTime() {
            if (!video.paused) {
                if (!isReverse) {
                    // 정방향 재생 중 끝에 도달했는지 확인
                    if (video.currentTime >= video.duration - 0.1) {
                        isReverse = true;
                        video.pause();
                        reversePlay();
                    }
                } else {
                    // 역방향 재생 중 처음에 도달했는지 확인
                    if (video.currentTime <= 0.1) {
                        isReverse = false;
                        video.play();
                    }
                }
            }
            animationId = requestAnimationFrame(updateVideoTime);
        }
        
        function reversePlay() {
            function step() {
                if (video.currentTime <= 0.1) {
                    isReverse = false;
                    video.play();
                    return;
                }
                
                video.currentTime -= 0.033; // 약 30fps로 역재생
                
                if (isReverse) {
                    requestAnimationFrame(step);
                }
            }
            step();
        }
        
        // 비디오 로드 완료 후 시작
        video.addEventListener('loadedmetadata', function() {
            video.play();
            updateVideoTime();
        });
        
        // 비디오가 이미 로드된 경우
        if (video.readyState >= 2) {
            video.play();
            updateVideoTime();
        }
    }

    // Initialize all functions
    initSmoothScrolling();
    initMobileMenu();
    initFAQ();
    initPricingToggle();
    initForms();
    initAmsterdamTime();
    initStatsAnimation();
    initNavbarScroll();
    initSearchChips();
    initTypewriter();
    initVideoLoop();

    // Console message
    console.log('🚀 APY Chat website loaded successfully!');
});
