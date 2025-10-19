// Role Animation
const roles = document.querySelectorAll('.role');
let currentIndex = 0;
let isAnimating = false;

function rotateRoles() {
    if (isAnimating) return;
    isAnimating = true;
    const currentRole = roles[currentIndex];
    currentRole.classList.remove('typing');
    currentRole.classList.add('erasing');

    setTimeout(() => {
        currentRole.classList.remove('active', 'erasing');
        currentIndex = (currentIndex + 1) % roles.length;
        const nextRole = roles[currentIndex];
        nextRole.classList.add('active', 'typing');
        setTimeout(() => { nextRole.classList.remove('typing'); isAnimating = false; }, 2000);
    }, 1500);
}

roles[currentIndex].classList.add('active', 'typing');
setInterval(rotateRoles, 4000);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Ripple effect for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = button.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + 'px';
        ripple.style.top = e.clientY - rect.top + 'px';
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Counter Animation for Statistics (optional)
const observerOptions = { threshold: 0.5, rootMargin: '0px' };
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    updateCounter();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') animateCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) observer.observe(statsSection);

// Fade-in animation for skills cards
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));











// Filter projects by category
const projectButtons = document.querySelectorAll('.projects-nav button');
const projectCards = document.querySelectorAll('.project-card');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        projectButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category').includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Fade-in animation for projects
const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

projectCards.forEach(card => projectObserver.observe(card));

// Handle "View Design" and "View Code" buttons
document.querySelectorAll('.project-buttons .btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const projectCard = this.closest('.project-card');
        const category = projectCard.getAttribute('data-category');
        const projectTitle = projectCard.querySelector('h3').textContent;

        let url = '#'; // Default placeholder URL

        if (this.classList.contains('view-design')) {
            // Logic for "View Design" button
            if (category === 'figma') {
                // Example: Figma project links
                if (projectTitle === 'Sun Oil & Sun Serum') url = 'https://www.figma.com/design/67PCjp78AFMFsEJq1JNYU9/capstone?node-id=0-1&t=YHkWtUJPvvf5BLD1-1';
                else if (projectTitle === 'Coffee Connect') url = 'https://www.linkedin.com/posts/dilmi-nethmini-439631302_uiuxdesign-figma-uidesign-activity-7363047224202645504-T2yA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE1V5C0B7Mb6nKnDCAF6NBRIZhRvqGCQt8A';
                else if (projectTitle === 'Newstead Girls’ College Website') url = 'https://www.figma.com/design/aiUUIale7aurdxMhikc2Y5/Untitled?node-id=317-2&t=Xbq3TUejmzsCFVXe-1';
                else if (projectTitle === 'Smart Note Calculator') url = 'https://www.figma.com/design/LvEjMI1CmfxSFGvkzW5mTf/Untitled?node-id=0-1&t=Xbq3TUejmzsCFVXe-1';
            }
            // Add more design links for coded projects if applicable
            else if (projectTitle === 'Coded Project 1') url = 'https://dilminethmini22.github.io/negombo-travel-website/';
            else if (projectTitle === 'Coded Project 2') url = 'https://dilminethmini22.github.io/dancing-star-onepage-site-/';
            else if (projectTitle === 'Coded Project 4') url = 'https://www.linkedin.com/posts/dilmi-nethmini-439631302_chatbot-frontenddevelopment-reactjs-activity-7379933207149985793-_kEL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE1V5C0B7Mb6nKnDCAF6NBRIZhRvqGCQt8A';
            else if (projectTitle === 'Coded Project 5') url = 'https://www.linkedin.com/posts/dilmi-nethmini-439631302_chemosense-iot-machinelearning-activity-7376630533885206529-yLZI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE1V5C0B7Mb6nKnDCAF6NBRIZhRvqGCQt8A';
        } else if (this.classList.contains('view-code')) {
            // Logic for "View Code" button
            if (category === 'code') {
                // Example: Coded project links (e.g., GitHub repos)
                if (projectTitle === 'Coded Project 1') url = 'https://github.com/dilminethmini22/negombo-travel-website.git';
                else if (projectTitle === 'Coded Project 2') url = 'https://github.com/dilminethmini22/dancing-star-onepage-site-.git';
                else if (projectTitle === 'React Portfolio Website') url = 'https://github.com/dilminethmini22/react-portfolio';
                else if (projectTitle === 'Coded Project 4') url = 'https://github.com/dilminethmini22/chatbot-project.git';
                else if (projectTitle === 'Coded Project 5') url = 'https://github.com/hello-sahasraka/ChemoSense.git';
            }
            // Add more code links for figma projects if applicable
        }

        if (url !== '#') {
            window.open(url, '_blank');
        } else {
            alert('Link not available yet!');
        }
    });
});
