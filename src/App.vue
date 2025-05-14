<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/lobbies">Lobbies</router-link> |
    <router-link to="/history">My History</router-link>
    | <router-link to="/login">Login</router-link>
    | <router-link to="/register">Register</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  /* // Temporarily commented out login-related logic
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user-token');
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('user-token');
      this.$router.push('/login');
    }
  },
  watch: {
    $route() {
      this.$forceUpdate(); 
    }
  }
  */
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #f8f9fa; /* Light grey background */
  border-bottom: 1px solid #e7e7e7;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px; /* Add some spacing */
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav a:hover {
  text-decoration: underline;
}
</style>
