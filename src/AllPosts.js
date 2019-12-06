import React, { useEffect, useState } from "react"
import { Text } from "@chakra-ui/core"
import db from "./data/database"
import Card from "./ui/Card"

const AllPosts = ({ username }) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    return fetchPosts()
  }, [])

  // Maybe add sorting functionality in the future
  const fetchPosts = () => {
    const posts = db.queryAll("posts", {
      query: (post) => {
        const user = new URLSearchParams(window.location.search).get("user")
        if (user) {
          return post.user === user
        } else {
          return true
        }
      }
    })
    setPosts(posts)
  }

  return posts ? (
    posts.map((post, index) => (
      <Card {...post} key={index} username={username} fetchPosts={fetchPosts}></Card>
    ))
  ) : (
    <Text>Getting Posts...</Text>
  )
}

export default AllPosts
