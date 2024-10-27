const modals = {
    // Mostrar modal específico
    show: function(modalId) {
        document.getElementById(modalId).style.display = 'flex';
        // Adiciona classe para previnir scroll do body
        document.body.style.overflow = 'hidden';
    },
    // Fechar modal específico
    close: function(modalId) {
        document.getElementById(modalId).style.display = 'none';
        // Restaura o scroll do body
        document.body.style.overflow = 'auto';
    },
    // Inicializar eventos dos modais
    init: function() {
        // Fecha modal ao clicar fora
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                modals.close(event.target.id);
            }
        };
        // Suporte a tecla ESC para fechar modais
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modals.close(modal.id);
                });
            }
        });
    }
};

const metricP = document.getElementById('metric-percentual')
const metricPV = document.getElementById('metric-percentual-value')
const metricD = document.getElementById('metric-days')
const metricDV = document.getElementById('metric-days-value')
const metricA = document.getElementById('metric-alerts')
const metricAV = document.getElementById('metric-alerts-value')

const txIncidentes = 0.5
metricPV.innerText = `${txIncidentes}%`
metricDV.innerText = 365
metricAV.innerText = 0

metricP.addEventListener('mouseover', () => {
    if (txIncidentes < 3.5){
        metricPV.style.color = '#44bf08'
    }
    else if (txIncidentes >= 3.5 && txIncidentes < 6){
        metricPV.style.color = '#dbdb00'
    }
    else if (txIncidentes > 6){
        metricPV.style.color = '#b90000'
    };
});
metricP.addEventListener('mouseout', () =>{
    metricPV.style.color = '#858585'
});

metricD.addEventListener('mouseover', () => {
    metricDV.style.color = '#44bf08'
});
metricD.addEventListener('mouseout', () =>{
    metricDV.style.color = '#858585'
});

metricA.addEventListener('mouseover', () => {
    metricAV.style.color = '#44bf08'
})
metricA.addEventListener('mouseout', () =>{
    metricAV.style.color = '#858585'
});

// Controle do carrossel
const carousel = {
    currentSlide: 0,
    slides: null,
    interval: null,

    // Inicializar carrossel
    init: function() {
        this.slides = document.querySelectorAll('.carousel-item');
        this.startAutoPlay();
    },

    // Mostrar slide específico
    showSlide: function(n) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    },

    // Próximo slide
    nextSlide: function() {
        this.showSlide(this.currentSlide + 1);
    },

    // Slide anterior
    prevSlide: function() {
        this.showSlide(this.currentSlide - 1);
    },

    // Iniciar reprodução automática
    startAutoPlay: function() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSlide(), 5000); // Muda slide a cada 5 segundos
    },

    // Parar reprodução automática
    stopAutoPlay: function() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};

// Sistema de notificações
const notifications = {
    show: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getIcon(type)}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    getIcon: function(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }
};

// Funções de utilidade para atualização dinâmica dos dados
const dashboard = {
    // Atualizar métricas
    updateMetrics: function(metrics) {
        Object.entries(metrics).forEach(([key, value]) => {
            const element = document.querySelector(`[data-metric="${key}"]`);
            if (element) {
                element.textContent = value;
            }
        });
    },

    // Atualizar status das atividades
    updateActivities: function(activities) {
        const list = document.querySelector('#activities-list');
        if (!list) return;

        activities.forEach(activity => {
            const item = list.querySelector(`[data-activity="${activity.id}"]`);
            if (item) {
                item.querySelector('.status').textContent = activity.status;
                item.querySelector('.status').className = `status ${activity.statusClass}`;
            }
        });
    },

    // Atualizar lista de usuários ativos
    updateActiveUsers: function(users) {
        const list = document.querySelector('#users-list');
        if (!list) return;

        list.innerHTML = users.map(user => `
            <li>
                <div class="user-info">
                    <i class="fas fa-user${user.isAdmin ? '-tie' : ''}"></i>
                    <span>${user.name}</span>
                    <small>${user.role}</small>
                </div>
                <span class="time">${user.lastActivity}</span>
            </li>
        `).join('');
    }
};

// Funções de manipulação de eventos
function showLogoutModal() {
    modals.show('logoutModal');
}

function showEventsModal() {
    modals.show('eventsModal');
    carousel.init(); // Inicializa o carrossel quando o modal é aberto
}

function closeModal(modalId) {
    modals.close(modalId);
    if (modalId === 'eventsModal') {
        carousel.stopAutoPlay(); // Para o carrossel quando o modal é fechado
    }
}

function logout() {
    // Adiciona animação de saída
    document.body.style.opacity = '0';
    
    // Simula delay para animação
    setTimeout(() => {
        notifications.show('Logout realizado com sucesso', 'success');
        window.location.href = '../login.html';
    }, 500);
}

// Navegação do carrossel
function nextSlide() {
    carousel.nextSlide();
    carousel.startAutoPlay(); // Reinicia o timer
}

function prevSlide() {
    carousel.prevSlide();
    carousel.startAutoPlay(); // Reinicia o timer
}

// Inicialização quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os modais
    modals.init();

    // Exemplo de atualização periódica dos dados (simula dados em tempo real)
    setInterval(() => {
        // Simula atualização de métricas
        dashboard.updateMetrics({
            'incidentes': (Math.random() * 1).toFixed(1) + '%',
            'dias-sem-acidentes': Math.floor(Math.random() * 100) + 300
        });
    }, 60000); // Atualiza a cada minuto

    // Adiciona listeners para teclas de navegação no carrossel
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('eventsModal').style.display === 'flex') {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });
});

// Suporte a tema escuro/claro do sistema
if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', e => {
        document.body.classList.toggle('dark-theme', e.matches);
    });
}

// Tratamento de erros global
window.onerror = function(msg, url, line) {
    notifications.show(`Erro: ${msg}`, 'error');
    return false;
};