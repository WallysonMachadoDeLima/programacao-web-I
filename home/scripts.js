document.addEventListener('DOMContentLoaded', function() {
    // -> Seu código existente...

    // -> Código para o efeito semelhante ao Staggering Beauty
    var worm = document.getElementById('worm');
    var lastPosition = { x: 0, y: 0 };
    var lastTime = Date.now();

    document.addEventListener('mousemove', function(event) {
        var x = event.clientX;
        var y = event.clientY;

        // -> Movimenta o worm para a posição do mouse
        worm.style.left = x + 'px';
        worm.style.top = y + 'px';

        // -> Calcula a velocidade do mouse
        var currentTime = Date.now();
        var timeDiff = currentTime - lastTime;
        var distance = Math.hypot(x - lastPosition.x, y - lastPosition.y);
        var speed = distance / timeDiff;

        // -> Se a velocidade for alta, muda as cores e adiciona efeitos
        if (speed > 0.5) {
            var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            worm.style.backgroundColor = randomColor;
            worm.style.boxShadow = '0 0 20px ' + randomColor;
            document.body.style.backgroundColor = randomColor;
        } else {
            // -> Reseta para as cores originais
            worm.style.backgroundColor = 'black';
            worm.style.boxShadow = 'none';
            document.body.style.backgroundColor = '#f0f0f0';
        }

        // -> Atualiza as últimas posições e tempo
        lastPosition.x = x;
        lastPosition.y = y;
        lastTime = currentTime;
    });
});
