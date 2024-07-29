//router module
import {Link, useNavigate} from 'react-router-dom'
//state module
import { useState, useEffect } from 'react'
import axios from "axios"
import avatarimg from "../assets/avatar.png"



export default function AllBooks() {

  const [books, setbooks]=useState([])
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  function handleDelete(id){
    axios.delete("http://localhost:3000/"+id).then((r)=>
      setStatus(!status)

    //navigate('/')
    )

  }

  function handleStatus(id,x){
    axios.patch("http://localhost:3000/status/"+id,{status:x}).then((r)=>{
      console.log(r);
      setStatus(!status)
      //window.location.reload(false);
    })
  }



  //useeffect
  useEffect(()=>{
    axios.get("http://localhost:3000")
    .then((r)=>{
      console.log(r.data);
      setbooks(r.data)
    })
  },[status])

  return (
    <>

    <div className='text-bg-primary p-4'>
      <h2>Books</h2> <hr /> 
    </div>


    <div className='container mt-3'>
      <div className='text-end mb-3'>
        <Link to="/insert" className="btn btn-sm btn-success">Add New Books</Link>
      </div>
    

    <table className="table table-bordered">
      <thead>
        <tr>
          <th></th><th>Title</th><th>Author</th><th>Price</th><th>Category</th><th>Action</th><th>Mark As</th>
        </tr>
      </thead>
      
      <tbody>
        {
          books.map((e)=>{ 
          return <tr key={e._id}>
            <td>{e.image!=null ?
        <img src={e.image} alt="" height={60} width={60}/>
        :<img src={avatarimg} alt="" height={60} width={60}/>}</td>
          <td>{e.title}</td>
          <td>{e.author}</td>
          <td>{e.price}</td>
          <td>{e.category}</td>
          <td>
          <Link to={"view/"+e._id} className="btn btn-success btn-sm">View</Link>
          &nbsp;
          <Link to={"update/"+e._id} className="btn btn-success btn-sm">Edit</Link>
          &nbsp;
          <button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(e._id)}}>Del</button>
          &nbsp;
          </td>
          <td>
            {e.status ? <button className='btn btn-warning btn-sm' onClick={()=>{handleStatus(e._id,false)}}>Available</button>
            : <button className='btn btn-warning btn-sm' onClick={()=>{handleStatus(e._id,true)}}>Issued</button>
            }
          </td>
        </tr>
          }

        )
        }
      </tbody>
    </table>
    </div>
    </>
  )
}
