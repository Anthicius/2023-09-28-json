let mainDiv = document.createElement("div");
let chuckNorris = document.getElementById("chuckNorris")
let dogBreed = document.getElementById("dogBreed")
let fakePerson = document.getElementById("fakePerson")


let getDogBreedOptions = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
        const breeds = data.message;

        for (const breed in breeds) {
            if (breeds[breed].length > 0) {
                breeds[breed].forEach(subBreed => {
                    const option = document.createElement("option");
                    option.value = `${breed}-${subBreed}`;
                    option.textContent = `${breed} - ${subBreed}`;
                    selectDogBreedAPI.appendChild(option);
                });
            } else {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = breed;
                selectDogBreedAPI.appendChild(option);
            }
        }
    })
    .catch(error => {
        console.log("Error fetching breed data:", error)
    })
}



let getLocalData = () => {
    const selectElement = document.getElementById("selectAPI")
    const getSelectedOption = document.getElementById("getSelectedOption")
    const textSearch = document.getElementById("textSearch");
    const getQueryOption = document.getElementById("getQueryOption");
    const selectDogBreedAPI = document.getElementById("selectDogBreedAPI")
    const getDogBreedAPI = document.getElementById("getDogBreedAPI")
    const fakeName = document.getElementById("fakeName")
    const getGenerateFakePerson = document.getElementById("getGenerateFakePerson")

    getSelectedOption.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedValue = selectElement.value;
        fetchDataOption(selectedValue)
    })

    getQueryOption.addEventListener("click", (event) => {
        event.preventDefault();
        const writtenValue = textSearch.value;
        fetchDataQuery(writtenValue)
    })

    getDogBreedOptions();

    getDogBreedAPI.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedValue = selectDogBreedAPI.value;
        fetchDogBreedImage(selectedValue)
    })

    getGenerateFakePerson.addEventListener("click", (event) => {
        event.preventDefault();
        const writtenValue = fakeName.value;
        fetchFakePerson(writtenValue);
    })
}

getLocalData();


let getAPIData = (data) => {

        let mainP = document.createElement("p");
        mainP.textContent = `${data.value}`;        
        mainDiv.appendChild(mainP);
        chuckNorris.appendChild(mainDiv);
};
let getImgData = (data, breed, subBreed) => {
    let mainP = document.createElement("p");
    let imgDiv = document.createElement("div"); 
    mainP.textContent = `Main Breed: ${breed}`; 

    if (subBreed) {
        mainP.textContent += `, Sub-Breed: ${subBreed}`; 
    }

    imgDiv.appendChild(data);
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(mainP);
    dogBreed.appendChild(mainDiv);
};

let getFakePerson = (name, age, nationality, gender) => {
    let mainP = document.createElement("p");
    mainP.textContent = `${name} is ${age} years old ${gender} from ${nationality}`
    mainDiv.appendChild(mainP);
    fakePerson.appendChild(mainDiv);
}


let fetchDataOption = (selectedValue) => {
    console.log(selectedValue);
    fetch(`https://api.chucknorris.io/jokes/random?category=${selectedValue}`)
        .then(response => response.json())
        .then(data => {
            let localData = data;
            getAPIData(localData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
let fetchDataQuery = (writtenValue) => {
    console.log(writtenValue);
    fetch(`https://api.chucknorris.io/jokes/search?query=${writtenValue}`)
        .then(response => response.json())
        .then(data => {
            if (data.result && data.result.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.result.length);
                const randomJoke = data.result[randomIndex];
                getAPIData(randomJoke);
            } else {
                console.log("No jokes found for the query.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


let fetchDogBreedImage = (selectedValue) => {

    const [breed, subBreed] = selectedValue.split('-'); 
    const apiUrl = subBreed ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random` : `https://dog.ceo/api/breed/${breed}/images/random`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let localData = document.createElement("img");
        localData.src = data.message;

        localData.width = 300;
        localData.height = 300;
        console.log(localData.height)
        getImgData(localData, breed, subBreed); 
    })
}

let fetchFakePerson = (writtenValue) => {
    const promiseAge = fetch(`https://api.agify.io?name=${writtenValue}`).then(response => response.json());
    const promiseNationality= fetch(`https://api.nationalize.io?name=${writtenValue}`).then(response => response.json());
    const promiseGender = fetch(`https://api.genderize.io?name=${writtenValue}`).then(response => response.json());

    Promise.all([promiseAge,promiseNationality,promiseGender])
    .then(dataArray => {
        const [localAge, localNationality, localGender] = dataArray;

        const nationalityData = localNationality.country;
        let mostLikelyNationality = 'Unknown';
        let highestProbability = 0;

        nationalityData.forEach(country => {
            if (country.probability > highestProbability) {
                mostLikelyNationality = country.country_id;
                highestProbability = country.probability;
            }
        });

        getFakePerson(writtenValue,localAge.age, mostLikelyNationality, localGender.gender )
    })
}
