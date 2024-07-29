import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"
import avatarimg from "../assets/avatar.png"


export default function ViewEmp() {
  let {id} = useParams();
  const [book, setBook]=useState({})

  //useeffect
  useEffect(()=>{
    axios.get("http://localhost:3000/"+id)
    .then((r)=>{
      console.log(r.data);
      setBook(r.data)
    })
  },[])
  
  return (
    <>
    <div className='text-bg-primary p-4'>
      <h2>book Profile</h2> <hr />
    </div>


    <div className='container mt-3'>
      <div className='text-end mb-3'>
        <Link to="/" className="btn btn-sm btn-success">Books</Link>
      </div>


    <div className="row">
      <div className="col text-center pt-4">
        {book.image!=null ?
        <img src={book.image} alt="" height={200} width={200}/>
        :<img src={avatarimg} alt="" height={200} width={200}/>}
        
        <div className='mt-4'>
          <Link to={"/image/"+id} className='text-success text-decoration-none'>Edit Image</Link>
        </div>
      </div>

      <div className="col">
        <h1>{book.title}</h1>
        <p>Written by {book.author}</p> <hr/>
        <p>Book category : {book.category}</p> <hr/>
        <p>Price : {book.price}</p>
        <p>Description : {book.description}</p>
        <hr/>
      </div>
    </div>
    </div>
    </>
  )
}
