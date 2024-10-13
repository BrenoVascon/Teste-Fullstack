// Função para mostrar o formulário de Login
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('formTitle').textContent = 'Login';

    document.getElementById('showSignup').style.display = 'inline';
    document.getElementById('showLogin').style.display = 'none';
  }

  function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Cadastro';

    document.getElementById('showSignup').style.display = 'none';
    document.getElementById('showLogin').style.display = 'inline';
  }

  document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login realizado com sucesso!');
        window.location.href = 'index.html';
      } else {
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
    }
  });

  // Submissão do formulário de cadastro
  document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        showLoginForm();
      } else {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.');
    }
  });
