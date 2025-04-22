import { IBaseRepositoryType } from "../../Architecture";
import { ConversationDBO } from "../../DBO";
import { Conversation } from "../../Domain";

export interface IConversationRepository extends IBaseRepositoryType<ConversationDBO, Conversation> {
  getUserConversation({
    conv_id,
    iua_id,
    last_msg,
    size,
    transaction
  }: {
    conv_id: string;
    iua_id: string;
    last_msg: string;
    size: number;
    transaction?: number;
  }): Promise<object[]>;

  getMessages({
    conv_id,
    message_list_id,
    transaction
  }: {
    conv_id: string;
    message_list_id: any[];
    transaction?: number;
  }): Promise<Conversation[]>;

  getUserConversations({
    conv_id,
    iua_id,
    page,
    size,
    status,
    transaction
  }: {
    conv_id: string;
    iua_id: string;
    page: number;
    size: number;
    status: string;
    transaction?: number;
  }): Promise<Conversation[]>;

  getUserConversationInfo({
    conversation_id,
    iua_id,
    transaction
  }: {
    conversation_id: string;
    iua_id: string;
    transaction?: number;
  }): Promise<Conversation[]>;

  closeConversation({
    id,
    iua_id,
    transaction
  }: {
    id: string;
    iua_id: string;
    transaction?: number;
  }): Promise<[affectedCount: number]>;

  setStatusConversation({
    iua_id,
    status,
    transaction
  }: {
    iua_id: string;
    status: string;
    transaction?: number;
  }): Promise<[affectedCount: number]>;
}

