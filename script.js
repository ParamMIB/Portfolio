// PART 1: Top Main Nav Bar Views Router
const navButtons = document.querySelectorAll('.nav-btn');
const pageViews = document.querySelectorAll('.page-view');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        pageViews.forEach(view => view.classList.remove('active'));
        
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// PART 2: Sidebar Insight Widget Toggle Switch Logic
const subButtons = document.querySelectorAll('.sub-widget-btn');
const subContents = document.querySelectorAll('.sub-content');
const displayPanel = document.querySelector('.widget-display-panel');

subButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Check if the button we clicked is already open/active
        const isAlreadyActive = button.classList.contains('active');
        
        // Step A: Reset and clear all active states by default
        subButtons.forEach(btn => btn.classList.remove('active'));
        subContents.forEach(content => content.classList.remove('active'));
        displayPanel.classList.remove('open');
        
        // Step B: If it WAS NOT active, open it up normally!
        if (!isAlreadyActive) {
            button.classList.add('active');
            displayPanel.classList.add('open');
            
            const targetSubId = button.getAttribute('data-sub');
            document.getElementById(targetSubId).classList.add('active');
        }
        // If it WAS already active, the code stops here and leaves everything cleanly collapsed!
    });
});
