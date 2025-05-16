<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Connect Four</h1>
        <p class="subtitle">Play the classic game online</p>
      </div>

      <div class="login-content">
        <button @click="handleGoogleLogin" class="google-login-btn">
          <img src="@/assets/google-icon.svg" alt="Google" class="google-icon" />
          <span>Continue with Google</span>
        </button>

        <div class="divider">
          <span>or</span>
        </div>

        <div class="guest-login">
          <p>Play as a guest</p>
          <button @click="handleGuestLogin" class="guest-btn">
            Start Playing
          </button>
        </div>
      </div>

      <div class="login-footer">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    async handleGoogleLogin() {
      try {
        // Use the Google Identity Services
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
          scope: 'email profile',
          callback: (response) => {
            if (response.access_token) {
              // Get user info using the access token
              this.getUserInfo(response.access_token);
            }
          },
        });

        // Request access token
        client.requestAccessToken();
      } catch (error) {
        console.error('Google login error:', error);
        alert('Failed to login with Google. Please try again.');
      }
    },
    async getUserInfo(accessToken) {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        const userData = await response.json();
        
        // Store user data and token
        localStorage.setItem('user-token', accessToken);
        localStorage.setItem('user-data', JSON.stringify({
          email: userData.email,
          name: userData.name,
          picture: userData.picture
        }));

        // Redirect to home page
        this.$router.push('/');
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to get user information. Please try again.');
      }
    },
    handleGuestLogin() {
      const gameId = 'game' + Date.now();
      this.$router.push(`/game/${gameId}`);
    }
  },
  mounted() {
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  text-align: center;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2.5rem;
  color: #2d3748;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #718096;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.login-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.google-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.google-login-btn:hover {
  background: #f7fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.google-icon {
  width: 24px;
  height: 24px;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #a0aec0;
  margin: 1rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 1rem;
  font-size: 0.875rem;
}

.guest-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guest-login p {
  color: #718096;
  margin: 0;
}

.guest-btn {
  background: #4c51bf;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.guest-btn:hover {
  background: #434190;
  transform: translateY(-1px);
}

.login-footer {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #a0aec0;
}

.login-footer p {
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem;
  }

  .login-header h1 {
    font-size: 2rem;
  }
}
</style> 