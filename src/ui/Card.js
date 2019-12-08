import React from 'react'
import db from '../data/database'
import LikeButton from '../LikeButton'
import { Box, Badge, Icon, Link } from "@chakra-ui/core";


const Card = ({title, user, likes, ID, ratings, ...rest}) => {
    const { fetchPosts, username } = rest

    const rating = ratings.length ? Math.floor(ratings.reduce((x = 0, y) => x + y) / ratings.length) : 0
  
    const handleLike = (ID, isLikedByCurrentUser) => {
      if (!username) alert("Please sign in!")

      db.update("posts", { ID, user }, post => {
        if (user === username) {
          alert("Sorry, you can't like your own Post.")
          return
        }
        if (!isLikedByCurrentUser) {
          post.likes.push(username)
        } else {
          const likes = post.likes.filter(like => like !== username)
          post.likes = likes
        }
        return post
      })

      db.commit()
      fetchPosts()
    }

    // Rating system is pretty bad, same user can rate multiple times
    const handleRating = (n) => {
      db.update("posts", { ID }, post => {
        post.ratings.push(n)
      })

      db.commit()
      fetchPosts()
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
            {likes.length === 0 ? 0 : likes.map((like, i) => {
              return (
                <>
                  <Link href={`all-posts?user=${like}`}>{like}</Link>
                  {likes.length - 1 !== i && ", "}
                </>
              )
            })}
          </Box>
          <Box d="flex" mt="2" alignItems="center">	      
            {Array(5)	            
              .fill("")	          
              .map((_, i) => (	
                <Icon	
                  name="star"	
                  key={i}	
                  cursor="pointer"
                  color={i < rating ? "teal.500" : "gray.300"}	
                  onClick={() => handleRating(i + 1)}
                />	
              ))}	
            <Box as="span" ml="2" color="gray.600" fontSize="sm">	
              {ratings.length} reviews	
            </Box>
          </Box>
        </Box>
      </Box>
    )}

    export default Card