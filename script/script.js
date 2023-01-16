let indexArr = []
let page = 1;
let pages = 0;
let url = "https://rickandmortyapi.com/api/character?page="
let credit = 50;
let cr = document.querySelector('#cr');
let cards = [];
let selectedCard;
cr.innerText = cr.innerText+" "+credit;

fetch(url + page)
.then(response => response.json())
.then(res => {
    page += 1;
    let results = new SearchResult();
    results = res;
    pages = results.info.pages;
    results.results.forEach(e => cards.push(e))
    while(page < pages){
        fetch(results.info.next)
        .then(results => results.json())
        .then(res => {
            res.results.forEach(e => cards.push(e))
        })
    }
});
function pesca() {
    if(credit <5){
        alert("crediti insufficienti");
    }else{
        credit -=5;
        cr.innerText = "Crediti disponibili: "+credit;
    console.log(page);
    fetch(url + page)
        .then(response => response.json())
        .then(res => {
            //console.log(res)
            let container = document.querySelector('.container');
            let arr = res.results;
            let i = Math.floor(Math.random() * arr.length);

            selectedCard = new CardModel();

            if (!indexArr.includes(i)) {
                selectedCard = arr[i];
                indexArr.push(i);
            } else {
                console.log("indice già presente ");
                if (indexArr.length != arr.length) {
                    while (indexArr.includes(i)) {
                        i = Math.floor(Math.random() * arr.length);
                    }
                    /*let i = Math.floor(Math.random() * arr.length);
                    if(indexArr.includes(i)){
                        i = Math.floor(Math.random() * arr.length);
                        return i
                    }*/
                    selectedCard = arr[i];
                    indexArr.push(i);
                } else {
                    indexArr = [];
                    page++;
                    console.log(indexArr);
                }
            }
            console.log(indexArr);
            console.log(selectedCard);
            let card = document.createElement('div');
            let img = document.createElement('img');
            let boxInfo = document.createElement('div');
            let name = document.createElement('h2');
            let gender = document.createElement('p');
            let species = document.createElement('p');
            card.classList.add('card');
            if (indexArr.length > 1) {
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

            /*arr.forEach(function (e) {
                let card = document.createElement('div')
                let img = document.createElement('img')
                let boxInfo = document.createElement('div')
                let name = document.createElement('h2')
                let gender = document.createElement('p')
                let species = document.createElement('p')
                card.classList.add('card')
                img.classList.add('img')
                boxInfo.classList.add('boxInfo')
                img.src = e.image
                name.innerText = e.name
                species.innerText = "Species: " + e.species
                gender.innerText = "Gender: " + e.gender
                boxInfo.append(name,species,gender)
                card.appendChild(img)
                card.appendChild(boxInfo)
                container.appendChild(card)
            })*/
        });
    }
}