document.getElementById('discord-id').addEventListener('input', function() {
    const discordId = document.getElementById('discord-id').value;
    const submitButton = document.getElementById('submit-button');

    // Check if the ID is only numbers and is within the valid length range (16-18 characters)
    const isValid = /^\d{16,18}$/.test(discordId);

    // If valid, make the submit button fully opaque; otherwise, reduce its opacity and disable it
    if (isValid) {
        submitButton.style.opacity = '1';
        submitButton.disabled = false;
        submitButton.style.pointerEvents = 'auto'; // Enable clicking
    } else {
        submitButton.style.opacity = '0.5';
        submitButton.disabled = true;
        submitButton.style.pointerEvents = 'none'; // Disable clicking
    }
});

document.getElementById('submit-button').addEventListener('click', function() {
    const discordId = document.getElementById('discord-id').value;

    // Construct the payload
    const payload = {
        embeds: [{
            title: "NEW SIGNUP",
            description: `Their discord ID is this: ${discordId}`,
            color: 7506394 // Blue color
        }]
    };

    // Send to Discord webhook
    fetch('https://discord.com/api/webhooks/1259232755481444352/jnvPoP1JYUXRt9F6Z5C5WHKjWrdDbDuYslKPzc-Y-QvSVvgOtGwtqhaTfsumGnwjRkc2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            // Hide the input and button
            document.getElementById('submit-button').classList.add('hidden');
            document.querySelector('.container').classList.add('hidden');

            // Wait 5 seconds, then change the content
            setTimeout(function() {
                // Change background color to dark grey
                document.body.style.backgroundColor = '#1a1a1a';

                // Wait another 2 seconds before showing the video
                setTimeout(function() {
                    // Hide the container and show the video
                    document.body.innerHTML = `
                        <div class="video-container">
                            <video width="500" height="500" controls>
                                <source src="video.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>`;
                }, 2000); // 2-second delay
            }, 5000); // Initial 5-second delay before background change
        } else {
            console.error('Failed to send Discord ID to the webhook');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});
