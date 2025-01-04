import { Entity } from "./ChatType";

export interface CreateChatRequest {
   model: string;
}

export interface CreateChatResponse {
   data: {
      id: string;
      title: string;
      model: string;
      entityData: Entity | object;
      datetimeInserted: string;
      datetimeUpdated: string;
   };
   successful: boolean;
   error: {
      message: string;
   };
}

export interface SendMessageRequest {
   text: string;
}

export interface SendMessageResponse {
   data: {
      text: string;
      entities: Entity[];
   };
   successful: boolean;
   error: {
      message: string;
   };
}
