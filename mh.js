let exp = require("express")
let app = exp()




const fsa = require("fs").promises 
const path = require("path")






app.use(exp.urlencoded({extended : true}))




app.post("/delete",(req,res)=>{
    const arr = req.body.array

    async function readfile(file_path) {
        //     reading the file
        const last_data = await fsa.readFile(file_path,"utf-8")
        //     return the last data
        return JSON.parse(last_data)
    }
    async function all_data(file_path) {
        // import the last data as lastData
        var lastData = await readfile(file_path)
        lastData.allemail.splice(arr,1)
        lastData.allpassword.splice(arr,1)
        return lastData

    }
    async function save_data(file_path) {
        const new_data_to_save = await all_data(file_path)
        
        fsa.writeFile(file_path,JSON.stringify(new_data_to_save),"utf-8")
    }
    async function run_the_app() {
        const the_path = path.join(__dirname+"/new.json")
        await save_data(the_path)
        res.send("OK")
    }
    run_the_app()

})






 app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/maj.html")
 })





 app.get("/ico",(req,res)=>{
     res.sendFile(__dirname+"/doc.ico")
 })


 // import JQuery
 app.get("/jq",(req,res)=> {

    res.sendFile(__dirname + "/jquery.js")
    
})
    



 // import Axios
 app.get("/ax",(req,res)=> {

    res.sendFile(__dirname + "/axios.js")
    
})
    

// import IMG
app.get("/img",(req,res)=> {

    res.sendFile(__dirname + "/face.ico")
    
})




//     Check Value

app.post("/chek",(req,res)=>{

    const {usr,pass} = req.body
    if (usr == "mh@gmail.com" && pass == "Mh112233") {
        console.log(true)
    } else {
        console.log(false)
    }


 })



app.get("/Showing_Data",(req,res)=>{
    res.sendFile(__dirname +"/shdata.html")
})



app.post("/json",(req,res)=>{

    
    
    const {usr,pass} = req.body

    res.json({"UserName":usr,"PassWord":pass})



        //    this first function
        async function readfile(file_path) {
            //     reading the file
            const last_data = await fsa.readFile(file_path,"utf-8")
            //     return the last data
            return JSON.parse(last_data)
        }
        async function all_data(file_path) {
            // import the last data as lastData
            var lastData = await readfile(file_path)
            lastData.allemail.push(usr)
            lastData.allpassword.push(pass)
            return lastData

        }
        async function save_data(file_path) {
            const new_data_to_save = await all_data(file_path)
            fsa.writeFile(file_path,JSON.stringify(new_data_to_save),"utf-8")
        }
        async function run_the_app() {
            const the_path = path.join(__dirname+"/new.json")
            await save_data(the_path)
        }
        run_the_app()
})

app.get("/show/all_data",(req,res)=>{
    res.sendFile(__dirname + "/show.html")
})


//     To import the data
app.get("/get_the_all",(req,res)=>{
    async function get_all_data() {
        const path_name = path.join(__dirname+"/new.json")
        const fir_data = await fsa.readFile(path_name,"utf-8")
        const all_data = JSON.parse(fir_data)
        res.json(all_data)
    }
    get_all_data()
})


//     TO RUN THIS APP         
app.listen(3000/* port */,()=> {
    //    DONT IMPORTANT
    console.log("I'm listen on port 3000 at the moment")
})
