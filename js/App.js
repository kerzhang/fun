/*
Create by kerzhang on 30 Jun 2017
*/

(function tictactoeGame() {
  let currentPlayerIsX = false;
  let allBoxes = Array(9).fill(null);
  let playerXName = "";
  let playerOName = "";
  let playWithComputer = true;

  //On start, load the start html,
  let $startPage = `<div class="screen screen-start" id="start">
                      <header>
                        <h1>Comeon Beat Me</h1>
                          <div class='player_computer'>
                            <label for="humanPlayerName">Please enter your name:</label>
                            <input type="text" id="humanPlayerName" class="human_user_name" autofocus>
                          </div>
       
                        <a href="#" class="button">Start game</a>
                      </header>
                    </div>`;

  //The main page of this game.
  let $board = `<div class="board" id="board">
                <header>
                  <h1>Tic Tac Toe</h1>
                  <ul>
                    <li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
                    <li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
                  </ul>
                </header>
                <ul class="boxes">
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li> 
                  <li class="box"></li>
                </ul>
              </div>`;

  //Show up when a play win the game.
  let $win = `<div class="screen screen-win" id="finish">
                <header>
                  <h1>Tic Tac Toe</h1>
                  <p class="message"></p>
                  <a href="#" class="button">New game</a>
                </header>
              </div>`;

  //load specific page template for different game stage.
  function loadPage(thePageTemplate) {
    $(".container").children().remove();
    $(".container").append(thePageTemplate);
  }

  //switch the player indicator box as game moves on
  function switchPlayerBox() {
    if (currentPlayerIsX) {
      $("#player2").addClass("active");
      $("#player1").removeClass("active");
    } else {
      $("#player1").addClass("active");
      $("#player2").removeClass("active");
    }
  }

  //Validate the player name filed on the start page.
  function validatePlayerName() {
    let userNameIsValid = false;
    // if (playWithComputer === false) {
    //   let name1IsValid = false;
    //   let name2IsValid = false;
    //   let nameIsNotDuplicate = false;

    //   if ($("#playerO").val() === "") {
    //     $("#playerO").css("border-color", "tomato");
    //     nameIsValid = false;
    //   } else {
    //     $("#playerO").css("border-color", "");
    //     name1IsValid = true;
    //     playerOName = $("#playerO").val();
    //   }

    //   if ($("#playerX").val() === "") {
    //     $("#playerX").css("border-color", "tomato");
    //     nameIsValid = false;
    //   } else {
    //     $("#playerX").css("border-color", "");
    //     name2IsValid = true;
    //     playerXName = $("#playerX").val();
    //   }

    //   if (playerOName !== playerXName) {
    //     nameIsNotDuplicate = true;
    //   }

    //   userNameIsValid = name1IsValid && name2IsValid && nameIsNotDuplicate;
    // } else {
      if ($("#humanPlayerName").val() === "") {
        $("#humanPlayerName").css("border-color", "tomato");
        userNameIsValid = false;
      } else {
        $("#humanPlayerName").css("border-color", "");
        userNameIsValid = true;
        playerOName = $("#humanPlayerName").val();
        playerXName = "Computer";
      }
    // }
    return userNameIsValid;
  }

  	//On the winner page, start a new game when user click to restart the game.
    function handleWinnerPage() {
    $(".button").on("click", function() {
      //Pick up who's turn first
      totalSteps = 0;
      allBoxes = Array(9).fill(null);
      loadPage($board);
      $("#player1").append('<span class="customPlayerName">' + " : [ " + playerOName + " ]" + "</span>");
      $("#player2").append('<span class="customPlayerName">' + " : [ " + playerXName + " ]" + "</span>");
      currentPlayerIsX = Math.random() * 2 > 1;
      switchPlayerBox();
      if (playWithComputer === true) {
        aiPlay();
      }
    });
  }

  //Explore a give game board state and extra the boxes not been clicked yet.
  function getEmptyBoxes(boxesState) {
    let emptyBoxes = [];
    for (var index = 0; index < 9; index++) {
      if (boxesState[index] === null) {
        emptyBoxes.push(index);
      }
    }
    return emptyBoxes;
  }

  /**
   * To test a game board state see if there's a winner.
   * There are total 8 winning situation in this game.
   * @param {any} boxesState a given board stage, a boxes set.
   * @returns total 4 possible return value: 'X' or 'O' - if there's a player win; 
   *          'tie' if all boxes have been clicked but nobody win;
   *          'null' if nobody win and there are boxes still available.
   */
  function findWinner(boxesState) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        boxesState[a] &&
        boxesState[a] === boxesState[b] &&
        boxesState[a] === boxesState[c]
      ) {
        return boxesState[a];
      }
    }

    if (getEmptyBoxes(boxesState).length === 0) {
      return "tie";
    }

    return null;
  }

  /**
   * Once the game ends with Winner or Tie, return True and load the winner page and decorate the DOM elements;
   * Or return false if the game is not over yet.
   * @returns Boolean
   */
  function gameIsOver() {
    if (findWinner(allBoxes) !== null) {
      let winner = findWinner(allBoxes);
      loadPage($win);
      switch (winner) {
        case "O":
          $("#finish").addClass("screen-win-one");
          $(".message").text("Winner: " + playerOName);
          break;
        case "X":
          $("#finish").addClass("screen-win-two");
          $(".message").text("Winner: " + playerXName);
          break;
        default:
          $("#finish").addClass("screen-win-tie");
          $(".message").text("It's a Tie!");
      }
      return true;
    } else {
      return false;
    }
  }

  /**
	 * Return the score regarding a given board state. This function is key to AI player to eveluate posible action.
	 * @param {any} boxesState: a specific state resulted by a player move.
	 * @param {any} depth: can also be treated as the step count when reached a win situation.
	 * @returns Higher sorce is good for human player and lower sorce is good for AI player.
	 */
  function score(boxesState, depth) {
    if (findWinner(boxesState) === "O") {
      return 10 - depth;
    } else if (findWinner(boxesState) === "X") {
      return depth - 10;
    } else {
      return 0;
    }
  }

  /**
	 * Node is used during minimax calculation. Every play movement onto a specific box will result a sorce.
	 * We record each tested box as a node which contains the score and position of that move.
	 * @param {any} score : calculated by minimax formula for a move.
	 * @param {any} position : the coordinate of the box.
	 */
  function Node(score, position) {
    this.score = score;
    this.position = position;
  }

  //Switch player, used in minimax recursive calculation.
  function switchPlayer(player) {
    return player === "X" ? "O" : "X";
  }

  /**
	 * The core algorithm of minimax. It is a recursive method to loop through every possible movement 
   * and evaluate the result with score function.
	 * @param {any} currentBoxesState the state to be evaluated.
	 * @param {number} [depth] the move count of the AI.
	 * @param {string} [player] the player who 'created' current state.
	 * @returns integer score.
	 */
  function minimax(currentBoxesState, depth, player) {

	  //As this is a recursive method, first we need to setup the base for closing the calculation.
	  //once a board state returns with 'winner' status, score is then created.
    if (findWinner(currentBoxesState) !== null) {
      return score(currentBoxesState, depth);
    }

	//Create a state score baseline for recursive score comparing and saving.
    let currentStateScore;
	// O player expects higher score, so we put a very small number as the baseline, 
	// it will be replaced right after minimax get a score. 
	//'123' actually can any number as long as smaller than possible minimax value which is usually under 10.
    if (player === "O") {
      currentStateScore = -123;
    } else {
	// X player try all the best to prevent O from winning, so lower score is prefered.
	// I just put a 'ceilling' number here for comparing with minimax score.
      currentStateScore = 123;
    }
	//AI move count (depth) is important for score calculation, 
	//below method is to record the X move during the recursive calculation.
    let xMove = depth;
    if (player === "X") {
      xMove += 1;
    }

	//Below logical is as same as the code of smartAIMove, 
	//please reference the explanation there.
    let emptyBoxes = getEmptyBoxes(currentBoxesState);
    for (let index = 0; index < emptyBoxes.length; index++) {
      let position = emptyBoxes[index];
      let newBoxesState = currentBoxesState.slice();
      newBoxesState[position] = player;
      let newScore = minimax(newBoxesState, xMove, switchPlayer(player));
      //For O player, high score is recorded.
	  if (player === "O") {
        if (newScore > currentStateScore) {
          currentStateScore = newScore;
        }
      } else {
		  //for X player, lower score is recorded.
        if (newScore < currentStateScore) {
          currentStateScore = newScore;
        }
      }
    }

    return currentStateScore;
  }

  //Simple AI move by randomly pick up a position.
  function simpleAIMove() {
    let emptyBoxes = getEmptyBoxes(allBoxes);
    let nextAIStep = Math.floor(Math.random() * emptyBoxes.length);
    return emptyBoxes[nextAIStep];
  }

  //For smart AI move,
  //Evaluate current board state with minimax algorithm and return the best move position.
  function smartAIMove() {
	//Create an array to hold all the move options.
    let candidateBoxes = [];
    // collect all empty boxes of current board.
    let emptyBoxes = getEmptyBoxes(allBoxes);
	//loop through all the empty boxes, to evaluate all the options.
    for (let index = 0; index < emptyBoxes.length; index++) {
      let element = emptyBoxes[index];
	  //duplicate current board state so that we don't change it during the whole evaluation process.
      let newBoxesState = allBoxes.slice();
	  //Make a move, and then send the new board state to the minimax algorithm for sorce calculation.
      newBoxesState[element] = "X";
	  //along sending the new board state, we increase the depth by 1, and also change player from X to O
      let newScore = minimax(newBoxesState, 1, "O");
	  //A node is created to hold calculated score and correspoding move position, then store it.
      let candidateNode = new Node(newScore, element);
      candidateBoxes.push(candidateNode);
    }
	//For X player, lower score means lower the chance of O winning, so it is sort by ascent.
	candidateBoxes.sort(function(c1, c2) {
		return c1.score - c2.score;
	});
    // console.log(candidateBoxes);
    return candidateBoxes[0].position;
  }

  /**
   * The AI player takes action by get the best index calculated by minimax algorithm;
   * To make the game easier, we can also combine the simple and smart move.
   * The AI player was assigned as the X player, however as we randomly kick off the game, 
   * both players get chances to play first, therefore a sort of equal opportunity.
   */
  function aiPlay() {
    if (currentPlayerIsX) {
        // let boxIndex = simpleAIMove();
      let boxIndex = smartAIMove();
      $(".box").eq(boxIndex).addClass("box-filled-2");
      allBoxes[boxIndex] = "X";
      if (gameIsOver()) {
        handleWinnerPage();
      } else {
        currentPlayerIsX = !currentPlayerIsX;
        switchPlayerBox();
      }
    }
  }

  /* -------------------------------------------------------------
	-- Load the start page and handle the game start button click --
	----------------------------------------------------------------*/
  loadPage($startPage);

  //The game moeld menu, let user to choose to play with the AI or just human game.
  // $("#game_model").change(function() {
  //   if ($(".nameRequired1").length !== 0) {
  //     $(".nameRequired1").remove();
  //   }
  //   if ($(".nameRequired2").length !== 0) {
  //     $(".nameRequired2").remove();
  //   }

  //   //Depends on user selection, different name input field will show up.
  //   let gameModel = $("#game_model :selected").val();
  //   if (gameModel === "against_computer") {
  //     $(".player_player").hide();
      $(".player_computer").show();
  //     $("#playerX").css("border-color", "");
  //     $("#playerO").css("border-color", "");
  //     playWithComputer = true;
  //   } else {
  //     $(".player_player").show();
  //     $(".player_computer").hide();
  //     $("#humanPlayerName").css("border-color", "");
  //     playWithComputer = false;
  //   }
  // });

  //Request user to input player name to proceed.
  $(".button").on("click", function() {
    //Clean update the alert information created by last validation.
    if ($(".nameRequired1").length !== 0) {
      $(".nameRequired1").remove();
    }
    if ($(".nameRequired2").length !== 0) {
      $(".nameRequired2").remove();
    }

    //Validate player name and highlight the field if not valid.
    let nameValid = validatePlayerName();
    if (nameValid === false) {
      //Alerts are different in different game model.
              console.log("human names needed");
        if ($(".nameRequired2").length === 0) {
          $(".button").before(
            '<div style="color: tomato" class="nameRequired2">( Please input your name! )</div>'
          );
             }
    } else {
      //If all validation passed, pick up who's turn first
      currentPlayerIsX = Math.random() * 2 > 1;
      //Remove the start page and display the board.
      loadPage($board);
      //Append player names to the player indicator box.
      $("#player1").append(
        '<span class="customPlayerName">' +
          " : [ " +
          playerOName +
          " ]" +
          "</span>"
      );
      $("#player2").append(
        '<span class="customPlayerName">' +
          " : [ " +
          playerXName +
          " ]" +
          "</span>"
      );
      //Highlight the corresponding player indictor box
      switchPlayerBox();
      //Trigger the AI player if game model if AI play model.
      if (playWithComputer === true) {
        aiPlay();
      }
    }
  });

  /* -------------------------------------------------------------
	------------------------ Playing the game ----------------------
	----------------------------------------------------------------*/
  //handle mouse event on the squre, draw X/O symbol when player hover a box
  $(document)
    .on("mouseover", ".box", function(event) {
      if (
        !$(event.target).hasClass("box-filled-1") &&
        !$(event.target).hasClass("box-filled-2")
      ) {
        if (currentPlayerIsX) {
          $(event.target).css("background-image", "url(./img/x.svg)");
        } else {
          $(event.target).css("background-image", "url(./img/o.svg)");
        }
      }
    })
    .on("mouseout", ".box", function(event) {
      // console.log('out there' + $(event.target).name);
      $(event.target).css("background-image", "");
    });

  //during game playing, handles the click event when user clicked a box.
  $(document).on("click", ".box", function(event) {
    //Only empty boxes are clickable,
    if (!$(event.target).hasClass("box-filled-1") && !$(event.target).hasClass("box-filled-2")) {
      //when user click a box,
      if (currentPlayerIsX) {
        $(event.target).addClass("box-filled-2");
        allBoxes[$(event.target).index()] = "X";
      } else {
        $(event.target).addClass("box-filled-1");
        allBoxes[$(event.target).index()] = "O";
      }
      //Verify if game is over, switch the player if game is not over.
      if (gameIsOver()) {
        handleWinnerPage();
      } else {
        currentPlayerIsX = !currentPlayerIsX;
        switchPlayerBox();

        //Trigger the AI player if game model if AI play model.
        if (playWithComputer === true) {
          aiPlay();
        }
      }
    }
  });

})(); // the game is nested in an immediately invoked function. 
