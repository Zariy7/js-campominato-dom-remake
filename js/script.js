let genBtn = document.getElementById('Generate');

genBtn.addEventListener('click', gridGen);

function gridGen(){
    let diffString = document.getElementById('Difficulty').value;
    let diffValue;
    let dangerSquares; //MAKES DIFFICULTY MORE MODULAR

    //SECOND BONUS
    switch (diffString){
        case 'Easy':
            diffValue = 10;
            dangerSquares = 16;
            break;
        case 'Medium':
            diffValue = 9;
            dangerSquares = 16;
            break;
        case 'Hard':
            diffValue = 7;
            dangerSquares = 16;
            break;
        default:
            break;
    }

    let grid = document.getElementById('Grid');
    let bombsArray = [];
    let gameOver = false;
    let score = document.getElementById('Score');
    let scoreCount = 0;
    let totalSquares = diffValue*diffValue;
    let safeClicks = [];

    grid.innerHTML = ``;
    score.innerText = ``;
    bombsArray = bombGen(totalSquares, dangerSquares);
    //console.log(bombsArray);


    for(let i = 0; i<totalSquares; i++){
        //SQUARE CREATION.
        let newSquare = document.createElement('div');
        newSquare.style.width = `calc(1000px / ${diffValue} - 10px)`;
        newSquare.style.height = newSquare.style.width;
        
        newSquare.classList.add("basic", "everything-center", "m-1", "game-square");
        newSquare.innerText = `${i+1}`;
        grid.appendChild(newSquare);

        newSquare.addEventListener('click', function(){
            //ONLY WORKS SO LONG AS GAME IS GOING.
            if(!gameOver){
                if(bombsArray.includes(i+1)){
                    //EVENTS ON CLICKING A BOMB TILE.
                    let squareList = document.getElementsByClassName("game-square");
                    for(let j = 0; j<totalSquares; j++){
                        if(bombsArray.includes(j+1)){
                            squareList[j].classList.toggle("danger");
                            squareList[j].classList.toggle("basic");
                        }
                    }
                    
                    gameOver = true;
                    score.innerText = `You lose!`;
                }
                else{
                    //CHECKS IF SQUARE HAS ALREADY BEEN CLICKED FIRST. DOES NOT ACT IF HAS ALREADY BEEN CLICKED.
                    if(!safeClicks.includes(i+1))
                    {
                        //EVENTS ON CLICKING A SAFE TILE.
                        this.classList.toggle("safe");
                        this.classList.toggle("basic");
                        safeClicks.push(i+1);
                        
                        scoreCount++;
                        score.innerText = `Your score is: ${scoreCount}`;
    
                        if(scoreCount == (totalSquares - dangerSquares)){
                            gameOver = true;
                            score.innerText = `You win!`;
                        }
                    }
                }
            }
        })
    }
}

//CREATES LIST OF BOMBS
function bombGen (valueMax, arrayLength){
    let array = [];
    let randomNumber;
    let i = 0;

    do{
        randomNumber = Math.floor(Math.random() * valueMax) +1;

        if(!array.includes(randomNumber)){
            array[i]=randomNumber;
            i++;
        }
    }while(i<arrayLength);

    return array;
}