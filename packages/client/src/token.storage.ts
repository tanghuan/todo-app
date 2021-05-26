let accessToken = '';

export const setToken = (token: string): void => {
  accessToken = token;
};

export const getToken = (): string => accessToken;

export const clearToken = (): void => {
  accessToken = '';
};
