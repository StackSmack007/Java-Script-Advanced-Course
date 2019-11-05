function solve() {
   const openedCardPath = "images/whiteCard.jpg";

   const player1 = {
      deck: document.getElementById("player1Div"),
      tempResultBoard: document.querySelectorAll("#result > span")[0],
      currentOpenCardValue: -1
   }

   const player2 = {
      deck: document.getElementById("player2Div"),
      tempResultBoard: document.querySelectorAll("#result > span")[2],
      currentOpenCardValue: -1
   }

   let historyContainer = document.getElementById("history");

   const colorBorders = function (pl1, pl2) {
      let cardElements = [
         [pl1.currentOpenCardValue, Array.from(pl1.deck.children).find(x => +x.getAttribute("name") === pl1.currentOpenCardValue)],
         [pl2.currentOpenCardValue, Array.from(pl2.deck.children).find(x => +x.getAttribute("name") === pl2.currentOpenCardValue)]
      ].sort((a, b) => b[0] - a[0]);

      cardElements[0][1].style.border = "2px solid green";
      cardElements[1][1].style.border = "2px solid red";
   };

   function trackPlayerVsPlayer(pl, opp) {
      pl.deck.addEventListener("click", function (evnt) {
         if (!evnt.target.hasAttribute("name") || evnt.target.getAttribute("src") === openedCardPath) {
            return;
         }//clicked in undefined area or on opened already card;

         let opponentOpenedCards = Array.from(opp.deck.children).filter(x => x.getAttribute("src") === openedCardPath).length;
         let playerOpenedCards = Array.from(this.children).filter(x => x.getAttribute("src") === openedCardPath).length;

         if (opponentOpenedCards < playerOpenedCards) {
            return;  //not allowed to open 2 cards before opponent!
         }

         else if (opponentOpenedCards === playerOpenedCards) {
            opp.tempResultBoard.innerHTML = ""; //new round->opponent previous card cleared!
            opp.currentOpenCardValue = -1;
         }

         pl.currentOpenCardValue = +evnt.target.getAttribute("name");
         pl.tempResultBoard.innerHTML = pl.currentOpenCardValue;

         playerOpenedCards++;
         evnt.target.setAttribute("src", openedCardPath);

         if (opponentOpenedCards === playerOpenedCards) {
            historyContainer.innerHTML += `[${player1.currentOpenCardValue} vs ${player2.currentOpenCardValue}] `;
            colorBorders(pl, opp);
         }
      })
   }

   trackPlayerVsPlayer(player1, player2);
   trackPlayerVsPlayer(player2, player1);
}