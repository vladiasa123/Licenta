export interface DecodedToken {
    iss: string;
    aud: string;
    iat: number;
    exp: number;
    data: {
      AccountType: number;
      firstName: string;
      id: number;
      lastName: string;
      userEmail: string;
    };
  }
  