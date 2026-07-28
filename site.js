document.addEventListener('DOMContentLoaded', function () {
  const openCvModal = document.getElementById('openCvModal');
  const cvModal = document.getElementById('cvModal');
  const closeCvModal = document.getElementById('closeCvModal');

  if (openCvModal && cvModal && closeCvModal) {
    function openModal(event) {
      event.preventDefault();
      cvModal.classList.add('is-open');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      closeCvModal.focus();
    }

    function closeModal() {
      cvModal.classList.remove('is-open');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      openCvModal.focus();
    }

    openCvModal.addEventListener('click', openModal);
    closeCvModal.addEventListener('click', closeModal);

    cvModal.addEventListener('click', function (event) {
      if (event.target === cvModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && cvModal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.about, .home-link-card, .page-content .info-card, .page-content .card'
    );

    revealTargets.forEach(function (element, index) {
      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
    });

    document.body.classList.add('motion-ready');

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(function (element) {
      revealObserver.observe(element);
    });
  }
});
