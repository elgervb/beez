import { Injectable, signal } from '@angular/core';
import { Apiary, BeeData, Hive, Inspection } from './models';

const STORAGE_KEY = 'beez-data-v1';
const SNAPSHOTS_KEY = 'beez-snapshots-v1';
const PENDING_LOCAL_CHANGES_KEY = 'beez-pending-local';

export type ImportMode = 'replace' | 'merge';

export interface ImportPreview {
  counts: { apiaries: number; hives: number; inspections: number };
  duplicates: { apiaries: number; hives: number; inspections: number };
  conflicts: {
    apiaries: Array<{ id: string; existing: string; incoming: string }>;
    hives: Array<{ id: string; existing: string; incoming: string }>;
    inspections: Array<{ id: string; existing: string; incoming: string }>;
  };
}

export interface IntegrityReport {
  orphanHives: number;
  orphanInspections: number;
}

export interface IntegrityRepairResult {
  before: IntegrityReport;
  after: IntegrityReport;
}

export interface DataSnapshot {
  id: string;
  createdAt: string;
  reason: string;
  data: BeeData;
}

export interface DeletedApiaryBundle {
  apiary: Apiary;
  hives: Hive[];
  inspections: Inspection[];
}

export interface DeletedHiveBundle {
  hive: Hive;
  inspections: Inspection[];
}

@Injectable({ providedIn: 'root' })
export class BeeStore {
  private readonly _data = signal<BeeData>(this.load());

  getData(): BeeData {
    return this._data();
  }

  exportData(): BeeData {
    return structuredClone(this._data());
  }

  previewImport(candidate: unknown): ImportPreview | null {
    const normalized = this.normalizeData(candidate, true);
    if (!normalized) return null;

    const existing = this._data();
    const apiaryMap = new Map(existing.apiaries.map((a) => [a.id, a]));
    const hiveMap = new Map(existing.hives.map((h) => [h.id, h]));
    const inspectionMap = new Map(existing.inspections.map((i) => [i.id, i]));
    const apiaryIds = new Set(apiaryMap.keys());
    const hiveIds = new Set(hiveMap.keys());
    const inspectionIds = new Set(inspectionMap.keys());

    return {
      counts: {
        apiaries: normalized.apiaries.length,
        hives: normalized.hives.length,
        inspections: normalized.inspections.length
      },
      duplicates: {
        apiaries: normalized.apiaries.filter((a) => apiaryIds.has(a.id)).length,
        hives: normalized.hives.filter((h) => hiveIds.has(h.id)).length,
        inspections: normalized.inspections.filter((i) => inspectionIds.has(i.id)).length
      },
      conflicts: {
        apiaries: normalized.apiaries
          .filter((a) => apiaryIds.has(a.id))
          .slice(0, 10)
          .map((a) => ({
            id: a.id,
            existing: `${apiaryMap.get(a.id)?.name ?? ''} · ${apiaryMap.get(a.id)?.location ?? ''}`,
            incoming: `${a.name} · ${a.location}`
          })),
        hives: normalized.hives
          .filter((h) => hiveIds.has(h.id))
          .slice(0, 10)
          .map((h) => ({
            id: h.id,
            existing: `${hiveMap.get(h.id)?.code ?? ''} · ${hiveMap.get(h.id)?.status ?? ''}`,
            incoming: `${h.code} · ${h.status}`
          })),
        inspections: normalized.inspections
          .filter((i) => inspectionIds.has(i.id))
          .slice(0, 10)
          .map((i) => ({
            id: i.id,
            existing: `${inspectionMap.get(i.id)?.date ?? ''} · ${inspectionMap.get(i.id)?.inspector ?? ''}`,
            incoming: `${i.date} · ${i.inspector}`
          }))
      }
    };
  }

  getIntegrityReport(): IntegrityReport {
    const data = this._data();
    const apiaryIds = new Set(data.apiaries.map((a) => a.id));
    const hiveIds = new Set(data.hives.map((h) => h.id));
    return {
      orphanHives: data.hives.filter((h) => !apiaryIds.has(h.apiaryId)).length,
      orphanInspections: data.inspections.filter((i) => !hiveIds.has(i.hiveId)).length
    };
  }

