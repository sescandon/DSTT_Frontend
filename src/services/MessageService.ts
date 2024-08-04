import MessageRepository from "../data/repositories/messageRepository";

export default class MessageService {
  private static instance: MessageService | null = null;
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = MessageRepository.getInstance();
  }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  public async createMessage(
    userId: number,
    content: string
  ) {
    try {
      var result = await this.messageRepository.createMessage(
        userId,
        content
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }

  public async getTimelineMessages(userId: number) {
    try {
      var result = await this.messageRepository.getTimelineMessages(
        userId
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }

  public async getDashboardMessages(userId: number) {
    try {
      var result = await this.messageRepository.getDashboardMessages(
        userId
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }

  public async getMessage(messageId: number) {
    try {
      var result = await this.messageRepository.getMessageById(
        messageId
      );
      return result;
    } catch (error) {
      return { error: error };
    }
  }

}
