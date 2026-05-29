      // Sticky navbar shadow
      window.addEventListener('scroll', () => {
        const nav = document.getElementById('mainNav');
        nav.classList.toggle('scrolled', window.scrollY > 30);
      });

      // Heart toggle on product cards
      document.querySelectorAll('.action-btn').forEach(btn => {
        if (btn.querySelector('.bi-heart')) {
          btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            icon.classList.toggle('bi-heart');
            icon.classList.toggle('bi-heart-fill');
            btn.classList.toggle('active-heart');
          });
        }
      });