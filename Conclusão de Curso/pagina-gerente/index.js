// Initialize Feather icons
feather.replace();

// Modal functionality
const eventsModal = document.getElementById('eventsModal');
const eventsButton = document.getElementById('eventsButton');
const closeModal = document.querySelector('.close-modal');
const logoutButton = document.getElementById('logoutButton');

// Carousel functionality
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;

// Charts data
const securityData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Incidentes',
        data: [4, 3, 2, 1, 3, 2],
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 1
    }]
};

const activityData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        label: 'Atividades',
        data: [150, 180, 200, 220, 190, 210],
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        borderWidth: 1
    }]
};

// Chart configuration
const chartConfig = {
    type: 'bar',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#374151'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            x: {
                grid: {
                    color: '#374151'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            }
        }
    }
};

// Initialize charts
const securityChart = new Chart(
    document.getElementById('securityChart'),
    {
        ...chartConfig,
        data: securityData
    }
);

const activitiesChart = new Chart(
    document.getElementById('activitiesChart'),
    {
        ...chartConfig,
        data: activityData
    }
);

// Modal event listeners
eventsButton.addEventListener('click', () => {
    eventsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    eventsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});
// Modal event listeners (continuação)
window.addEventListener('click', (e) => {
    if (e.target === eventsModal) {
        eventsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Função para fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && eventsModal.style.display === 'block') {
        eventsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Carousel functions
function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Carousel event listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (eventsModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// Touch events for carousel
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

// Logout functionality
logoutButton.addEventListener('click', () => {
    // Adicionar aqui qualquer lógica de limpeza de sessão necessária
    window.location.href = 'login.html';
});

// Atualização automática dos dados (a cada 5 minutos)
function updateDashboardData() {
    // Simulação de atualização dos dados
    // Em um ambiente real, isso seria uma chamada à API
    
    // Atualiza dados do gráfico de segurança
    const newSecurityData = securityData.datasets[0].data.map(() => 
        Math.floor(Math.random() * 5)
    );
    securityChart.data.datasets[0].data = newSecurityData;
    securityChart.update();

    // Atualiza dados do gráfico de atividades
    const newActivityData = activityData.datasets[0].data.map(() => 
        Math.floor(Math.random() * 100) + 150
    );
    activitiesChart.data.datasets[0].data = newActivityData;
    activitiesChart.update();

    // Atualiza contadores nos cards
    const alertCount = document.querySelector('.card:first-child .card-value');
    const criticalAlerts = Math.floor(Math.random() * 3);
    const moderateAlerts = Math.floor(Math.random() * 3);
    alertCount.textContent = criticalAlerts + moderateAlerts;
    alertCount.nextElementSibling.textContent = 
        `${criticalAlerts} críticos, ${moderateAlerts} moderado`;

    // Atualiza status de segurança
    const securityStatus = document.querySelector('.status-stable');
    const lastCheck = new Date().toLocaleTimeString();
    securityStatus.nextElementSibling.textContent = 
        `Última verificação: ${lastCheck}`;
}

// Atualiza os dados a cada 5 minutos
setInterval(updateDashboardData, 5 * 60 * 1000);

// Função para redimensionar gráficos quando a janela é redimensionada
function handleResize() {
    securityChart.resize();
    activitiesChart.resize();
}

// Event listener para redimensionamento da janela
window.addEventListener('resize', handleResize);

// Acessibilidade - Trap focus dentro do modal quando aberto
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Aplicar trap focus ao modal
trapFocus(eventsModal);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os gráficos com tamanho correto
    handleResize();
    
    // Primeira atualização dos dados
    updateDashboardData();
    
    // Inicia o carrossel na primeira posição
    updateCarousel();
});

// Tratamento de erros globais
window.addEventListener('error', (error) => {
    console.error('Erro na aplicação:', error);
    // Aqui você poderia implementar um sistema de log de erros
});

// Verificação de suporte a recursos do navegador
function checkBrowserSupport() {
    if (!window.Chart) {
        console.error('Chart.js não está disponível');
        // Adicionar fallback ou mensagem de erro
    }
    
    if (!window.fetch) {
        console.error('Fetch API não está disponível');
        // Adicionar fallback para XMLHttpRequest
    }
}

checkBrowserSupport();