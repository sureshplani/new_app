import React from 'react'
import { Link } from 'react-router-dom'

function Nav({search,setSearch}) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} >
         <input 
         type='search'
         id='searchid'
         value={search}
         autoFocus
         onChange={(e) => setSearch(e.target.value)}
         
         />
      </form>
       <li> <Link to ="/">Home</Link> </li> 
       <li> <Link to = "/post">Post</Link> </li>

    </div>
  )
}

export default Nav