import React from 'react'
import {  Link, useParams } from 'react-router-dom'

 const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams()
  const post = posts.find(post => post.id.toString() === id)
  return (
    <div>
          <article>
         {post &&  
         <>
           <h2>{post.title}</h2>
           <p> {post.datetime} </p>
           <p> {post.body }</p>
           <button type='submit' onClick={() => handleDelete(post.id)}> Delete </button>
           <Link to ={`/edit/${post.id}`}>  <button >Edit Post</button> </Link>
         </>
         }
         {!post && 
         <>
        <h1>Post Not Found</h1>
        <p><Link to='/'>vist our home page</Link></p> 
         </>
         }
          </article>
    </div>
  )
}
export default PostPage