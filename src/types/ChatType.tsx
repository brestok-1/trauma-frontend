export interface Message {
  id: string;
  chatId: string;
  author: 'user' | 'bot';
  text: string;
  datetimeInserted: string;
  datetimeUpdated?: string;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

export interface AgeGroup {
  ageMin: number;
  ageMax: number;
}

export interface ContactDetails {
  phone: string;
  email: string;
  website: string;
  address: string;
  postalCode: string;
}

export interface Entity {
  id: string;
  name: string;
  ageGroups: AgeGroup[];
  treatmentAreas: string[];
  treatmentMethods: string[];
  contactDetails: ContactDetails;
}



