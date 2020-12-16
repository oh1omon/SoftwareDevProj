const loadGame = () => {
  document.getElementsByClassName("banner-container")[0].style.display = "none";
  document.getElementsByClassName("content")[0].style.display = "none";
  document.getElementsByClassName("restart-container")[0].style.display =
    "flex";
  document.getElementsByClassName("game-score")[0].style.display = "flex";
  //NOT NEEDED ANYMORE, SINCE FUNCTION RUNGAME EXECUTES ALL OF THIS CODE BY ITSELF
  // let display = new DOMDisplay(
  //   document.getElementsByClassName("game-window")[0],
  //   simpleLevel
  // );
  // display.syncState(State.start(simpleLevel));
  runGame(GAME_LEVELS, DOMDisplay);
};
