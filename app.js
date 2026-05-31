document.addEventListener('DOMContentLoaded', () => {
    const tokenInput = document.getElementById('discord-token');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const houseCards = document.querySelectorAll('.house-card');
    const actionBtn = document.getElementById('action-btn');
    const spinner = actionBtn.querySelector('.spinner');
    const btnText = actionBtn.querySelector('.btn-text');
    const removeBtn = document.getElementById('remove-btn');
    const removeSpinner = removeBtn.querySelector('.remove-spinner');
    const removeBtnText = removeBtn.querySelector('.btn-text');
    const toast = document.getElementById('toast');
    const guideAccordion = document.getElementById('guide-accordion');
    const guideHeader = document.getElementById('guide-header');

    let selectedHouseId = null;

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = tokenInput.getAttribute('type') === 'password' ? 'text' : 'password';
        tokenInput.setAttribute('type', type);
        
        // Toggle icon
        if (type === 'text') {
            togglePasswordBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            `;
        } else {
            togglePasswordBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `;
        }
    });

    // Select HypeSquad House
    houseCards.forEach(card => {
        card.addEventListener('click', () => {
            houseCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedHouseId = parseInt(card.getAttribute('data-house-id'));
            validateForm();
        });
    });

    // Input listener to validate
    tokenInput.addEventListener('input', validateForm);

    function validateForm() {
        const token = tokenInput.value.trim();
        
        // Active button needs token and selected house
        if (token && selectedHouseId !== null) {
            actionBtn.removeAttribute('disabled');
        } else {
            actionBtn.setAttribute('disabled', 'true');
        }

        // Remove button only needs token
        if (token) {
            removeBtn.removeAttribute('disabled');
        } else {
            removeBtn.setAttribute('disabled', 'true');
        }
    }

    // Toggle Guide Accordion
    guideHeader.addEventListener('click', () => {
        guideAccordion.classList.toggle('open');
    });

    // Show Toast Notification
    function showToast(message, type) {
        toast.className = `toast ${type}`;
        toast.innerText = message;
        toast.style.display = 'block';
        
        // Auto-scroll to show toast
        toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideToast() {
        toast.style.display = 'none';
    }

    // Form submission / fetch request
    actionBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        if (!token || selectedHouseId === null) return;

        // Visual loading state
        actionBtn.setAttribute('disabled', 'true');
        spinner.style.display = 'block';
        btnText.innerText = 'Sending...';
        hideToast();

        try {
            const response = await fetch("https://discord.com/api/v9/hypesquad/online", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ house_id: selectedHouseId })
            });

            if (response.ok) {
                showToast("✨ [Success] Badge activated! Refresh your Discord (Ctrl + R) to see the changes.", "success");
            } else {
                let errorMsg = `Discord server error. Status: ${response.status}`;
                if (response.status === 401) {
                    errorMsg = "❌ Invalid or expired token! Double check that you copied it correctly.";
                } else if (response.status === 400) {
                    errorMsg = "❌ Invalid request. Please check the selected options.";
                } else if (response.status === 429) {
                    errorMsg = "⚠️ Rate limit exceeded. Please try again in a few minutes.";
                }
                showToast(errorMsg, "error");
            }
        } catch (error) {
            console.error(error);
            showToast("❌ Connection error. Please check your internet connection or if the endpoint is accessible.", "error");
        } finally {
            // Restore visual state
            spinner.style.display = 'none';
            btnText.innerText = 'Activate House';
            validateForm();
        }
    });

    // Remove badge fetch request
    removeBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        if (!token) return;

        // Visual loading state
        actionBtn.setAttribute('disabled', 'true');
        removeBtn.setAttribute('disabled', 'true');
        removeSpinner.style.display = 'block';
        removeBtnText.innerText = 'Removing...';
        hideToast();

        try {
            const response = await fetch("https://discord.com/api/v9/hypesquad/online", {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            });

            if (response.ok) {
                showToast("✨ [Success] Badge removed! Refresh your Discord (Ctrl + R) to see the changes.", "success");
                
                // Clear house card selection
                houseCards.forEach(c => c.classList.remove('selected'));
                selectedHouseId = null;
            } else {
                let errorMsg = `Discord server error. Status: ${response.status}`;
                if (response.status === 401) {
                    errorMsg = "❌ Invalid or expired token! Double check that you copied it correctly.";
                } else if (response.status === 429) {
                    errorMsg = "⚠️ Rate limit exceeded. Please try again in a few minutes.";
                }
                showToast(errorMsg, "error");
            }
        } catch (error) {
            console.error(error);
            showToast("❌ Connection error. Please check your internet connection or if the endpoint is accessible.", "error");
        } finally {
            // Restore visual state
            removeSpinner.style.display = 'none';
            removeBtnText.innerText = 'Leave HypeSquad';
            validateForm();
        }
    });
});
