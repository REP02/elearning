// Course Data
const courses = [
    {
        id: 1,
        title: "General Computer Science",
        description: "Master the fundamentals of computer science including algorithms, data structures, and programming principles.",
        icon: "💻",
        lessons: [
            { id: 1, title: "Introduction to Programming", duration: "2 hours", completed: false },
            { id: 2, title: "Data Structures and Algorithms", duration: "4 hours", completed: false },
            { id: 3, title: "Object-Oriented Programming", duration: "3 hours", completed: false },
            { id: 4, title: "Database Design", duration: "3 hours", completed: false },
            { id: 5, title: "Software Engineering Principles", duration: "2 hours", completed: false }
        ]
    },
    {
        id: 2,
        title: "Ethical Hacking",
        description: "Learn the art of ethical hacking and cybersecurity to protect systems from malicious attacks.",
        icon: "🔒",
        lessons: [
            { id: 1, title: "Introduction to Cybersecurity", duration: "2 hours", completed: false },
            { id: 2, title: "Network Security Fundamentals", duration: "3 hours", completed: false },
            { id: 3, title: "Penetration Testing Basics", duration: "4 hours", completed: false },
            { id: 4, title: "Vulnerability Assessment", duration: "3 hours", completed: false },
            { id: 5, title: "Security Tools and Techniques", duration: "2 hours", completed: false }
        ]
    },
    {
        id: 3,
        title: "Data Protection",
        description: "Comprehensive course on data privacy, GDPR compliance, and information security best practices.",
        icon: "🛡️",
        lessons: [
            { id: 1, title: "Data Privacy Fundamentals", duration: "2 hours", completed: false },
            { id: 2, title: "GDPR and Compliance", duration: "3 hours", completed: false },
            { id: 3, title: "Data Encryption Techniques", duration: "3 hours", completed: false },
            { id: 4, title: "Privacy Impact Assessment", duration: "2 hours", completed: false },
            { id: 5, title: "Incident Response Planning", duration: "2 hours", completed: false }
        ]
    },
    {
        id: 4,
        title: "Blockchain and Solidity",
        description: "Dive into blockchain technology and learn to develop smart contracts using Solidity.",
        icon: "⛓️",
        lessons: [
            { id: 1, title: "Blockchain Fundamentals", duration: "3 hours", completed: false },
            { id: 2, title: "Introduction to Solidity", duration: "4 hours", completed: false },
            { id: 3, title: "Smart Contract Development", duration: "5 hours", completed: false },
            { id: 4, title: "DeFi and DApps", duration: "4 hours", completed: false },
            { id: 5, title: "Security in Smart Contracts", duration: "3 hours", completed: false }
        ]
    },
    {
        id: 5,
        title: "Computer Networking",
        description: "Understand network protocols, routing, and network administration from basics to advanced concepts.",
        icon: "🌐",
        lessons: [
            { id: 1, title: "Network Fundamentals", duration: "2 hours", completed: false },
            { id: 2, title: "TCP/IP Protocol Suite", duration: "3 hours", completed: false },
            { id: 3, title: "Routing and Switching", duration: "4 hours", completed: false },
            { id: 4, title: "Network Security", duration: "3 hours", completed: false },
            { id: 5, title: "Network Troubleshooting", duration: "2 hours", completed: false }
        ]
    }
];

// Global Variables
let currentCourse = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    showHomePage();
});

// Load and display courses on the home page
function loadCourses() {
    const coursesGrid = document.getElementById('courses-grid');
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
        const totalLessons = course.lessons.length;
        const progressPercentage = (completedLessons / totalLessons) * 100;

        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.onclick = () => showCourseDetail(course.id);

        courseCard.innerHTML = `
            <span class="course-icon">${course.icon}</span>
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <div class="course-stats">
                <span class="lesson-count">${totalLessons} lessons</span>
                <span class="progress-badge ${progressPercentage === 100 ? 'completed' : ''}">
                    ${Math.round(progressPercentage)}% Complete
                </span>
            </div>
        `;

        coursesGrid.appendChild(courseCard);
    });
}

// Show course detail page
function showCourseDetail(courseId) {
    currentCourse = courses.find(course => course.id === courseId);
    
    if (!currentCourse) return;

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // Show course detail page
    document.getElementById('course-detail-page').classList.add('active');

    // Update course header
    document.getElementById('course-title').textContent = currentCourse.title;
    document.getElementById('course-description').textContent = currentCourse.description;

    // Calculate and display progress
    const completedLessons = currentCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = currentCourse.lessons.length;
    const progressPercentage = (completedLessons / totalLessons) * 100;

    document.getElementById('course-progress-fill').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').textContent = `${completedLessons}/${totalLessons} lessons completed (${Math.round(progressPercentage)}%)`;

    // Load lessons
    loadLessons();

    // Update complete course button
    const completeBtn = document.getElementById('complete-course-btn');
    if (progressPercentage === 100) {
        completeBtn.textContent = 'Course Completed!';
        completeBtn.disabled = true;
        completeBtn.style.background = '#4caf50';
    } else {
        completeBtn.textContent = 'Complete Course';
        completeBtn.disabled = true;
        completeBtn.style.background = '';
    }
}

