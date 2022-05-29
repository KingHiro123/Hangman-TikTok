const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll(".figure-part");


//Words
const wordList = [
    ["Coding", ["java", "python", "javascript"]], 
    ["Fruits", ["apple", "orange", "banana"]], 
    ["Fast Food", ["burger", "chicken"]]
];
let randomCat = wordList[Math.floor(Math.random() * wordList.length)];
let selectedWord = randomCat[1][Math.floor(Math.random() * randomCat[1].length)];
// Display category
document.getElementById("category").innerHTML = "Category - " + randomCat[0];

const correctLetters = [];
const wrongLetters = [];
const game = 1;

//Show hidden word

function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display= 'flex';
        //Remove keydown eventListener
        window.removeEventListener('keydown', keyInput);
    }
}

function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display= 'flex';
        //Remove keydown eventListener
        window.removeEventListener('keydown', keyInput);
    }
}
// Update the wrong letters
function updateWrongLetterE1(){
    //Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
        //Remove keydown eventListener
        window.removeEventListener('keydown', keyInput);
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press

//Created a const to contain the code as the removeEventListener
//requires (type, listener)
const keyInput = e => {
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
}
window.addEventListener('keydown', keyInput);

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    //Add back keydown eventListner
    window.addEventListener('keydown', keyInput);

    randomCat = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = randomCat[1][Math.floor(Math.random() * randomCat[1].length)];

    // Display category
    document.getElementById("category").innerHTML = "Category - " + randomCat[0];
    
    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();