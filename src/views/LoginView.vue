<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="usernameOrEmail">Username or Email</label>
        <input type="text" id="usernameOrEmail" v-model="usernameOrEmail" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <div class="links">
      <p>
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
      <p>
        <a href="#" @click.prevent="handleForgotPassword">Forgot password?</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      usernameOrEmail: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      // Basic login logic (e.g., validation, API call)
      console.log('Attempting login with:', this.usernameOrEmail, this.password);
      // For now, simulate login by setting a token and redirecting
      localStorage.setItem('user-token', 'dummy-token-logged-in');
      this.$router.push('/');
    },
    handleForgotPassword() {
      console.log('Forgot password clicked');
      // Navigate to a password reset page or show a modal
      alert('Forgot password functionality to be implemented.');
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 400px;
  margin: 50px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't affect overall width */
}

.login-button {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.links {
  margin-top: 1rem;
  text-align: center;
}

.links p {
  margin-bottom: 0.5rem;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style> 