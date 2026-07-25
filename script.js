/* ==========================================================================
   AURA COFFEE - Modern Classic Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. NAVBAR SCROLL & ACTIVE SECTION HIGHLIGHTING
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Glass navbar transition
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU TOGGLE
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. THEME SWITCHER (LIGHT / DARK MODE)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Check stored theme preference
  const savedTheme = localStorage.getItem('aura_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aura_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }

  // ------------------------------------------------------------------------
  // 4. MENU FILTERING SYSTEM
  // ------------------------------------------------------------------------
  const menuFilterBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // Quick Order Action via WhatsApp
  const quickOrderBtns = document.querySelectorAll('.btn-order-quick');
  quickOrderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemName = e.target.closest('.menu-card').querySelector('.menu-title').textContent;
      const itemPrice = e.target.closest('.menu-card').querySelector('.menu-price').textContent;
      const message = encodeURIComponent(`Halo Aura Coffee! Saya ingin pesan: ${itemName} (${itemPrice}). Apakah tersedia?`);
      window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
    });
  });

  // ------------------------------------------------------------------------
  // 5. GALLERY FILTERING & LIGHTBOX
  // ------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title').textContent;
      lightboxImg.src = img.src;
      lightboxCaption.textContent = title;
      lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. ANIMATED COUNTER ON SCROLL
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter-number');
  let counterAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current) + suffix;
        }
      }, stepTime);
    });
  };

  const counterSection = document.getElementById('counter-section');
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
          animateCounters();
          counterAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
  }

  // ------------------------------------------------------------------------
  // 7. RESERVATION FORM HANDLING
  // ------------------------------------------------------------------------
  const reservationForm = document.getElementById('reservation-form');
  const resModal = document.getElementById('reservation-modal');
  const resModalClose = document.getElementById('modal-close-btn');
  const resModalSummary = document.getElementById('modal-summary');
  const waConfirmBtn = document.getElementById('wa-confirm-btn');

  if (reservationForm) {
    // Set default date to today
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value;
      const email = document.getElementById('res-email').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const notes = document.getElementById('res-notes').value;

      if (!name || !email || !date || !time || !guests) {
        alert('Mohon lengkapi semua kolom form reservasi.');
        return;
      }

      // Format summary
      resModalSummary.innerHTML = `
        <strong>Terima kasih, ${name}!</strong><br>
        Reservasi Anda untuk <strong>${guests} Orang</strong> pada tanggal <strong>${date}</strong> jam <strong>${time}</strong> telah kami terima.<br>
        ${notes ? `<em>Catatan: "${notes}"</em>` : ''}
      `;

      resModal.classList.add('active');

      // Setup WhatsApp confirmation button
      const waMsg = encodeURIComponent(
        `Halo Aura Coffee! Saya telah melakukan reservasi online:\n` +
        `Nama: ${name}\n` +
        `Email: ${email}\n` +
        `Tanggal: ${date}\n` +
        `Jam: ${time}\n` +
        `Jumlah Orang: ${guests}\n` +
        `${notes ? `Catatan: ${notes}` : ''}`
      );
      waConfirmBtn.onclick = () => {
        window.open(`https://wa.me/6281234567890?text=${waMsg}`, '_blank');
      };

      reservationForm.reset();
    });
  }

  if (resModalClose) {
    resModalClose.addEventListener('click', () => {
      resModal.classList.remove('active');
    });
  }

  // ------------------------------------------------------------------------
  // 8. SCROLL FADE-IN ANIMATION INTERSECTION OBSERVER
  // ------------------------------------------------------------------------
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));
});
