export interface Apiary {
  id: string;
  name: string;
  location: string;
  notes?: string;
  createdAt: string;
}

export interface Hive {
  id: string;
  apiaryId: string;
  code: string;
  queenYear: number;
  temperament: 'calm' | 'mixed' | 'defensive';
  status: 'active' | 'weak' | 'wintering';
  notes?: string;
  createdAt: string;
}

export interface Inspection {
  id: string;
  hiveId: string;
  date: string;
  broodPattern: 'excellent' | 'good' | 'poor';
  storesLevel: 'high' | 'medium' | 'low';
  broodSeen: boolean;
  open: boolean;
  notes: string;
  inspector: string;
  createdAt: string;
}

export interface BeeData {
  apiaries: Apiary[];
  hives: Hive[];
  inspections: Inspection[];
}
