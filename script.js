let model;

async function loadModel() {
    model = await cocoSsd.load(); // Carrega o modelo de detecção de objetos
    console.log("Modelo carregado!");
}

loadModel();

// Iniciar o jogo
function startGame() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("clue").classList.remove("hidden");
}

// Iniciar a câmera e a detecção de objetos
function startCamera() {
    document.getElementById("clue").classList.add("hidden");
    document.getElementById("scan").classList.remove("hidden");

    const video = document.querySelector("#webcam");
    const feedback = document.getElementById("feedback");

    // Exibe o feedback na tela
    feedback.style.display = "block";

    // Ativa a câmera
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                video.srcObject = stream;
                detectObjects(video, feedback); // Inicia a detecção
            })
            .catch(function (error) {
                console.log("Erro ao acessar a câmera: " + error);
            });
    }
}

// Detectar objetos e dar feedback
async function detectObjects(video, feedback) {
    setInterval(async () => {
        const predictions = await model.detect(video);

        if (predictions.length > 0) {
            feedback.innerHTML = `Objeto detectado: ${predictions[0].class}`;
            checkObject(predictions[0].class);  // Verificar o objeto detectado
        } else {
            feedback.innerHTML = "Nenhum objeto detectado";
        }
    }, 1000); // Atualiza a cada 1 segundo
}

// Verifica o objeto e avança no jogo
function checkObject(detectedObject) {
    const validObjects = ["book", "notebook", "photo album"]; // Objetos da fase 1
    if (validObjects.includes(detectedObject.toLowerCase())) {
        alert("Objeto correto!");
        advanceToNextPhase(); // Avança para a próxima fase
    }
}

// Para a câmera e oculta o feedback
function stopCamera() {
    const video = document.querySelector("#webcam");
    const feedback = document.getElementById("feedback");
    
    // Parar a exibição do vídeo e da câmera
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });

    video.srcObject = null;

    // Ocultar feedback
    feedback.style.display = "none";
}

// Função para avançar para a próxima fase
function advanceToNextPhase() {
    // Aqui você pode implementar a lógica para avançar para a fase 2
    document.getElementById("scan").classList.add("hidden");
    // Exibir a nova fase ou surpresa, ou avançar no jogo.
}
