let currentTextIndex = 0;
let currentImageIndex = 0;

// Seleciona todos os elementos de texto e imagem
const texts = document.querySelectorAll('.text-carousel p');
const images = document.querySelectorAll('.image-carousel img');

// Mostra o texto e imagem atuais
function showText(index) {
    texts.forEach((text, i) => {
        text.classList.toggle('active', i === index);
    });
}

function showImage(index) {
    images.forEach((image, i) => {
        image.classList.toggle('active', i === index);
    });
}

// Inicializa o carrossel
showText(currentTextIndex);
showImage(currentImageIndex);

// Funções para mudar o texto
function changeText(index) {
    currentTextIndex = (index + texts.length) % texts.length; // Garante que o índice não fique negativo
    showText(currentTextIndex);
}

// Funções para mudar a imagem
function changeImage(index) {
    currentImageIndex = (index + images.length) % images.length; // Garante que o índice não fique negativo
    showImage(currentImageIndex);
}

// Função para arrastar
let startX, isDragging = false;

function handleDragStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX; // Posição inicial do toque
    isDragging = true; // Inicia a arrastada
    document.body.style.cursor = 'grabbing'; // Altera o cursor para mãozinha
}

function handleDragEnd(e) {
    if (!isDragging) return; // Ignora se não estiver arrastando

    const endX = e.touches ? e.touches[0].clientX : e.clientX; // Posição final do toque
    const dragDistance = endX - startX; // Distância arrastada

    isDragging = false; // Finaliza a arrastada
    document.body.style.cursor = ''; // Reseta o cursor

    // Verifica a distância arrastada para mudar texto/imagem
    if (dragDistance < -50) {
        changeText(currentTextIndex + 1); // Arrastou para a esquerda, muda para o próximo texto
        changeImage(currentImageIndex + 1); // Muda a imagem também
    } else if (dragDistance > 50) {
        changeText(currentTextIndex - 1); // Arrastou para a direita, volta para o texto anterior
        changeImage(currentImageIndex - 1); // Volta a imagem também
    }
}

// Adiciona eventos de arrasto para o carrossel de texto
const textCarousel = document.querySelector('.text-carousel');
textCarousel.addEventListener('touchstart', handleDragStart);
textCarousel.addEventListener('mousedown', handleDragStart);
textCarousel.addEventListener('touchend', handleDragEnd);
textCarousel.addEventListener('mouseup', handleDragEnd);
textCarousel.addEventListener('mouseleave', handleDragEnd);

// Adiciona eventos de arrasto para o carrossel de imagem
const imageCarousel = document.querySelector('.image-carousel');
imageCarousel.addEventListener('touchstart', handleDragStart);
imageCarousel.addEventListener('mousedown', handleDragStart);
imageCarousel.addEventListener('touchend', handleDragEnd);
imageCarousel.addEventListener('mouseup', handleDragEnd);
imageCarousel.addEventListener('mouseleave', handleDragEnd);

// Previne a seleção de texto
document.addEventListener('selectstart', (e) => e.preventDefault());
