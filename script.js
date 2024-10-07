let videoElement = document.getElementById('webcam');
let predictionsList = document.getElementById('predictionsList');
let detectionMessage = document.getElementById('detectionMessage');
let isModelLoaded = false;
let model;

// Função para abrir a câmera traseira
async function startWebcam() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 1920 }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.play();
        console.log("Câmera aberta com sucesso.");
    } catch (err) {
        console.error('Erro ao abrir a câmera:', err);
        alert('Erro ao abrir a câmera. Verifique as permissões do navegador.');
    }
}

// Função para carregar o modelo do TensorFlow.js
async function loadTensorFlowModel() {
    try {
        model = await cocoSsd.load(); // Carregando o modelo COCO-SSD
        isModelLoaded = true; // Marcar o modelo como carregado
        console.log("Modelo carregado com sucesso.");
        detectObjects();
    } catch (error) {
        console.error('Erro ao carregar o modelo:', error);
        alert('Erro ao carregar o modelo. Tente novamente.');
    }
}

// Função para detectar objetos
async function detectObjects() {
    if (!isModelLoaded) {
        console.log("Modelo ainda não carregado.");
        return;
    }

    const predictions = await model.detect(videoElement);
    
    predictionsList.innerHTML = ''; // Limpa a lista de detecções

    let objectDetected = false; // Variável para rastrear se o objeto específico foi detectado

    predictions.forEach(prediction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prediction.class}: ${Math.round(prediction.score * 100)}%`;
        predictionsList.appendChild(listItem); // Adiciona à lista de detecções

        // Verifica se o objeto detectado é a geladeira
        if (prediction.class === 'fridge' && !objectDetected) {
            objectDetected = true; // Marca que o objeto foi detectado
            detectionMessage.innerText = 'Objeto detectado! Você passou para a próxima fase.';
            setTimeout(() => {
                nextPhase(); // Muda para a próxima fase
            }, 2000); // Mudar de fase após 2 segundos
        } else if (!objectDetected) {
            detectionMessage.innerText = 'Tente escanear novamente.';
        }
    });

    requestAnimationFrame(detectObjects); // Chamando a função novamente para continuar detectando
}

// Função para avançar para a próxima fase
function nextPhase() {
    document.getElementById('scan').classList.remove('active');
    document.getElementById('clue').classList.add('active');
    // Altere o texto da pista para a próxima fase se necessário
}

// Eventos
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('scan').classList.add('active');

    startWebcam(); // Inicia a câmera
    loadTensorFlowModel(); // Carrega o modelo do TensorFlow.js
});
