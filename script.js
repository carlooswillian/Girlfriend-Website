let model;
let videoElement;
let canvasElement;
let ctx;
let isScanning = false;

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('scanBtn').addEventListener('click', startScanning);
document.getElementById('nextBtn').addEventListener('click', goToNextPhase);

async function startGame() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('phase1').style.display = 'block';
    await loadModel();
    await setupCamera();
    startDetection();
}

async function loadModel() {
    model = await cocoSsd.load();
    console.log("Modelo carregado");
}

async function setupCamera() {
    videoElement = document.createElement('video');
    videoElement.width = 640;
    videoElement.height = 480;

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    videoElement.srcObject = stream;

    return new Promise((resolve) => {
        videoElement.onloadedmetadata = () => {
            resolve(videoElement.play());
        };
    });
}

function startScanning() {
    if (!isScanning) {
        isScanning = true;
        detectObjects();
    }
}

async function detectObjects() {
    ctx = document.getElementById('outputCanvas').getContext('2d');
    canvasElement = document.getElementById('outputCanvas');
    canvasElement.width = videoElement.width;
    canvasElement.height = videoElement.height;

    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const predictions = await model.detect(videoElement);
    drawPredictions(predictions);
    requestAnimationFrame(detectObjects); // Continuar a detecção
}

function drawPredictions(predictions) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
    const detectedObjectsDiv = document.getElementById('detectedObjects');
    detectedObjectsDiv.innerHTML = ""; // Limpa a lista anterior
    
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
            goToNextPhase(); // Avança para a próxima fase se o objeto correto for detectado
        }
    });
}

function isCorrectObject(object) {
    // Defina aqui os objetos corretos para a fase atual
    const correctObjects = ["book", "photo", "notebook"]; // Adicione mais objetos conforme necessário
    return correctObjects.includes(object);
}

function goToNextPhase() {
    document.getElementById('phase1').style.display = 'none';
    document.getElementById('nextPhase').style.display = 'block';
}
