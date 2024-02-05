import React from 'react'

function NewPost({postTitle,postBody,setPostTitle,setPostBody,handleSumbmite}) {
  return (
    <div>
    <h1> New Post</h1>
      <form onSubmit={handleSumbmite}>
        <input
        autoFocus
        type='text'
        id='postTile'
        value={postTitle}
        placeholder='enter title'
        required
        onChange={(e) => setPostTitle(e.target.value)}
        /><br></br>
        <textarea 
        autoFocus
        id="postBody"
        placeholder='exter body'
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>

</form>
  </div>
    
  )
}

export default NewPost