  repairIntegrity(): IntegrityRepairResult {
    const before = this.getIntegrityReport();
    if (before.orphanHives === 0 && before.orphanInspections === 0) {
      return { before, after: before };
    }

    this.createSnapshot('before-integrity-repair');
    this._data.update((d) => {
      const apiaryIds = new Set(d.apiaries.map((a) => a.id));
      const hives = d.hives.filter((h) => apiaryIds.has(h.apiaryId));
      const hiveIds = new Set(hives.map((h) => h.id));
      const inspections = d.inspections.filter((i) => hiveIds.has(i.hiveId));
      return { ...d, hives, inspections };
    });
    this.persist();
    return { before, after: this.getIntegrityReport() };
  }

  importData(candidate: unknown, mode: ImportMode = 'replace'): boolean {
    const normalized = this.normalizeData(candidate, true);
    if (!normalized) return false;

    this.createSnapshot(`before-import-${mode}`);

    if (mode === 'replace') {
      this._data.set(normalized);
    } else {
      const merged = this.mergeData(this._data(), normalized);
      this._data.set(merged);
    }

    this.persist();
    return true;
  }

  listSnapshots(): DataSnapshot[] {
    return this.loadSnapshots();
  }

  restoreSnapshot(id: string): boolean {
    const snapshot = this.loadSnapshots().find((s) => s.id === id);
    if (!snapshot) return false;
    this._data.set(snapshot.data);
    this.persist();
    return true;
  }

  addApiary(payload: Pick<Apiary, 'name' | 'location' | 'notes'>): void {
    const apiary: Apiary = {
      id: crypto.randomUUID(),
      name: payload.name.trim(),
      location: payload.location.trim(),
      notes: payload.notes?.trim(),
      createdAt: new Date().toISOString()
    };
    this._data.update((d) => ({ ...d, apiaries: [apiary, ...d.apiaries] }));
    this.persist();
  }

  updateApiary(id: string, payload: Pick<Apiary, 'name' | 'location' | 'notes'>): void {
    this._data.update((d) => ({
      ...d,
      apiaries: d.apiaries.map((a) =>
        a.id === id ? { ...a, name: payload.name.trim(), location: payload.location.trim(), notes: payload.notes?.trim() } : a
      )
    }));
    this.persist();
  }

  deleteApiary(id: string): DeletedApiaryBundle | null {
    if (!this._data().apiaries.some((a) => a.id === id)) return null;
    this.createSnapshot('before-delete-apiary');
    let deleted: DeletedApiaryBundle | null = null;
    this._data.update((d) => {
      const apiary = d.apiaries.find((a) => a.id === id);
      if (!apiary) return d;
      const hives = d.hives.filter((h) => h.apiaryId === id);
      const hiveIds = new Set(hives.map((h) => h.id));
      const inspections = d.inspections.filter((i) => hiveIds.has(i.hiveId));
      deleted = { apiary, hives, inspections };
      return {
        apiaries: d.apiaries.filter((a) => a.id !== id),
        hives: d.hives.filter((h) => h.apiaryId !== id),
        inspections: d.inspections.filter((i) => !hiveIds.has(i.hiveId))
      };
    });
    if (deleted) this.persist();
    return deleted;
  }

  restoreApiaryBundle(bundle: DeletedApiaryBundle): void {
    this._data.update((d) => ({
      apiaries: [bundle.apiary, ...d.apiaries.filter((a) => a.id !== bundle.apiary.id)],
      hives: [...bundle.hives.filter((h) => !d.hives.some((existing) => existing.id === h.id)), ...d.hives],
      inspections: [...bundle.inspections.filter((i) => !d.inspections.some((existing) => existing.id === i.id)), ...d.inspections]
    }));
    this.persist();
  }

  addHive(payload: Pick<Hive, 'apiaryId' | 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>): void {
    const hive: Hive = {
      id: crypto.randomUUID(),
      apiaryId: payload.apiaryId,
      code: payload.code.trim().toUpperCase(),
      queenYear: payload.queenYear,
      temperament: payload.temperament,
      status: payload.status,
      notes: payload.notes?.trim() || undefined,
      createdAt: new Date().toISOString()
    };
    this._data.update((d) => ({ ...d, hives: [hive, ...d.hives] }));
    this.persist();
  }

