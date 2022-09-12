import {ui} from "./Utilities.js";
import {allProducts} from "./App.js";

/////////////// add to card
ui.cardContainer.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON' && e.target.classList.contains('add_to_card')){
        ui.addProductToList(allProducts,Number(e.target.dataset.id))
        ui.calculateTotalPrice()
        ui.addToCard(e)
    }
    if(e.target.tagName==='BUTTON' && e.target.classList.contains('plus_btn')){
        ui.plusButton(e,allProducts)
        ui.calculateTotalPrice()
    }
    if(e.target.tagName==='BUTTON' && e.target.children[0]?.classList.contains('fa-trash')){
        ui.trashButton(e)
        ui.calculateTotalPrice()
    }
    if(e.target.tagName==='BUTTON' && e.target.children[0]?.classList.contains('fa-minus')){
        ui.minusButton(e,allProducts)
        ui.calculateTotalPrice()
    }
})
