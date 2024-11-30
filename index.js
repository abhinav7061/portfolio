document.addEventListener('DOMContentLoaded', () => {
    const site_mobile_nav = document.getElementById('site-mobile-nav');
    const mobile_nav_toggle = document.querySelector('.mobile-nav');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContent = document.getElementById('tab-content');
    const darkModeToggleBtn = document.getElementById('darkmode-toggle-input');

    // Function to toggle dark mode
    function toggleDarkMode() {
        const isChecked = darkModeToggleBtn.checked;
        document.body.classList.toggle('dark-mode', isChecked);
        document.body.classList.toggle('light-mode', !isChecked);
        localStorage.setItem('theme', isChecked ? 'dark' : 'light');
    }

    // Function to toggle the mobile menu
    function toggleShowNav() {
        site_mobile_nav.classList.toggle('mobile-menu');
    }

    // Function to close the mobile menu
    function closeMobileMenu() {
        site_mobile_nav.classList.remove('mobile-menu');
    }

    // Function to handle tab content loading
    function loadTabContent(tab, callback) {
        fetch(`pages/${tab}.html`)
            .then(response => response.text())
            .then(data => {
                tabContent.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error('Error loading tab content:', error));
    }

    // Function to update URL
    function updateURL(tab) {
        const newUrl = `${window.location.pathname}?tab=${tab}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    // Function to get the tab from URL
    function getTabFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'intro';
    }

    // Function to set the active tab
    function setActiveTab(tab) {
        tabLinks.forEach(link => link.classList.remove('active'));
        const activeTabLink = document.querySelector(`.tab-link[data-tab="${tab}"]`);
        if (activeTabLink) {
            activeTabLink.classList.add('active');
        }
    }

    // Function to handle "Read More" button
    function handleReadMoreBtn() {
        const readMoreLink = document.getElementById('read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function (e) {
                e.preventDefault();
                updateURL('works');
                loadTabContent('works');
                setActiveTab('works');
            });
        }
    }

    // Function to handle form submission
    function formSubmission(tab, callback) {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                sendEmail();
            });
        }
    }

    // Function to initialize Typed.js
    function initializeTyped() {
        new Typed(".abhinavintrotext", {
            strings: ["Abhinav Kumar Soni", "A Web Developer", "A Competitive Programmer", "A Native Developer"],
            typeSpeed: 80,
            backSpeed: 60,
            loop: true
        });
    }

    // Function to send email
    function sendEmail() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const cc = 'abhinavkumar93043@gmail.com';
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&cc=${cc}&su=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}`;
        window.open(mailtoLink, '_blank');
    }

    // Event listeners
    darkModeToggleBtn.addEventListener('click', toggleDarkMode);
    mobile_nav_toggle.addEventListener('click', toggleShowNav);

    document.addEventListener('click', function (event) {
        if (!site_mobile_nav.contains(event.target) && !mobile_nav_toggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const tab = event.target.getAttribute('data-tab');
            switch (tab) {
                case 'intro':
                    loadTabContent(tab, () => {
                        initializeTyped();
                        handleReadMoreBtn();
                    });
                    break;
                case 'about':
                    loadTabContent(tab, initializeTyped);
                    break;
                case 'contact':
                    loadTabContent(tab, formSubmission);
                    break;
                default:
                    loadTabContent(tab);
            }
            updateURL(tab);
            setActiveTab(tab);
            closeMobileMenu();
        });
    });

    window.addEventListener('popstate', () => {
        const tab = getTabFromURL();
        loadTabContent(tab, initializeTyped);
        setActiveTab(tab);
    });

    // Initialize theme based on localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeToggleBtn.checked = false;
    } else {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeToggleBtn.checked = true;
    }

    // Initialize page with correct tab
    const initialTab = getTabFromURL();
    loadTabContent(initialTab, initializeTyped);
    setActiveTab(initialTab);
});