  updateHive(id: string, payload: Pick<Hive, 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>): void {
    this._data.update((d) => ({
      ...d,
      hives: d.hives.map((h) =>
        h.id === id
          ? { ...h, code: payload.code.trim().toUpperCase(), queenYear: payload.queenYear, temperament: payload.temperament, status: payload.status, notes: payload.notes?.trim() || undefined }
          : h
      )
    }));
    this.persist();
  }

  deleteHive(id: string): DeletedHiveBundle | null {
    if (!this._data().hives.some((h) => h.id === id)) return null;
    this.createSnapshot('before-delete-hive');
    let deleted: DeletedHiveBundle | null = null;
    this._data.update((d) => {
      const hive = d.hives.find((h) => h.id === id);
      if (!hive) return d;
      const inspections = d.inspections.filter((i) => i.hiveId === id);
      deleted = { hive, inspections };
      return {
        ...d,
        hives: d.hives.filter((h) => h.id !== id),
        inspections: d.inspections.filter((i) => i.hiveId !== id)
      };
    });
    if (deleted) this.persist();
    return deleted;
  }

  restoreHiveBundle(bundle: DeletedHiveBundle): void {
    this._data.update((d) => ({
      ...d,
      hives: [bundle.hive, ...d.hives.filter((h) => h.id !== bundle.hive.id)],
      inspections: [...bundle.inspections.filter((i) => !d.inspections.some((existing) => existing.id === i.id)), ...d.inspections]
    }));
    this.persist();
  }

  addInspection(payload: Omit<Inspection, 'id' | 'createdAt'>): void {
    const inspection: Inspection = {
      ...payload,
      honeyLevel: this.normalizeHoneyLevel(payload.honeyLevel, payload.storesLevel),
      notes: payload.notes.trim(),
      inspector: payload.inspector.trim(),
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    this._data.update((d) => ({ ...d, inspections: [inspection, ...d.inspections] }));
    this.persist();
  }

  updateInspection(id: string, payload: Omit<Inspection, 'id' | 'createdAt' | 'hiveId'>): void {
    this._data.update((d) => ({
      ...d,
      inspections: d.inspections.map((i) =>
        i.id === id
          ? {
              ...i,
              ...payload,
              honeyLevel: this.normalizeHoneyLevel(payload.honeyLevel, payload.storesLevel),
              notes: payload.notes.trim(),
              inspector: payload.inspector.trim()
            }
          : i
      )
    }));
    this.persist();
  }

  deleteInspection(id: string): Inspection | null {
    if (!this._data().inspections.some((i) => i.id === id)) return null;
    this.createSnapshot('before-delete-inspection');
    let deleted: Inspection | null = null;
    this._data.update((d) => {
      deleted = d.inspections.find((i) => i.id === id) ?? null;
      if (!deleted) return d;
      return { ...d, inspections: d.inspections.filter((i) => i.id !== id) };
    });
    if (deleted) this.persist();
    return deleted;
  }

  restoreInspection(inspection: Inspection): void {
    this._data.update((d) => ({
      ...d,
      inspections: [inspection, ...d.inspections.filter((i) => i.id !== inspection.id)]
    }));
    this.persist();
  }

  reset(): void {
    this._data.set({ apiaries: [], hives: [], inspections: [] });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(PENDING_LOCAL_CHANGES_KEY, '0');
  }

  private load(): BeeData {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { apiaries: [], hives: [], inspections: [] };
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      return this.normalizeData(parsed, false) ?? { apiaries: [], hives: [], inspections: [] };
    } catch {
      return { apiaries: [], hives: [], inspections: [] };
    }
  }

