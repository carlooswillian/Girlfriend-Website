// Carrossel
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const dots = document.querySelectorAll('.dot');

function updateCarousel() {
  const newTransformValue = -currentIndex * 100 + '%';
  document.querySelector('.carousel-images').style.transform = `translateX(${newTransformValue})`;
  
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
}

// Gerar Mensagens
const messages = [
  "Eu amo cada detalhe seu, desde seu sorriso até o jeito que você me olha.",
  "Você é a luz que ilumina meus dias, meu maior amor.",
  "Meu coração é seu, e sempre será. Te amo de forma incondicional.",
  "Em cada abraço seu, sinto que estou no lugar certo.",
  "Você me faz acreditar no amor, na vida e em mim mesmo.",
  "Com você, encontrei a felicidade verdadeira.",
  "Te amo mais do que as palavras podem expressar. Você é minha alma gêmea.",
  "Sempre que penso em você, meu coração se enche de alegria.",
  "Meu amor por você é tão grande que não cabe em palavras, mas se resume a uma palavra: eterno.",
  "Você é tudo o que sempre sonhei e mais um pouco.",
  "Te amo em todos os momentos, em todas as formas, em todas as maneiras.",
  "Não há nada mais bonito do que estar ao seu lado.",
  "Quando estou com você, o mundo ao redor desaparece. Só nós dois existem.",
  "Seu sorriso é a razão do meu sorriso.",
  "Você é a melhor parte do meu dia, todos os dias.",
  "Te amo mais do que qualquer coisa que eu já tenha conhecido.",
  "Eu escolheria você, todas as vezes, em todas as vidas.",
  "Com você, encontrei um lar no seu coração.",
  "Amo a maneira como você vê o mundo, e o melhor é que compartilha isso comigo.",
  "Cada dia ao seu lado é um novo capítulo no livro da nossa vida.",
  "Meu amor por você é uma chama que nunca se apaga.",
  "Você me faz sentir que sou a pessoa mais feliz do mundo.",
  "Em você, encontrei minha paz, minha felicidade e meu lar.",
  "Eu só preciso de você. Sempre foi assim, sempre será assim.",
  "Você é a razão pela qual eu acredito no destino."
];

function generateMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];

  const messageDiv = document.getElementById("love-message");
  messageDiv.textContent = message;
  messageDiv.style.display = "block"; // Exibe a mensagem
}
