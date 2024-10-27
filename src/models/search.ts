

export interface Book {
  id: string; 
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string; 
    publishedDate: string
  };

}

export interface BookResponse {
  items: Book[];
  totalItems: number;
}

