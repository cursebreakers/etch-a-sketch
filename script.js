// Required functions: 
    // Populate a grid, 16x16 default, with two buttons above the grid
        // General reset button, and resize
        // genReset = reload grid
        // reSize = reload grid at requested size
            //max specs: 960sq px, and 100 divs/blocks 
                // min: divs/blocks = 1
    //when arrow keys are pressed, cursor moves across grid
        //selecting/coloring blocks w/random rainbow neon
        
const gridContainer = document.getElementById("grid-container");
const genResetButton = document.getElementById("genReset");
const reSizeButton = document.getElementById("reSize");

let gridSize = 16; // Default grid size
const maxGridSize = 100; // Maximum number of divs/blocks

// Function to create the grid
function createGrid() {
    gridContainer.innerHTML = ""; // Clear previous grid

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
  