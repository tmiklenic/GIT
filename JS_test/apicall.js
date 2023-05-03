const searchTerm = document.querySelector("#searchTerm");
const searchButton = document.querySelector(".search");
const tbody = document.querySelector("#results tbody");
const loader = document.querySelector("#loading");

const noResultsMessage= '----- Nema rezultata za ovaj upit ili je upit prazan! -----';

const row = document.createElement("tr");
const emptyCell = document.createElement("td");
emptyCell.innerText = noResultsMessage;
row.appendChild(emptyCell);
tbody.appendChild(row);

function mock(){ return new Promise(resolve => setTimeout(() => resolve({ json:() =>  Promise.resolve([1,2,3]) }), 500)) }

searchTerm.addEventListener("input", async event =>{
    
    var searchTermValue = searchTerm.value;
    var apiURL = "https://api.tvmaze.com/search/shows?q="+searchTermValue;

   displayLoading();
   let response = await fetch(apiURL);
   await mock();
   let data = await response.json();
    hideLoading();

    tbody.innerHTML='';

    if (data.length != 0) {
        
        data.forEach(element => {
    
        const row = document.createElement("tr");

        const nameElement = document.createElement("td");
        nameElement.innerText = getDisplayValue(element.show.name);
        row.appendChild(nameElement);

        const ratingElement = document.createElement("td");
        ratingElement.innerText = getDisplayValue(element.show.rating.average);
        row.appendChild(ratingElement);

        const genreElement = document.createElement("td");
        genreElement.innerText = getGenresDisplayValue(element.show.genres);
        row.appendChild(genreElement);

        const descriptionElement = document.createElement("td");
        descriptionElement.innerHTML = getDisplayValue(element.show.summary);
        row.appendChild(descriptionElement);


        tbody.appendChild(row);
    })
    } else {
        const row = document.createElement("tr");
        const emptyCell = document.createElement("td");
        emptyCell.innerText = noResultsMessage;
        row.appendChild(emptyCell);
        tbody.appendChild(row);
    }
})

       

function getDisplayValue(arg) {
    if(arg === undefined) {
        console.log('undefined');
        return "-";
    }
    else if(arg === null){
        console.log('null ');
        return "-";
    }
    else {
      return arg;
    }
}


function getGenresDisplayValue(arg) {
    var returnString = '';
    arg.forEach(element => {
        if (returnString == '') {
            returnString = element;
        } else {
            returnString = returnString + ', ' + element;
        }
    });

    if (returnString != '') {
        return returnString;
    }
    return '-';
}

function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}