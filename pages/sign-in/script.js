/* =============================================
   NEXORA LOGIN — script.js
   Validation & Interaction Logic
   ============================================= */

(function () {
  'use strict';

  /* ── DOM refs ── */
  const form        = document.getElementById('loginForm');
  const emailInput  = document.getElementById('email');
  const passInput   = document.getElementById('password');
  const emailGroup  = document.getElementById('emailGroup');
  const passGroup   = document.getElementById('passwordGroup');
  const emailError  = document.getElementById('emailError');
  const passError   = document.getElementById('passwordError');
  const togglePw    = document.getElementById('togglePw');
  const eyeOpen     = document.getElementById('eyeOpen');
  const eyeClose    = document.getElementById('eyeClose');
  const loginBtn    = document.getElementById('loginBtn');
  const btnLoader   = document.getElementById('btnLoader');
  const successToast= document.getElementById('successToast');

  /* ── Validation rules ── */
  const rules = {
    email: {
      required: 'Vui lòng nhập địa chỉ email.',
      invalid:  'Email không hợp lệ. Ví dụ: ten@email.com',
      regex:    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    },
    password: {
      required: 'Vui lòng nhập mật khẩu.',
      minLen:   'Mật khẩu phải có ít nhất 6 ký tự.',
      min:      6,
    },
  };

  /* ── Helpers ── */
  function setValid(group, errorEl) {
    group.classList.remove('is-invalid');
    group.classList.add('is-valid');
    errorEl.textContent = '';
  }

  function setError(group, errorEl, msg) {
    group.classList.remove('is-valid');
    group.classList.add('is-invalid');
    errorEl.textContent = msg;
  }

  function clearState(group, errorEl) {
    group.classList.remove('is-valid', 'is-invalid');
    errorEl.textContent = '';
  }

  /* ── Validate email ── */
  function validateEmail(show = true) {
    const val = emailInput.value.trim();
    if (!val) {
      if (show) setError(emailGroup, emailError, rules.email.required);
      else clearState(emailGroup, emailError);
      return false;
    }
    if (!rules.email.regex.test(val)) {
      if (show) setError(emailGroup, emailError, rules.email.invalid);
      return false;
    }
    setValid(emailGroup, emailError);
    return true;
  }

  /* ── Validate password ── */
  function validatePassword(show = true) {
    const val = passInput.value;
    if (!val) {
      if (show) setError(passGroup, passError, rules.password.required);
      else clearState(passGroup, passError);
      return false;
    }
    if (val.length < rules.password.min) {
      if (show) setError(passGroup, passError, rules.password.minLen);
      return false;
    }
    setValid(passGroup, passError);
    return true;
  }

  /* ── Real-time validation (on blur & on input after first attempt) ── */
  let emailTouched = false;
  let passTouched  = false;

  emailInput.addEventListener('blur', () => {
    emailTouched = true;
    validateEmail(true);
  });

  emailInput.addEventListener('input', () => {
    if (emailTouched) validateEmail(true);
  });

  passInput.addEventListener('blur', () => {
    passTouched = true;
    validatePassword(true);
  });

  passInput.addEventListener('input', () => {
    if (passTouched) validatePassword(true);
  });

  /* ── Toggle password visibility ── */
  togglePw.addEventListener('click', () => {
    const isHidden = passInput.type === 'password';
    passInput.type  = isHidden ? 'text' : 'password';
    eyeOpen.style.display  = isHidden ? 'none'  : '';
    eyeClose.style.display = isHidden ? ''      : 'none';
  });

  /* ── Form submit ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    emailTouched = true;
    passTouched  = true;

    const emailOk = validateEmail(true);
    const passOk  = validatePassword(true);

    if (!emailOk || !passOk) {
      // Focus first invalid field
      if (!emailOk) emailInput.focus();
      else passInput.focus();
      return;
    }

    /* Simulate async login */
    loginBtn.disabled = true;
    loginBtn.querySelector('.btn-text').style.opacity = '0.5';
    loginBtn.querySelector('.btn-arrow').style.display = 'none';
    btnLoader.style.display = '';
    successToast.style.display = 'none';

    await fakeRequest(1400);

    loginBtn.disabled = false;
    loginBtn.querySelector('.btn-text').style.opacity = '';
    loginBtn.querySelector('.btn-arrow').style.display = '';
    btnLoader.style.display = 'none';

    successToast.style.display = 'flex';
    successToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function fakeRequest(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();