import UserRepository from "../../src/data/repositories/userRepository";
import BaseRepository from "../../src/data/repositories/baseRepository";

jest.mock('../../src/data/repositories/baseRepository', () => {
    return {
      default: class MockBaseRepository {
        protected API_URL: string = 'http://mock-api-url.com';
        apiRequest = jest.fn();
      }
    };
  });

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockApiRequest: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiRequest = jest.fn();
    (BaseRepository.prototype as jest.Mocked<BaseRepository>).apiRequest = mockApiRequest;
    (BaseRepository.prototype as any).API_URL = 'http://mock-api-url.com';
    userRepository = UserRepository.getInstance();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockResponse = { status: 200, ok: true, data: { id: 1, username: 'testuser' } };
      mockApiRequest.mockResolvedValue(mockResponse);

      const result = await userRepository.createUser('testuser');
      console.log("Result: ",result);

      expect(mockApiRequest).toHaveBeenCalledWith({
        url: 'http://mock-api-url.com/api/User/CreateUser',
        method: 'POST',
        body: { username: 'testuser' },
      });
      expect(result).toEqual(mockResponse);
    });
  });
});