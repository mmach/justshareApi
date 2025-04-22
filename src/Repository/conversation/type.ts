import { IConversationRepository } from "./conversationRepository.js";
import { IConversationMessagesRepository } from "./conversationMessagesRepository.js";
import { IConversationMessagesMembersRepository } from "./conversationMessagesMembersRepository.js";

export type CONVERSATION_REPOSITORY = {
  conversationRepositoryDI: IConversationRepository;
  conversationMessagesRepositoryDI: IConversationMessagesRepository;
  conversationMessagesMembersRepositoryDI: IConversationMessagesMembersRepository;
};