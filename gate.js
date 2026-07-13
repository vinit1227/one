import { logAttempt } from './firebase-config.js';

/* ============================================================
   THE PASS — her birthdate, day + month only
============================================================ */
const CORRECT_DAY   = 26;
const CORRECT_MONTH = 2;

const dayInput   = document.getElementById('dd');
const monthInput = document.getElementById('mm');
const errorMsg   = document.getElementById('gateError');
const gateCard   = document.getElementById('gateCard');
const sealMark   = document.getElementById('sealMark');

function focusNext(current, next, maxLen){
  current.addEventListener('input', () => {
    current.value = current.value.replace(/[^0-9]/g, '').slice(0, maxLen);
    if (current.value.length === maxLen && next) next.focus();
  });
}
focusNext(dayInput, monthInput, 2);
focusNext(monthInput, null, 2);

[dayInput, monthInput].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPass();
  });
});

function checkPass(){
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);

  if (!day || !month){
    showError("enter the full date");
    return;
  }

  const success = day === CORRECT_DAY && month === CORRECT_MONTH;
  const entered = `${dayInput.value}/${monthInput.value}`;

  logAttempt(success, entered);

  if (success){
    unlock();
  } else {
    showError("not quite — try again");
    gateCard.classList.remove('shake');
    void gateCard.offsetWidth; // restart animation
    gateCard.classList.add('shake');
  }
}

function showError(msg){
  errorMsg.textContent = msg;
  errorMsg.classList.add('visible');
}

function unlock(){
  errorMsg.classList.remove('visible');
  sealMark.classList.add('cracking');
  gateCard.style.pointerEvents = 'none';
  document.body.classList.add('page-out');
  setTimeout(() => {
    window.location.href = 'chapter1.html';
  }, 750);
}

document.getElementById('gateSubmit').addEventListener('click', checkPass);

/* ambient gold particles, same as the rest of the site */
(function(){
  const field = document.getElementById('particles');
  if (!field) return;
  for (let i = 0; i < 22; i++){
    const m = document.createElement('div');
    m.className = 'mote';
    m.style.left = Math.random() * 100 + 'vw';
    m.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    m.style.animationDuration = (8 + Math.random() * 10) + 's';
    m.style.animationDelay = (Math.random() * 10) + 's';
    field.appendChild(m);
  }
})();
