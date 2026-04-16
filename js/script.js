document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            // Prevent the page from reloading
            event.preventDefault();
            
            // Get the Formspree URL from your HTML action attribute
            const endpoint = event.target.action;
            
            // Gather the data from the form
            const formData = new FormData(contactForm);

            try {
                // Send the data to Formspree
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success! Show the message and clear the form
                    formStatus.textContent = "Transmission successful. I will be in touch soon!";
                    formStatus.style.color = "#111111"; // Keep the cyan color
                    formStatus.style.display = "block";
                    contactForm.reset();
                } else {
                    // If something went wrong on Formspree's end
                    formStatus.textContent = "Oops! There was a problem sending your message.";
                    formStatus.style.color = "red";
                    formStatus.style.display = "block";
                }
            } catch (error) {
                // If the internet disconnected or the fetch failed
                formStatus.textContent = "Error: Could not connect to the server.";
                formStatus.style.color = "red";
                formStatus.style.display = "block";
            }
        });
    }
});