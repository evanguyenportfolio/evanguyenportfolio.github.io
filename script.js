/* ================================================================
   FAIRY GARDEN PORTFOLIO - Main JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ================================================================
    // ===== NAVIGATION: HAMBURGER MENU =====
    // ================================================================
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navButtons = document.getElementById('navButtons');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburgerMenu && navButtons) {
        function toggleMenu() {
            hamburgerMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            document.body.style.overflow = navButtons.classList.contains('active') ? 'hidden' : 'auto';
        }

        function closeMenu() {
            hamburgerMenu.classList.remove('active');
            navButtons.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }

        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navButtons.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navButtons.classList.contains('active') &&
                !navButtons.contains(e.target) &&
                !hamburgerMenu.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // ================================================================
    // ===== STAR BACKGROUND =====
    // ================================================================
    const starsBg = document.getElementById('starsBg');
    if (starsBg) {
        starsBg.innerHTML = '';
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const sizes = ['star-small', 'star-medium', 'star-large'];
            star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 5 + 's';
            starsBg.appendChild(star);
        }
    }

    // ================================================================
    // ===== GRAPHICS PAGE: FEATURED SLIDESHOW =====
    // ================================================================
    const slides = document.querySelectorAll('.slide');
    const slideDots = document.querySelectorAll('.slide-dot');

    if (slides.length > 0 && slideDots.length > 0) {
        let currentSlide = 0;
        let slideshowInterval;

        function showSlide(n) {
            slides.forEach(s => s.classList.remove('active'));
            slideDots.forEach(d => d.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            slideDots[currentSlide].classList.add('active');
        }

        function startSlideshow() {
            if (slideshowInterval) clearInterval(slideshowInterval);
            slideshowInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        }

        function stopSlideshow() {
            clearInterval(slideshowInterval);
        }

        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });

        const slideshowContainer = document.getElementById('featuredSlideshow');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }

        startSlideshow();
    }

    // ================================================================
    // ===== GRAPHICS PAGE: GALLERY FILTERING =====
    // ================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (tabBtns.length > 0 && galleryItems.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const category = this.dataset.category;
                galleryItems.forEach(item => {
                    item.style.display = (category === 'all' || item.dataset.category === category) ?
                        'block' : 'none';
                });
            });
        });
    }

    // ================================================================
    // ===== CONTACT PAGE: FORM =====
    // ================================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                this.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert('🌸 Thank you for your message! I\'ll get back to you soon.');
            }, 1500);
        });
    }

    // ================================================================
    // ===== WORK PAGE: SLIDESHOWS WITH LIGHTBOX =====
    // ================================================================
    const lightbox = document.getElementById('workLightbox');
    const lightboxImage = document.getElementById('workLightboxImage');
    const lightboxCaption = document.getElementById('workLightboxCaption');
    const lightboxClose = document.getElementById('workLightboxClose');

    function openLightbox(src, caption) {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = src;
        lightboxCaption.textContent = caption || 'Work Project';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initialize all work slideshows
    document.querySelectorAll('.work-slideshow').forEach((slideshow) => {
        const slides = slideshow.querySelectorAll('.slide-item');
        const dots = slideshow.querySelectorAll('.slide-dot');
        const prevBtn = slideshow.querySelector('.prev-btn');
        const nextBtn = slideshow.querySelector('.next-btn');
        const counter = slideshow.querySelector('.current-slide');
        const totalSpan = slideshow.querySelector('.total-slides');

        if (slides.length === 0) return;

        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        if (totalSpan) totalSpan.textContent = totalSlides;

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlideIndex = index;
            slides[currentSlideIndex].classList.add('active');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlideIndex);
            });
            if (counter) counter.textContent = currentSlideIndex + 1;
        }

        function nextSlide() { goToSlide(currentSlideIndex + 1); }
        function prevSlide() { goToSlide(currentSlideIndex - 1); }

        // Click on slide to open lightbox
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            slide.addEventListener('click', function(e) {
                if (e.target.closest('.slide-nav-btn') || e.target.closest('.slide-dot')) {
                    return;
                }
                if (img && img.src && !img.src.includes('data:image')) {
                    openLightbox(img.src, this.dataset.caption || 'Work Project');
                } else {
                    alert('📸 Image placeholder. Replace with your actual work image.');
                }
            });
        });

        // Auto-advance
        let autoAdvance = setInterval(nextSlide, 4000);
        slideshow.addEventListener('mouseenter', () => clearInterval(autoAdvance));
        slideshow.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSlide, 4000);
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nextSlide();
                clearInterval(autoAdvance);
                autoAdvance = setInterval(nextSlide, 4000);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                prevSlide();
                clearInterval(autoAdvance);
                autoAdvance = setInterval(nextSlide, 4000);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                goToSlide(index);
                clearInterval(autoAdvance);
                autoAdvance = setInterval(nextSlide, 4000);
            });
        });

        slideshow.setAttribute('tabindex', '0');
    });

    // ================================================================
    // ===== GRAPHICS PAGE: FLIPBOOK =====
    // ================================================================
    const flipbookImages = [
        { src: 'images/MiniEncyclopediaEvaNguyen.png', alt: 'Artwork 1' },
        { src: 'images/MiniEncyclopediaEvaNguyen2.png', alt: 'Artwork 2' },
        { src: 'images/MiniEncyclopediaEvaNguyen3.png', alt: 'Artwork 3' },
        { src: 'images/MiniEncyclopediaEvaNguyen4.png', alt: 'Artwork 4' },
        { src: 'images/MiniEncyclopediaEvaNguyen5.png', alt: 'Artwork 5' },
        { src: 'images/MiniEncyclopediaEvaNguyen6.png', alt: 'Artwork 6' },
        { src: 'images/MiniEncyclopediaEvaNguyen7.png', alt: 'Artwork 7' },
        { src: 'images/MiniEncyclopediaEvaNguyen8.png', alt: 'Artwork 8' },
        { src: 'images/MiniEncyclopediaEvaNguyen9.png', alt: 'Artwork 9' },
        { src: 'images/MiniEncyclopediaEvaNguyen10.png', alt: 'Artwork 10' },
        { src: 'images/MiniEncyclopediaEvaNguyen11.png', alt: 'Artwork 11' },
        { src: 'images/MiniEncyclopediaEvaNguyen12.png', alt: 'Artwork 12' }
    ];

    const flipbook = document.getElementById('flipbook');
    const flipPrev = document.getElementById('flipPrev');
    const flipNext = document.getElementById('flipNext');
    const flipCounter = document.getElementById('flipCounter');
    const flipDotsContainer = document.getElementById('flipDots');

    if (flipbook && flipPrev && flipNext) {
        let currentSpread = 0;
        const totalPages = flipbookImages.length;

        function renderSpread(spreadIndex) {
            const leftIndex = spreadIndex % totalPages;
            const rightIndex = (spreadIndex + 1) % totalPages;

            flipbook.innerHTML = '';

            // Left Page
            const leftPage = document.createElement('div');
            leftPage.className = 'flipbook-page';
            leftPage.style.cssText = 'position:absolute;left:0;top:0;z-index:2;transform-origin:right center;';
            const leftImg = document.createElement('img');
            leftImg.src = flipbookImages[leftIndex].src;
            leftImg.alt = flipbookImages[leftIndex].alt || 'Page ' + (leftIndex + 1);
            leftImg.onerror = function() {
                leftPage.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--gradient-primary);color:white;font-size:1.2rem;padding:20px;text-align:center;">📸 Page ${leftIndex + 1}<br><span style="font-size:0.8rem;opacity:0.7;">${flipbookImages[leftIndex].alt || ''}</span></div>`;
            };
            leftPage.appendChild(leftImg);

            // Right Page
            const rightPage = document.createElement('div');
            rightPage.className = 'flipbook-page flipbook-page-back';
            rightPage.style.cssText = 'position:absolute;right:0;top:0;z-index:1;transform-origin:left center;';
            const rightImg = document.createElement('img');
            rightImg.src = flipbookImages[rightIndex].src;
            rightImg.alt = flipbookImages[rightIndex].alt || 'Page ' + (rightIndex + 1);
            rightImg.onerror = function() {
                rightPage.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--gradient-secondary);color:white;font-size:1.2rem;padding:20px;text-align:center;">📸 Page ${rightIndex + 1}<br><span style="font-size:0.8rem;opacity:0.7;">${flipbookImages[rightIndex].alt || ''}</span></div>`;
            };
            rightPage.appendChild(rightImg);

            flipbook.appendChild(leftPage);
            flipbook.appendChild(rightPage);

            if (flipCounter) {
                flipCounter.textContent = `${leftIndex + 1}–${rightIndex + 1} / ${totalPages}`;
            }

            const dots = flipDotsContainer ? flipDotsContainer.querySelectorAll('.flipbook-dot') : [];
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === spreadIndex);
            });
        }

        function buildDots() {
            if (!flipDotsContainer) return;
            flipDotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.className = 'flipbook-dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                dot.addEventListener('click', function() {
                    currentSpread = parseInt(this.dataset.index);
                    renderSpread(currentSpread);
                });
                flipDotsContainer.appendChild(dot);
            }
        }

        function nextSpread() {
            currentSpread = (currentSpread + 1) % totalPages;
            renderSpread(currentSpread);
        }

        function prevSpread() {
            currentSpread = (currentSpread - 1 + totalPages) % totalPages;
            renderSpread(currentSpread);
        }

        flipNext.addEventListener('click', nextSpread);
        flipPrev.addEventListener('click', prevSpread);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') { e.preventDefault(); nextSpread(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevSpread(); }
        });

        buildDots();
        renderSpread(0);
    }

    // ================================================================
    // ===== GRAPHICS PAGE: PNG SLIDE DECK VIEWER =====
    // ================================================================
    const pngItems = document.querySelectorAll('.slidedeck-item');
    const pngOverlay = document.getElementById('pngFullscreen');
    const pngImage = document.getElementById('pngImage');
    const pngTitle = document.getElementById('pngTitle');
    const pngDescription = document.getElementById('pngDescription');
    const pngClose = document.getElementById('pngClose');
    const pngScrollContainer = document.getElementById('pngScrollContainer');

    if (pngOverlay && pngImage) {
        const pngData = {
            png1: {
                title: 'Hayuri Matcha',
                description: 'Branding Presentation - Scroll to view all slides',
                image: 'images/Frame 10 (1).png'
            },
            png2: {
                title: 'FlamAid',
                description: 'Re-Branding Case Study - Scroll to view all slides',
                image: 'images/FlamAid Rebrand.png'
            }
        };

        function openPNG(pngId) {
            const png = pngData[pngId];
            if (!png) {
                console.error('No PNG data found for:', pngId);
                return;
            }
            pngImage.onerror = function() {
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200"%3E%3Crect width="800" height="1200" fill="%23f0f0f0"/%3E%3Ctext x="400" y="600" font-family="sans-serif" font-size="40" fill="%23999" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E';
                pngDescription.textContent = 'Image not found. Please check the file path: ' + png.image;
            };
            pngImage.src = png.image;
            pngImage.alt = png.title;
            pngTitle.textContent = png.title;
            pngDescription.textContent = png.description;

            if (pngScrollContainer) pngScrollContainer.scrollTop = 0;
            pngOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closePNG() {
            pngOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => { pngImage.src = ''; }, 300);
        }

        pngItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const pngId = this.getAttribute('data-png');
                if (pngId && pngData[pngId]) {
                    openPNG(pngId);
                } else {
                    console.warn('No matching data for deck:', pngId);
                }
            });
        });

        if (pngClose) pngClose.addEventListener('click', closePNG);
        pngOverlay.addEventListener('click', function(e) {
            if (e.target === pngOverlay) closePNG();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && pngOverlay.classList.contains('active')) {
                closePNG();
            }
        });
    }

    // ================================================================
    // ===== GENERAL LIGHTBOX (for graphics gallery) =====
    // ================================================================
    function createGeneralLightbox() {
        if (document.getElementById('lightboxOverlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.id = 'lightboxOverlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" id="lightboxClose"><i class="fas fa-times"></i></button>
                <img class="lightbox-image" id="lightboxImage" src="" alt="Full size image">
                <div class="lightbox-info">
                    <span class="lightbox-category" id="lightboxCategory">Category</span>
                    <h3 id="lightboxTitle">Title</h3>
                    <p id="lightboxDescription">Description</p>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = document.getElementById('lightboxClose');
        const img = document.getElementById('lightboxImage');
        const title = document.getElementById('lightboxTitle');
        const category = document.getElementById('lightboxCategory');
        const description = document.getElementById('lightboxDescription');

        function closeLightbox() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Attach click events to gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const imgEl = this.querySelector('.gallery-img');
                if (!imgEl) return;
                img.src = imgEl.src;
                title.textContent = this.dataset.title || this.querySelector('h4')?.textContent || 'Image';
                category.textContent = this.querySelector('.gallery-category')?.textContent || 'Category';
                description.textContent = this.dataset.description || this.querySelector('p')?.textContent || '';
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Attach click events to slides
        document.querySelectorAll('.slide').forEach(slide => {
            slide.addEventListener('click', function() {
                const imgEl = this.querySelector('.slide-img');
                if (!imgEl) return;
                img.src = imgEl.src;
                title.textContent = this.dataset.title || this.querySelector('h3')?.textContent || 'Image';
                category.textContent = this.querySelector('.gallery-category')?.textContent || 'Category';
                description.textContent = this.dataset.description || this.querySelector('p')?.textContent || '';
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    createGeneralLightbox();

    // ================================================================
    // ===== WORK PAGE: ANIMATE CARDS ON SCROLL =====
    // ================================================================
    const workCards = document.querySelectorAll('.work-card');
    if (workCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        workCards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    console.log('Portfolio loaded successfully!');
    console.log('Designed by Eva Nguyen');
});addEventListener
