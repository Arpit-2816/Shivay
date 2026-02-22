const express=require("express")
const cors=require("cors")
const noteModel=require("./models/note.model")
const path=require("path")


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
/*  POST  */
app.post("/api/notes",async(req,res)=>{

    const{title,details}=req.body

    const note=await noteModel.create({
        title,details
    })

    res.status(201).json({
        message:"notes created Successfully",
        note
    })
})

/* GET */
app.get("/api/notes",async(req,res)=>{

    const notes=await noteModel.find()

    res.status(200).json({
        message:"notes fetched Successfully",
        notes
    })
})

/* DELETE */
app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"notes deleted successfully"
    })
})


/* UPDATE */
app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id

    const{details}=req.body

   await noteModel.findByIdAndUpdate(id,{details})

    res.status(200).json({
        message:"notes Updated Successfully",
        
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports=app