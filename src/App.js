
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import Nav from './Nav'
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import PostPage from './PostPage';
import api from './api/postAPI'
import PostEdit from './PostEdit';

function App() {               
  const [posts, setPosts] = useState([]) 
  const[postTitle,setPostTitle] = useState('')
  const[postBody,setPostBody] = useState('')
  const[editTitle,setEditTitle] = useState('')
  const[editBody,setEditBody] = useState('')
  const [search,setSearch] = useState('')
  const [searchFilter,setSearchFilter] = useState([])
  const navigate = useNavigate()
  useEffect( ()=> {
    const searchResult = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase())
      ||
      post.body.toLowerCase().includes(search.toLowerCase()) )
      setSearchFilter(searchResult.reverse())
  },[posts, search])

  useEffect( () =>
  {
    const fetchAPI = async() => {
      try{
      const response = await api.get("/posts")
       setPosts(response.data)
      } catch(err){
        console.log(`Error: ${err.message}`)
      }
    }
    fetchAPI()
  },[])

  const handleSumbmite = async(e) =>{
   e.preventDefault()
   try{
 const id = posts.length ? posts[posts.length -1].id +1 : 1
 const datetime= format(new Date(), 'MMMM dd, yyyy pp')
 const newPosts ={id, title:postTitle, datetime, body:postBody }
 const response = await api.post("/posts" , newPosts)
    const allPosts = [...posts, response.data]
    setPosts(allPosts)
    setPostBody("")
    setPostTitle("")
    navigate("/")
   } catch(err) {
    console.log(`Error:${err.message}`)
   }
  }

  const handleDelete = async(id) =>{
    await api.delete(`posts/${id}`)
    const postDelete = posts.filter(post => post.id!== id) 
    setPosts(postDelete)
    navigate("/")
  }

  const handleEdit = async(id) => {

     
    try{
      const datetime= format(new Date(), 'MMMM dd, yyyy pp')
      const updatePost ={id, title:editTitle, datetime, body:editBody }
      const response = await api.put(`/posts/${id}`, updatePost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle("")
      setEditBody("")
      navigate("/")
    }catch(err){
      console.log(`Error:${err.massage}`)
    }

  }

  return (
    <div className="App">
      <Nav search={search} setSearch={setSearch} />
 <Routes>
  <Route path='/' element={<Home posts={searchFilter}  setPosts={setPosts} />} />
  <Route  path='/post' >
  <Route index element={<NewPost
   postTitle={postTitle}
   postBody={postBody}
   setPostTitle={setPostTitle}
   setPostBody={setPostBody}
   handleSumbmite={handleSumbmite} />}/>
   <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
   </Route>

   <Route  path='/edit/:id' element= 
   { <PostEdit
    posts={posts} 
    editTitle={editTitle}
    editBody={editBody}
    setEditTitle={setEditTitle}
    setEditBody={setEditBody}
    handleEdit={handleEdit}/>} 
    />
   
  
 </Routes>
    </div>
  );
}

export default App;
