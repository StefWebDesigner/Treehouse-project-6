//My EFFORTS TO SIMPLY THIS DOWN



//=======Starting Variables=========
//START GAME VARIABLES
const start_screen = document.querySelector('#overlay');
const game_start = document.getElementById('buttonReset');
const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phrases = [ 
 'what did the array say to the other array', 
    'what an array of sunshine today', 
    'what are arrays favorite animal', 
    'a ray of course',
    'what are rays coding specailty',
    'arrays dah'
	];

let missed = 0;

// FUNCTION

//RANDOM PHRASE FUNCTION
function getRandomPhraseAsArray(arr) {
    var a =  arr[Math.floor(Math.random() * 6)];
    const b = [];
    // BUILD UP THE LETTERS IN STRING
    for (let i = 0; i < a.length; i += 1) {
        b.push(a.charAt(i));
    }

    //TEST
    console.log('random phrase generator test')

    return b;
}

// DISPLAYING THE PHRASE FUNCTION
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        //CONNECT LETTERS TO PHRASE SECTION
        const letter = document.querySelector('#phrase ul');
        //CREATE & APPEND THE LI
        const li = document.createElement("li");
        letter.appendChild(li);
        //MAKE THE ARRAY UPPERCASE
        li.textContent = arr[i].toUpperCase();
        //SET ARRAY TO THE CLASSES
        if (li.textContent !== " ") {
            li.className = 'letter';
            //TEST
    console.log('LETTER test')
        } else {
            li.className = 'space';
            //TEST
    console.log("SPACE test");
        }
    }


}

// STARTS THE GAME

game_start.addEventListener('click', (e) => {
	  //CHANGE THE OVERLAY POSITION
        const overlayPosition = document.getElementById('overlay').style.display ='none';
    //CREATE A BANNER GREETING
        const text = alert('WELCOME TO THE GUESSING GAME!');
        e.preventDefault();
    
        //Test
        console.log('BANNER WELCOME WORKS');
	
    start_screen.style.display = "none";
     

    // RESET THE GAME
        // RESETS PHRASE TO GUESS
        //CONNECT WITH PHRASE SECTION
        const letter = document.querySelector('#phrase ul');
        letter.textContent = "";
        //RESET KEYBOARD
        const reset_keyboard = document.querySelectorAll('.keyrow button');
        for (let i = 0; i < reset_keyboard.length; i += 1) {
        //DISABLE THE KEY SELECTION
        reset_keyboard[i].className = " ";
        reset_keyboard[i].removeAttribute('disabled');
    }

        //RESORTING 5 LIVES
        //TARGET TRIES
        const tries = document.querySelectorAll('.tries');
        //TARGET THE HEART IMAGE
        for (let i = 0; i < tries.length; i += 1) {
            tries[i].firstChild.setAttribute('src','images/liveHeart.png');
        }
        // RESTART MISSED ATTEMPTS SCOREBOARD
        missed = 0;
        // SETS PHRASE TO GUESS
        let a = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(a);

         //Test
         console.log('Lives system is working');        
});

//CHECKS THE LETTER 
function checkLetter (chosen_letter) {
    //CREATE A SELECTER LETTER VARIABLE & TARGET IT
    const selected_letter = chosen_letter.toUpperCase();
    const letters = document.querySelectorAll('.letter');
    let letterFound = 'null';
    //CONNECT SELECTED LETTERS TO LETTERS MATCHED/FOUND
    for (let i = 0; i < letters.length; i += 1) {
         if (selected_letter === letters[i].textContent) {
            letterFound = selected_letter;
            letters[i].className += ' show';
        }
    }
 //Test
 console.log('CHOSSEN LETTER FOUDN');

    //CALL LETTERS FOUND
    return letterFound
}

// CHECKING SYSTEM FOR WIN/LOST

function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shown_letters = document.querySelectorAll('.show');
    const status_message = start_screen.firstChild.nextElementSibling;
    const game_replay = start_screen.lastChild.previousElementSibling;
    //INCLUDE SOMETHING WITH MESSAGES AND STUFF
    //WIN MESSAGE
    if (letters.length === shown_letters.length) {
        start_screen.style.display = 'flex';
        start_screen.className = 'win';
        status_message.textContent = 'YOU WON!!!';
        game_replay.textContent = 'Play Again';
    } 
    //LOSE MESSAGE
    if (missed >= 5) {
        start_screen.style.display = 'flex';
        start_screen.className = 'lose';
        status_message.textContent = 'YOU LOST :(';
        game_replay.textContent = 'Play Again';
    }
}

// GAMEPLAY EVENT STARTER
keyboard.addEventListener('click', (event) => {
    //TARGET THE EVENT
    const a = event.target;
    const b = a.textContent;
    //MATCH SELECTED WIHT BUTTION & SOME DISABLE FEATURE
    if (a.tagName == 'BUTTON') {
        a.className = 'chosen';
        a.setAttribute('disabled', true);
        const c = checkLetter(b);
        if (c === 'null') {
            a.className += ' chosen_mistaken'; 
            const tries = document.querySelectorAll('.tries');
            tries[missed].firstChild.setAttribute('src','images/lostHeart.png');
            missed += 1;
        }
 //Test
 console.log('fIANL SECTION WORKING');        
    }

    checkWin();

});

 //Test
 console.log('REACH THE BOTTOM');



//=======================================================
