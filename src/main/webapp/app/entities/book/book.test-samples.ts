import { IBook, NewBook } from './book.model';

export const sampleWithRequiredData: IBook = {
  id: 37098,
  isbn: 'Jewelery',
  name: 'Account',
  publishYear: 'Rhode bandwidth Fresh',
  copies: 85793,
};

export const sampleWithPartialData: IBook = {
  id: 41155,
  isbn: 'Arkansas Smal',
  name: 'Borders overriding Markets',
  publishYear: 'implement Toys Naira',
  copies: 29693,
};

export const sampleWithFullData: IBook = {
  id: 5866,
  isbn: 'global invoic',
  name: 'Metal e-business Forge',
  publishYear: 'Louisiana face',
  copies: 6361,
};

export const sampleWithNewData: NewBook = {
  isbn: 'haptic Credit',
  name: 'District',
  publishYear: 'Direct purple',
  copies: 75060,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
