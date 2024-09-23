"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// ** generate primsa object.
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
                email,
            },
        });
        console.log(user);
    });
}
function fetchAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findMany();
        console.log(response);
    });
}
function updateUser(email, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.update({
            where: {
                email: email
            },
            data: data
        });
        console.log(response);
    });
}
function deleteUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.delete({
            where: {
                email: email
            }
        });
    });
}
function createTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todos.create({
            data: {
                user_id: userId,
                title,
                description
            }
        });
        console.log(response);
    });
}
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todos.findMany({
            where: {
                user_id: userId
            }
        });
        console.log(response);
    });
}
function getTodosWithUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.todos.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        id: true
                    }
                }
            }
        });
        console.log(response);
    });
}
function getUserDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                todos: {
                    select: {
                        title: true,
                        description: true
                    }
                }
            }
        });
        console.log(response);
    });
}
getUserDetails(1);
// ** insert a new User
// insertUser("Appudq","password","pabitra","dakua","appudq6700@gmail.com")
// ** update a user
// updateUser("appudq6700@gmail.com",{firstName:"Appudq"})
// ** find all user
// fetchAllUser();
// ** delete a user
// deleteUser("appudq6700@gmail.com")
