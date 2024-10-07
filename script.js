let model;
let currentPhase = 0;
const phases = [
    {
        title: "Fase 1: Histórias",
        clue: "Neles estão muitas lembranças que tivemos, momentos marcantes que amei viver com você.",
        objects: ['Livro', 'Álbum de fotos', 'Caderno'],
        surprise: "video1.mp4"
    },
    {
        title: "Fase 2: Tempo de Qualidade",
        clue: "Eu amo sempre estar com você, não importa o que estejamos fazendo mas o importante é estar com você, passamos nosso tempo de qualidade usando este objeto.",
        objects: ['Televisão', 'TV', 'Monitor'],
        surprise: "audio1.mp3"
    },
    {
        title: "Fase 3: Entrada no meu Coração",
        clue: "Você sabe que mora no meu coração, você é a pessoa mais incrível deste mundo, com este objeto você não abre meu coração mas é usado para abrir, uma grande conquista esse ano.",
        objects: ['Chave', 'Chaves'],
        surprise: "photo1.jpg"
    },
    {
        title: "Fase 4: Sonho com você sempre",
        clue: "Quando o dia termina, aqui é onde encontramos paz e descanso, o nosso refúgio e de bons momentos juntos.",
        objects: ['Cama', 'Travesseiro', 'Coberta', 'Lençol'],
        surprise: "video2.mp4"
    },
    {
        title: "Fase 5: Momentos Marcantes",
        clue: "Olhamos para isso todos os dias e podemos nos lembrar de um dia inesquecível.",
        objects: ['Quadro', 'Foto', 'Pôster'],
        surprise: "message"
    }
];

// Função para carregar o modelo
async function loadModel() {
    model = await cocoSsd.load();
    console.log("Modelo carregado!");
}

// Função para iniciar a webcam
function startWebcam() {
    const webcamElement = document.getElementById('webcam');
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
    }).then(function(stream) {
        webcamElement.srcObject = stream;
    });
}

// Função para iniciar a detecção
function detectObjects() {
    const video = document.getElementById('webcam');
    model.detect(video).then(predictions => {
        displayFeedback(predictions);
    });
}

// Função para exibir o feedback dos objetos detectados
function displayFeedback(predictions) {
    const feedbackElement = document.getElementById('feedback');
    const detectedObjects = predictions.map(prediction => prediction.class);
    
    const phaseObjects = phases[currentPhase].objects.map(obj => obj.toLowerCase());
    const match = detectedObjects.some(detected => phaseObjects.includes(detected.toLowerCase()));

    if (match) {
        feedbackElement.innerText = "Objeto correto detectado!";
        setTimeout(() => {
            moveToNextPhase();
        }, 1000);
    } else {
        feedbackElement.innerText = `Objetos detectados: ${detectedObjects.join(', ')}`;
        setTimeout(detectObjects, 1000); // Continuar detectando
    }
}

// Função para ir para a próxima fase
function moveToNextPhase() {
    currentPhase++;
    if (currentPhase < phases.length) {
        updateClue();
    } else {
        endGame();
    }
}

// Atualizar a dica com base na fase atual
function updateClue() {
    const phase = phases[currentPhase];
    document.getElementById('clue').querySelector('h2').innerText = phase.title;
    document.getElementById('clue').querySelector('p').innerText = phase.clue;
}

// Função para terminar o jogo
function endGame() {
    document.getElementById('clue').innerHTML = "<h2>Te amo mais do que as palavras podem expressar. Você é o meu tesouro.</h2>";
}

// Evento para o botão "Iniciar"
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('clue').classList.add('active');
    currentPhase = 0; // Iniciar da fase 1
    updateClue();
});

// Evento para o botão "Escanear Objeto"
document.getElementById('scanBtn').addEventListener('click', function() {
    document.getElementById('clue').classList.remove('active');
    document.getElementById('camera').classList.add('active');
    loadModel().then(() => {
        startWebcam();
        detectObjects();
    });
});
