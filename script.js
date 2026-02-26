import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollmentForm');
  const formMessage = document.getElementById('formMessage');
  const submitButton = form.querySelector('.submit-button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const formData = {
      name: document.getElementById('name').value,
      class_level: document.getElementById('class').value,
      board: document.getElementById('board').value,
      contact: document.getElementById('contact').value,
      email: document.getElementById('email').value || null,
      mode: document.getElementById('mode').value,
      schedule: document.getElementById('schedule').value,
      competitive_prep: document.getElementById('competitive').checked,
      demo_requested: document.getElementById('demo').checked,
      message: document.getElementById('message').value || null,
    };

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .insert([formData])
        .select();

      if (error) throw error;

      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you for enrolling! We will contact you within 24 hours.';

      form.reset();

      setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      formMessage.className = 'form-message error';
      formMessage.textContent = 'There was an error submitting your enrollment. Please try again or contact us directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Enrollment';
    }
  });

  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const enrollSection = document.querySelector('#enroll');
      if (enrollSection) {
        const headerOffset = 80;
        const elementPosition = enrollSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});
