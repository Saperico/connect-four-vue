<template>
  <div class="game-view-container">
    <header class="game-header">
      <h1>Game: {{ game.name }}</h1>
      <p class="game-status">Status: <span :class="`status-${game.status.toLowerCase()}`">{{ game.status }}</span></p>
    </header>

    <div class="game-layout">
      <aside class="player-info player-one">
        <h2>{{ players.one.name }} (You)</h2>
        <p>Color: <span class="disc player1-indicator"></span> Red</p>
        <p>Score: {{ matchHistory.playerOneWins }} wins</p>
      </aside>

      <main class="game-board-area">
        <GameBoard :boardState="currentBoardState" @cell-clicked="handlePlayerMove" />
        <div class="turn-indicator">
          <p v-if="game.status === 'In Progress'">Current Turn: <strong>{{ currentPlayerTurnName }}</strong></p>
          <p v-if="game.winner">Winner: <strong>{{ game.winner }}!</strong></p>
        </div>
      </main>

      <aside class="player-info player-two">
        <template v-if="game.status === 'Waiting'">
          <div class="waiting-content">
            <h2>Waiting for Opponent</h2>
            <div class="opponent-info waiting">
              <div class="waiting-avatar"></div>
              <p>Waiting for opponent...</p>
            </div>
            <button @click="copyInviteLink" class="btn-invite">
              <span class="icon">📋</span> Copy Invite Link
            </button>
          </div>
        </template>
        <template v-else>
          <h2>{{ players.two.name }}</h2>
          <p>Color: <span class="disc player2-indicator"></span> Yellow</p>
          <p>Score: {{ matchHistory.playerTwoWins }} wins</p>
        </template>
      </aside>
    </div>

    <section class="match-history">
      <h3>Match History vs {{ players.two.name }}</h3>
      <p>Total Matches: {{ matchHistory.totalMatches }}</p>
      <p>Draws: {{ matchHistory.draws }}</p>
      <button @click="viewFullMatchHistory">View Full History</button>
    </section>
  </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';

export default {
  name: 'GameView',
  components: {
    GameBoard,
  },
  data() {
    return {
      gameId: null,
      game: {
        name: 'New Game',
        status: 'Waiting', // 'Waiting', 'In Progress', 'Finished'
        winner: null,
        currentPlayerId: 'player1',
      },
      players: {
        one: { 
          id: 'player1', 
          name: 'Player ' + Math.floor(Math.random() * 1000),
          picture: 'https://via.placeholder.com/50'
        },
        two: { 
          id: 'player2', 
          name: 'Waiting for opponent...',
          picture: null
        },
      },
      currentBoardState: Array(6).fill(null).map(() => Array(7).fill(0)),
      matchHistory: {
        playerOneWins: 0,
        playerTwoWins: 0,
        draws: 0,
        totalMatches: 0,
      },
    };
  },
  computed: {
    currentPlayerTurnName() {
      if (this.game.currentPlayerId === this.players.one.id) {
        return this.players.one.name;
      }
      if (this.game.currentPlayerId === this.players.two.id) {
        return this.players.two.name;
      }
      return 'Unknown';
    }
  },
  methods: {
    copyInviteLink() {
      const inviteLink = `${window.location.origin}/game/${this.gameId}`;
      navigator.clipboard.writeText(inviteLink)
        .then(() => alert('Invite link copied to clipboard!'))
        .catch(err => console.error('Failed to copy invite link:', err));
    },
    handlePlayerMove({ col }) {
      if (this.game.status !== 'In Progress') {
        return;
      }

      let placedRow = -1;
      for (let r = this.currentBoardState.length - 1; r >= 0; r--) {
        if (this.currentBoardState[r][col] === 0) {
          placedRow = r;
          break;
        }
      }

      if (placedRow !== -1) {
        const newBoardState = this.currentBoardState.map(r => [...r]);
        newBoardState[placedRow][col] = this.game.currentPlayerId === this.players.one.id ? 1 : 2;
        this.currentBoardState = newBoardState;
        
        this.game.currentPlayerId = this.game.currentPlayerId === this.players.one.id ? this.players.two.id : this.players.one.id;
        
        this.checkForWin(placedRow, col);
      }
    },
    checkForWin(lastRow, lastCol) {
      // Placeholder for win detection logic
      console.log("Checking for win after move at", lastRow, lastCol);
    },
    viewFullMatchHistory() {
      alert('Viewing full match history - to be implemented.');
    }
  },
  created() {
    this.gameId = this.$route.params.gameId || 'game' + Date.now();
    this.game.name = `Game #${this.gameId.slice(0,5)}`;
  }
};
</script>

<style scoped>
.game-view-container {
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.game-header {
  text-align: center;
  margin-bottom: 1rem;
}

.game-header h1 {
  margin-bottom: 0.25rem;
}

.game-status .status-waiting { color: #ffc107; font-weight: bold; }
.game-status .status-inprogress { color: #007bff; font-weight: bold; }
.game-status .status-finished { color: #28a745; font-weight: bold; }

.game-layout {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

.player-info {
  flex: 1;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.waiting-content {
  padding: 1rem;
}

.waiting-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e9ecef;
  margin: 1rem auto;
}

.btn-invite {
  padding: 0.75rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-invite:hover {
  background-color: #5a6268;
}

.player-info h2 {
  font-size: 1.2rem;
  margin-top: 0;
  color: #333;
}

.disc {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}

.player1-indicator { background-color: red; }
.player2-indicator { background-color: yellow; }

.game-board-area {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.turn-indicator {
  margin-top: 1rem;
  font-size: 1.1rem;
  text-align: center;
}

.match-history {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.match-history h3 {
  margin-top: 0;
}

.match-history button {
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.match-history button:hover {
  background-color: #5a6268;
}
</style> 