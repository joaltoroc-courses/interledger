import { join as pathJoin } from 'path';

export const decode = (value?: string): string => {
  if (!value) {
    return '';
  }
  return Buffer.from(value, 'base64').toString('ascii');
};

export const join = (
  type: 'https' | 'wallet',
  baseUrl: string,
  ...paths: string[]
): string => {
  const protocolMatch = RegExp(/^([a-zA-Z]+:)\/\//).exec(baseUrl);
  const protocol = protocolMatch ? protocolMatch[0] : '';
  const base = baseUrl.substring(protocol.length);

  const result = pathJoin(base, ...paths);

  if (type === 'wallet') {
    return '$' + result;
  }

  return protocol ? `${protocol}${result}` : `https://${result}`;
};