// Load lessons for the current course
function loadLessons() {
    const lessonsList = document.getElementById('lessons-list');
    lessonsList.innerHTML = '';

    currentCourse.lessons.forEach(lesson => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';

        lessonItem.innerHTML = `
            <div class="lesson-info">
                <h4>${lesson.title}</h4>
                <p>Duration: ${lesson.duration}</p>
            </div>
            <div class="lesson-status ${lesson.completed ? 'completed' : 'pending'}">
                ${lesson.completed ? 'Completed' : 'Pending'}
            </div>
        `;

        lessonItem.onclick = () => toggleLessonCompletion(lesson.id);
        lessonsList.appendChild(lessonItem);
    });

    updateCompleteButtonState();
}

// Toggle lesson completion status
function toggleLessonCompletion(lessonId) {
    const lesson = currentCourse.lessons.find(l => l.id === lessonId);
    if (lesson) {
        lesson.completed = !lesson.completed;
        loadLessons();
        
        // Update progress display
        const completedLessons = currentCourse.lessons.filter(l => l.completed).length;
        const totalLessons = currentCourse.lessons.length;
        const progressPercentage = (completedLessons / totalLessons) * 100;

        document.getElementById('course-progress-fill').style.width = `${progressPercentage}%`;
        document.getElementById('progress-text').textContent = `${completedLessons}/${totalLessons} lessons completed (${Math.round(progressPercentage)}%)`;
    }
}

// Update complete course button state
function updateCompleteButtonState() {
    const completedLessons = currentCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = currentCourse.lessons.length;
    const completeBtn = document.getElementById('complete-course-btn');

    if (completedLessons === totalLessons) {
        completeBtn.disabled = false;
        completeBtn.textContent = 'Complete Course';
    } else {
        completeBtn.disabled = true;
        completeBtn.textContent = 'Complete Course';
    }
}

// Complete the entire course
function completeCourse() {
    if (!currentCourse) return;

    // Mark all lessons as completed
    currentCourse.lessons.forEach(lesson => {
        lesson.completed = true;
    });

    // Update the display
    loadLessons();
    
    const completedLessons = currentCourse.lessons.length;
    const totalLessons = currentCourse.lessons.length;
    const progressPercentage = 100;

    document.getElementById('course-progress-fill').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').textContent = `${completedLessons}/${totalLessons} lessons completed (${Math.round(progressPercentage)}%)`;

    // Update complete button
    const completeBtn = document.getElementById('complete-course-btn');
    completeBtn.textContent = 'Course Completed!';
    completeBtn.disabled = true;
    completeBtn.style.background = '#4caf50';

    // Show success message
    alert(`Congratulations! You have completed "${currentCourse.title}"!`);
}

// Show home page
function showHomePage() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
    loadCourses();
}

// Show progress page
function showProgress() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('progress-page').classList.add('active');
    loadProgressData();
}

// Load progress data
function loadProgressData() {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(course => 
        course.lessons.every(lesson => lesson.completed)
    ).length;
    const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
    const completedLessons = courses.reduce((sum, course) => 
        sum + course.lessons.filter(lesson => lesson.completed).length, 0
    );
    const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    // Update progress summary
    const progressSummary = document.getElementById('progress-summary');
    progressSummary.innerHTML = `
        <h3>Overall Progress</h3>
        <p><strong>Courses Completed:</strong> ${completedCourses}/${totalCourses}</p>
        <p><strong>Lessons Completed:</strong> ${completedLessons}/${totalLessons}</p>
        <p><strong>Overall Progress:</strong> ${Math.round(overallProgress)}%</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${overallProgress}%"></div>
        </div>
    `;

    // Update course progress
    const progressCourses = document.getElementById('progress-courses');
    progressCourses.innerHTML = '';

    courses.forEach(course => {
        const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
        const totalLessons = course.lessons.length;
        const progressPercentage = (completedLessons / totalLessons) * 100;

        const courseCard = document.createElement('div');
        courseCard.className = 'progress-course-card';
        courseCard.onclick = () => showCourseDetail(course.id);

        courseCard.innerHTML = `
            <h4>${course.icon} ${course.title}</h4>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
            <p>${completedLessons}/${totalLessons} lessons completed (${Math.round(progressPercentage)}%)</p>
        `;

        progressCourses.appendChild(courseCard);
    });
}
