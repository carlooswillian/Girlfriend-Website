let videoElement = document.getElementById('webcam');
let canvasElement = document.getElementById('outputCanvas');
let isModelLoaded = false;
let currentPhase = 1;

// Função para abrir a câmera em tela cheia 9:16
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 9 / 16 } });
        videoElement.srcObject = stream;
        videoElement.style.display = 'block';  // Exibe o vídeo
        videoElement.play();
        isModelLoaded = true;  // Supondo que o modelo será carregado após isso
    } catch (err) {
        console.error('Erro ao abrir a câmera:', err);
    }
}

// Função para mudar para a próxima fase
function goToNextPhase() {
    currentPhase++;
    switch (currentPhase) {
        case 2:
            document.getElementById('clue').innerHTML = `
                <h2>Fase 2: Tempo de Qualidade</h2>
                <p>"Eu amo sempre estar com você, não importa o que estejamos fazendo mas o importante é estar com você, passamos nosso tempo de qualidade usando este objeto."</p>
                <button id="scanBtn">Escanear Objeto</button>`;
            break;
        case 3:
            document.getElementById('clue').innerHTML = `
                <h2>Fase 3: Entrada no meu Coração</h2>
                <p>"Você sabe que mora no meu coração, você é a pessoa mais incrível deste mundo, com este objeto você não abre meu coração mas é usado para abrir, uma grande conquista esse ano."</p>
                <button id="scanBtn">Escanear Objeto</button>`;
            break;
        case 4:
            document.getElementById('clue').innerHTML = `
                <h2>Fase 4: Sonho com você sempre</h2>
                <p>"Quando o dia termina, aqui é onde encontramos paz e descanso, o nosso refúgio e de bons momentos juntos."</p>
                <button id="scanBtn">Escanear Objeto</button>`;
            break;
        case 5:
            document.getElementById('clue').innerHTML = `
                <h2>Fase 5: Momentos Marcantes</h2>
                <p>"Olhamos para isso todos os dias e podemos nos lembrar de um dia inesquecível."</p>
                <button id="scanBtn">Escanear Objeto</button>`;
            break;
        case 6:
            document.getElementById('clue').innerHTML = `
                <h2>Fim da Jornada!</h2>
                <p>"Te amo mais do que as palavras podem expressar. Você é o meu tesouro."</p>
                <button id="revealGiftBtn">Abrir Presente</button>`;
            break;
    }
}

// Eventos de clique
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('scan').classList.add('active');

    // Inicia a câmera
    startWebcam();
});

// Adicionando o evento de detecção de objetos
videoElement.addEventListener('loadeddata', function() {
    if (isModelLoaded) {
        // Aqui deve entrar a lógica de detecção usando TensorFlow.js
        // A lógica de verificação deve ser implementada para passar de fase
        // Quando o objeto correto for detectado:
        goToNextPhase();
    }
});

// Evento para abrir o presente ao completar todas as fases
document.getElementById('revealGiftBtn').addEventListener('click', function() {
    alert("Você ganhou um dia de princesa ♡");
});
