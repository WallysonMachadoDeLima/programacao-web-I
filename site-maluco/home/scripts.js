document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('myVideo');
    var volumeSlider = document.getElementById('volumeSlider');
    var movingText = document.getElementById('movingText');
    var hiddenButton = document.getElementById('hiddenButton');
    var message = document.getElementById('message');

    // Controle de volume personalizado
    volumeSlider.addEventListener('input', function() {
        video.volume = volumeSlider.value;
    });

    // Evento no texto em movimento
    movingText.addEventListener('click', function() {
        alert('Você clicou no texto em movimento!');
    });

    // Botão escondido
    hiddenButton.addEventListener('click', function() {
        message.textContent = 'Você encontrou o botão escondido!';
    });
});
