// Controle do carrossel
const images = document.querySelector('.carousel-images');
const dotsContainer = document.querySelector('.dots');
const imageCount = images.children.length;

// Criar os pontos dinamicamente
dotsContainer.innerHTML = '';
for (let i = 0; i < imageCount; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

document.querySelector('.left').addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageCount - 1;
  updateCarousel();
});

document.querySelector('.right').addEventListener('click', () => {
  currentIndex = (currentIndex < imageCount - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

function updateCarousel() {
  const imageWidth = images.children[0].clientWidth; // Largura da imagem
  images.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Atualizar a largura do carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
  updateCarousel();
});

// Mensagens de amor
const messages = [
  "Seu sorriso ilumina meu dia.",
  "Adoro o som da sua voz.",
  "Você é a melhor coisa que já aconteceu comigo.",
  "Te amo mais do que tudo.",
  "Você é meu porto seguro.",
  "Seu abraço é meu lugar favorito.",
  "Adoro quando você sorri para mim.",
  "Você é perfeita para mim.",
  "Você é minha inspiração diária.",
  "Sou grato por ter você na minha vida.",
  "Amo como você faz tudo parecer mágico.",
  "Seu olhar me encanta.",
  "Você é meu tudo.",
  "Você é a mulher mais incrível do mundo.",
  "Adoro suas risadas.",
  "Você faz meu coração bater mais rápido.",
  "Não consigo imaginar minha vida sem você.",
  "Te amo por quem você é.",
  "Você é meu grande amor.",
  "Sou louco por você.",
  "Adoro seus jeitos e manias.",
  "Você me faz querer ser melhor.",
  "Você é minha razão de viver.",
  "Te amo de todo o coração.",
  "Você é minha metade perfeita.",
  "Você me completa.",
  "Sou feliz porque tenho você.",
  "Você é minha felicidade.",
  "Você é meu sonho realizado.",
  "Você é tudo para mim."
];

const loveMessage = document.getElementById('loveMessage');
document.getElementById('happyButton').addEventListener('click', () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  loveMessage.textContent = randomMessage;
});
