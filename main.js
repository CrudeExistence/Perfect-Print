// main.js is for the buttons and event listeners
const tempCallBack = ({ data: temps }) => displayingTemps


const getAllTemps = () => {
    axios.get(`${CONNECTION_STRING}`)
    .then(tempCallBack)
}

const dbDisplay = document.querySelector('#dbDisplay')

const createDisplay = (temps) => {
    const tempPiece = document.createElement('div')
    tempPiece.classList.add('display')
    // let tempDisplay = document.querySelector('.displayQuotesHere');
    // console.log('are we getting here?')
    //! onclick settings
    quotePiece.innerHTML = `
    <h4>Brand: </h4><p>${temps.brand}</p>
    <h4> Color: </h4><p>${temps.color}</p>
    <h4> Type: </h4><p>${temps.color_type}</p><br>
    <h4> Suggested Temp: </h4><p>${temps.temp_suggested}</p>
    <h4> Lowest Temp: </h4><p>${temps.temp_lowest}</p>
    <h4> Highest Temp: </h4><p>${temps.temp_highest}</p>
    <h4> Best Temp: </h4><p>${temps.temp_best}</p>
    `
    dbDisplay.appendChild(tempPiece)
    }

    // plastic_id, brand, color, color_type, image, buy_link, temp_suggested, temp_lowest, temp_highest, temp_best


function displayingTemps(arr) {
    dbDisplay.innerHTML = ``
    for (let i=0; i<arr.length; i++) {
        createDisplay(arr[i])
    }
}

getAllTemps()