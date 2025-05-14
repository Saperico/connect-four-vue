<template>
  <div class="history-container">
    <h1>My Game History & Stats</h1>

    <section class="user-stats" v-if="userStats">
      <h2>My Statistics</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Username:</span>
          <span class="stat-value">{{ userStats.username }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Games Played:</span>
          <span class="stat-value">{{ userStats.totalGames }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Wins:</span>
          <span class="stat-value">{{ userStats.wins }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Losses:</span>
          <span class="stat-value">{{ userStats.losses }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Draws:</span>
          <span class="stat-value">{{ userStats.draws }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Win Rate:</span>
          <span class="stat-value">{{ userStats.winRate }}%</span>
        </div>
      </div>
    </section>

    <section class="past-games">
      <h2>Past Games</h2>
      <div v-if="isLoading" class="loading-message">
        <p>Loading game history...</p>
      </div>
      <div v-else-if="pastGames.length === 0" class="no-games-message">
        <p>No past games found. Go play some!</p>
      </div>
      <ul v-else class="game-list">
        <li v-for="game in pastGames" :key="game.id" :class="['game-item', `result-${game.result.toLowerCase()}`]">
          <div class="game-details">
            <p><strong>Opponent:</strong> {{ game.opponentName }}</p>
            <p><strong>Date:</strong> {{ formatDate(game.date) }}</p>
            <p><strong>Result:</strong> <span class="game-result">{{ game.result }}</span></p>
          </div>
          <button @click="viewGameDetails(game.id)" class="btn-view-details">View Details</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HistoryView',
  data() {
    return {
      isLoading: false,
      currentUser: {
        // Assuming we get this from auth state or localStorage later
        username: localStorage.getItem('username') || 'CurrentUser',
      },
      userStats: null, // Will be populated
      pastGames: [],   // Will be populated
    };
  },
  methods: {
    fetchUserHistoryAndStats() {
      this.isLoading = true;
      console.log(`Fetching history and stats for ${this.currentUser.username}...`);
      // Simulate API call
      setTimeout(() => {
        const games = [
          { id: 'gameHist1', opponentName: 'OpponentBot', date: new Date(2023, 10, 15, 14, 30), result: 'Win', duration: 1200 },
          { id: 'gameHist2', opponentName: 'PlayerX', date: new Date(2023, 10, 16, 10, 0), result: 'Loss', duration: 900 },
          { id: 'gameHist3', opponentName: 'TheChallenger', date: new Date(2023, 10, 17, 18, 45), result: 'Draw', duration: 1500 },
          { id: 'gameHist4', opponentName: 'FriendlyAI', date: new Date(2023, 10, 18, 11, 20), result: 'Win', duration: 1000 },
        ];
        this.pastGames = games;

        const wins = games.filter(g => g.result === 'Win').length;
        const losses = games.filter(g => g.result === 'Loss').length;
        const draws = games.filter(g => g.result === 'Draw').length;
        const totalGames = games.length;
        this.userStats = {
          username: this.currentUser.username,
          totalGames: totalGames,
          wins: wins,
          losses: losses,
          draws: draws,
          winRate: totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0,
        };

        this.isLoading = false;
        console.log('History and stats fetched:', this.userStats, this.pastGames);
      }, 1000);
    },
    formatDate(date) {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
    viewGameDetails(gameId) {
      console.log('Viewing details for game:', gameId);
      // Potentially navigate to a specific game replay view or show a modal
      // For now, we can re-use the existing GameView if it can show past games
      // Or, just alert as a placeholder
      alert(`Viewing details for game ${gameId} - to be implemented.`);
      // Example: this.$router.push(`/game/${gameId}?view=history`);
    }
  },
  created() {
    this.fetchUserHistoryAndStats();
  },
};
</script>

<style scoped>
.history-container {
  padding: 2rem;
  max-width: 900px;
  margin: 20px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.history-container h1, .history-container h2 {
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

.user-stats {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  background-color: #fff;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.stat-label {
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.1rem;
  color: #333;
}

.past-games {
  margin-top: 2rem;
}

.loading-message,
.no-games-message {
  text-align: center;
  padding: 2rem;
  color: #777;
}

.game-list {
  list-style: none;
  padding: 0;
}

.game-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fff;
  transition: box-shadow 0.2s ease-in-out;
}

.game-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.game-item.result-win {
  border-left: 5px solid #28a745; /* Green for win */
}
.game-item.result-loss {
  border-left: 5px solid #dc3545; /* Red for loss */
}
.game-item.result-draw {
  border-left: 5px solid #ffc107; /* Amber for draw */
}

.game-details p {
  margin: 0.25rem 0;
  color: #555;
}
.game-details p strong {
  color: #333;
}

.game-result {
  font-weight: bold;
}
.result-win .game-result { color: #28a745; }
.result-loss .game-result { color: #dc3545; }
.result-draw .game-result { color: #ffc107; }

.btn-view-details {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-view-details:hover {
  background-color: #0056b3;
}
</style> 