let currentPhase = 0;

const phases = [
    {
        clue: "Neles estão muitas lembranças que tivemos, momentos marcantes que amei viver com você.",
        objects: ['book', 'photo album', 'notebook'], // Palavras-chave para os objetos a serem detectados
        surprise: 'video', // Surpresa: Vídeo
    },
    {
        clue: "Eu amo sempre estar com você, passamos nosso tempo de qualidade usando este objeto.",
        objects: ['tv', 'monitor'],
        surprise: 'audio',
    },
    {
        clue: "Você sabe que mora no meu coração, com este objeto você não abre meu coração mas é usado para abrir.",
        objects: ['key', 'keys'],
        surprise: 'photo',
    }
];

const startButton = document.getElementById('startButton');
const scanButton = document.getElementById('scanButton');
const clueElement = document.getElementById('clue');
const cameraContainer = document.getElementById('cameraContainer');
const feedbackElement = document.getElementById('feedback');
const camera = document.getElementById('camera');

// Inicia o jogo
startButton.addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    loadPhase();
});

// Carrega a fase atual
function loadPhase() {
    document.getElementById('game').classList.remove('hidden');
    clueElement.innerText = phases[currentPhase].clue;
}

// Inicia a câmera e o TensorFlow.js
scanButton.addEventListener('click', () => {
    cameraContainer.classList.remove('hidden');
    startCamera();
});

// Configura a câmera
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: 'environment' } // Use a câmera traseira
        }
    });
    camera.srcObject = stream;

    // Inicializa o modelo do TensorFlow.js
    const model = await loadModel();
    detectObject(model);
}

// Carrega o modelo TensorFlow.js
async function loadModel() {
    const modelURL = 'https://path-to-your-tensorflow-model/model.json';
    const model = await tf.loadGraphModel(modelURL);
    return model;
}

// Detecta o objeto
async function detectObject(model) {
    const predictions = await model.detect(camera);
    
    predictions.forEach(prediction => {
        const detectedObject = prediction.class; // Classe detectada

        if (phases[currentPhase].objects.includes(detectedObject.toLowerCase())) {
            feedbackElement.innerText = 'Objeto detectado!';
            showSurprise();
        } else {
            feedbackElement.innerText = 'Objeto não detectado, tente novamente.';
        }
    });
}

// Exibe a surpresa da fase
function showSurprise() {
    cameraContainer.classList.add('hidden');

    const surprise = phases[currentPhase].surprise;

    if (surprise === 'video') {
        window.location.href = 'video1.mp4'; // Link do vídeo
    } else if (surprise === 'audio') {
        window.location.href = 'audio1.mp3'; // Link do áudio
    } else if (surprise === 'photo') {
        window.location.href = 'photo1.jpg'; // Link da foto
    }

    currentPhase++;
    if (currentPhase < phases.length) {
        loadPhase();
    } else {
        showFinalMessage();
    }
}

// Exibe a mensagem final após todas as fases
function showFinalMessage() {
    document.getElementById('game').innerHTML = `
        <h2>Parabéns! Você completou o caça ao tesouro!</h2>
        <p>Te amo mais do que as palavras podem expressar. Você é o meu tesouro.</p>
        <button onclick="window.location.reload()">Jogar novamente</button>
    `;
}
