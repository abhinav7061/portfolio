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

    function getProfileSVG() {
        return `
            <!--svg for profile-->
            <svg viewBox="0 0 200 187" class="profile_blob" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill='currentColor'>
                <mask id="mask0" mask-type="alpha">
                    <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 
                    130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 
                    97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 
                    0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
                </mask>
                <g mask="url(#mask0)">
                    <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 
                    165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 
                    129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 
                    -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
                    <image class="profile_blob-img" x="0" y="0" href="assets/profile.png" />
                </g>
            </svg>
        `;
    }

    function addProfileImage() {
        const profileImgDiv = document.createElement('div');
        profileImgDiv.id = 'profile_img';
        profileImgDiv.innerHTML = getProfileSVG();
        tabContent.appendChild(profileImgDiv);
    }

    function handleFocus(event) {
        const element = event.target;
        if (element.value.trim() === '') {
            element.classList.add('focused-empty');
            element.classList.remove('focused-filled');
        } else {
            element.classList.add('focused-filled');
            element.classList.remove('focused-empty');
        }
    }

    function handleBlur(event) {
        const element = event.target;
        element.classList.remove('focused-empty', 'focused-filled');
    }

    function handleInput(event) {
        const element = event.target;
        if (element.value.trim() === '') {
            if (element === document.activeElement) {
                element.classList.add('focused-empty');
                element.classList.remove('focused-filled');
            } else {
                element.classList.remove('focused-empty', 'focused-filled');
            }
        } else {
            if (element === document.activeElement) {
                element.classList.add('focused-filled');
                element.classList.remove('focused-empty');
            } else {
                element.classList.remove('focused-empty', 'focused-filled');
            }
        }
    }

    function contactFormEvent() {
        const inputField = document.getElementById('contact_subject');
        const textareaField = document.getElementById('contact_msg');
        inputField.addEventListener('focus', handleFocus);
        inputField.addEventListener('blur', handleBlur);
        inputField.addEventListener('input', handleInput);

        textareaField.addEventListener('focus', handleFocus);
        textareaField.addEventListener('blur', handleBlur);
        textareaField.addEventListener('input', handleInput);
    }

    // Function to determine the callback based on the tab
    function determineCallback(tab) {
        switch (tab) {
            case 'intro':
                return () => {
                    initializeTyped();
                    handleReadMoreBtn();
                    addProfileImage();
                };
            case 'about':
                return () => {
                    initializeTyped();
                    addProfileImage();
                };
            case 'contact':
                return () => {
                    formSubmission();
                    addProfileImage();
                    contactFormEvent();
                };
            default:
                return null;
        }
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
            const callback = determineCallback(tab);
            loadTabContent(tab, callback);
            updateURL(tab);
            setActiveTab(tab);
            closeMobileMenu();
        });
    });

    window.addEventListener('popstate', () => {
        const tab = getTabFromURL();
        const callback = determineCallback(tab);
        loadTabContent(tab, callback);
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
    const initialCallback = determineCallback(initialTab);
    loadTabContent(initialTab, initialCallback);
    setActiveTab(initialTab);
});
