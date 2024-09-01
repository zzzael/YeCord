document.getElementById('submit-button').addEventListener('click', function() {
    const discordId = document.getElementById('discord-id').value;

    // Construct the payload
    const payload = {
        embeds: [{
            title: "NEW SIGNUP",
            description: `Their discord ID is this: ${discordId}`,
            color: 7506394 // This is a blue color; you can change this to any RGB color
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

            // Wait 5 seconds, then change the content
            setTimeout(function() {
                document.querySelector('.container').classList.add('hidden');
                document.body.innerHTML = '<div class="container"><h1 class="message">YECORD WEBSITE SOON</h1></div>';
            }, 5000);
        } else {
            console.error('Failed to send Discord ID to the webhook');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});
