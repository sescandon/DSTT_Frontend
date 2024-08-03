import BaseRepository from "./baseRepository";

export default class FollowRepository extends BaseRepository {
  private static instance: FollowRepository;

  private constructor() {
    super();
  }

  public static getInstance(): FollowRepository {
    if (!FollowRepository.instance) {
      FollowRepository.instance = new FollowRepository();
    }

    return FollowRepository.instance;
  }

  public async followUser(followerId: number, followedId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Follow/FollowUser`,
        method: "POST",
        body: { followedId, followerId },
      });

      return result;
    } catch (error) {
      console.error("Error following user:", error);
      return { error: error };
    }
  }

  public async unfollowUser(followerId: number, followedId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Follow/UnfollowUser`,
        method: "POST",
        body: { followedId, followerId },
      });

      return result;
    } catch (error) {
      console.error("Error unfollowing user:", error);
      return { error: error };
    }
  }

  public async getFollowers(userId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Follow/GetFollowers${userId}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching followers:", error);
      return { error: error };
    }
  }

    public async getFollowing(userId: number) {
        try {
        var result = await this.apiRequest({
            url: `${this.API_URL}/api/Follow/GetFollowing${userId}`,
            method: "GET",
        });
    
        return result;
        } catch (error) {
        console.error("Error fetching following:", error);
        return { error: error };
        }
    }

    public async isFollowing(followerId: number, followedId: number) {
        try {
        var result = await this.apiRequest({
            url: `${this.API_URL}/api/Follow/IsFollowing/${followerId}/${followedId}`,
            method: "GET",
        });
    
        return result;
        } catch (error) {
        console.error("Error checking if following:", error);
        return { error: error };
        }
    }
}
