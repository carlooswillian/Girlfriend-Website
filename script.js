const startBtn = document.getElementById('startBtn');
const hintPage = document.getElementById('hint');
const hintText = document.getElementById('hintText');
const scanBtn = document.getElementById('scanBtn');
const scannerPage = document.getElementById('scanner');
const video = document.getElementById('video');
const detectedObject = document.getElementById('detectedObject');

startBtn.addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    hintPage.style.display = 'block';
    hintText.innerText = "Pista: Nela estão muitas lembranças que tivemos, momentos marcantes que amei viver com você.";
});

scanBtn.addEventListener('click', async () => {
    hintPage.style.display = 'none';
    scannerPage.style.display = 'block';

    // Iniciar a câmera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Carregar o modelo de detecção
    const model = await cocoSsd.load();
    detectFrame(model);
});

// Função para detectar objetos
async function detectFrame(model) {
    const predictions = await model.detect(video);
    // Aqui você pode implementar a lógica de detecção do objeto
    if (predictions.length > 0) {
        detectedObject.innerText = `Objeto detectado: ${predictions[0].class}`;
    } else {
        detectedObject.innerText = "Nenhum objeto detectado.";
    }
    requestAnimationFrame(() => detectFrame(model));
}
