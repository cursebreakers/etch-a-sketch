// Function to create the grid
function createGrid(size) {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        grid.appendChild(gridItem);
    }
}

// Function to change the background color of a grid item
function colorGridItem(e) {
    if (e.target.classList.contains('grid')) return; // Ignore if the grid container is hovered
    const randomColor = getRandomColor();
    if (e.type === 'keydown' || e.type === 'mouseover') {
        e.target.style.backgroundColor = randomColor;
    }
}
// Function to get a random neon rainbow color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');

    // Create default 16x16 grid
    createGrid(16);

    // Event listener for arrow key functions
    document.addEventListener('keydown', colorGridItem);

    // Event listener for mouse hover function
    gridContainer.addEventListener('mouseover', colorGridItem);

    // Event listener for reset button
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        const gridItems = document.querySelectorAll('.grid div');
        gridItems.forEach((item) => {
            item.style.backgroundColor = '#FFFFFF';
        });
    });

   // Event listener for resize button
   const resizeButton = document.getElementById('resize');
   resizeButton.addEventListener('click', () => {
       let newSize = prompt('Enter a number from 1 to 100 for the new grid size:');
       newSize = parseInt(newSize);
       if (newSize >= 1 && newSize <= 100) {
           createGrid(newSize);
       } else {
           alert('Please enter a valid number between 1 and 100.');
       }
   });
});