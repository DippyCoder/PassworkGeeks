// script.js
const numbers = '0123456789'.split('');
const lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?/~`-='.split('');

function createCheckboxes(chars, containerId) {
  const container = document.querySelector(`#${containerId}`).parentElement;
  chars.forEach(c => {
    const label = document.createElement('label');
    label.className = "flex items-center space-x-1";
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = c;
    checkbox.checked = true;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(c));
    container.appendChild(label);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createCheckboxes(numbers, 'numbers-template');
  createCheckboxes(lowercase, 'letters-template');
  createCheckboxes(uppercase, 'uppercase-template');
  createCheckboxes(symbols, 'symbols-template');

  document.getElementById('generate').addEventListener('click', () => {
    const length = Math.min(1000, parseInt(document.getElementById('length').value) || 16);
    const groups = [
      { toggle: 'toggle-numbers', container: 'numbers-template' },
      { toggle: 'toggle-lowercase', container: 'letters-template' },
      { toggle: 'toggle-uppercase', container: 'uppercase-template' },
      { toggle: 'toggle-symbols', container: 'symbols-template' }
    ];

    let chars = [];
    groups.forEach(g => {
      if (document.getElementById(g.toggle).checked) {
        const groupContainer = document.querySelector(`#${g.container}`).parentElement;
        const groupCheckboxes = groupContainer.querySelectorAll('input[type=checkbox]:checked');
        groupCheckboxes.forEach(cb => chars.push(cb.value));
      }
    });

    if (chars.length === 0) {
      alert('Please select at least one character set.');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('password').value = password;
  });

  // 👁 Password visibility toggle with icon switch
  document.getElementById('toggle-visibility').addEventListener('click', () => {
    const pwField = document.getElementById('password');
    const icon = document.querySelector('#toggle-visibility img');
    if (pwField.type === 'password') {
      pwField.type = 'text';
      icon.src = 'icons/eye.svg';
    } else {
      pwField.type = 'password';
      icon.src = 'icons/eye-off.svg';
    }
  });

  document.getElementById('copy').addEventListener('click', () => {
    const pwField = document.getElementById('password');
    pwField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
  });

  // 🌙 Mode toggle with icon switch
  document.getElementById('mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('#mode-toggle img');
    if (document.body.classList.contains('light-mode')) {
      icon.src = 'icons/sun.svg';
    } else {
      icon.src = 'icons/moon.svg';
    }
  });
});