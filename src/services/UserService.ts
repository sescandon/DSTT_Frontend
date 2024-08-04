import UserRepository from "../data/repositories/userRepository";

export default class UserService {
    private static instance: UserService | null = null;
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async getAllUsers() {
        try {
            var result = await this.userRepository.getUsers();
            return result;
        } catch (error) {
            return { error: error };
        }
    }
};