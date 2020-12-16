const loadGame = () => {
  document.getElementsByClassName("banner-container")[0].id = "disNone";
  document.getElementsByClassName("content")[0].id = "disNone";
  //NOT NEEDED ANYMORE, SINCE FUNCTION RUNGAME EXECUTES ALL OF THIS CODE BY ITSELF
  // let display = new DOMDisplay(
  //   document.getElementsByClassName("game-window")[0],
  //   simpleLevel
  // );
  // display.syncState(State.start(simpleLevel));
  runGame(GAME_LEVELS, DOMDisplay);
};
