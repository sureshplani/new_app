import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function PostEdit({posts, editTitle,editBody, setEditTitle, setEditBody, handleEdit}) {
    const {id} = useParams()
    const post = posts.find(post => post.id.toString() === id )
    useEffect(
        () =>{
            setEditTitle(post.title)
            setEditBody(post.body)
        },[post, setEditTitle, setEditBody]
    )
  return (
    <div>
            <h1> Edit Post</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
        autoFocus
        type='text'
        id='editTile'
        value={editTitle}
        placeholder='enter title'
        required
        onChange={(e) => setEditTitle(e.target.value)}
        /><br></br>
        <textarea 
        autoFocus
        id="editBody"
        placeholder='exter body'
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
        />
        <br></br>
        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>

        </form>
    </div>
  )
}

export default PostEdit