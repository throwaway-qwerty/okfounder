import React, { useEffect, useState } from "react"
import { Text } from "@chakra-ui/core"
import db from "./data/database"
import Card from "./ui/Card"

const AllPosts = ({ username }) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    return fetchPosts()
  }, [])

  const fetchPosts = () => {
    const posts = db.queryAll("posts")
    setPosts(posts)
  }

  return posts ? (
    posts.map((post, index) => (
      <Card {...post} key={index} username={username} setLikes={fetchPosts}></Card>
    ))
  ) : (
    <Text>Getting Posts...</Text>
  )
}

export default AllPosts
