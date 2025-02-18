export interface Message {
   id: string;
   chatId: string;
   author: "user" | "bot";
   text: string;
   datetimeInserted: string;
   datetimeUpdated?: string;
}

export interface ChatContextType {
   messages: Message[];
   entities: Entity[];
   sendMessage: (text: string) => void;
   resetChat: () => void;
   showDescription: boolean;
   setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
   isLoginButtonBlinking: boolean; 
}

export interface AgeGroup {
   ageMin: number;
   ageMax: number;
}

export interface ContactDetails {
   phone: string | null;
   email: string | null;
   website: string | null;
   address: string | null;
   postalCode: string | null;
}

export interface Entity {
   id: string;
   name: string;
   ageGroups: AgeGroup[];
   treatmentAreas: string[];
   treatmentMethods: string[];
   highlightedAgeGroup: AgeGroup;
   highlightedTreatmentArea: string;
   highlightedTreatmentMethod: string;
   contactDetails: ContactDetails;
   description: string;
}
