import React, { useState, useEffect } from 'react'
import axios from 'axios'
function View() {
  const [admin,setAdmin] = useState([])

    const getData = async() =>{
        try {
            const response = await axios.get('http://localhost:3001/view')
          setAdmin(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{
        getData()
    },[])
  
    return (
  <>
  <ul>
  {admin.map((item) => (
      <li key={item._id}> 
        {item.fname} {item.lname}
      </li>
    ))}
  </ul>
  </> 
)
}

export default View