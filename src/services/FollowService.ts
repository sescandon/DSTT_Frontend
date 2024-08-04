import FollowRepository from "../data/repositories/followRepository";

export default class FollowService {
  private static instance: FollowService | null = null;
  private followRepository: FollowRepository;

  constructor() {
    this.followRepository = FollowRepository.getInstance();
  }

  public static getInstance(): FollowService {
    if (!FollowService.instance) {
      FollowService.instance = new FollowService();
    }
    return FollowService.instance;
  }

  public async followUser(followerId: number, followedId: number) {
    try {
      var result = await this.followRepository.followUser(
        followerId,
        followedId
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }

  public async unfollowUser(followerId: number, followedId: number) {
    try {
      var result = await this.followRepository.unfollowUser(
        followerId,
        followedId
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }
}
