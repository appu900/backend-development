import { PrismaClient } from "@prisma/client";


interface userResponse{
    id:number,
    username:string,
    password:string,
    firstName:string,
    lastName:string,
    email:string
}

// ** generate primsa object.
const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
      email,
    },
  });
  console.log(user)
}

async function fetchAllUser() {
    const response = await prisma.user.findMany();
    console.log(response)
}

async function updateUser(email:string,data:any) {
    const response = await prisma.user.update({
        where:{
            email:email
        },
        data:data
    })
    console.log(response)
}

async function deleteUser(email:string) {
    const response = await prisma.user.delete({
        where:{
            email:email
        }
    })
}

async function createTodo(userId:number,title:string,description:string) {
    const response = await prisma.todos.create({
        data:{
            user_id:userId,
            title,
            description
        }
    })
    console.log(response)
}


async function getTodos(userId:number) {
    const response = await prisma.todos.findMany({
        where:{
            user_id:userId
        }
    })
    console.log(response)
}

async function getTodosWithUserDetails(userId:number) {
    const response = await prisma.todos.findMany({
        where:{
            user_id:userId
        },
        select:{
            id:true,
            title:true,
            description:true,
            user:{
                select:{
                    firstName:true,
                    lastName:true,
                    id:true
                }
            }
        }
    })

    console.log(response)
}


async function getUserDetails(userId:number) {
    const response = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            firstName:true,
            lastName:true,
            email:true,
            todos:{
                select:{
                    title:true,
                    description:true
                }
            }
        }
    })
    console.log(response)
}

getUserDetails(1)








// ** insert a new User
// insertUser("Appudq","password","pabitra","dakua","appudq6700@gmail.com")

// ** update a user
// updateUser("appudq6700@gmail.com",{firstName:"Appudq"})

// ** find all user
// fetchAllUser();

// ** delete a user
// deleteUser("appudq6700@gmail.com")