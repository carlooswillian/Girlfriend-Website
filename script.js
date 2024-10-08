let videoElement = null;
let canvasElement = null;
let ctx = null;
let model = null;
let isScanning = false;

async function loadModel() {
    // Carrega o modelo do TensorFlow.js
    model = await cocoSsd.load();
}

async function setupCamera() {
    videoElement = document.getElementById('video');
    
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: "environment" }  // Tenta usar a câmera traseira
        }
    });

    videoElement.srcObject = stream;

    return new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
            resolve(videoElement.play());
        };
    });
}

function startDetection() {
    if (!isScanning) {
        isScanning = true;
        detectObjects();
    }
}

async function detectObjects() {
    ctx = document.getElementById('outputCanvas').getContext('2d');
    canvasElement = document.getElementById('outputCanvas');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const predictions = await model.detect(videoElement);
    drawPredictions(predictions);
    requestAnimationFrame(detectObjects);  // Continuar a detecção em loop
}

function drawPredictions(predictions) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    const detectedObjectsDiv = document.getElementById('detectedObjects');
    detectedObjectsDiv.innerHTML = "";  // Limpa a lista anterior

    predictions.forEach(prediction => {
        ctx.beginPath();
        ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);

        // Adicionar o objeto detectado à lista
        detectedObjectsDiv.innerHTML += `<div>Detectado: ${prediction.class}</div>`;

        // Verifica se o objeto detectado é o correto para a fase atual
        if (isCorrectObject(prediction.class)) {
            goToNextPhase();  // Avança para a próxima fase se o objeto correto for detectado
        }
    });
}

function isCorrectObject(detectedClass) {
    const validObjectsPhase1 = ['book', 'notebook', 'binder', 'album'];
    return validObjectsPhase1.includes(detectedClass);
}

async function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('phase1').style.display = 'block';
    await loadModel();
    await setupCamera();
    startDetection();
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('scanBtn').addEventListener('click', startDetection);
