/* =============================================
   RISEBAR – MAIN JS
   ============================================= */

   document.addEventListener('DOMContentLoaded', () => {

    // --- NAV TOGGLE (mobile hamburger) ---
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
  
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const isOpen = mainNav.classList.contains('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });
  
      // Close nav when a link is clicked
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', false);
        });
      });
    }
  
    // --- STICKY HEADER SHADOW ---
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10
          ? '0 2px 24px rgba(0,0,0,0.4)'
          : 'none';
      });
    }
  
    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Open clicked (if it wasn't already open)
        if (!isOpen) item.classList.add('open');
      });
    });
  
    // --- EXERCISE FILTER ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const exerciseCards = document.querySelectorAll('.exercise-card');
  
    if (filterBtns.length && exerciseCards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
  
          const filter = btn.dataset.filter;
          exerciseCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.display = match ? 'block' : 'none';
          });
        });
      });
    }
  
    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
  
    if (contactForm && formMessage) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value;
        const message = contactForm.message.value.trim();
        const gdpr = contactForm.gdpr.checked;
  
        // Validation
        if (!name) {
          showFormMessage('Vyplň prosím své jméno.', 'error');
          return;
        }
        if (!isValidEmail(email)) {
          showFormMessage('Zadej prosím platnou e-mailovou adresu.', 'error');
          return;
        }
        if (!subject) {
          showFormMessage('Vyber prosím předmět zprávy.', 'error');
          return;
        }
        if (message.length < 20) {
          showFormMessage('Zpráva musí mít alespoň 20 znaků.', 'error');
          return;
        }
        if (!gdpr) {
          showFormMessage('Pro odeslání musíš souhlasit se zpracováním osobních údajů.', 'error');
          return;
        }
  
        // Success (no real backend – just UI feedback)
        showFormMessage('Zpráva byla odeslána! Ozveme se ti do 48 hodin.', 'success');
        contactForm.reset();
      });
    }
  
    function showFormMessage(text, type) {
      if (!formMessage) return;
      formMessage.textContent = text;
      formMessage.style.display = 'block';
      formMessage.style.color = type === 'error' ? '#f87171' : '#4ade80';
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
  });