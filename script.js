let videoElement = document.getElementById('webcam');
let canvasElement = document.getElementById('outputCanvas');
let predictionsList = document.getElementById('predictionsList');
let isModelLoaded = false;
let model;

// Função para abrir a câmera traseira em tela cheia 9:16
async function startWebcam() {
    try {
        const constraints = {
            video: {
                facingMode: { exact: "environment" },
                aspectRatio: 9 / 16,
                width: { ideal: 1280 },
                height: { ideal: 1920 }
            }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.play();
        
        // Ajustando o estilo do vídeo para ocupar 50% da tela
        videoElement.style.position = "absolute";
        videoElement.style.top = "0";
        videoElement.style.left = "0";
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoElement.style.objectFit = "cover"; // Para cobrir a tela sem distorções

        isModelLoaded = true;  // Supondo que o modelo será carregado após isso
    } catch (err) {
        console.error('Erro ao abrir a câmera:', err);
    }
}

// Função para carregar o modelo do TensorFlow.js
async function loadTensorFlowModel() {
    model = await cocoSsd.load(); // Carregando o modelo COCO-SSD
    detectObjects();
}

// Função para detectar objetos
async function detectObjects() {
    const predictions = await model.detect(videoElement);
    
    // Limpa a lista de detecções
    predictionsList.innerHTML = '';

    // Lógica para verificar a detecção
    predictions.forEach(prediction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prediction.class}: ${Math.round(prediction.score * 100)}%`;
        predictionsList.appendChild(listItem); // Adiciona à lista de detecções

        if (prediction.class === 'fridge' && !document.getElementById('detectionMessage').innerText) {
            document.getElementById('detectionMessage').innerText = 'Objeto detectado! Você passou para a próxima fase.';
            setTimeout(() => {
                nextPhase(); // Muda para a próxima fase
            }, 2000); // Mudar de fase após 2 segundos
        } else if (prediction.class !== 'fridge') {
            document.getElementById('detectionMessage').innerText = 'Tente escanear novamente.';
        }
    });

    // Chamando a função novamente para continuar detectando
    requestAnimationFrame(detectObjects);
}

// Função para avançar para a próxima fase
function nextPhase() {
    // Aqui deve ser implementado o código para mudar de fase com base na fase atual
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

    // Inicia a câmera
    startWebcam();

    // Carrega o modelo do TensorFlow.js
    loadTensorFlowModel();
});
