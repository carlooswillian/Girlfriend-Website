let videoElement = document.getElementById('webcam');
let canvasElement = document.getElementById('outputCanvas');
let feedbackElement = document.getElementById('feedback');
let ctx = canvasElement.getContext('2d');
let model;
let currentPhase = 0;

// Carregar o modelo COCO-SSD
async function loadModel() {
    model = await cocoSsd.load();
    console.log("Modelo carregado!");
}

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
        detectObjects(); // Iniciar detecção de objetos após a câmera ser aberta
    } catch (err) {
        console.error('Erro ao abrir a câmera:', err);
    }
}

// Função para detectar objetos
async function detectObjects() {
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    const predictions = await model.detect(videoElement);
    drawPredictions(predictions);
    requestAnimationFrame(detectObjects); // Chama a função novamente para continuar a detecção
}

// Função para desenhar as previsões na tela
function drawPredictions(predictions) {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
    let detectedObjects = [];

    predictions.forEach(prediction => {
        // Exibir feedback visual para objetos detectados
        ctx.beginPath();
        ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);

        detectedObjects.push(prediction.class); // Adiciona o objeto detectado na lista
        
        // Verifica se o objeto detectado é o correto para a fase atual
        if (isCorrectObject(prediction.class)) {
            goToNextPhase(); // Avança para a próxima fase se o objeto correto for detectado
        }
    });

    // Atualiza o feedback abaixo da câmera
    if (detectedObjects.length > 0) {
        feedbackElement.innerHTML = "Objetos detectados: " + detectedObjects.join(", ");
    } else {
        feedbackElement.innerHTML = "Nenhum objeto detectado.";
    }
}

// Verifica se o objeto detectado é o correto para a fase atual
function isCorrectObject(detectedObject) {
    const expectedObjects = [
        // Fase 1: Histórias
        ["book", "photo album", "notebook"],

        // Fase 2: Tempo de Qualidade
        ["tv", "monitor"],

        // Fase 3: Entrada no meu Coração
        ["key"],

        // Fase 4: Sonho com você sempre
        ["bed", "pillow"],

        // Fase 5: Momentos Marcantes
        ["frame", "poster", "picture"]
    ];

    return expectedObjects[currentPhase].some(obj => obj.toLowerCase() === detectedObject.toLowerCase());
}

// Função para mudar para a próxima fase
function goToNextPhase() {
    currentPhase++;
    if (currentPhase >= 5) {
        document.getElementById('gift').classList.add('active');
        document.getElementById('scan').classList.remove('active');
        videoElement.style.display = 'none'; // Esconde o vídeo
        return;
    }
    document.getElementById('clue').querySelector('h2').innerText = `Fase ${currentPhase + 1}`;
    document.getElementById('clue').querySelector('p').innerText = "Nova dica aqui."; // Atualize a mensagem da dica conforme necessário
    document.getElementById('clue').classList.add('active');
    document.getElementById('scan').classList.remove('active');
}

// Eventos de clique
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
    
    // Atualizar a mensagem da fase 1 imediatamente
    currentPhase = 0; // Reinicia a fase
    document.getElementById('clue').querySelector('h2').innerText = "Fase 1: Histórias";
    document.getElementById('clue').querySelector('p').innerText = "Neles estão muitas lembranças que tivemos, momentos marcantes que amei viver com você."; // Atualize conforme necessário
    
    loadModel().then(() => {
        // Começar a detecção de objetos depois que o modelo estiver carregado
        startWebcam();
    });
});

document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('scan').classList.add('active');
});

// Evento para abrir o presente ao completar todas as fases
document.getElementById('revealGiftBtn').addEventListener('click', function() {
    alert("Você ganhou um dia de princesa ♡");
});
