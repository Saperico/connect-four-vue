<template>
  <div class="home-container">
    <header class="hero">
      <h1>Welcome to Connect Four!</h1>
      <p>The classic game of strategy, now in your browser.</p>
    </header>
    
    <section class="actions">
      <button @click="startNewGame" class="btn-primary">Start New Game</button>
      <button @click="viewLeaderboard" class="btn-secondary">View Leaderboard</button>
    </section>

    <section class="user-info" v-if="username">
      <p>Logged in as: <strong>{{ username }}</strong></p>
    </section>

    <!-- Placeholder for game board or active games list -->
    <section class="game-area">
      <h2>Your Active Games</h2>
      <p v-if="!hasActiveGames">You have no active games. Start a new one!</p>
      <!-- List active games here -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      // We'll get the username from localStorage or a global store later
      username: localStorage.getItem('username') || 'Player1', // Placeholder
      hasActiveGames: false, // Placeholder
    };
  },
  methods: {
    startNewGame() {
      const gameId = 'game' + Date.now();
      this.$router.push(`/game/${gameId}`);
    },
    viewLeaderboard() {
      console.log('View Leaderboard clicked');
      // Navigate to a leaderboard page if we create one
      alert('Leaderboard functionality to be implemented.');
    },
    updateUsernameFromStorage(event) {
      if (event.key === 'username') {
        this.username = event.newValue || 'Player1';
      }
    }
  },
  mounted() {
    // Potentially fetch user data or active games when component mounts
    // For now, just update username if it changes in localStorage
    window.addEventListener('storage', this.updateUsernameFromStorage);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateUsernameFromStorage);
  }
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
  text-align: center;
}

.hero {
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: #e9ecef;
  border-radius: 8px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #343a40;
}

.hero p {
  font-size: 1.2rem;
  color: #495057;
}

.actions button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.user-info {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  display: inline-block;
}

.game-area {
  margin-top: 2rem;
}
</style>
