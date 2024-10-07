let videoElement = document.getElementById('webcam');
let canvasElement = document.getElementById('outputCanvas');
let isModelLoaded = false;

// Função para abrir a câmera traseira em tela cheia 9:16
async function startWebcam() {
    try {
        // Obtendo a câmera traseira
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
        videoElement.style.display = 'block';  // Exibe o vídeo
        videoElement.play();
        
        // Ajustando o estilo do vídeo para tela cheia
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

document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('scan').classList.add('active');

    // Inicia a câmera
    startWebcam();
    
    // Aqui podemos carregar o modelo do TensorFlow.js
    // loadTensorFlowModel();
});

// Aqui ficará a lógica de reconhecimento com TensorFlow.js
async function loadTensorFlowModel() {
    // Vamos usar algum modelo do TensorFlow.js para reconhecimento
    // const model = await tf.loadGraphModel('caminho/para/o/modelo');
    // Função para processar o vídeo e detectar objetos
}
