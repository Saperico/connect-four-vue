<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit" class="register-button">Register</button>
    </form>
    <div class="links">
      <p>
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      // Basic registration logic (e.g., validation, API call)
      console.log(
        'Attempting registration for:',
        this.username,
        this.email,
        this.password
      );
      // For now, simulate successful registration by setting a token and redirecting
      localStorage.setItem('user-token', 'dummy-token-registered');
      this.$router.push('/'); // Or maybe to login page to then login
    },
  },
};
</script>

<style scoped>
.register-container {
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

.register-form {
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
  box-sizing: border-box;
}

.register-button {
  padding: 0.75rem;
  background-color: #28a745; /* Green color for registration */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #218838;
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