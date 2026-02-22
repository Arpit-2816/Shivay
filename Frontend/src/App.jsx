import React, { useEffect, useState } from 'react'

import axios from "axios"


const App = () => {

 const [title, setTitle] = useState('')
 const [details, setDetails] = useState('')
 const [search, setSearch] = useState('')
 const [allnotes, setAllnotes] = useState([])
 
 
 
 function submithandler(e){

       e.preventDefault()

       console.log("form submitted");
       
       
   
       axios.post("http://localhost:3000/api/notes",{
        title,
        details
       })
       .then((res)=>{
        console.log(res.data);
        fetchnotes()
        
       })
 }

 function DeleteHandler(allnotesId){
    axios.delete("http://localhost:3000/api/notes/"+allnotesId)
    .then((res)=>{
      console.log(res.data);
      fetchnotes()
    })
       
 }

 function UpdateHandler(allnotesId){
  const newdetails=prompt("Enter new Details")
   axios.patch("http://localhost:3000/api/notes/"+allnotesId,{
    details:newdetails
   })
   .then((res)=>{
    console.log(res.data);
    fetchnotes()
    
   })
   
 }

 const filteredNotes = allnotes.filter((note) =>
  note.title?.toLowerCase().includes(search.toLowerCase()) ||
  note.details?.toLowerCase().includes(search.toLowerCase())
)

 function fetchnotes(){
  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
      setAllnotes(res.data.notes)
      setTitle('')
      setDetails('')
  })
 }

 useEffect(()=>{
  fetchnotes()
 },[])

  return (
    <div className=' bg-[#292754] px-30 py-10'>


      <div className='h-140 ml-40 mr-40 w-220 mb-24 rounded-xl border-2 border-[#363262] bg-[#363262] '>
       <div className='flex justify-between'>
         <h1 className='text-[#A7AFFC] text-xl font-[900] ml-20 mt-5 font-helvetica uppercase'>Shivay Notes</h1>
         <button className='mr-20 rounded-full w-fit border-2 mt-2 border-[#2C2A4A] text-[oklch(37.3% 0.034 259.733)] font-semibold px-4 py-2'><span className='text-[#8536E9] font-bold font-monospace'>{allnotes.length}</span> Total Notes</button>
       </div>
        <h5 className='text-[#6B6FAF] mt-2 ml-20 text-xs'>Capture your brillance,beautifully.</h5>

        <form className='flex flex-col gap-4' onSubmit={(e)=>{
          submithandler(e)
        }}>

          <input className='border-2 border-[#3F3E94] mt-10 text-white ml-20 h-12 w-180 rounded-xl px-2 outline-none' 
          type="text" 
          required={true}
          placeholder='Note Title' 

          onChange={(e)=>{
            setTitle(e.target.value)  
          }}
          value={title}
    
          />

          <textarea className='border-2 border-[#3F3E94] ml-20 h-30 w-180 rounded-xl px-2 py-2 text-white resize-none outline-none'
           placeholder='Enter your thoughts.....'
           required={true}

           onChange={(e)=>{
            setDetails(e.target.value)    
           }}
           value={details}
           
           > 
           </textarea>

          <button 
          className=' bg-[#8536E9] px-3 py-2 w-fit ml-20 rounded-xl text-white cursor-pointer'>
            Add New Note <i class="ri-add-large-line"></i>
          </button>
         
         <input 
         onChange={(e)=>{
          setSearch(e.target.value)
         }}
         className='border-2 border-[#3F3E94] mt-10  ml-20 h-12 w-180 rounded-xl px-2 outline-none ' 
         type="Search" 
         placeholder=' Search Notes...'
         value={search}
         />
          
        </form>
      </div>

    
   <div  className='flex flex-wrap shrink-0 gap-4'>
     {
      filteredNotes.map((elem,idx)=>{
        return <div key={idx} className='w-100 h-70 bg-[#3C3764] rounded-xl px-2 py-5  relative'>
                 <div className='flex justify-between'>
                    <h2 className='text-2xl font-bold font-[800] capitalize mb-5 text-gray-500'>{elem.title}</h2>
    
                    <div className='flex justify-evenly w-25'>
                        <button 
                          onClick={()=>{
                          DeleteHandler(elem._id)
                       }}
                        className='rounded-full w-10 h-10 bg-[#424166] text-white cursor-pointer'>
                        <i class="ri-delete-bin-7-fill"></i>
                       </button>

                       <button
                        onClick={()=>{
                          UpdateHandler(elem._id)
                        }}
                        className='rounded-full w-10 h-10 bg-[#424166] text-white cursor-pointer'>
                        <i class="ri-pencil-line"></i>
                        </button>
                   </div>

                  </div>
      
                  <p className='text-gray-900 font-semibold text-lg capitalize'>{elem.details}</p>
      
       
                  </div>
       })
    }
   </div>

  

    </div>
  )
}

export default App
