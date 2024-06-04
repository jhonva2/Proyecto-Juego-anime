let cardArray = [
  {
    id: 1,
    name: "imagen1",
    img: "./imagenes_cartas/images6.jpg",
  },
  {
    id: 2,
    name: "imagen2",
    img: "./imagenes_cartas/images9.jpg",
  },
  {
    id: 3,
    name: "imagen3",
    img: "./imagenes_cartas/images7.jpg",
  },
  {
    id: 4,
    name: "imagen4",
    img: "./imagenes_cartas/images14.jpg",
  },
  {
    id: 5,
    name: "imagen5",
    img: "./imagenes_cartas/images13.jpg",
  },
  {
    id: 6,
    name: "imagen6",
    img: "./imagenes_cartas/images0.png",
  },
  {
    id: 7,
    name: "imagen1",
    img: "./imagenes_cartas/images6.jpg",
  },
  {
    id: 8,
    name: "imagen2",
    img: "./imagenes_cartas/images9.jpg",
  },
  {
    id: 9,
    name: "imagen3",
    img: "./imagenes_cartas/images7.jpg",
  },
  {
    id: 10,
    name: "imagen4",
    img: "./imagenes_cartas/images14.jpg",
  },
  {
    id: 11,
    name: "imagen5",
    img: "./imagenes_cartas/images13.jpg",
  },
  {
    id: 12,
    name: "imagen6",
    img: "./imagenes_cartas/images0.png",
  },
];

cardArray.sort(() => 0.5 - Math.random())

const grid$$ = document.querySelector('[data-function="grid"]');
const score$$ = document.querySelector('[data-function="score"]');
const attempts$$ = document.querySelector('[data-function="attempts"]');
let cardsChosen = [];
let cardsWon = [];

const resetButton$$ = document.getElementById('resetButton');
resetButton$$.addEventListener('click', resetGame);

function resetGame() {
  
    cardsChosen = [];
    cardsWon = [];
    score$$.textContent = '0';
    attempts$$.textContent = '0';
  
    cardArray.sort(() => 0.5 - Math.random());
    
    grid$$.innerHTML = '';
    
    createBoard();
}


function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const cardItem = cardArray[i];
        const card$$ = document.createElement('img');
        card$$.setAttribute("src", "./imagenes_cartas/images11.jpg");
        card$$.setAttribute('data-id', cardItem.id);
        card$$.addEventListener('click', ($event) => flipCard($event.target, i));
        grid$$.appendChild(card$$);
    }
}

function checkForMatch() {
    const [optionOne, optionTwo] = cardsChosen;

    const cardOne$$ = document.querySelector(`[data-id="${optionOne.id}"]`);
    const cardTwo$$ = document.querySelector(`[data-id="${optionTwo.id}"]`);

    if (optionOne.id === optionTwo.id) {
       
        cardOne$$.setAttribute("src", "./imagenes_cartas/images11.jpg");
        cardTwo$$.setAttribute("src", "./imagenes_cartas/images11.jpg");
        alert('You have clicked the same image!');
    } else if (optionOne.id !== optionTwo.id && optionOne.name === optionTwo.name) {
        
        cardOne$$.setAttribute("src", "./imagenes_cartas/images16.jpg");
        cardTwo$$.setAttribute("src", "./imagenes_cartas/images16.jpg");
        cardOne$$.classList.add('won'); 
        cardTwo$$.classList.add('won'); 
        cardOne$$.removeEventListener('click', flipCard);
        cardTwo$$.removeEventListener('click', flipCard);
        cardsWon.push(optionOne);
    } else {
        
        cardOne$$.setAttribute("src", "./imagenes_cartas/images11.jpg");
        cardTwo$$.setAttribute("src", "./imagenes_cartas/images11.jpg");
    }

    cardsChosen = [];

    checkScore();
}

function flipCard(target$$, i) {
    const card = cardArray[i];
    const cardWon = cardsWon.find(findCard => findCard.name === card.name);

    if (cardWon) {
        alert('This card is marked ;)')
    } else {
        cardsChosen.push(card);
        target$$.setAttribute('src', card.img);
        target$$.classList.add('flipped'); 

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkScore () {
    score$$.textContent = cardsWon.length;
    attempts$$.textContent = Number(attempts$$.textContent) + 1;
    if (cardsWon.length === cardArray.length / 2) {
        score$$.textContent = ' Congratulations! You found them all!';
    }
}

createBoard()
