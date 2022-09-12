class Api {
    constructor() {
        this.url='https://laptop-project-3bc60-default-rtdb.firebaseio.com/products.json'
        this.request=null
    }
    async getData(){
        this.request=await fetch(this.url)
        if(this.request.ok ){
            return await this.request.json()
        }else{
            throw Error(this.request.status)
        }
    }

}
let api=new Api()

export {api}