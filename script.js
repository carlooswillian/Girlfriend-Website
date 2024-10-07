let videoElement = document.getElementById('webcam');
let isModelLoaded = false;
let currentPhase = 0;

// Função para abrir a câmera em tela cheia 9:16
async function startWebcam() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "environment" }, // Usa a câmera traseira
                aspectRatio: 9 / 16
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.play();
        isModelLoaded = true; // Supondo que o modelo será carregado após isso

        // Chama a função de detecção de objetos
        detectObjects();
    } catch (err) {
        console.error('Erro ao abrir a câmera:', err);
    }
}

// Função para detectar objetos (Simulação)
function detectObjects() {
    // Aqui você deve implementar a lógica de detecção usando TensorFlow.js
    // Por enquanto, vamos simular a detecção após alguns segundos
    setTimeout(() => {
        // Suponha que o objeto correto foi detectado
        goToNextPhase();
    }, 3000); // Simulando detecção após 3 segundos
}

// Função para mudar para a próxima fase
function goToNextPhase() {
    currentPhase++;
    switch (currentPhase) {
        case 1:
            document.getElementById('clue').querySelector('h2').innerText = "Fase 1: Histórias";
            document.getElementById('clue').querySelector('p').innerText = "Neles estão muitas lembranças que tivemos, momentos marcantes que amei viver com você.";
            break;
        case 2:
            document.getElementById('clue').querySelector('h2').innerText = "Fase 2: Tempo de Qualidade";
            document.getElementById('clue').querySelector('p').innerText = "Eu amo sempre estar com você, não importa o que estejamos fazendo mas o importante é estar com você, passamos nosso tempo de qualidade usando este objeto.";
            break;
        case 3:
            document.getElementById('clue').querySelector('h2').innerText = "Fase 3: Entrada no meu Coração";
            document.getElementById('clue').querySelector('p').innerText = "Você sabe que mora no meu coração, você é a pessoa mais incrível deste mundo, com este objeto você não abre meu coração mas é usado para abrir.";
            break;
        case 4:
            document.getElementById('clue').querySelector('h2').innerText = "Fase 4: Sonho com você sempre";
            document.getElementById('clue').querySelector('p').innerText = "Quando o dia termina, aqui é onde encontramos paz e descanso, o nosso refúgio e de bons momentos juntos.";
            break;
        case 5:
            document.getElementById('clue').querySelector('h2').innerText = "Fase 5: Momentos Marcantes";
            document.getElementById('clue').querySelector('p').innerText = "Olhamos para isso todos os dias e podemos nos lembrar de um dia inesquecível.";
            break;
        case 6:
            document.getElementById('gift').classList.add('active');
            document.getElementById('scan').classList.remove('active');
            videoElement.style.display = 'none'; // Esconde o vídeo
            return;
    }
    document.getElementById('clue').classList.add('active');
    document.getElementById('scan').classList.remove('active');
}

// Eventos de clique
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
    goToNextPhase();
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('scan').classList.add('active');
    startWebcam();
});

// Evento para abrir o presente ao completar todas as fases
document.getElementById('revealGiftBtn').addEventListener('click', function() {
    alert("Você ganhou um dia de princesa ♡");
});
