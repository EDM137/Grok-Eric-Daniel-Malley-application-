
export interface IpAsset {
  id: string;
  name: string;
  type: 'DOCUMENT' | 'CODE' | 'PATENT' | 'LEDGER' | 'SYSTEM' | 'PDF' | 'IMAGE';
  source: string;
  status: 'SOVEREIGN' | 'FILED' | 'PENDING' | 'QUARANTINED';
  content: string;
  contentUrl?: string;
  metadata: {
    hash: string;
    timestamp: string;
    fortifile: string;
    pi_score: number;
    grok_verdict: string;
  };
}

export interface Account {
  name: string;
  provider: 'Google' | 'Microsoft' | 'GitHub' | 'Vercel';
  email: string;
  synced: boolean;
}

export type LegalDoc = 'Terms of Service' | 'Privacy Policy' | 'Sovereign EULA';
