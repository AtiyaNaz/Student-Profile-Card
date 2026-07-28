/* 
  Student Profile Card - script.js
  Handles all DOM Manipulation Tasks as per assignment
  Uses at least 8 DOM methods/properties:
  - getElementById, querySelector, querySelectorAll
  - textContent, value, innerHTML (if needed)
  - style.backgroundColor, style.display
  - addEventListener, classList.toggle, classList.add, classList.remove
*/

// ====== Select DOM Elements ======
// Using getElementById (DOM method 1)
const studentNameInput = document.getElementById('studentNameInput');
const studentAgeInput = document.getElementById('studentAgeInput');
const studentSubjectInput = document.getElementById('studentSubjectInput');
const studentColorInput = document.getElementById('studentColorInput');
const profilePictureInput = document.getElementById('profilePictureInput');

// Buttons
const createProfileBtn = document.getElementById('createProfileBtn');
const changeThemeBtn = document.getElementById('changeThemeBtn');
const toggleProfileBtn = document.getElementById('toggleProfileBtn');
const resetBtn = document.getElementById('resetBtn');

// Profile Card Elements
const profileCard = document.getElementById('profileCard');
const displayName = document.getElementById('displayName');
const displayAge = document.getElementById('displayAge');
const displaySubject = document.getElementById('displaySubject');
const displayColor = document.getElementById('displayColor');
const profileAvatar = document.getElementById('profileAvatar');
const greetingText = document.getElementById('greetingText');
const dateText = document.getElementById('dateText');
const charCount = document.getElementById('charCount');

// Using querySelector (DOM method 2) - for bonus features
const mainTitle = document.querySelector('.main-title');
// Using querySelectorAll (DOM method 3) - to get all inputs
const allInputs = document.querySelectorAll('input');
const allButtons = document.querySelectorAll('.btn');

// Original state for reset
const originalCardColor = '#ffffff';
const defaultAvatarUrl = `https://ui-avatars.com/api/?name=Student&background=6c5ce7&color=fff&size=100&bold=true`;

// ====== Helper Functions ======

// Get greeting based on current time - Bonus Challenge 2
function getGreeting(name = '') {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour < 12) timeGreeting = 'Good Morning';
    else if (hour < 18) timeGreeting = 'Good Afternoon';
    else timeGreeting = 'Good Evening';
    
    return name ? `${timeGreeting}, ${name}!` : `${timeGreeting}!`;
}

// Display today's date - Bonus Challenge 1
function updateDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // Using textContent (DOM property 4)
    dateText.textContent = today.toLocaleDateString('en-US', options);
}

// Update character count - Bonus Challenge 3
function updateCharCount() {
    const count = studentNameInput.value.length;
    charCount.textContent = `Characters: ${count}`;
}

// ====== Core Task Functions ======

// Task 1, 2, 3: Create Profile
// UPDATED: Card only shows AFTER clicking Create Profile, not while typing
function createProfile() {
    // Task 3: Validation - if any field empty, show alert
    // Using value property (DOM property 5)
    const nameValue = studentNameInput.value.trim();
    const ageValue = studentAgeInput.value.trim();
    const subjectValue = studentSubjectInput.value.trim();
    const colorValue = studentColorInput.value.trim();

    if (nameValue === '' || ageValue === '' || subjectValue === '' || colorValue === '') {
        alert('Please fill all fields.');
        return;
    }

    // Task 1: Read values and display inside profile card
    // Using textContent (DOM property)
    displayName.textContent = nameValue;
    displayAge.textContent = ageValue;
    displaySubject.textContent = subjectValue;
    displayColor.textContent = colorValue;

    // Task 2: Change profile card background color using favorite color
    // Using style.backgroundColor (DOM property 6)
    profileCard.style.backgroundColor = colorValue;
    
    // Simple validation: create test element
    const testEl = document.createElement('div');
    testEl.style.backgroundColor = colorValue;
    if (testEl.style.backgroundColor === '') {
        // Invalid color, reset to white
        profileCard.style.backgroundColor = originalCardColor;
    }

    // Bonus: Greeting and Date
    greetingText.textContent = getGreeting(nameValue);
    updateDate();

    // SHOW profile card ONLY after Create Profile click
    // Using style.display (DOM property 7)
    profileCard.style.display = 'block';
    toggleProfileBtn.style.display = 'block'; // Show Hide button now
    toggleProfileBtn.textContent = 'Hide Profile';

    // Update avatar with initials if no picture uploaded
    if (!profileAvatar.dataset.custom) {
        const encodedName = encodeURIComponent(nameValue);
        profileAvatar.src = `https://ui-avatars.com/api/?name=${encodedName}&background=6c5ce7&color=fff&size=100&bold=true`;
    }
}

