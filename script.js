function isValidSlackLink(link) {
    const slackRegex = /^https:\/\/hackclub\.slack\.com\/team\/U0.*$/;
    return slackRegex.test(link);
}

// Function to validate email address
function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Main function to check parameters and display contact links
function displayContactLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const slackLink = urlParams.get('slack');
    const email = urlParams.get('email');
    const name = urlParams.get('name');

    // Display onboarding note if no parameters are passed
    const onboardingNote = document.getElementById('onboarding-note');
    const errorMessage = document.getElementById('error-message');
    const slackButton = document.getElementById('slack-button');
    const emailButton = document.getElementById('email-button');
    const slackText = document.getElementById('slack-text');

    if (!slackLink && !email && !name) {
        onboardingNote.style.display = 'block';
        return;
    }

    // Validate the Slack link
    if (slackLink && !isValidSlackLink(slackLink)) {
        errorMessage.textContent = "Invalid Slack link. Please provide a valid Hack Club Slack link.";
        errorMessage.style.display = 'block';
        return;
    }

    // Validate the email address
    if (email && !isValidEmail(email)) {
        errorMessage.textContent = "Invalid email address. Please provide a valid email.";
        errorMessage.style.display = 'block';
        return;
    }

    // Clear any previous error messages
    errorMessage.style.display = 'none';

    // Update the contact buttons
    if (slackLink) {
        slackButton.style.display = 'block';
        slackText.textContent = `Slack`;
        slackButton.onclick = () => window.location.href = slackLink; // Open Slack link
    }

    if (email) {
        emailButton.style.display = 'block';
        emailButton.onclick = () => window.location.href = `mailto:${email}`; // Open email client
    }

    // If neither are present, show an error message based on the name
    if (!slackLink && !email) {
        errorMessage.textContent = name ? `${name} has no contact links available.` : "Contact User has no links available.";
        errorMessage.style.display = 'block';
    }
}

// Call the function to display contact links
displayContactLinks();
