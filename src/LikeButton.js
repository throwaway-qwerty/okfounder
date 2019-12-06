import React from 'react'
import { FaHeart } from "react-icons/fa"

const LikeButton = ({ likes, ID, handleLike }) => {
  const username = localStorage.getItem("username") || null
  const isLikedByCurrentUser = !!likes.find(like => like === username)
  
  return <FaHeart cursor="pointer" color={isLikedByCurrentUser ? 'tomato' : 'gray'} onClick={() => handleLike(ID, isLikedByCurrentUser) } />
}

export default LikeButton