// Task 4 & 5: Hide/Show Profile Toggle
function toggleProfileVisibility() {
    // If display is none or empty -> show, else hide
    if (profileCard.style.display === 'none') {
        profileCard.style.display = 'block';
        toggleProfileBtn.textContent = 'Hide Profile';
        // Using classList.remove (DOM method 8)
        toggleProfileBtn.classList.remove('primary');
    } else {
        profileCard.style.display = 'none';
        toggleProfileBtn.textContent = 'Show Profile';
        // Using classList.add (DOM method 9)
        toggleProfileBtn.classList.add('primary');
    }
}

// Task 6: Change Theme (White <-> Dark)
function changeTheme() {
    // Using classList.toggle (DOM method 10) as per hint
    document.body.classList.toggle('dark-theme');
    
    // Optional: Also toggle card class for extra effect
    profileCard.classList.toggle('dark-card');
}

// Task 7: Reset Button - UPDATED: Hide card and Hide button again
function resetProfile() {
    // Clear all inputs - Using querySelectorAll + forEach
    allInputs.forEach(input => {
        if (input.type === 'file') {
            input.value = '';
        } else {
            input.value = '';
        }
    });

    // Remove profile information
    displayName.textContent = 'Student Name';
    displayAge.textContent = '--';
    displaySubject.textContent = '--';
    displayColor.textContent = '--';
    greetingText.textContent = '';
    dateText.textContent = '';
    charCount.textContent = 'Characters: 0';

    // HIDE the profile again (as per new requirement)
    profileCard.style.display = 'none';
    toggleProfileBtn.style.display = 'none'; // Hide the Hide button too
    toggleProfileBtn.textContent = 'Hide Profile';
    toggleProfileBtn.classList.remove('primary');

    // Restore original colors
    profileCard.style.backgroundColor = originalCardColor;

    // Reset avatar to default
    profileAvatar.src = defaultAvatarUrl;
    delete profileAvatar.dataset.custom;
}

// ====== Bonus Challenge 4: Profile Picture ======
function handleProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileAvatar.src = e.target.result;
            profileAvatar.dataset.custom = 'true';
        };
        reader.readAsDataURL(file);
    }
}

// ====== Bonus Challenge 5: Live Preview ======
// UPDATED: Only updates if card is already visible, doesn't auto-show card
function livePreview() {
    // Always update char count (Challenge 3) even when card hidden
    updateCharCount();

    // If card is still hidden, don't update/show it - wait for Create Profile click
    const isCardHidden = profileCard.style.display === 'none' || window.getComputedStyle(profileCard).display === 'none';
    if (isCardHidden) {
        return; // Don't show card while typing
    }

    // If card is already visible, then live update works
    const nameValue = studentNameInput.value.trim();
    const ageValue = studentAgeInput.value.trim();
    const subjectValue = studentSubjectInput.value.trim();
    const colorValue = studentColorInput.value.trim();

    if (nameValue) {
        displayName.textContent = nameValue;
        greetingText.textContent = getGreeting(nameValue);
        if (!profileAvatar.dataset.custom) {
            const encodedName = encodeURIComponent(nameValue);
            profileAvatar.src = `https://ui-avatars.com/api/?name=${encodedName}&background=6c5ce7&color=fff&size=100&bold=true`;
        }
    }
    if (ageValue) displayAge.textContent = ageValue;
    if (subjectValue) displaySubject.textContent = subjectValue;
    if (colorValue) {
        displayColor.textContent = colorValue;
        const testEl = document.createElement('div');
        testEl.style.backgroundColor = colorValue;
        if (testEl.style.backgroundColor !== '') {
            profileCard.style.backgroundColor = colorValue;
        }
    }
    if (nameValue || ageValue || subjectValue) {
        updateDate();
    }
}

// ====== Event Listeners ======
// Using addEventListener (DOM method 11) - Required by Important Rules, no inline JS

// Button clicks
createProfileBtn.addEventListener('click', createProfile);
toggleProfileBtn.addEventListener('click', toggleProfileVisibility);
changeThemeBtn.addEventListener('click', changeTheme);
resetBtn.addEventListener('click', resetProfile);

// Input events for live preview and char count
studentNameInput.addEventListener('input', livePreview);
studentAgeInput.addEventListener('input', livePreview);
studentSubjectInput.addEventListener('input', livePreview);
studentColorInput.addEventListener('input', livePreview);

// File input change
profilePictureInput.addEventListener('change', handleProfilePicture);

// Note: No initial updateDate() - card is hidden initially
// Date will show only after Create Profile is clicked

// Optional: Add keyboard support - Enter key to create profile
allInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createProfile();
        }
    });
});
