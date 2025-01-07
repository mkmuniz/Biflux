import crypto from 'crypto';

export const hashToken = async (token: string): Promise<string> => {
  return crypto
    .createHash('sha512')
    .update(token)
    .digest('hex');
};

export const compareHashedTokens = async (token: string, hashedToken: string): Promise<boolean> => {
  const computedHash = await hashToken(token);
  return computedHash === hashedToken;
};