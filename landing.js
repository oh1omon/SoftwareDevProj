const loadGame = () => {
  document.getElementsByClassName("banner-container")[0].style.display = "none";
  document.getElementsByClassName("content")[0].style.display = "none";
  document.getElementsByClassName("restart-container")[0].style.display =
    "flex";
  document.getElementsByClassName("game-score")[0].style.display = "flex";
  runGame(GAME_LEVELS, DOMDisplay);
};
