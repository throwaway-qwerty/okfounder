import React from 'react'
import { Icon } from '@chakra-ui/core'

const LikeButton = ({ likes, ID, handleLike }) => {
  const username = localStorage.getItem("username") || null
  const isLikedByCurrentUser = !!likes.find(like => like === username)
  
  return <Icon cursor="pointer" name="star" color={isLikedByCurrentUser ? 'gold' : ''} onClick={() => handleLike(ID, isLikedByCurrentUser) } />
}

export default LikeButton