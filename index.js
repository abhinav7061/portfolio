document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContent = document.getElementById('tab-content');

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
        });
    });

    window.addEventListener('popstate', () => {
        const tab = getTabFromURL();
        loadTabContent(tab, initializeTyped);
        setActiveTab(tab);
    });

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

    function formSubmission(tab, callback) {
        const form = document.querySelector('#contactForm');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            sendEmail();
        });
    }

    function loadTabContent(tab, callback) {
        fetch(`pages/${tab}.html`)
            .then(response => response.text())
            .then(data => {
                tabContent.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error('Error loading tab content:', error));
    }

    function updateURL(tab) {
        const newUrl = `${window.location.pathname}?tab=${tab}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    function getTabFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'intro';
    }

    function initializeTyped() {
        var typed = new Typed(".abhinavintrotext", {
            strings: ["Abhinav Kumar Soni", "A Web Developer", "A Competetive Programmer", "A Native Developer"],
            typeSpeed: 80,
            backSpeed: 60,
            loop: true
        });
    }

    function sendEmail() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const cc = 'abhi235@gmail.com';
        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&cc=${cc}&su=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}`;
        window.open(mailtoLink, '_blank');
    }

    function setActiveTab(tab) {
        tabLinks.forEach(link => link.classList.remove('active'));

        const activeTabLink = document.querySelector(`.tab-link[data-tab="${tab}"]`);
        if (activeTabLink) {
            activeTabLink.classList.add('active');
        }
    }

    const initialTab = getTabFromURL();
    loadTabContent(initialTab, initializeTyped);
    setActiveTab(initialTab);
});
