import {ui} from "./Utilities.js";

class Storage {
    constructor() {
        this.database=null
        this.dbInfo=null
        this.transaction=null
        this.productDB=null
        this.req=null
    }
    createDatabase(whichPage){
        this.database=indexedDB.open('laptop shopping',5)

        this.database.addEventListener('error',e=>{
            console.warn('database error ',e.target.result)
        })
        this.database.addEventListener('success',e=>{
            this.dbInfo=e.target.result
            this.restoreData(whichPage)
            console.log('database success ',e.target.result)
        })
        this.database.addEventListener('upgradeneeded',e=>{
            this.dbInfo=e.target.result

            if(!this.dbInfo.objectStoreNames.contains('products')){
                this.dbInfo.createObjectStore('products',{
                    keyPath:'id'
                })
            }



            this.dbInfo.addEventListener('success',e=>{
                console.log('create database success',e.target.result)
            })

            this.dbInfo.addEventListener('error',e=>{
                console.warn('create database error',e.target.result)
            })

            console.log('database upgrade',e.target.result)
        })



    }

    get createTransaction(){
        return this.transaction
    }
    set createTransaction(permission){
        this.transaction=this.dbInfo.transaction('products',permission)

        this.transaction.addEventListener('error',e=>{
            console.warn('transaction error',e.target)
        })

        this.transaction.addEventListener('complete',e=>{
            console.log('transaction complete',e.target)
        })
    }
    restoreData(whichPage){
        this.createTransaction="readwrite"

        this.productDB=this.createTransaction.objectStore('products')

        this.req=this.productDB.getAll()

        this.req.addEventListener('success',e=>{
            ui.StoredData=e.target.result
            ui.showSelectedData(e.target.result,whichPage)
            whichPage==='checkout' && ui.checkOutSummary()
            whichPage==='checkout' && ui.checkOutButtonHandler()
            console.log('success get database',e.target.result)
        })
        this.req.addEventListener('error',e=>{
            console.log('error get database',e.target)
        })
    }

    setData(newData){
        this.createTransaction="readwrite"

        this.productDB=this.createTransaction.objectStore('products')

        this.req=this.productDB.add(newData)

        this.req.addEventListener('success',e=>{
            console.log('success add database',e.target)
        })
        this.req.addEventListener('error',e=>{
            console.log('error add database',e.target)
        })
    }
    updateData(id,newData){
        this.createTransaction="readwrite"

        this.productDB=this.createTransaction.objectStore('products')

        this.req=this.productDB.get(id)

        this.req.addEventListener('success',e=>{
            this.productDB.put(newData)
            console.log('success put database',e.target)
        })
        this.req.addEventListener('error',e=>{
            console.log('error put database',e.target)
        })
    }
    deleteData(id){
        this.createTransaction="readwrite"
        this.productDB=this.createTransaction.objectStore('products')
        this.req=this.productDB.delete(id)

        this.req.addEventListener('success',e=>{
            console.log('success delete database',e.target)
        })
        this.req.addEventListener('error',e=>{
            console.log('error delete database',e.target)
        })

    }
    clearObjectStore(){
        this.createTransaction="readwrite"

        this.productDB=this.createTransaction.objectStore('products')

        this.req=this.productDB.clear()

        this.req.addEventListener('success',e=>{
            console.log('success clear object store database',e.target)
        })
        this.req.addEventListener('error',e=>{
            console.log('error clear object store database',e.target)
        })
    }

}




let storage=new Storage()

export {storage}