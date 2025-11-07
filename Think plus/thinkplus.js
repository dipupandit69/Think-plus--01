const coursesData = [
    {
        id: 1,
        title: "MBA Mastery",
        category: "business",
        description: "Complete MBA curriculum covering strategy, finance, and management",
        price: "₹4,999",
        duration: "6 months",
        icon: "📚"
    },
    {
        id: 2,
        title: "Web Development",
        category: "tech",
        description: "Learn full-stack development with React, Node.js, and databases",
        price: "₹3,999",
        duration: "4 months",
        icon: "💻"
    },
    {
        id: 3,
        title: "Digital Marketing",
        category: "business",
        description: "Master SEO, social media, and content marketing strategies",
        price: "₹2,999",
        duration: "3 months",
        icon: "📱"
    },
    {
        id: 4,
        title: "Data Science",
        category: "tech",
        description: "Python, machine learning, and data analysis from scratch",
        price: "₹5,999",
        duration: "5 months",
        icon: "📊"
    },
    {
        id: 5,
        title: "Financial Analysis",
        category: "finance",
        description: "Stock market analysis, portfolio management, and investment strategies",
        price: "₹4,499",
        duration: "4 months",
        icon: "💰"
    },
    {
        id: 6,
        title: "UI/UX Design",
        category: "tech",
        description: "Create beautiful user interfaces and experiences",
        price: "₹3,499",
        duration: "3 months",
        icon: "🎨"
    },
    {
        id: 7,
        title: "Business Analytics",
        category: "business",
        description: "Transform data into actionable business insights",
        price: "₹4,199",
        duration: "4 months",
        icon: "📈"
    },
    {
        id: 8,
        title: "Cryptocurrency",
        category: "finance",
        description: "Understanding blockchain technology and digital assets",
        price: "₹3,999",
        duration: "3 months",
        icon: "₿"
    },
    {
        id: 9,
        title: "AI & ML Advanced",
        category: "tech",
        description: "Advanced AI concepts and machine learning algorithms",
        price: "₹6,999",
        duration: "6 months",
        icon: "🤖"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayCourses('all');
    setupFilterButtons();
    setupNavigation();
    setupForm();
    setupHamburger();
});

// Display courses based on filter
function displayCourses(filter) {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';

    const filteredCourses = filter === 'all' 
        ? coursesData 
        : coursesData.filter(course => course.category === filter);

    filteredCourses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.style.animation = `fadeInUp ${0.3 + index * 0.1}s ease`;
        
        courseCard.innerHTML = `
            <div class="course-image">${course.icon}</div>
            <div class="course-content">
                <span class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
                <h3>${course.title}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-footer">
                    <span class="course-price">${course.price}</span>
                    <span class="course-duration">${course.duration}</span>
                </div>
                <button class="enroll-btn" onclick="enrollCourse('${course.title}')">Enroll Now</button>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

// Setup filter buttons
function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayCourses(this.dataset.filter);
        });
    });
}

// Enroll in course
function enrollCourse(courseName) {
    alert(`Great! You're interested in "${courseName}". Please fill the contact form below.`);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scroll for navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup hamburger menu
function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.flexDirection = 'column';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            navMenu.style.zIndex = '999';
        });
    }
}

// Setup form submission
function setupForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Thank you ${name}! We've received your message. We'll contact you at ${email} soon.`);
            
            // Reset form
            this.reset();
        });
    }
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.feature-card, .course-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

console.log('ThinkPlus Website loaded successfully!');