function showLogoutModal() {
  modals.show('logoutModal');
}
function showEventsModal() {
  modals.show('eventsModal');
  carousel.init();
}
function closeModal(modalId) {
  modals.close(modalId);
  if (modalId === 'eventsModal') {
    carousel.stopAutoPlay(); 
  }
}    

document.querySelector('.logout-btn').addEventListener('click', () => {
  function logout() {
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = '../login.html';
      console.log('mudança de tela')
        }, 500);
    }
    logout();
        console.log('Usuário deslogado');
});

