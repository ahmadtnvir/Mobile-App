import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-3777d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "ShoppingList")


const inputFieldEl = document.getElementById("input-field")
const inputBtnEl = document.getElementById("input-btn")
const ulEl = document.getElementById("shopping-list")

inputBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearulEl()
        for ( let i = 0; i < itemsArray.length; i++ ) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendShoppingListInulEl(currentItem)
        }
    }else {
        ulEl.innerHTML = "No items here... yet!"
    }
   
    
    
})

function clearulEl() {
    ulEl.innerHTML = ""
}

function clearInputField() {
    inputFieldEl.value = ""
}

function appendShoppingListInulEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfIDinDB = ref(database, `ShoppingList/${itemID}`)
        remove(exactLocationOfIDinDB)
    })

    ulEl.append(newEl)
}