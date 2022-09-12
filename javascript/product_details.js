import {api} from "./api.js";
import {ui} from "./Utilities.js";
import {storage} from "./storage.js";

window.addEventListener('load',()=>{
    let urlSearch=location.search
    let searchParams=new URLSearchParams(urlSearch)
    api.getData().then(result=>{
        ui.showDetails(result[Number(searchParams.get('id'))])
        ui.preloader.style.display='none'
        storage.createDatabase('details')
    }).catch(err=>{
        console.log(err)
    })
})

ui.backButton.addEventListener('click',()=>{
    history.go(-1)
})