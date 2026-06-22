// Load data from JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        buildPage(data);
    })
    .catch(error => {
        console.error('Error loading data.json:', error);
    });

function buildPage(data) {
    // Hero section
    document.getElementById('heroNames').textContent =
        `${data.couple.yourName} ❤️ ${data.couple.herName}`;
    document.getElementById('heroDate').textContent =
        `🌸 ${data.couple.anniversaryDisplay} 🌸`;

    // Days counter
    const startDate = new Date(data.couple.anniversaryDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysNumber').textContent = diffDays.toLocaleString();

    // Monthly letter
    document.getElementById('monthlyLetterTitle').textContent =
        data.monthlyLetter.title;
    const letterContent = document.getElementById('monthlyLetterContent');
    letterContent.innerHTML = '';
    data.monthlyLetter.paragraphs.forEach((para, index) => {
        const p = document.createElement('p');
        if (index === 0) p.className = 'dear';
        if (index === data.monthlyLetter.paragraphs.length - 1) p.className = 'signature';
        p.innerHTML = para;
        letterContent.appendChild(p);
    });

    // Timeline
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    data.milestones.forEach(milestone => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
                    <div class="milestone-date">${milestone.date}</div>
                    <div class="milestone-title">${milestone.title}</div>
                    <div class="milestone-desc">${milestone.description}</div>
                `;
        timelineContainer.appendChild(item);
    });

    // Reasons
    const reasonsContainer = document.getElementById('reasonsContainer');
    reasonsContainer.innerHTML = '';
    data.reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        const num = String(index + 1).padStart(2, '0');
        card.innerHTML = `
                    <div class="reason-number">${num}</div>
                    <div class="reason-text">${reason}</div>
                `;
        reasonsContainer.appendChild(card);
    });

    // Photos
    const photosContainer = document.getElementById('photosContainer');
    photosContainer.innerHTML = '';
    if (data.photos.length === 0) {
        photosContainer.innerHTML = '<p style="text-align:center;color:#888;">📸 Photos coming soon...</p>';
    } else {
        data.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = 'Our memory';
            img.loading = 'lazy';
            img.onerror = function() {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'photo-placeholder';
                placeholder.textContent = '📷 Photo coming soon';
                photosContainer.appendChild(placeholder);
            };
            photosContainer.appendChild(img);
        });
    }

    // Song
    document.getElementById('songEmbed').src =
    `https://www.youtube.com/embed/${data.youtubeSongId}?autoplay=1&loop=1&playlist=${data.youtubeSongId}`;

    // Closing message
    document.getElementById('closingMessage').innerHTML = data.closingMessage;
}

// ============ ANIMATIONS ============

// Flying hearts
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '🌸', '✨', '🩷', '💓'];

function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 6 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 400);
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 300);
}

// Click sparkles
document.addEventListener('click', function(e) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.textContent = '✨';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    sparkle.style.setProperty('--dy', (Math.random() * -60 - 20) + 'px');
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(el => observer.observe(el));