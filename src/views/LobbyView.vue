<template>
  <div class="lobby-container">
    <h1>Game Lobbies</h1>
    <button @click="refreshLobbies" class="btn-refresh">Refresh Lobbies</button>
    <div v-if="isLoading" class="loading-message">
      <p>Loading lobbies...</p>
    </div>
    <div v-else-if="lobbies.length === 0" class="no-lobbies-message">
      <p>No active lobbies found. Maybe create one?</p>
    </div>
    <ul v-else class="lobby-list">
      <li v-for="lobby in lobbies" :key="lobby.id" class="lobby-item">
        <div class="lobby-info">
          <h2>{{ lobby.name }} ({{ lobby.hostName }})</h2>
          <p>Players: {{ lobby.currentPlayerCount }}/{{ lobby.maxPlayers }}</p>
          <p>Status: <span :class="`status-${lobby.status.toLowerCase()}`">{{ lobby.status }}</span></p>
        </div>
        <button @click="joinLobby(lobby.id)" class="btn-join">Join Lobby</button>
      </li>
    </ul>
    <button @click="goToCreateLobby" class="btn-create-lobby">Create New Lobby</button>
  </div>
</template>

<script>
export default {
  name: 'LobbyView',
  data() {
    return {
      isLoading: false,
      lobbies: [], // This will be populated by an API call or mock data
    };
  },
  methods: {
    fetchLobbies() {
      this.isLoading = true;
      console.log('Fetching lobbies...');
      // Simulate API call
      setTimeout(() => {
        this.lobbies = [
          { id: 'lobby1', name: 'Cool Cats Club', hostName: 'Alice', currentPlayerCount: 1, maxPlayers: 2, status: 'Waiting' },
          { id: 'lobby2', name: 'Pro Gamers Only', hostName: 'Bob', currentPlayerCount: 2, maxPlayers: 2, status: 'Full' },
          { id: 'lobby3', name: 'Casual Play', hostName: 'Charlie', currentPlayerCount: 1, maxPlayers: 2, status: 'Waiting' },
          { id: 'lobby4', name: 'Evening Game', hostName: 'Diana', currentPlayerCount: 0, maxPlayers: 2, status: 'Empty' },
        ];
        this.isLoading = false;
        console.log('Lobbies fetched:', this.lobbies);
      }, 1000);
    },
    refreshLobbies() {
      this.fetchLobbies();
    },
    joinLobby(lobbyId) {
      console.log('Attempting to join lobby:', lobbyId);
      this.$router.push(`/game/${lobbyId}`); // Navigate to the specific game page
    },
    goToCreateLobby() {
      console.log('Navigating to create lobby page...');
      // this.$router.push('/create-lobby'); // Assuming a route /create-lobby exists
      alert('Create new lobby functionality to be implemented.');
    }
  },
  created() {
    this.fetchLobbies(); // Fetch lobbies when the component is created
  },
};
</script>

<style scoped>
.lobby-container {
  padding: 2rem;
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.loading-message,
.no-lobbies-message {
  text-align: center;
  padding: 2rem;
  color: #555;
}

.lobby-list {
  list-style: none;
  padding: 0;
}

.lobby-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.lobby-info h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.lobby-info p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.status-waiting {
  color: #ffc107; /* Amber */
  font-weight: bold;
}

.status-full {
  color: #dc3545; /* Red */
  font-weight: bold;
}

.status-empty {
  color: #28a745; /* Green */
  font-weight: bold;
}

.btn-join,
.btn-refresh,
.btn-create-lobby {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease-in-out;
}

.btn-join {
  background-color: #007bff;
  color: white;
}
.btn-join:hover {
  background-color: #0056b3;
}

.btn-refresh {
  background-color: #6c757d;
  color: white;
  margin-bottom: 1rem;
}
.btn-refresh:hover {
  background-color: #545b62;
}

.btn-create-lobby {
  background-color: #28a745;
  color: white;
  display: block;
  width: fit-content;
  margin: 2rem auto 0;
}
.btn-create-lobby:hover {
  background-color: #1e7e34;
}

</style> 