// Sketch-a-color

const gridContainer = document.getElementById("grid-container");
const genResetButton = document.getElementById("genReset");
const reSizeButton = document.getElementById("reSize");

let gridSize = 16; // Default grid size
const maxGridSize = 100; // Maximum number of divs/blocks
const blockSize = Math.floor(960 / gridSize); // Calculate the block size

// Cursor position on the grid
let cursorX = 0;
let cursorY = 0;

// Function to create the grid
function createGrid() {
  gridContainer.innerHTML = ""; // Clear previous grid

  // Calculate the block size to ensure total size remains under 960px
  const blockSize = Math.floor(960 / gridSize);

  // Create gridSize x gridSize grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const gridBlock = document.createElement("div");
      gridBlock.classList.add("grid-block");
      gridBlock.style.width = `${blockSize}px`;
      gridBlock.style.height = `${blockSize}px`;

      // Add event listener to color grid block on mouseover
      gridBlock.addEventListener("mouseover", colorBlock);

      gridContainer.appendChild(gridBlock);
    }
  }

   // Add event listener to the grid container to start cursor from the clicked block
   gridContainer.addEventListener("click", (event) => {
    const clickedBlock = event.target;
    const gridBlocks = document.querySelectorAll(".grid-block");
    const index = Array.from(gridBlocks).indexOf(clickedBlock);

    // Update cursor position based on the clicked block
    cursorX = index % gridSize;
    cursorY = Math.floor(index / gridSize);
  });

  // Set the cursor position to the top-left corner when the grid is created or reset
  cursorX = 0;
  cursorY = 0;
}

// Function to color the grid block with a random rainbow neon color
function colorBlock(event) {
    const gridBlock = event.target;
    const randomColor = getRandomColor();
    gridBlock.style.backgroundColor = randomColor;
}
  
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to color the grid block under the cursor
function colorBlockUnderCursor() {
  const gridBlocks = document.querySelectorAll(".grid-block");
  const index = cursorY * gridSize + cursorX;
  const gridBlock = gridBlocks[index];
  const randomColor = getRandomColor();
  gridBlock.style.backgroundColor = randomColor;
}

// Event listener for arrow key presses
window.addEventListener("keydown", handleArrowKeys);

// Function to handle arrow key presses and update cursor position
function handleArrowKeys(event) {
  // Check if arrow key is pressed
  if (event.key.includes("Arrow")) {
    // Prevent default behavior (e.g., scrolling) when arrow keys are pressed
    event.preventDefault();

    // Update the cursor position based on the arrow key pressed
    switch (event.key) {
      case "ArrowUp":
        cursorY = Math.max(0, cursorY - 1);
        break;
      case "ArrowDown":
        cursorY = Math.min(gridSize - 1, cursorY + 1);
        break;
      case "ArrowLeft":
        cursorX = Math.max(0, cursorX - 1);
        break;
      case "ArrowRight":
        cursorX = Math.min(gridSize - 1, cursorX + 1);
        break;
    }
    colorBlockUnderCursor();
  }
}


// Event listener for genReset button
genResetButton.addEventListener("click", createGrid);

// Event listener for reSize button
reSizeButton.addEventListener("click", () => {
  // Ask user for a new gridSize within the specified limits
  gridSize = prompt(
    `Enter a new grid size (1-${maxGridSize}):`,
    gridSize
  );

    // Validate the user's input and recreate the grid
    gridSize = Math.min(Math.max(1, gridSize), maxGridSize);
    createGrid();
  });
  
  // Initial grid creation
  createGrid();
  