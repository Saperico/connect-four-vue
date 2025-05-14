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
        <h2>{{ players.two.name }}</h2>
        <p>Color: <span class="disc player2-indicator"></span> Yellow</p>
        <p>Score: {{ matchHistory.playerTwoWins }} wins</p>
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
      gameId: null, // Will be set from route params
      game: {
        name: 'Epic Showdown',
        status: 'In Progress', // e.g., 'Waiting', 'In Progress', 'Finished'
        winner: null, // e.g., 'Player 1', 'Player 2', 'Draw'
        currentPlayerId: 'player1', // ID of player whose turn it is
      },
      players: {
        one: { id: 'player1', name: 'CurrentUser' },
        two: { id: 'player2', name: 'OpponentBot' },
      },
      // 0: empty, 1: player1 (red), 2: player2 (yellow)
      currentBoardState: Array(6).fill(null).map(() => Array(7).fill(0)),
      matchHistory: {
        playerOneWins: 5,
        playerTwoWins: 3,
        draws: 1,
        totalMatches: 9,
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
    fetchGameDetails(id) {
      console.log('Fetching game details for game ID:', id);
      // Simulate API call to get game data based on ID
      // For now, we use mock data initialized in data()
      this.game.name = `Game #${id.slice(0,5)}`;
      // Example: pre-fill some moves for a demo
      const board = Array(6).fill(null).map(() => Array(7).fill(0));
      board[5][0] = 1; // Player 1
      board[5][1] = 2; // Player 2
      board[4][0] = 1;
      this.currentBoardState = board;
    },
    handlePlayerMove({ row, col }) {
      console.log(`Move attempted by current player at ${row}, ${col}`);
      if (this.game.status !== 'In Progress') {
        alert('Game is not in progress!');
        return;
      }

      // Basic move logic: find the lowest empty cell in the clicked column
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
        
        // Switch turns (simple)
        this.game.currentPlayerId = this.game.currentPlayerId === this.players.one.id ? this.players.two.id : this.players.one.id;
        
        // TODO: Check for win/draw condition
        this.checkForWin(placedRow, col);

      } else {
        alert('Column is full!');
      }
    },
    checkForWin(lastRow, lastCol) {
      // Placeholder for win detection logic
      console.log("Checking for win after move at", lastRow, lastCol)
      // If win, update game.status and game.winner
      // Example:
      // if (someoneWon) {
      //  this.game.status = 'Finished';
      //  this.game.winner = this.game.currentPlayerId === this.players.one.id ? this.players.two.name : this.players.one.name; // Winner is the one who just moved
      // }
    },
    viewFullMatchHistory() {
      alert('Viewing full match history - to be implemented.');
    }
  },
  created() {
    this.gameId = this.$route.params.gameId || 'defaultGame';
    this.fetchGameDetails(this.gameId);
  },
  watch: {
    '$route.params.gameId'(newId) {
      this.gameId = newId;
      this.fetchGameDetails(newId);
    }
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
.game-status .status-inprogress { color: #007bff; font-weight:bold; }
.game-status .status-finished { color: #28a745; font-weight:bold; }
.game-status .status-waiting { color: #ffc107; font-weight:bold; }

.game-layout {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
}

.player-info {
  flex: 1;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
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