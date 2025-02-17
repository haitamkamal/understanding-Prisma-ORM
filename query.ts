import { PrismaClient, Prisma } from '@prisma/client'

// Initialize the PrismaClient
const prisma = new PrismaClient()

// Async function to execute the database operations
async function main() {
  
  // Flag to conditionally decide whether to include posts when creating a user
  let includePosts: boolean = false
  let userData: Prisma.UserCreateInput  // Declare variable to hold user data

  // Check if posts should be included in the user creation
  if (includePosts) {
    // If includePosts is true, create a user with posts
    userData = {
      email: 'moad@gmail.com',  // Email of the new user
      name: 'moad',             // Name of the new user
      posts: {
        create: {               // Create a post as part of the user
          title: 'Include this post!',  // Title of the post
        },
      },
    }
  } else {
    // If includePosts is false, just create the user without posts
    userData = {
      email: 'moad@gmail.com',  // Email of the new user
      name: 'moad',             // Name of the new user
    }
  }

  // Create the user and log the result
  const createdUser = await prisma.user.create({ data: userData })
  console.log('User Created:', createdUser)

  // Fetch all users and log the result
  const allUsers = await prisma.user.findMany()
  console.log('All Users:', allUsers)

  // Update an existing user (using email as the identifier) and log the updated user
  const updateUser = await prisma.user.update({
    where: {
      email: 'viola@gmail.com',  // Email of the user to update
    },
    data: {
      name: 'Viola the Magnificent',  // New name for the user
    },
  })
  console.log(updateUser)

  // Upsert operation: if a user exists with the given email, update it; otherwise, create a new user
  const upsertUser = await prisma.user.upsert({
    where: {
      email: 'viola@prisma.io',  // Email to search for the user
    },
    update: {
      name: 'Viola the Magnificent',  // New name if user exists
    },
    create: {
      email: 'viola@prisma.io',  // Email for the new user
      name: 'Viola the Magnificent',  // Name for the new user
    },
  })
  console.log(upsertUser)  // Log the result of the upsert operation
}

// Call the main function to execute the above operations
main()
