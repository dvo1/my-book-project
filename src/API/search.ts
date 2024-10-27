import API from ".";
import { Book, BookResponse } from "../models/search";

export const getSearchResults = async ({
  searchQuery,
  startIndex,
  resultsPerPage,
}: {
  searchQuery: string;
  startIndex: number;
  resultsPerPage: number;
}): Promise<BookResponse> => {
  const response = await API.get<BookResponse>(
    `/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${resultsPerPage}`
  );

  if (!response) {
    throw new Error("Failed to fetch data");
  }

  return response.data;
};

export const getBookDetail = async ({ id }: { id: string }): Promise<Book> => {
  const response = await API.get<Book>(`/v1/volumes/${id}`);

  if (!response) {
    throw new Error("Failed to fetch data");
  }

  return response.data;
};
