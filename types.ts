
export interface IpAsset {
  id: string;
  name: string;
  type: 'DOCUMENT' | 'CODE' | 'PATENT' | 'LEDGER' | 'SYSTEM';
  source: string;
  status: 'SECURE' | 'PENDING' | 'FILED';
  content: string;
}

export interface Account {
  name: string;
  provider: 'Google' | 'Microsoft' | 'GitHub' | 'Vercel';
  email: string;
  synced: boolean;
}