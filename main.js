// main.js is for the buttons and event listeners

const tempCallBack = ({ data: temps }) => displayingTemps(temps)
const tempPopulator = ({ data: temps }) => displayingPopulate(temps) & displayingPopulateDelete(temps)

let tempsObj = {}

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


function displayingTemps(arr) {
    delete dbDisplay.children
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
        a.value = ''
    }

    clearBTN.className = 'clearVisible'
}

const displayModify = () => {
    hideAll()
    populateTemps()
    let modifyElems = document.querySelectorAll('.modifyHidden');

    for(let i=0; i<modifyElems.length; i++) {
        let a = modifyElems[i]
        a.className = 'modifyVisible'
    }

    clearBTN.className = 'clearVisible'
}

const displayDelete = () => {
    hideAll()
    populateTemps()
    let deleteElems = document.querySelectorAll('.deleteHidden');

    for(let i=0; i<deleteElems.length; i++) {
        let a = deleteElems[i]
        a.className = 'deleteVisible'
    }

    clearBTN.className = 'clearVisible'
}

const hideAll = () => {
    let createElems = document.querySelectorAll('.createVisible');
    let modifyElems = document.querySelectorAll('.modifyVisible');
    let deleteElems = document.querySelectorAll('.deleteVisible');
    let brand = document.querySelector('#brandModify')
    let color = document.querySelector('#colorModify')
    let type = document.querySelector('#typeModify')
    let img = document.querySelector('#imgModify')
    let buy = document.querySelector('#buyModify')
    let suggested = document.querySelector('#suggestedModify')
    let lowest = document.querySelector('#lowestModify')
    let highest = document.querySelector('#highestModify')
    let best = document.querySelector('#bestModify')

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

    brand.placeholder = "Selected Brand"
    color.placeholder = "Selected Color"
    type.value = "Smooth"
    img.placeholder = "Current Image Link"
    buy.placeholder = "Current Purchase Link"
    suggested.placeholder = "Current Suggested Temps"
    lowest.placeholder = "Current Lowest Temp"
    highest.placeholder = "Current Highest Temp"
    best.placeholder = "Current Best Temp"

    let brandModify = document.querySelector('#brandModify')
    let colorModify = document.querySelector('#colorModify')
    let typeModify = document.querySelector('#typeModify')
    let imgModify = document.querySelector('#imgModify')
    let buyModify = document.querySelector('#buyModify')
    let suggestedModify = document.querySelector('#suggestedModify')
    let lowestModify = document.querySelector('#lowestModify')
    let highestModify = document.querySelector('#highestModify')
    let bestModify = document.querySelector('#bestModify')

    brandModify.value = ''
    colorModify.value = ''
    typeModify.value = ''
    imgModify.value = ''
    buyModify.value = ''
    suggestedModify.value = ''
    lowestModify.value = ''
    highestModify.value = ''
    bestModify.value = ''

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

    if (bodyObj.brand === '' || bodyObj.color === '' || bodyObj.color_type === '' || bodyObj.image === '' || bodyObj.buy_link === '' || bodyObj.temp_suggested === '' || bodyObj.temp_lowest === '' || bodyObj.temp_highest === '' || bodyObj.temp_best === '') {
        alert(`WARNING:
        All fields must be filled out.`)
    } else {
        createDisplay(bodyObj)
        axios.post("http://localhost:4004/getTemps", bodyObj)
        .then((res) => {
            console.log(res.data);
        })
    
        brand.value = ''
        color.value = ''
        type.value = 'Smooth'
        img.value = ''
        buy.value = ''
        suggested.value = ''
        lowest.value = ''
        highest.value = ''
        best.value = ''
        
        hideAll()

    
    }
}

function displayingPopulate(arr) {
    modifyOptions.innerHTML = ``
    delete modifyOptions.children
    modifyOptions.innerHTML = `<option selected disabled value="null" >Select an option</option>`
    for (let i=0; i<arr.length; i++) {
        modifyPopulate(arr[i])
        tempsObj[arr[i].plastic_id] = arr[i]
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

const modifyChooser = (event) => {
    let brand = document.querySelector('#brandModify')
    let color = document.querySelector('#colorModify')
    let type = document.querySelector('#typeModify')
    let img = document.querySelector('#imgModify')
    let buy = document.querySelector('#buyModify')
    let suggested = document.querySelector('#suggestedModify')
    let lowest = document.querySelector('#lowestModify')
    let highest = document.querySelector('#highestModify')
    let best = document.querySelector('#bestModify')

    let temps = tempsObj[event.target.value]


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
    let brand = document.querySelector('#brandModify')
    let color = document.querySelector('#colorModify')
    let type = document.querySelector('#typeModify')
    let img = document.querySelector('#imgModify')
    let buy = document.querySelector('#buyModify')
    let suggested = document.querySelector('#suggestedModify')
    let lowest = document.querySelector('#lowestModify')
    let highest = document.querySelector('#highestModify')
    let best = document.querySelector('#bestModify')
    let modifyOpt = document.querySelector('#modifySelect').value


    axios.put(`http://localhost:4004/getTemps/${modifyOpt}`, {
        id: modifyOpt, 
        brand: brand.value || brand.placeholder, 
        color: color.value || color.placeholder, 
        color_type: type.value || type.placeholder, 
        image: img.value || img.placeholder, 
        buy_link: buy.value || buy.placeholder, 
        temp_suggested: suggested.value || suggested.placeholder,
        temp_lowest: lowest.value || lowest.placeholder, 
        temp_highest: highest.value || highest.placeholder, 
        temp_best: best.value || best.placeholder
        })
        .then(() => {
            hideAll()
            getAllTemps()
        })
        .catch(err => console.log('error with put', err))


}

const deleteEntry = () => {
    let deleteOpt = document.querySelector('#deleteSelect').value
    axios.delete(`http://localhost:4004/getTemps/${deleteOpt}`)
        .then((res) => {
        console.log(res.data)
        hideAll()
        getAllTemps()
    })
}


createSubmit.addEventListener('click', addNew)
modifySubmit.addEventListener('click', modifyEntry)
deleteSubmit.addEventListener('click', deleteEntry)
clearBTN.addEventListener('click', hideAll)
createBTN.addEventListener('click', displayCreate)
modifyBTN.addEventListener('click', displayModify)
deleteBTN.addEventListener('click', displayDelete)
modifyOptions.addEventListener('change', modifyChooser)


const errorInfo = () => {
    console.log('errors on the log are due to having two stylesheet link tags and two script tags. One tag is for use in the hosted server and one is for local hosting. This way both can work from the same GitHub repository.')
}


getAllTemps()
populateTemps()
hideAll()
errorInfo()