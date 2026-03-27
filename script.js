let attempts = 0;
const maxAttempts = 3;
const box = document.getElementById('minecraft-box');
const attemptsCount = document.getElementById('attempts-count');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

let currentScale = 1;

// تحريك الصندوق بشكل عشوائي
function moveBox() {
  const maxX = window.innerWidth - 250;
  const maxY = window.innerHeight - 300;
  
  const randomX = Math.random() * maxX + 50;
  const randomY = Math.random() * maxY + 80;
  
  box.style.position = 'absolute';
  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;
  
  // تصغير الصندوق تدريجياً
  currentScale *= 0.85;
  box.style.transform = `scale(${currentScale})`;
}

// عند الضغط على الصندوق
box.addEventListener('click', () => {
  attempts++;
  attemptsCount.textContent = attempts;

  if (attempts < maxAttempts) {
    moveBox();
  } else {
    // الضغطة الثالثة → فتح الرسالة
    page1.style.opacity = '0';
    setTimeout(() => {
      page1.classList.add('hidden');
      page2.classList.remove('hidden');
      page2.style.opacity = '1';
    }, 800);
  }
});

// منطقة الردود
const sendBtn = document.getElementById('send-btn');
const replyInput = document.getElementById('reply-input');
const repliesContainer = document.getElementById('replies');

// تحميل الردود المحفوظة
function loadReplies() {
  const savedReplies = JSON.parse(localStorage.getItem('mamaReplies')) || [];
  savedReplies.forEach(reply => addReplyToDOM(reply));
}

function addReplyToDOM(text) {
  const div = document.createElement('div');
  div.className = 'reply';
  div.textContent = text;
  repliesContainer.appendChild(div);
}

sendBtn.addEventListener('click', () => {
  const text = replyInput.value.trim();
  if (!text) return;

  // إضافة الرد
  addReplyToDOM(text);

  // حفظ في localStorage
  let saved = JSON.parse(localStorage.getItem('mamaReplies')) || [];
  saved.push(text);
  localStorage.setItem('mamaReplies', JSON.stringify(saved));

  // تفريغ الحقل
  replyInput.value = '';
});

// تشغيل عند تحميل الصفحة
window.onload = () => {
  loadReplies();
  
  // وضع الصندوق في البداية في المنتصف
  setTimeout(() => {
    const centerX = (window.innerWidth - 180) / 2;
    const centerY = (window.innerHeight - 300) / 2;
    box.style.position = 'absolute';
    box.style.left = `${centerX}px`;
    box.style.top = `${centerY}px`;
  }, 100);
};