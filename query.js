import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function GetAllUser() {
  const allUser = await prisma.user.findMany({
    where:{
      or:[
        {title:{contains :'JavaScript'}},
        {content:{contains:'Backend development'}},
      ],
    },
    include: { posts: true },
  })
}
async function CreateUser() {
    const user = await prisma.user.create({
      data:{
        name:'alex',
        email:'alex@gmail.com',
        posts:{
          create:{title:'Exploring Prisma ORM in Modern Applications'}
        }
      }
    })
}
async function updateUser() {
  const post = await prisma.post.update({
    where:{id:50},
    data:{published:true}
  })
}