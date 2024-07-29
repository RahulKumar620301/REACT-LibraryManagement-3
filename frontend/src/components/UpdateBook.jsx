import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import { validateForm } from './Validation'


export default function UpdateBook() {
  let {id}= useParams();

  const [errors, setErrors] = useState({});

  const [book, setBook]=useState({doj:"0000-00-00"})

  //useeffect
  useEffect(()=>{
    axios.get("http://localhost:3000/"+id)
    .then((r)=>{
      console.log(r.data);
      setBook(r.data)
    })
  },[])

  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault();
    console.log(book);
    const newErrors = validateForm(book);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){
    axios.put("http://localhost:3000/"+id,book)
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
      <h2>Update book Info</h2> <hr /> </div>
      <div className='container mt-3'>
      <div className='text-end mb-3'>
    <Link to="/" className="btn btn-sm btn-success">books</Link>
    </div>
    <form>
    {errors.title && <span className="text-danger"> * {errors.title} </span>}
      <div className="input-group mb-3">
        <span className="input-group-text">book title</span>
        <input type="text" className="form-control" value={book.title}
            onChange={(e)=>setBook({...book,title:e.target.value})}/>
      </div> 

      {errors.author && <span className="text-danger"> * {errors.author} </span>}
      {errors.price && <span className="text-danger"> * {errors.price} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Author</span>
        <input type="email" className="form-control" 
        value={book.author}
        onChange={(e)=>setBook({...book,author:e.target.value})}/>
        <span className="input-group-text">Price</span>
        <input type="tel" className="form-control" 
        value={book.price}
        onChange={(e)=>setBook({...book,price:e.target.value})}/>
      </div>

      {errors.category && <span className="text-danger"> * {errors.category} </span>}
      {errors.description && <span className="text-danger"> * {errors.description} </span>}

      <div className="input-group mb-3">
        <span className="input-group-text">Category</span>
        <input type="text" className="form-control" 
        value={book.category}
        onChange={(e)=>setBook({...book,category:e.target.value})}/>
        <span className="input-group-text">Description</span>
        <input type="number" className="form-control" 
        value={book.description}
        onChange={(e)=>setBook({...book,description:e.target.value})}/>
      </div>

      

      <button className="btn btn btn-success" onClick={handleSubmit}>Save Details</button>
    </form>
      </div>
    </>
  )
}
