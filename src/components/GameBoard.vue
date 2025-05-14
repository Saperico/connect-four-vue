<template>
  <div class="game-board">
    <div v-for="row in rows" :key="row" class="board-row">
      <div v-for="col in cols" :key="col" class="board-cell" @click="handleCellClick(row -1, col - 1)">
        <!-- Placeholder for disc, will be filled based on boardState -->
        <div v-if="boardState[row-1][col-1]" 
             :class="['disc', boardState[row-1][col-1] === 1 ? 'player1' : 'player2']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  props: {
    rows: {
      type: Number,
      default: 6,
    },
    cols: {
      type: Number,
      default: 7,
    },
    // boardState will be a 2D array representing the board
    // 0: empty, 1: player 1, 2: player 2
    boardState: {
      type: Array,
      default: () => Array(6).fill(null).map(() => Array(7).fill(0))
    }
  },
  methods: {
    handleCellClick(rowIndex, colIndex) {
      // Emit an event to the parent component when a cell is clicked
      // This is where the parent (GameView) would handle the move logic
      this.$emit('cell-clicked', { row: rowIndex, col: colIndex });
      console.log(`Cell clicked: Row ${rowIndex}, Col ${colIndex}`);
    }
  }
};
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(var(--cols, 7), 50px); /* Use CSS var for cols */
  grid-template-rows: repeat(var(--rows, 6), 50px);    /* Use CSS var for rows */
  gap: 5px;
  background-color: #007bff; /* Blue board color */
  padding: 10px;
  border-radius: 10px;
  border: 3px solid #0056b3; /* Darker blue border */
  width: fit-content;
  margin: 20px auto;
}

.board-row {
  /* Not strictly necessary with grid, but kept for potential future styling */
  display: contents; /* Make row act as a direct child container for cells in grid */
}

.board-cell {
  width: 50px;
  height: 50px;
  background-color: #ffffff; /* White empty cells */
  border-radius: 50%; /* Circular cells */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
}

.board-cell:hover {
  background-color: #f0f0f0;
}

.disc {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.player1 {
  background-color: red;
}

.player2 {
  background-color: yellow;
}
</style> 