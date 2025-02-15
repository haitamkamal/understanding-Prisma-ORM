import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(params) {
  const user = await prisma.user.create({
    data:{
      email:'tahiri@gmail.com',
      name:'tahiri',
      posts:{
        create:[
        {
          title:'my first day at shcool',
          categories:{
            create:{
              name:'Office',
            },
          },
        },
        {
          title:'How to connect to postgres sql database',
          categories:{
              create:[{name:'database'},{name:'tuto'}],
          },
        },
       ],
      },
    },
  })
  const returnUser = await prisma.user.findMany({
    where :{
      id : user.id,
    },
    include:{
      posts:{
        include:{
          categories:true,
        },
      },
    },
  })
  console.log(returnUser)
}
main()