import { IAuthor } from 'app/entities/author/author.model';

export interface IBook {
  id?: number;
  isbn?: string;
  name?: string;
  publishYear?: string | null;
  copies?: number;
  coverContentType?: string | null;
  cover?: string | null;
  author?: IAuthor;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public isbn?: string,
    public name?: string,
    public publishYear?: string | null,
    public copies?: number,
    public coverContentType?: string | null,
    public cover?: string | null,
    public author?: IAuthor
  ) {}
}

export function getBookIdentifier(book: IBook): number | undefined {
  return book.id;
}
