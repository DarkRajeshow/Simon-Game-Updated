

//Declaring all important variables : : : ----- : : :

let playerClickSound = new Audio('sounds/player.wav');

let computerClickSound = new Audio('sounds/computer.mp3');

let loosingSound = new Audio('sounds/lossing.wav');

let winningSound = new Audio('sounds/winning.wav');

let GrandVictory = new Audio('sounds/Grandvictory.mp3');
//above all the variable are the sound effect, which are the main atraction to this website, So these types of sounds are really important when it comes to games. 


let toStopInterval = 0;
//this is for to stop interval at correct time, when we need to stop it.


let toCheckCorrectClick = 0;
//to check if the player is clicking right button(box) or not.


let randomIndexLocation = [];
//finding and storing the all location of the boxes which are pressed/clicked by the computer: most important this is an array.


let allElementBoxes = document.querySelectorAll("div>span");
//selecting all the boxes


let myInterval;
//interval to start the game 


let level = 0;
//levels of the game


let startCheck = 0;
//to check all the variables value is 0 or empty or not at the start of game fuction.


// :: -------------------------------VarIble dEclaration---------------------------------- ::
// :: ---------------------------------------EnD------------------------------------------ ::



//functions section :: ------------------------------------------- ::

//transition effect for mouseout event, this is for extra smooth transition.
function mouseoutimg() {
    $("span").css("transition", "0.3s")
}


//adding click event to all the box elements.
$('span').on("click", clickfuction);


//adding click event to the start button, to start the game when someone click on the start button.
$("button").click(function () {
    if (startCheck == 0) {
        $(".score").text("SCORE : 0");
        $("p").text("Always Stay Focused !!");
        $(this).css("backgroundColor", "red");
        setTimeout(() => {
            $(this).css("backgroundColor", "transparent");
        }, 500);
        start();
        startCheck = 1;
    }
    else {
        return;
    }
})


//this the start function which is responsible for staring the intervals and the game concept : I think its hard to explain all thing which has been written here, so please some logic understand yourself...
function start() {
    if (toStopInterval == 0) {
        myInterval = setInterval(intervalFuction, 1200);
    }
}


//this is the fuction statement which is declared by the start function. :: ------------funciton interval ---------- ::

function intervalFuction() {
    if (toStopInterval == 0) {
        let randomNumber = Math.floor(Math.random() * 4);
        //creating random rumber for every interval.
        randomIndexLocation.push(randomNumber);
    }

    let hoverElement = allElementBoxes[randomIndexLocation[toStopInterval]];
    hoverElement.classList.add("hover2");
    //adding some css style to the random index location of the box elements, this is for identifing the box which has been hovered. 
    console.log(toStopInterval);
    setTimeout(() => {
        hoverElement.classList.remove("hover2");
        console.log(toStopInterval);
    }, 200);//this is to remove css style to make the element box normal.

    computerClickSound.play(); //this is the sound effect when intervalFuction runs.

    toStopInterval++; //this is increment

    console.log(randomIndexLocation);
    // console.log(toStopInterval);
    //this is to stop interval when below condition is equal:
    //level 0 has the 2 clicks and level 1 has 3 clicks and similarly the the every level has one clicks = (level + 2);
    if (toStopInterval == (level + 1)) {
        toStopInterval = 0;
        clearInterval(myInterval);  //clear interval when a single level was cleared
    }
}


// this is another important function :: ---------------- function click ----------------- ::
//it will run when someone clicks on any box elemnt.
function clickfuction() {
    let index = this.innerText; // this is to find the index of the clicked box.
    $(this).addClass("hover"); //this is to add some css style to the clicked box.

    setTimeout(() => {
        $(this).removeClass("hover");
    }, 250); // to remove the css style class after 0.25s.

    //to check the clicked box is correct or not.
    //this will runs when it correct
    if (index == randomIndexLocation[toCheckCorrectClick]) {
        playerClickSound.play(); //correct click sound
        toCheckCorrectClick++; //j++
    }

    // this will runs when it was wrong
    else {
        $(this).addClass("wrongHover"); //adding wrong looking css style
        setTimeout(() => {
            $(this).removeClass("wrongHover");
        }, 250);  //removing wrong looking css style

        //this is some optional conditional statements.
        if (level <= 4) {
            $("p").text("You Lose 😭, keep Trying....!");
        }
        else if (level <= 6 && level > 4) {
            $("p").text("You Lose😭😭, try again with full concentration ....!");
        }
        else if (level > 6) {
            $("p").text("You Lose😭😭, You are very close....!");
        }
        startCheck = 0; //this is very important it will make it eligible to start the game again:
        //note game will start only when startCheck variable value is equal to "0".

        //remember this the else section that means the player answered wrong answer so we are setting all the variable in the default values. 
        level = 0; 
        randomIndexLocation = [];
        toStopInterval = 0;
        toCheckCorrectClick = 0;
        loosingSound.play();
        

        return; // this is also very important becouse if you did not write return then it will never stop, even if you give the wrong answer.
    }

    //this is to increase the level and difficulty of the game.
    if (toCheckCorrectClick == (randomIndexLocation.length)) {

        // making this array's value to default value, to check above same thing multifle times.

        toCheckCorrectClick = 0; //same reason as above.

        level++; //now the old level is cleared so we have to increase the level number.

        $(".score").text(`SCORE : ${level}`); //manupalating the HTML go achive desired output.


        //this is also optional
        if (level == 2) {
            $("p").text("Easy-peasy🥱🥱!")
        }

        else if (level == 3) {
            $("p").text("Now The Real Game started, best of Luck👍😜");
        }

        else if (level == 5) {
            $("p").text("😱😱 You are so Incredible, Keep it Up👌!");
        }

        else if (level == 8) {
            $("p").text("😱😱 You are very close to the Ultimate goal👌");
        }

        //this is winning conditional check.
        //Note : winning means you should pass all 10 levels.
        else if (level == 10) {
            $("h1").text("!!HATS OF TO YOU!!🙇‍♂️🙇‍♂️🙌"); //manupalationg DOM.
            $("p").text("🤐🤐I never seen a person like You! You are awesome👌");
            GrandVictory.play() //GrandVictory Sound effect.
            startCheck = 0; //this is to set startCheck varible value to the default.
            return; //end the funtion.
        }


        winningSound.play(); //this is the sound effect when player passes a single level

        start(); // this is most important, this is the fuction call of the start function, it will call this function when all ansewers get correct, if all the answer are correct then the level get increased and the game starts will some extra difficultly...!! 
    }
}

// :: -----------------------------------JaVaScript--------------------------------------- ::
// :: ---------------------------------------EnD------------------------------------------ ::