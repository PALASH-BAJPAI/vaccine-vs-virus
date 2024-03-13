import { useEffect, useState } from 'react';
import './App.css';

function App() {
  var [steps, setSteps] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadGame();
  }, []);

  function loadGame() {
    var gameSet = [["11","13","21","32","33"],["11","13","31","33"],["11","12","23","31"],["12","13","21","23"],["22","23","32","33"],["22","23","32"],["13","32"],["13","23","33"],["31","32","33"],["11"],["21","23"],["33"],["13","12"],["31"],["11", "12", "13"], ["12", "32", "21"], ["31", "11"], ["12", "32"], ["21", "12"], ["21", "23", "31", "33"], ["22", "11", "12"], ["12", "13", "23", "33"]];
    var n = gameSet.length;
    var randomNum = Math.floor(Math.random() * n);
    for (let i = 0; i < gameSet[randomNum].length; i++) {
      document.getElementById(gameSet[randomNum][i]).classList.add("active");
    }
  }


  //Function to check if game completed
  function checking(steps) {

    var arr = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
    var count = 0;
    for (let i = 0; i < 9; i++) {
      if (document.getElementById(arr[i]).classList.contains("active")) {
        count += 1;
      }
    }
    if (count === 0) {
      document.getElementById('back').classList.add("blur-show");
      document.getElementById('win').classList.add("show-win");
    }
  }

  //temporary function to switch class
  function toggleClass(r, c) {
    var val = r.toString() + c.toString();
    if (document.getElementById(val).classList.contains("active")) {
      document.getElementById(val).classList.remove("active");
    } else {
      document.getElementById(val).classList.add("active");
    }
  }


  //Function to spread virus on click
  function spread(r, c) {
    setSteps(steps + 1);

    toggleClass(r, c);

    if (r + 1 <= 3) {
      toggleClass(r + 1, c);
    }
    if (c + 1 <= 3) {
      toggleClass(r, c + 1);
    }
    if (c - 1 > 0) {
      toggleClass(r, c - 1);
    }
    if (r - 1 > 0) {
      toggleClass(r - 1, c);
    }

    //Checking if game completed
    setTimeout(() => checking(steps), 200);

  }



  return (
    <div className="App">
      
      
      <div className='navbar'>
        <div className = 'navbar-header'>
          <img className='logo' src='logo.png' alt="Logo" />
          <p className='score-nav'> <span className='steps-show'> Steps :  {steps} </span> </p>
          <button className='open'  onClick={() => {setOpen(true);document.getElementById('back').classList.add("blur-show");}}>HOW TO PLAY</button>
        </div>
        {open && (
          <div className="popup">
            {<div id='instructions' className='instructions'>
              <h1>How To Play?</h1>
              <ul>
                <li>The game board consists of 9 squares, some affected by virus and some not. The goal is to make the entire board not affected by virus.</li>
                <li>Clicking on a square inverts its current state. i.e., square affected by virus will be vaccinated and vice versa.</li>
                <li>Clicking on a square inverts the current state of its own as well as that of the squares just above, just below, just left and just right to it.</li>
                <li>Try finishing the game within 10 steps to be a Pro player! Good luck!!</li>
              </ul>
              <button className='close' onClick={() => {setOpen(false);document.getElementById('back').classList.remove("blur-show");}}>Back to Game</button>
            </div>}

          </div>
        )}
      </div>

      <div id='back' className='blur-back'></div>
      <header className="App-header">

        <div class="board">

          <div class="row row1">
            <div id="11" class="column column1" onClick={() => spread(1, 1)}></div>
            <div id="12" class="column column2" onClick={() => spread(1, 2)}></div>
            <div id="13" class="column column3" onClick={() => spread(1, 3)}></div>
          </div>

          <div class="row row2">
            <div id="21" class="column column1" onClick={() => spread(2, 1)}></div>
            <div id="22" class="column column2" onClick={() => spread(2, 2)}></div>
            <div id="23" class="column column3" onClick={() => spread(2, 3)}></div>
          </div>

          <div class="row row3">
            <div id="31" class="column column1" onClick={() => spread(3, 1)}></div>
            <div id="32" class="column column2" onClick={() => spread(3, 2)}></div>
            <div id="33" class="column column3" onClick={() => spread(3, 3)}></div>
          </div>

        </div>

      </header>

      <div id='win' className='win'>
        Hurray!!! You took<span className='step-count'>{steps} </span>steps.
        <button type='submit' className='again' onClick={() => window.location.reload()}>Play Again</button>
      </div>



    </div>
  );
}

export default App;
