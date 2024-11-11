import UserRepository from "../repositories/UserRepository";

const userRepository = new UserRepository();

export async function loginService(username: string, password: string) {
    const result = await userRepository.search({ where: { username, password }, select: { ID: true, roleID: true } });
    if (result.length === 0)
        return { status: false, message: "Incorrect Username or Password" };
    else
        return { status: true, message: "User Found", result };
}