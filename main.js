// main.js is for the buttons and event listeners
const tempCallBack = ({ data: temps }) => displayingTemps(temps)
const tempPopulator = ({ data: temps }) => displayingPopulate(temps) & displayingPopulateDelete(temps)
// const deletePopulator = ({ data: temps }) => deletePopulate(temps)


const getAllTemps = () => {
    axios.get(`http://localhost:4004/getTemps`)
    .then(tempCallBack)
}
const populateTemps = () => {
    axios.get(`http://localhost:4004/getTemps`)
    .then(tempPopulator)
}

const dbDisplay = document.querySelector('#dbDisplay')
const createBTN = document.querySelector('#create')
const createSubmit = document.querySelector('#createSubmit')
const modifyBTN = document.querySelector('#modify')
const modifySubmit = document.querySelector('#modifySubmit')
const deleteBTN = document.querySelector('#delete')
const deleteSubmit = document.querySelector('#deleteSubmit')
const clearBTN = document.querySelector('#clear')

const modifyOptions = document.querySelector('#modifySelect')
const deleteOptions = document.querySelector('#deleteSelect')

const createDisplay = (temps) => {
    const tempPiece = document.createElement('div')
    tempPiece.classList.add('display')
    // console.log('are we getting here?')
    //! onclick settings
    tempPiece.innerHTML = `
    <a href="${temps.buy_link}"><img src="${temps.image}" class="imgTemp"></a>
    <h4> Brand: </h4><p>${temps.brand}</p>
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

const displayCreate = () => {
    hideAll()
    let createElems = document.querySelectorAll('.createHidden');

    for(let i=0; i<createElems.length; i++) {
        let a = createElems[i]
        a.className = 'createVisible'
    }

    clearBTN.className = 'clearVisible'
}

const displayModify = () => {
    hideAll()
    let modifyElems = document.querySelectorAll('.modifyHidden');

    for(let i=0; i<modifyElems.length; i++) {
        let a = modifyElems[i]
        a.className = 'modifyVisible'
    }

    clearBTN.className = 'clearVisible'
}

const displayDelete = () => {
    hideAll()
    let deleteElems = document.querySelectorAll('.deleteHidden');

    for(let i=0; i<deleteElems.length; i++) {
        let a = deleteElems[i]
        a.className = 'deleteVisible'
    }

    clearBTN.className = 'clearVisible'
}

const hideAll = () => {
    // console.log('this is happening')
    let createElems = document.querySelectorAll('.createVisible');
    let modifyElems = document.querySelectorAll('.modifyVisible');
    let deleteElems = document.querySelectorAll('.deleteVisible');

    // console.log()

    for(let i = 0; i < createElems.length; i++){
        let a = createElems[i]
        a.className = 'createHidden'
        }
    for(let i = 0; i < modifyElems.length; i++){
        let a = modifyElems[i]
        a.className = 'modifyHidden'
        }
    for(let i = 0; i < deleteElems.length; i++){
        let a = deleteElems[i]
        a.className = 'deleteHidden'
        }
    clearBTN.className = 'clearHidden'
}

const addNew = (e) => {
    e.preventDefault()

    let brand = document.querySelector('#brandInput')
    let color = document.querySelector('#colorInput')
    let type = document.querySelector('#typeInput')
    let img = document.querySelector('#imgInput')
    let buy = document.querySelector('#buyInput')
    let suggested = document.querySelector('#suggestedInput')
    let lowest = document.querySelector('#lowestInput')
    let highest = document.querySelector('#highestInput')
    let best = document.querySelector('#bestInput')

    let bodyObj = {
        brand: brand.value,
        color: color.value,
        color_type: type.value,
        image: img.value,
        buy_link: buy.value,
        temp_suggested: suggested.value,
        temp_lowest: lowest.value,
        temp_highest: highest.value,
        temp_best: best.value
    }

    createDisplay(bodyObj)

    axios.post("http://localhost:4004/getTemps", bodyObj)
    .then((res) => {
        alert(res.data);
    })

    brand.value = ''
    color.value = ''
    type.value = 'Matte'
    img.value = ''
    buy.value = ''
    suggested.value = ''
    lowest.value = ''
    highest.value = ''
    best.value = ''
    
}

function displayingPopulate(arr) {
    modifyOptions.innerHTML = ``
    console.log('first')
    delete modifyOptions.children
    console.log('second')
    for (let i=0; i<arr.length; i++) {
        modifyPopulate(arr[i])
    }
}

function displayingPopulateDelete(arr) {
    deleteOptions.innerHTML = ``
    delete deleteOptions.children
    for (let i=0; i<arr.length; i++) {
        deletePopulate(arr[i])
    }
}

const modifyPopulate = (temps) => {
    // modifyOptions
    let temporary = document.createElement('option')
    temporary.text = `${temps.brand}.${temps.color}`
    temporary.value = `${temps.plastic_id}`
    modifyOptions.appendChild(temporary)
    
}

const deletePopulate = (temps) => {
    let temporary = document.createElement('option')
    temporary.text = `${temps.brand}.${temps.color}`
    temporary.value = `${temps.plastic_id}`
    deleteOptions.appendChild(temporary)
}

const modifyChooser = (temps) => {
    let brand = document.querySelector('#brandModify')
    let color = document.querySelector('#colorModify')
    let type = document.querySelector('#typeModify')
    let img = document.querySelector('#imgModify')
    let buy = document.querySelector('#buyModify')
    let suggested = document.querySelector('#suggestedModify')
    let lowest = document.querySelector('#lowestModify')
    let highest = document.querySelector('#highestModify')
    let best = document.querySelector('#bestModify')

    axios.get(`http://localhost:4004/getTemps`)
        .then(res => {
            //! Trying to figure out a way to grab just the one with the ID I need to populate the fields below with the selected options selection
        })


    brand.placeholder = `${temps.brand}`
    color.placeholder = `${temps.color}`
    type.value = `${temps.color_type}`
    img.placeholder = `${temps.image}`
    buy.placeholder = `${temps.buy_link}`
    suggested.placeholder = `${temps.temp_suggested}`
    lowest.placeholder = `${temps.temp_lowest}`
    highest.placeholder = `${temps.temp_highest}`
    best.placeholder = `${temps.temp_best}`
}

const modifyEntry = () => {
    //! Not entirely sure what I should put here
}

const deleteEntry = () => {
    //deleteSubmit
    

}


createSubmit.addEventListener('click', addNew)

// modifySubmit.addEventListener('click', )

// deleteSubmit.addEventListener('click', deleteEntry)

clearBTN.addEventListener('click', hideAll)
createBTN.addEventListener('click', displayCreate)
modifyBTN.addEventListener('click', displayModify)
deleteBTN.addEventListener('click', displayDelete)


getAllTemps()
populateTemps()
hideAll()