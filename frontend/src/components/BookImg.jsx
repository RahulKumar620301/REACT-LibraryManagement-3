import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

export default function ImageEmp() {
    let {id} = useParams();
  const [image, setImage]=useState('')
  const navigate = useNavigate();

  
  function handleSubmit(e){
    e.preventDefault();
    let data=new FormData();
    data.append('image',image)
    axios.patch("http://localhost:3000/image/"+id,data)
    .then((r)=>{
      console.log(r);
      navigate('/')
    })
  }
  return (
    
    <>
    <div className='text-bg-primary p-4'>
      <h2>Book Profile</h2> <hr />
    </div>


    <div className='container mt-3'>
      <div className='text-end mb-3'>
        <Link to="/" className="btn btn-sm btn-success">Books</Link>
      </div>
      <form>
        <div className="my-5 input-group">
            <input type='file' className='form-control' onChange={(e)=>setImage(e.target.files[0])}/>
            <button className='btn btn-primary' onClick={handleSubmit}>Upload Image</button>
        </div>
      </form>

    </div>
    </>
  )
}
