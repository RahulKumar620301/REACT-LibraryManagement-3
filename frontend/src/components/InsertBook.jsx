import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { validateForm } from './Validation'

export default function CreateEmp() {

  const [errors, setErrors] = useState({});
 

  const [book,setBook]=useState({title:"",author:"",price:"",category:"",description:""})

  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault(); 

    const newErrors = validateForm(book);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){
    console.log(book);
    axios.post("http://localhost:3000",book)
    .then((r)=>{
      console.log(r);
      navigate("/");
    })
    }
    else{
      console.log('Form submission failed due to validation error.')
    }
  }

  return (
    <>
    <div className='text-bg-primary p-4'>
      <h2>Add New book</h2> <hr /> 
    </div>

    <div className='container mt-3'>
      <div className='text-end mb-3'>
        <Link to="/" className="btn btn-sm btn-success">books</Link>
      </div>

    <form>
    {errors.title && <span className="text-danger"> * {errors.title} </span>}
      <div className="input-group mb-3">
        <span className="input-group-text">book Title</span>
        <input type="text" className="form-control" 
        onChange={(e)=>setBook({...book,title:e.target.value})}/>
      </div>

      {errors.author && <span className="text-danger"> * {errors.author} </span>}
      {errors.price && <span className="text-danger"> * {errors.price} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Author</span>
        <input type="email" className="form-control" 
        onChange={(e)=>setBook({...book,author:e.target.value})}/>
        <span className="input-group-text">price</span>
        <input type="tel" className="form-control" 
        onChange={(e)=>setBook({...book,price:e.target.value})}/>
      </div>

      {errors.category && <span className="text-danger"> * {errors.category} </span>}
      {errors.description && <span className="text-danger"> * {errors.description} </span>}
      

      <div className="input-group mb-3">
        <span className="input-group-text">category</span>
        <input type="text" className="form-control" 
        onChange={(e)=>setBook({...book,category:e.target.value})}/>
        <span className="input-group-text">description</span>
        <input type="text" className="form-control" 
        onChange={(e)=>setBook({...book,description:e.target.value})}/>
        
      </div>

      <button className="btn btn btn-success" onClick={handleSubmit}>Save Details</button>
    </form>
    </div>
    </>
  )
}
