export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string | null;
  phone?: string | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public address?: string | null,
    public phone?: string | null
  ) {}
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
