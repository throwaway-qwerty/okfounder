import React from 'react'
import db from '../data/database'
import LikeButton from '../LikeButton'
import { Box, Image, Flex, Badge, Text, Button, Icon } from "@chakra-ui/core";


const Card = ({title, user, likes, ID, username, ...rest}) => {
    const { setLikes } = rest
  
    const handleLike = (ID, isLikedByCurrentUser) => {
      if (!username) alert("Please sign in!")

      db.update("posts", { ID }, post => {
        if (!isLikedByCurrentUser) {
          post.likes.push(username)
        } else {
          const likes = post.likes.filter(like => like !== username)
          post.likes = likes
        }
        return post
      })

      db.commit()
      setLikes()
    }
 
    return (
      <Box
        maxW="sm"
        mb={4}
        mt={4}
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
      >
        <Box p="6">
          <Box d="flex" alignItems="baseline" justifyContent="space-between">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
            <LikeButton likes={likes} ID={ID} handleLike={handleLike} />
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              Founded By{" "}
            </Box>
            {user}
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              Founders Interested{" "}
            </Box>
            {likes.length}
          </Box>
        </Box>
      </Box>
    )}

    export default Card