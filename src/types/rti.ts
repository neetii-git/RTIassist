export interface Authority {
  id: number;
  name: string;
  pio: string;
  description: string;
  portal?: string;
  isOfflineOnly?: boolean;
}

export interface MatchResult {
  authorityId: number;
  confidence: number;
  reasoning: string;
}

export interface AnalyzeResponse {
  authority: Authority;
  draft: string;
  confidence: string;
  successProbability: string;
  reasoning: string;
  evidenceChecklist: string[];
  complaint: string;
  language: string;
}
