import {ui} from "./Utilities.js";
import {storage} from "./storage.js";
import {api} from "./api.js";

window.addEventListener('load',()=>{
    api.getData().then(result=>{
        ui.allFetchData=result
        ui.preloader.style.display='none'
        storage.createDatabase('checkout')
    }).catch(err=>{
        console.log(err)
    })
})

ui.clearDatabaseButton.addEventListener('click',e=>{
    if(confirm('are you sure?')){
        storage.clearObjectStore()
        ui.summaryContainer.innerHTML=''
        ui.itemContainer.innerHTML=''
        document.querySelector('.badge').innerHTML='0'
        ui.calculateTotalPrice()
        ui.checkOutSummary()
    }
})

