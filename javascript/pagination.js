import {ui} from "./Utilities.js";
import {allProducts} from "./App.js";
////////////////////// pagination btns
ui.paginationContainer.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        let starterPoint=(Number(e.target.innerHTML)-1)*ui.cardInRow
        let endPoint=starterPoint + ui.cardInRow
        ui.nextButton.setAttribute('data-starter',`${endPoint}`)
        ui.prevButton.setAttribute('data-starter',`${endPoint}`)
        ui.cardGenerator(Object.entries(allProducts.slice(starterPoint,endPoint)))
        ui.paginationContainer.querySelectorAll('button').forEach(btn=>{
            btn.classList.remove('active')
        })
        e.target.classList.contains('active') || e.target.classList.add('active')
    }
})
///////////// pagination next btn
ui.nextButton.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        let nextStarter=Number(e.target.dataset.starter)
        let nextEnd=nextStarter + ui.cardInRow

        if(nextStarter >= allProducts.length){
            nextStarter=0
            nextEnd=nextStarter + ui.cardInRow
        }
        ui.cardGenerator(Object.entries(allProducts.slice(nextStarter,nextEnd)))

        e.target.dataset.starter=`${nextEnd}`

        ui.paginationContainer.querySelectorAll('button').forEach(btn=>{
            btn.classList.remove('active')
            btn.innerHTML===`${nextEnd/ui.cardInRow}` && btn.classList.add('active')
        })

        ui.addChangeClass(ui.StoredData)


    }
})

///////////// pagination prev btn
ui.prevButton.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){

        let prevEnd=Number(e.target.dataset.starter) - ui.cardInRow

        let prevStarter=prevEnd - ui.cardInRow

        if(prevStarter < 0){
            prevStarter=allProducts.length - ui.cardInRow
            prevEnd=allProducts.length
        }

        ui.cardGenerator(Object.entries(allProducts.slice(prevStarter,prevEnd)))

        e.target.dataset.starter=`${prevEnd}`

        ui.paginationContainer.querySelectorAll('button').forEach(btn=>{
            btn.classList.remove('active')
            btn.innerHTML===`${prevEnd/ui.cardInRow}` && btn.classList.add('active')
        })

    }
})