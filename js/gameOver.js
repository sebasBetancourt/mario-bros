export const showMenuGameOver = (scene) => {
    if (document.getElementById("game-over-menu")) return;
    
        let gameOverMenu = document.createElement("div");
        gameOverMenu.id = "game-over-menu";
        gameOverMenu.classList.add("menuGameOver");
    
        gameOverMenu.innerHTML = `
            <h3>Game Over ${screen.width}</h3>
            <button id="restart-btn" class="playAgain"
            ">Play Again</button>
        `;
    
        document.body.appendChild(gameOverMenu);
    
        const resetButton = document.getElementById("restart-btn")
        resetButton.addEventListener("click", () => {
            gameOverMenu.remove(); 
            scene.scene.restart();
        });
}