let videoElement = document.getElementById('webcam');
let canvasElement = document.getElementById('outputCanvas');
let isModelLoaded = false;

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
