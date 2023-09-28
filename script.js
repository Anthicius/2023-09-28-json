let mainDiv = document.createElement("div");



let init = (data) => {
    console.log(data.filmai);
    data.filmai.forEach(element => {

        let mainH2 = document.createElement("h2");
        mainH2.textContent = `${element.pavadinimas}`;

        let score = document.createElement("p");
        score.innerHTML = `<b>Įvertinimas:</b> ${element.ivertinimas}`;

        let scoreAmount = document.createElement("p");
        scoreAmount.innerHTML = `<b>Įvertinimų skaičius:</b> ${element.ivertinimu_kiekis}`;

        let releaseDate = document.createElement("p");
        releaseDate.innerHTML = `<b>Išleista:</b> ${element.isleidimo_metai}`;

        let description = document.createElement("p");
        description.innerHTML = `<b>Apibūdinimas filmo:</b> ${element.aprasymas}`;

        let genre = document.createElement("p");
        genre.innerHTML = `<b>Žanras:</b> ${element.zanrai}`;

        let director = document.createElement("p");
        director.innerHTML = `<b>Direktorius:</b> ${element.rezisierius}`;

        let actors = document.createElement("p");
        actors.innerHTML = `<b>Aktoriai:</b> ${element.aktoriai}`;


        
        mainDiv.appendChild(mainH2);
        mainDiv.appendChild(score);
        mainDiv.appendChild(scoreAmount);
        mainDiv.appendChild(releaseDate);
        mainDiv.appendChild(description);
        mainDiv.appendChild(genre);
        mainDiv.appendChild(director);
        mainDiv.appendChild(actors);
    });
    document.body.appendChild(mainDiv);
};

let fetchData = async () => {
    let localData;
    fetch("/data.json")
        .then(response => response.json())
        .then(data => {
            localData = data;
            init(localData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

fetchData();

