
export interface IpAsset {
  id: string;
  name: string;
  type: 'DOCUMENT' | 'CODE' | 'PATENT' | 'LEDGER' | 'SYSTEM';
  source: string;
  status: 'SECURE' | 'PENDING' | 'FILED';
  content: string;
  hash: string;
}

export interface Account {
  name: string;
  provider: 'Google' | 'Microsoft' | 'GitHub' | 'Vercel';
  email: string;
  synced: boolean;
}

export type LegalDoc = 'Terms of Service' | 'Privacy Policy' | 'Sovereign EULA';
