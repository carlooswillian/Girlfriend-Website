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
  images.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Frases de amor
const phrases = [
  "Seu sorriso é o mais lindo que já vi.",
  "Amo como você ilumina meu dia.",
  "Você é minha melhor escolha.",
  "Admiro sua força e determinação.",
  "Cada momento ao seu lado é mágico.",
  "Você é a razão do meu viver.",
  "Amo como você me faz rir.",
  "Você é meu lugar seguro.",
  "Seu olhar me dá paz.",
  "Não há ninguém como você.",
  "Amo como você cuida de mim.",
  "Seu amor é tudo que preciso.",
  "Você é minha melhor amiga e amor.",
  "Seu abraço é meu refúgio.",
  "Adoro ouvir sua voz.",
  "Você é minha inspiração diária.",
  "Seu carinho é único.",
  "Amo nossas aventuras juntos.",
  "Você é linda por dentro e por fora.",
  "Você é meu mundo inteiro.",
  "Seu amor é minha maior benção.",
  "Amo sua risada contagiante.",
  "Você me completa.",
  "Sou eternamente grato por você.",
  "Você é meu anjo na terra.",
  "Seu toque me acalma.",
  "Você é meu sonho realizado.",
  "Amo nossa conexão especial.",
  "Você é minha razão para acreditar no amor.",
  "Te amo mais do que palavras podem expressar."
];

const loveButton = document.getElementById('love-button');
const loveMessage = document.getElementById('love-message');

loveButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  loveMessage.textContent = phrases[randomIndex];
});
