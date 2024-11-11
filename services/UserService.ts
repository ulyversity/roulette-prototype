import { Users } from "@prisma/client";
import UserRepository from "../repositories/UserRepository";


const userRepository = new UserRepository();

export async function getUsersService() {
    return await userRepository.getAll();
};

export async function createUserService(userData: Partial<Users>) {
    const user = await userRepository.search({
        where: {
            OR: [
                { email: userData.email },
                { username: userData.username }
            ]
        }
    });
    const isEmailAndUsernameUnique = user.length === 0;
    if (!isEmailAndUsernameUnique) {
        if (user[0].email === userData.email) {
            return { success: false, message: "This email is already associated with an account." };
        }
        else if (user[0].username === userData.username) {
            return { success: false, message: "Username is taken." };
        }
    }


    // prisma :>
    let date: string = "";
    if (userData.birthdate === null || userData.birthdate === undefined)
        date = new Date().toLocaleDateString();
    else
        date = userData.birthdate?.toString();

    userData.birthdate = new Date(date);

    try {
        await userRepository.add(userData);
    }
    catch (err) {
        if (err instanceof Error) {
            return { success: false, message: "Missing Details" };
        }
    }

    return { success: true, message: "Username created successfully!" };
};

export async function getUserByIdService(userid: number) {
    const user = await userRepository.findById(userid);
    if (user === null) {
        return { success: false, message: "User not found!" }
    }
    return { success: true, message: "User found successfully!", user };
};

export async function updateUserService(userid: number, updateData: Partial<Users>) {
    const user = await getUserByIdService(userid);
    if (user.success === false) {
        return { success: false, message: "User not found!" };
    }
    await userRepository.update(userid, updateData);
    return { success: true, message: "User updated successfully!" };
};

export async function patchUserService(userid: number, updateData: Partial<Users>) {
    return updateUserService(userid, updateData);
};