  private normalizeData(candidate: unknown, strict: boolean): BeeData | null {
    if (!candidate || typeof candidate !== 'object') return null;
    const data = candidate as Partial<BeeData>;
    if (strict) {
      if (!Array.isArray(data.apiaries) || !Array.isArray(data.hives) || !Array.isArray(data.inspections)) {
        return null;
      }
    }
    const apiaries = Array.isArray(data.apiaries) ? data.apiaries : [];
    const hives = Array.isArray(data.hives) ? data.hives : [];
    const inspections = Array.isArray(data.inspections) ? data.inspections : [];

    if (!apiaries.every((a) => this.isApiary(a))) return null;
    if (!hives.every((h) => this.isHive(h))) return null;
    if (!inspections.every((i) => this.isInspection(i))) return null;

    const apiaryIds = new Set(apiaries.map((a) => a.id));
    const filteredHives = hives.filter((h) => apiaryIds.has(h.apiaryId));
    const hiveIds = new Set(filteredHives.map((h) => h.id));
    const filteredInspections = inspections
      .filter((i) => hiveIds.has(i.hiveId))
      .map((i) => ({
        ...i,
        honeyLevel: this.normalizeHoneyLevel((i as Partial<Inspection>).honeyLevel, i.storesLevel)
      }));

    return {
      apiaries,
      hives: filteredHives,
      inspections: filteredInspections
    };
  }

  private mergeData(existing: BeeData, incoming: BeeData): BeeData {
    const apiaryMap = new Map(existing.apiaries.map((a) => [a.id, a]));
    const hiveMap = new Map(existing.hives.map((h) => [h.id, h]));
    const inspectionMap = new Map(existing.inspections.map((i) => [i.id, i]));

    for (const apiary of incoming.apiaries) apiaryMap.set(apiary.id, apiary);
    for (const hive of incoming.hives) hiveMap.set(hive.id, hive);
    for (const inspection of incoming.inspections) inspectionMap.set(inspection.id, inspection);

    const mergedCandidate: BeeData = {
      apiaries: Array.from(apiaryMap.values()),
      hives: Array.from(hiveMap.values()),
      inspections: Array.from(inspectionMap.values())
    };

    return this.normalizeData(mergedCandidate, false) ?? existing;
  }

  private createSnapshot(reason: string): void {
    const current = this.loadSnapshots();
    const snapshot: DataSnapshot = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      reason,
      data: this.exportData()
    };
    const next = [snapshot, ...current].slice(0, 3);
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(next));
  }

  private loadSnapshots(): DataSnapshot[] {
    const raw = localStorage.getItem(SNAPSHOTS_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as DataSnapshot[];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((s) => !!s && typeof s.id === 'string' && typeof s.createdAt === 'string' && typeof s.reason === 'string' && !!this.normalizeData(s.data, true))
        .map((s) => ({ ...s, data: this.normalizeData(s.data, true)! }));
    } catch {
      return [];
    }
  }

  private isApiary(candidate: unknown): candidate is Apiary {
    const a = candidate as Apiary;
    return !!a && typeof a.id === 'string' && typeof a.name === 'string' && typeof a.location === 'string' && typeof a.createdAt === 'string';
  }

  private isHive(candidate: unknown): candidate is Hive {
    const h = candidate as Hive;
    return !!h && typeof h.id === 'string' && typeof h.apiaryId === 'string' && typeof h.code === 'string' && typeof h.queenYear === 'number' && typeof h.createdAt === 'string';
  }

  private isInspection(candidate: unknown): candidate is Inspection {
    const i = candidate as Inspection;
    return !!i && typeof i.id === 'string' && typeof i.hiveId === 'string' && typeof i.date === 'string' && typeof i.inspector === 'string' && typeof i.createdAt === 'string';
  }

  private normalizeHoneyLevel(level: unknown, storesLevel: Inspection['storesLevel']): number {
    if (typeof level === 'number' && Number.isFinite(level)) {
      return Math.max(0, Math.min(100, Math.round(level)));
    }
    if (storesLevel === 'high') return 80;
    if (storesLevel === 'low') return 20;
    return 50;
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data()));
    const current = Number(localStorage.getItem(PENDING_LOCAL_CHANGES_KEY) ?? '0');
    localStorage.setItem(PENDING_LOCAL_CHANGES_KEY, String((Number.isFinite(current) ? current : 0) + 1));
    globalThis.dispatchEvent(new CustomEvent('beez-data-changed'));
  }

  /** Called after a successful Supabase fetch to keep localStorage in sync without side-effects. */
  cacheFromRemote(data: BeeData): void {
    this._data.set(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(PENDING_LOCAL_CHANGES_KEY, '0');
    localStorage.setItem('beez-last-sync-at', new Date().toISOString());
    globalThis.dispatchEvent(new CustomEvent('beez-data-changed'));
  }
}
