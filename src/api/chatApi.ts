import { Entity } from '../types/ChatType';
import api from './index';

interface CreateChatRequest {
  model: string;
}

interface CreateChatResponse {
  data: {
    id: string;
    title: string;
    model: string;
    entityData: Entity;
    datetimeInserted: string;
    datetimeUpdated: string;
  };
  successful: boolean;
  error: {
    message: string;
  };
}

export const createChat = async (): Promise<CreateChatResponse> => {
  const requestData: CreateChatRequest = {
    model: 'gpt-4o-mini',
  };
  try {
    const response = await api.post<CreateChatResponse>('/api/chat', requestData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating chat:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to create chat');
  }
};
