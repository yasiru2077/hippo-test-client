import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Posts from '../../components/posts/Posts'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'

export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts"+search);
      setPosts(res.data);
    }
    fetchPosts()
  }, [search]);
  return (
    <div className='Home'>
      <NavBar/>
      <div>
      <Posts posts={posts}/>
      </div>
    </div>
  )
}
