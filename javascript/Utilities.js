import {storage} from "./storage.js";

class UI {
    constructor() {
        this.cardInRow=6
        this.paginationContainer=document.querySelector('.pagination_container')
        this.cardContainer=document.querySelector('.card_container')
        this.btnFragment=document.createDocumentFragment()
        this.nextButton=document.querySelector('.next-page-btn')
        this.prevButton=document.querySelector('.prev-page-btn')
        this.itemContainer=document.querySelector('.item_container')
        this.totalPrice=document.querySelector('.total_price')
        this.preloader=document.querySelector('.preloader')
        this.ptoductPicture=document.querySelector('.product_picture')
        this.model_img=document.querySelector('.model_img')
        this.model=document.querySelector('.model')
        this.cpu_model_img=document.querySelector('.cpu_model_img')
        this.cpu_model=document.querySelector('.cpu_model')
        this.cpu_speed=document.querySelector('.cpu_speed')
        this.cpu_processor=document.querySelector('.cpu_processor')
        this.screen_model=document.querySelector('.screen_model')
        this.ram_model=document.querySelector('.ram_model')
        this.graphic_model=document.querySelector('.graphic_model')
        this.hard_model=document.querySelector('.hard_model')
        this.os_model=document.querySelector('.os_model')
        this.color1=document.querySelector('.color1')
        this.color2=document.querySelector('.color2')
        this.color3=document.querySelector('.color3')
        this.description=document.querySelector('.description')
        this.product_price=document.querySelector('.product_price')
        this.backButton=document.querySelector('.back_button')
        this.summaryContainer=document.querySelector('main')
        this.summaryTotal=document.querySelector('.total_item')
        this.totalSummaryPrice=document.querySelector('.total_summary_price')
        this.clearDatabaseButton=document.querySelector('.clear_database')
        this.checkoutItems=document.querySelectorAll('.checkout_item')
        this.storedData=null
        this.fetchData=null
        this.btn=null
    }
    set StoredData(result){
        this.storedData=result
    }
    get StoredData(){
        return this.storedData
    }
    set allFetchData(result){
        this.fetchData=result
    }
    get allFetchData(){
        return this.fetchData
    }
    addChangeClass(data){
        document.querySelectorAll('.add_to_card').forEach(btn=>{
            data.forEach(item=>{
                if(Number(btn.dataset.id)=== Number(item.id)){
                    btn.parentElement.parentElement.classList.add('change')
                    Number(item?.quantity ?? 1) === 1 ? btn.nextElementSibling.nextElementSibling.children[0].className=' fa-sharp fa-solid fa-trash' : btn.nextElementSibling.nextElementSibling.children[0].className='fa-solid fa-minus'
                    btn.nextElementSibling.innerHTML=`${item?.quantity ?? 1}`
                }
            })
        })
    }
    cardGenerator(data){
        this.cardContainer.innerHTML=''
        let allInOne=data.map(card=>{
            return `<div class="card"><div class="image_container center relative"><img src="${card[1].image}" alt=""></div><div class="card_content p-3"><span class="fw-7">Model:</span><h3 class="text-white fw-6">${card[1].model}</h3><p class="text-white"><i class="fa-solid fa-memory mr-1 text-green"></i>Memory: ${card[1].memory}</p><p class="text-white"><i class="fa-solid fa-microchip text-gold mr-1"></i>Cpu: ${card[1].cpu.model}</p><p class="text-white"><i class="fa-solid fa-hard-drive mr-1 text-blue"></i>Hard-drive: ${card[1].hard_drive}</p><p class="center text-white fs-3"><em>${card[1].price}$</em></p><div class="d-flex justify-between align-center mt-3 btn_container"><a href="details.html?id=${card[1].id}"><i class="fa-solid fa-circle-info mr-2"></i>Details</a><div class="relative"><button data-id="${card[1].id}" class="btn_primary add_to_card">Add to Card</button><span class="absolute counter">1</span><button data-id="${card[1].id}" class="btn_secondary btn_secondary_sm absolute trash_btn"><i class="fa-sharp fa-solid fa-trash"></i></button><button data-id="${card[1].id}" class="btn_secondary absolute btn_secondary_sm plus_btn"><i class="fa-solid fa-plus"></i></button></div></div></div><div class="line w-100 relative"><span class="d-inline-block absolute h-100"></span></div></div>`
        }).join('')
        this.cardContainer.insertAdjacentHTML('beforeend',allInOne)
    }
    pagination(data){
        this.cardGenerator(Object.entries(data.slice(0,this.cardInRow)))
        let numberOfButton=Math.ceil(data.length / this.cardInRow)
        for(let i=0;i < numberOfButton;i++){
            this.btn=document.createElement('button')
            this.btn.classList.add('btn_primary')
            this.btn.innerHTML=i+1
            this.btnFragment.append(this.btn)
            i===0 && this.btn.classList.add('active')
        }
        this.paginationContainer.append(this.btnFragment)

        ui.nextButton.setAttribute('data-starter',`${ui.cardInRow}`)
        ui.prevButton.setAttribute('data-starter',`${ui.cardInRow}`)
    }
    generateProductListItem(obj,id,quantity=1){
        this.itemContainer.insertAdjacentHTML('beforeend',`<div class="item w-90  pt-2 d-flex align-center gap-2"><img src="${obj.image}" alt="" ><div class="d-flex flex-column justify-start align-start"><span class="text-dark fs-2 lh-2">${obj.model}</span><span class="text-dark color d-flex align-center"><i class="fa-solid fa-droplet text-green mr-1"></i> Colors: <span style="background-color: ${obj.color1}"></span> / <span style="background-color: ${obj.color2}"></span> / <span style="background-color: ${obj.color3}"></span> </span><span class="d-flex align-center text-dark screen lh-2"><i class="fa-solid fa-desktop text-blue mr-1"></i>Screen:${obj.screen}</span><span class="text-dark price lh-1 d-flex align-center mb-2"><i class="fa-solid fa-money-bill-wave text-gold mr-1"></i>Price: <em class="fs-3 ml-3 "><span>${obj.price}</span>$</em><span class="fs-2 ml-2 quantity" data-id="${id}">ˣ <span >${quantity}</span></span> </span></div></div>`)
    }
    addProductToList(allProducts,id){
        let target=allProducts[id]
        storage.setData(target)
        this.generateProductListItem(target,id)
    }
    calculateTotalPrice(){
        let sum=0
        document.querySelectorAll('.item').forEach(item=>{
            sum += (Number(item.children[1].children[3].children[1].children[0].innerHTML)) * Number(item.children[1].children[3].children[2].children[0].innerHTML)
        })
        this.totalPrice.innerHTML=`${sum.toFixed(2)}`
    }
    addToCard(e){
        e.target.parentElement.parentElement.classList.add('change')
        let selectedProduct=Number(document.querySelector('.badge').innerHTML)
        document.querySelector('.badge').innerHTML=`${selectedProduct + 1}`
    }
    plusButton(e,allProducts){
        let initialNumber=Number(e.target.previousElementSibling.previousElementSibling.innerHTML)
        if(initialNumber > 0){
            e.target.previousElementSibling.children[0].className='fa-solid fa-minus'
        }
        e.target.previousElementSibling.previousElementSibling.innerHTML =`${initialNumber +1}`

        document.querySelectorAll('.quantity').forEach(q=>{
            q.dataset.id===e.target.dataset.id ? q.children[0].innerHTML=`${initialNumber +1}` : null
        })
        let target=allProducts[Number(e.target.dataset.id)]
        storage.updateData(Number(e.target.dataset.id),{...target,quantity:initialNumber +1})
    }
    trashButton(e){
        e.target.parentElement.parentElement.classList.remove('change')
        let selectedProduct=Number(document.querySelector('.badge').innerHTML)
        document.querySelector('.badge').innerHTML=`${selectedProduct - 1}`
        document.querySelectorAll('.quantity').forEach(q=>{
            q.dataset.id===e.target.dataset.id ? q.parentElement.parentElement.parentElement.remove() : null
        })
        storage.deleteData(e.target.dataset.id)
    }
    minusButton(e,allProducts){
        let initialNumber=Number(e.target.previousElementSibling.innerHTML)
        initialNumber===2 ? e.target.children[0].className='fa-sharp fa-solid fa-trash' : null
        if(initialNumber < 2){
            e.target.previousElementSibling.innerHTML =`1`
        }else{
            e.target.previousElementSibling.innerHTML =`${initialNumber - 1}`
            document.querySelectorAll('.quantity').forEach(q=>{
                q.dataset.id===e.target.dataset.id ? q.children[0].innerHTML=`${initialNumber - 1}` : null
            })
        }
        let target=allProducts[Number(e.target.dataset.id)]
        storage.updateData(Number(e.target.dataset.id),{...target,quantity:initialNumber -1})
    }
    showDetails(target){
        this.ptoductPicture.setAttribute('src',`${target.image}`)
        this.model_img.setAttribute('src',`${target.model_img}`)
        this.model.innerHTML=`${target.model}`
        this.cpu_model_img.setAttribute('src',`${target.cpu.cpu_image}`)
        this.cpu_model.innerHTML=`${target.cpu.model}`
        this.cpu_speed.innerHTML=`${target.cpu.speed}`
        this.cpu_processor.innerHTML=`${target.cpu.Processor_count} processor`
        this.screen_model.innerHTML=`${target.screen}`
        this.ram_model.innerHTML=`${target.memory}`
        this.graphic_model.innerHTML=`${target.graphic}`
        this.hard_model.innerHTML=`${target.hard_drive}`
        this.os_model.innerHTML=`${target.Operating_System}`
        this.color1.style.backgroundColor=`${target.color1}`
        this.color2.style.backgroundColor=`${target.color2}`
        this.color3.style.backgroundColor=`${target.color3}`
        this.description.innerHTML=`${target.description}`
        this.product_price.innerHTML=`${target.price}$`
    }
    showSelectedData(data,whichPage){
        if(whichPage==='details'){
            data.forEach(item=>{
                this.generateProductListItem(item,item.id,item?.quantity ?? 1)
                let selectedProduct=Number(document.querySelector('.badge').innerHTML)
                document.querySelector('.badge').innerHTML=`${selectedProduct + 1}`
            })
            this.calculateTotalPrice()
        }else if(whichPage==='checkout'){
            data.forEach(item=>{
                this.summaryContainer.insertAdjacentHTML('beforeend',`<div class="checkout_item d-flex gap-3 p-3 mb-3"><img src="${item.image}" alt=""><div class="d-flex flex-column  justify-center"><h3>${item.model}</h3><span class="fw-7 fs-4 text-green"><em class="each_price">${item.price}</em>$</span></div><div class="d-flex justify-center align-center"><button class="btn_secondary py-0 bg_gold px-4 total_quantity">${item?.quantity ?? 1}</button></div><div class="d-flex justify-center align-center gap-1" ><button data-id="${item.id}" class="btn_secondary  absolute trash_btn"><i class="${!item.quantity  ? 'fa-sharp fa-solid fa-trash' : 'fa-solid fa-minus'}"></i></button><button data-id="${item.id}" class="btn_secondary absolute plus_btn"><i class="fa-solid fa-plus"></i></button></div></div>`)
                this.generateProductListItem(item,item.id,item?.quantity ?? 1)
                let selectedProduct=Number(document.querySelector('.badge').innerHTML)
                document.querySelector('.badge').innerHTML=`${selectedProduct + 1}`
            })
            this.calculateTotalPrice()
        }else{
            this.addChangeClass(data)
            data.forEach(item=>{
                let selectedProduct=Number(document.querySelector('.badge').innerHTML)
                document.querySelector('.badge').innerHTML=`${selectedProduct + 1}`
                this.generateProductListItem(item,item.id,item?.quantity ?? 1)
            })
            ui.calculateTotalPrice()
        }

    }
    checkOutSummary(){
        let total_quantity=0
        let sum=0
        document.querySelectorAll('.checkout_item').forEach(item=>{
            sum+=Number(item.children[1].children[1].children[0].innerHTML) * Number(item.children[2].children[0].innerHTML)
        })

        document.querySelectorAll('.total_quantity').forEach(quantity=>{
            total_quantity+=Number(quantity.innerHTML)
        })
        this.summaryTotal.innerHTML=total_quantity
        this.totalSummaryPrice.innerHTML=`${sum.toFixed(2)}$`

    }
    checkOutButtonHandler(){
        document.querySelectorAll('.checkout_item').forEach(item=>{
            item.addEventListener('click',e=>{
                if(e.target.tagName==='BUTTON' && e.target.classList.contains('plus_btn')){
                    let initialNumber=Number(e.target.parentElement.previousElementSibling.children[0].innerHTML)
                    e.target.parentElement.previousElementSibling.children[0].innerHTML=`${initialNumber+1}`
                    if(initialNumber>0){
                        e.target.previousElementSibling.children[0].className='fa-solid fa-minus'
                    }
                    document.querySelectorAll('.quantity').forEach(q=>{
                        q.dataset.id===e.target.dataset.id ? q.children[0].innerHTML=`${initialNumber +1}` : null
                    })

                    let target=this.allFetchData[Number(e.target.dataset.id)]
                    storage.updateData(Number(e.target.dataset.id),{...target,quantity:initialNumber +1})

                }else if(e.target.tagName==='BUTTON' && e.target.children[0].classList.contains('fa-minus')){
                    let initialNumber=Number(e.target.parentElement.previousElementSibling.children[0].innerHTML)
                    initialNumber===2 ? e.target.children[0].className='fa-sharp fa-solid fa-trash' : null
                    if(initialNumber<2){
                        e.target.parentElement.previousElementSibling.children[0].innerHTML=`1`
                    }else{
                        e.target.parentElement.previousElementSibling.children[0].innerHTML=`${initialNumber-1}`
                        document.querySelectorAll('.quantity').forEach(q=>{
                            q.dataset.id===e.target.dataset.id ? q.children[0].innerHTML=`${initialNumber - 1}` : null
                        })
                    }
                    let target=this.allFetchData[Number(e.target.dataset.id)]
                    storage.updateData(Number(e.target.dataset.id),{...target,quantity:initialNumber -1})
                }else if(e.target.tagName==='BUTTON' && e.target.children[0].classList.contains('fa-trash')){
                    if(confirm('Are you sure?') ){
                        e.target.parentElement.parentElement.remove()
                        let selectedProduct=Number(document.querySelector('.badge').innerHTML)
                        document.querySelector('.badge').innerHTML=`${selectedProduct - 1}`
                        document.querySelectorAll('.quantity').forEach(q=>{
                            q.dataset.id===e.target.dataset.id ? q.parentElement.parentElement.parentElement.remove() : null
                        })
                        storage.deleteData(e.target.dataset.id)
                    }
                }
                this.calculateTotalPrice()
                this.checkOutSummary()
            })

        })
    }
}


let ui=new UI()

export {ui}