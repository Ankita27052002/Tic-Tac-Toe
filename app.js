let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO use to change the turns
let count = 0; //To Track Draw

// patterns to win
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };
 
  

 boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            //playerO
            box.innerText = "O";
            turnO = false;
        } else{
            //playerX
            box.innerText = "X";
            turnO = true;
        }

        //after clicking on particular box we have to disable it
        //otherwise we can click multiple boxes

        box.disabled = true;
        count++;

    let isWinner = checkWinner();
    // when the button click count is 9 but no winner then the match is draw

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    });
 });


 // when the button click count is 9 but no winner then the match is draw
 const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };


  // to disable boxes after getting one winner
 const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };
  
  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };


  
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


 const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};


//after clicking the new game button, new game will be start again
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);