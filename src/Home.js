import React from 'react'
import Feed from './Feed'

function Home({posts}) {
  return (
    <div>
        
        { posts.length ? <Feed posts={posts} /> :<p> no post is display</p>}
    </div>
  )
}

export default Home