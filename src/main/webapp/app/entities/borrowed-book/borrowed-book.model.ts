import dayjs from 'dayjs/esm';
import { IBook } from 'app/entities/book/book.model';
import { IClient } from 'app/entities/client/client.model';

export interface IBorrowedBook {
  id?: number;
  borrowDate?: dayjs.Dayjs | null;
  book?: IBook;
  client?: IClient;
}

export class BorrowedBook implements IBorrowedBook {
  constructor(public id?: number, public borrowDate?: dayjs.Dayjs | null, public book?: IBook, public client?: IClient) {}
}

export function getBorrowedBookIdentifier(borrowedBook: IBorrowedBook): number | undefined {
  return borrowedBook.id;
}
