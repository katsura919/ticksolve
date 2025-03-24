loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // In a real application, you would validate credentials here
    // For now, we'll just redirect to the home page
    window.location.href = 'home.html';
});