import { PrismaClient, Prisma } from '@prisma/client'
import { getUsersWithPosts } from '@prisma/client/sql'
import { getUsersByAge } from '@prisma/client/sql'
import { getUsersByIds } from '@prisma/client/sql'

async function main() {
  let includePosts: boolean = false
  let userData: Prisma.UserCreateInput
  const prisma = new PrismaClient()

  if (includePosts) {
    userData = {
      email: 'moad@gmail.com',
      name: 'moad',
      age : 15,
      posts: {
        create: {
          title: 'Include this post!',
        },
      },
    }
  } else {
    userData = {
      email: 'moad@gmail.com',
      name: 'moad',
      age: 15
    }
  }

  const createdUser = await prisma.user.create({ data: userData })
  console.log('User Created:', createdUser)

  const allUsers = await prisma.user.findMany()
  console.log('All Users:', allUsers)

  const updateUser = await prisma.user.update({
    where: {
      email: 'viola@gmail.com',
    },
    data: {
      name: 'Viola the Magnificent',
      age: 15
    },
  })
  console.log(updateUser)

  const upsertUser = await prisma.user.upsert({
    where: {
      email: 'viola@prisma.io',
    },
    update: {
      name: 'Viola the Magnificent',
    },
    create: {
      email: 'viola@prisma.io',
      name: 'Viola the Magnificent',
      age : 15
    },
  })
  console.log(upsertUser)

  const usersWithPostCounts = await prisma.$queryRawTyped(getUsersWithPosts())
  console.log(usersWithPostCounts)

  const minAge =  18
  const maxAge =  30
  const users = await prisma.$queryRawTyped(getUsersByAge(minAge, maxAge))
console.log(users)
const userIds = [1, 2, 3]
const user = await prisma.$queryRawTyped(getUsersByIds(userIds))
console.log(user)
}

main()
