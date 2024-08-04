import BaseRepository from "./baseRepository";

export default class UserRepository extends BaseRepository {
  private static instance: UserRepository;

  private constructor() {
    super();
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }

  public async getUsers() {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/GetAllUsers`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { error: error };
    }
  }

  public async createUser(username: string) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/CreateUser`,
        method: "POST",
        body: { username },
      });

      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: error };
    }
  }

  public async getUser(id: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/GetUserById${id}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching user:", error);
      return { error: error };
    }
  }

  public async getUserByName(username: string) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/GetUserByUsername${username}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching user:", error);
      return { error: error };
    }
  }

  public async updateUser(username: string, userId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/EditUser/${userId}`,
        method: "PUT",
        body: { username },
      });

      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      return { error: error };
    }
  }

  public async deleteUser(userId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/User/DeleteUser/${userId}`,
        method: "DELETE",
      });

      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
      return { error: error };
    }
  }
}
