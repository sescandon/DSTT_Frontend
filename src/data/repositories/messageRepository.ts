import BaseRepository from "./baseRepository";

export default class MessageRepository extends BaseRepository {
  private static instance: MessageRepository;

  private constructor() {
    super();
  }

  public static getInstance(): MessageRepository {
    if (!MessageRepository.instance) {
      MessageRepository.instance = new MessageRepository();
    }

    return MessageRepository.instance;
  }

  public async createMessage(userId: number, content: string) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/CreateMessage`,
        method: "POST",
        body: { userId, content },
      });

      return result;
    } catch (error) {
      console.error("Error creating message:", error);
      return { error: error };
    }
  }

  public async deleteMessage(messageId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/DeleteMessage${messageId}`,
        method: "DELETE",
      });

      return result;
    } catch (error) {
      console.error("Error deleting message:", error);
      return { error: error };
    }
  }

  public async updateMessage(messageId: number, content: string) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/UpdateMessage${messageId}`,
        method: "PUT",
        body: { content },
      });

      return result;
    } catch (error) {
      console.error("Error updating message:", error);
      return { error: error };
    }
  }

  public async getTimelineMessages(userId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/GetTimelineMessages/${userId}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching timeline messages:", error);
      return { error: error };
    }
  }

  public async getDashboardMessages(userId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/GetDashboardMessages/${userId}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching dashboard messages:", error);
      return { error: error };
    }
  }

  public async getMessageById(messageId: number) {
    try {
      var result = await this.apiRequest({
        url: `${this.API_URL}/api/Message/GetMessage/${messageId}`,
        method: "GET",
      });

      return result;
    } catch (error) {
      console.error("Error fetching message by id:", error);
      return { error: error };
    }
  }
}
