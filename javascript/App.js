import {ui} from "./Utilities.js";
import {api} from "./api.js";
import {storage} from "./storage.js";
let allProducts=null
/////// fetch data
window.addEventListener('load',()=>{
    api.getData().then(result=>{
         allProducts=result
        ui.pagination(result)
        ui.preloader.style.display='none'
        storage.createDatabase('main')
    }).catch(err=>{
        console.log(err)
    })

})

export {allProducts}