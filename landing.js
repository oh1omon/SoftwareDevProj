const loadGame = () => {
  document.getElementById("wrapper").id = "disNone";
  document.getElementsByClassName("game-overlay")[0].id = "";
  //NOT NEEDED ANYMORE, SINCE FUNCTION RUNGAME EXECUTES ALL OF THIS CODE BY ITSELF
  // let display = new DOMDisplay(
  //   document.getElementsByClassName("game-window")[0],
  //   simpleLevel
  // );
  // display.syncState(State.start(simpleLevel));
  runGame(GAME_LEVELS, DOMDisplay);
};

(function () {
  if (!localStorage.getItem("coinScore")) {
    localStorage.setItem("coinScore", "0");
  }
  if (localStorage.getItem("coinScore") >= 1000) {
    document.getElementById("coins").innerText = `${
      localStorage.getItem("coinScore") / 1000
    }K`;
  } else if (localStorage.getItem("coinScore") >= 100) {
    document.getElementById("coins").innerText = `${localStorage.getItem(
      "coinScore"
    )}`;
  } else if (localStorage.getItem("coinScore") >= 10) {
    document.getElementById("coins").innerText = `0${localStorage.getItem(
      "coinScore"
    )}`;
  } else {
    document.getElementById("coins").innerText = `00${localStorage.getItem(
      "coinScore"
    )}`;
  }
})();
