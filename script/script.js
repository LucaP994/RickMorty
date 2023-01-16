let indexArr = []
let page = 1;
let pages = 0;
let url = "https://rickandmortyapi.com/api/character?page="
let nextUrl = "";
let credit = 300;
let deckCards = 0;
let cr = document.querySelector('#cr');
let d = document.querySelector('#d');
let totalCards = [];
let deck = [];
let mano = [];
cr.innerText = cr.innerText + " " + credit;
d.innerText = d.innerText + " " + deckCards;
fetch(url + page)
    .then(response => response.json())
    .then(res => {
        //page += 1;
        let results;
        results = res;
        pages = results.info.pages;
        nextUrl = results.info.next;
        results.results.forEach(e => totalCards
            .push(e));
        while (page < pages) {
            page += 1;
            fetch(url + page)
                .then(results => results.json())
                .then(res => {
                    nextUrl = res.info.next;
                    console.log(nextUrl)
                    res.results.forEach(e => totalCards
                        .push(e))
                })
        }
    });

function acquista() {
    if (credit < 5) {
        alert("crediti insufficienti");
    } else {
        credit -= 5;
        deckCards += 1;
        cr.innerText = "Crediti disponibili: " + credit;
        d.innerText = "Carte nel deck: " + deckCards;
        let i = Math.floor(Math.random() * totalCards
            .length);
        deck.push(totalCards[i]);
    }
};

function pesca(){
    let bodyRect = document.body.getBoundingClientRect();
    if(deck.length > 0 && mano.length <= 5){
        deckCards -= 1;
        d.innerText = "Carte nel deck: " + deckCards;
        let container = document.querySelector('.container');
        let rand = Math.floor(Math.random() * deck.length)
        let selectedCard = deck[rand];
        console.log(selectedCard)
        mano.push(selectedCard);
        let card = document.createElement('div');
        let img = document.createElement('img');
        let boxInfo = document.createElement('div');
        let name = document.createElement('h2');
        let gender = document.createElement('p');
        let species = document.createElement('p');
        card.classList.add('card');
        card.id = "c" + selectedCard.id;
        if (mano.length > 1) {
            card.style.marginLeft = "-150px";
        }
        img.classList.add('img');
        boxInfo.classList.add('boxInfo');
        img.src = selectedCard.image;
        name.innerText = selectedCard.name;
        species.innerText = "Species: " + selectedCard.species;
        gender.innerText = "Gender: " + selectedCard.gender;
        boxInfo.append(name, species, gender);
        card.appendChild(img);
        card.appendChild(boxInfo);
        container.appendChild(card);
        mano.forEach(c => {
            let tCard = document.querySelector(`#c${c.id.toString()}`);
            elemRect = tCard.getBoundingClientRect();
            offset = (elemRect.left + ( elemRect.width / 2)) - bodyRect.left;
            let centerCardOffset = offset - ( bodyRect.width /2 );
            let angle = centerCardOffset / 10;
            let top = 200 + (Math.abs(centerCardOffset) * 0.25);
            console.log(top)
            tCard.style.rotate = angle.toString() + "deg";     
            tCard.style.top = top + "px";
        })
        deck = deck.filter(e => e.id != selectedCard.id);
    }
};