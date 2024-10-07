let videoElement = document.getElementById('webcam');
let videoPlayer = document.getElementById('videoPlayer');
let predictionsList = document.getElementById('predictionsList');
let detectionMessage = document.getElementById('detectionMessage');
let model;
let isProcessing = false; // Variável de controle para interromper o processamento de imagens durante a reprodução do vídeo

// Função para acessar a câmera do celular
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

// Função para carregar o modelo MobileNet
async function loadTensorFlowModel() {
    try {
        model = await mobilenet.load(); // Carregando o modelo MobileNet
        console.log("Modelo carregado com sucesso.");
        processFrame(); // Começa o processamento de frames
    } catch (error) {
        console.error('Erro ao carregar o modelo:', error);
        alert('Erro ao carregar o modelo. Tente novamente.');
    }
}

// Função para processar os frames da câmera
function processFrame() {
    if (isProcessing) return; // Se estiver processando um vídeo, interrompe a detecção

    // Cria um canvas temporário para capturar frames da câmera
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Processa o frame da câmera com o modelo MobileNet
    const imageTensor = tf.browser.fromPixels(canvas);
    model.classify(imageTensor).then(predictions => {
        if (predictions && predictions.length > 0) {
            predictionsList.innerHTML = ''; // Limpa a lista de detecções
            let objectDetected = false; // Variável para verificar se um objeto específico foi detectado

            predictions.forEach(prediction => {
                const listItem = document.createElement('li');
                listItem.textContent = `${prediction.className}: ${Math.round(prediction.probability * 100)}%`;
                predictionsList.appendChild(listItem); // Adiciona à lista de detecções

                // Verifica se a classe identificada corresponde a algum vídeo na lista
                if (videoLinks[prediction.className.toLowerCase().replace(/\s+/g, '_')]) {
                    objectDetected = true; // Marca que o objeto foi detectado
                    isProcessing = true; // Pausa a detecção de novas imagens
                    playVideo(videoLinks[prediction.className.toLowerCase().replace(/\s+/g, '_')]);
                }
            });

            if (!objectDetected) {
                detectionMessage.innerText = 'Tente escanear novamente.';
            } else {
                detectionMessage.innerText = 'Objeto detectado! Preparando para reproduzir o vídeo.';
            }
        }
        imageTensor.dispose(); // Libera memória do tensor
    });

    // Executa a cada 500ms para verificar a imagem da câmera
    setTimeout(processFrame, 500);
}

// Função para reproduzir o vídeo
function playVideo(link) {
    videoElement.style.display = 'none';
    videoPlayer.style.display = 'block';
    videoPlayer.src = link;
    videoPlayer.play();

    // Volta ao início quando o vídeo acabar
    videoPlayer.onended = () => {
        videoPlayer.style.display = 'none';
        videoElement.style.display = 'block';
        isProcessing = false; // Retoma a detecção de imagens após o vídeo
        videoElement.play();
        processFrame(); // Reinicia a detecção
    };
}

// Função para avançar para a próxima fase
function nextPhase() {
    document.getElementById('scan').classList.remove('active');
    document.getElementById('clue').classList.add('active');
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
