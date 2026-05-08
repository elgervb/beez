import { BeeStore } from './bee-store';

describe('BeeStore', () => {
  let store: BeeStore;

  beforeEach(() => {
    localStorage.clear();
    store = new BeeStore();
  });

  it('adds and updates apiaries', () => {
    store.addApiary({ name: ' West ', location: ' North ', notes: ' Note ' });
    const apiary = store.getData().apiaries[0];

    expect(apiary.name).toBe('West');
    expect(apiary.location).toBe('North');
    expect(apiary.notes).toBe('Note');

    store.updateApiary(apiary.id, { name: 'Main', location: 'South', notes: 'Updated' });
    expect(store.getData().apiaries[0].name).toBe('Main');
  });

  it('cascades delete from apiary and can undo via restore bundle', () => {
    store.addApiary({ name: 'A1', location: 'L1', notes: '' });
    const apiaryId = store.getData().apiaries[0].id;

    store.addHive({ apiaryId, code: 'h1', queenYear: 2024, temperament: 'calm', status: 'active' });
    const hiveId = store.getData().hives[0].id;

    store.addInspection({
      hiveId,
      date: '2026-03-01',
      broodPattern: 'good',
      storesLevel: 'medium',
      honeyLevel: 50,
      broodSeen: true,
      open: false,
      notes: 'ok',
      inspector: 'Inspector'
    });

    const deleted = store.deleteApiary(apiaryId);
    expect(deleted).not.toBeNull();
    expect(store.getData().apiaries.length).toBe(0);
    expect(store.getData().hives.length).toBe(0);
    expect(store.getData().inspections.length).toBe(0);

    store.restoreApiaryBundle(deleted!);
    expect(store.getData().apiaries.length).toBe(1);
    expect(store.getData().hives.length).toBe(1);
    expect(store.getData().inspections.length).toBe(1);
  });

  it('updates and deletes hives and restores deleted hive bundle', () => {
    store.addApiary({ name: 'A1', location: 'L1', notes: '' });
    const apiaryId = store.getData().apiaries[0].id;
    store.addHive({ apiaryId, code: 'abc', queenYear: 2024, temperament: 'mixed', status: 'weak' });
    const hiveId = store.getData().hives[0].id;

    store.updateHive(hiveId, { code: 'b2', queenYear: 2025, temperament: 'calm', status: 'active' });
    expect(store.getData().hives[0].code).toBe('B2');

    store.addInspection({
      hiveId,
      date: '2026-03-02',
      broodPattern: 'excellent',
      storesLevel: 'high',
      honeyLevel: 80,
      broodSeen: true,
      open: true,
      notes: 'strong',
      inspector: 'Alex'
    });

    const deleted = store.deleteHive(hiveId);
    expect(store.getData().hives.length).toBe(0);
    expect(store.getData().inspections.length).toBe(0);

    store.restoreHiveBundle(deleted!);
    expect(store.getData().hives.length).toBe(1);
    expect(store.getData().inspections.length).toBe(1);
  });

  it('updates and restores inspection', () => {
    store.addApiary({ name: 'A1', location: 'L1', notes: '' });
    const apiaryId = store.getData().apiaries[0].id;
    store.addHive({ apiaryId, code: 'H1', queenYear: 2024, temperament: 'calm', status: 'active' });
    const hiveId = store.getData().hives[0].id;
    store.addInspection({
      hiveId,
      date: '2026-03-03',
      broodPattern: 'good',
      storesLevel: 'low',
      honeyLevel: 20,
      broodSeen: false,
      open: false,
      notes: '  n  ',
      inspector: '  Sam  '
    });

    const inspectionId = store.getData().inspections[0].id;
    store.updateInspection(inspectionId, {
      date: '2026-03-04',
      broodPattern: 'poor',
      storesLevel: 'medium',
      honeyLevel: 45,
      broodSeen: true,
      open: true,
      notes: '  updated  ',
      inspector: '  Bea  '
    });

    const updated = store.getData().inspections[0];
    expect(updated.notes).toBe('updated');
    expect(updated.inspector).toBe('Bea');

    const deleted = store.deleteInspection(inspectionId);
    expect(store.getData().inspections.length).toBe(0);
    store.restoreInspection(deleted!);
    expect(store.getData().inspections.length).toBe(1);
  });

  it('exports deep-copy snapshot', () => {
    store.addApiary({ name: 'A1', location: 'L1', notes: '' });
    const snapshot = store.exportData();
    snapshot.apiaries[0].name = 'Mutated';
    expect(store.getData().apiaries[0].name).toBe('A1');
  });

  it('imports valid data and rejects invalid payload', () => {
    const valid = {
      apiaries: [{ id: 'a1', name: 'A1', location: 'L1', createdAt: '2026-01-01', notes: '' }],
      hives: [{ id: 'h1', apiaryId: 'a1', code: 'H1', queenYear: 2024, temperament: 'calm', status: 'active', createdAt: '2026-01-01' }],
      inspections: [{ id: 'i1', hiveId: 'h1', date: '2026-01-01', broodPattern: 'good', storesLevel: 'medium', honeyLevel: 50, broodSeen: true, open: false, notes: '', inspector: 'X', createdAt: '2026-01-01' }]
    };
    expect(store.importData(valid)).toBe(true);
    expect(store.getData().apiaries.length).toBe(1);

    expect(store.importData({ bad: true })).toBe(false);
    expect(store.getData().apiaries.length).toBe(1);
  });

  it('previews import and merges data on demand', () => {
    store.addApiary({ name: 'Local', location: 'L', notes: '' });
    const existingApiary = store.getData().apiaries[0];

    const incoming = {
      apiaries: [
        { id: existingApiary.id, name: 'Updated', location: 'L2', createdAt: existingApiary.createdAt, notes: '' },
        { id: 'a2', name: 'Second', location: 'L3', createdAt: '2026-01-02', notes: '' }
      ],
      hives: [],
      inspections: []
    };

    const preview = store.previewImport(incoming);
    expect(preview).not.toBeNull();
    expect(preview!.counts.apiaries).toBe(2);
    expect(preview!.duplicates.apiaries).toBe(1);

    expect(store.importData(incoming, 'merge')).toBe(true);
    expect(store.getData().apiaries.length).toBe(2);
    expect(store.getData().apiaries.find((a) => a.id === existingApiary.id)?.name).toBe('Updated');
  });

  it('stores snapshots before destructive actions and restores from snapshot', () => {
    store.addApiary({ name: 'A1', location: 'L1', notes: '' });
    const apiaryId = store.getData().apiaries[0].id;
    const beforeDeleteName = store.getData().apiaries[0].name;

    store.deleteApiary(apiaryId);
    expect(store.getData().apiaries.length).toBe(0);

    const snapshots = store.listSnapshots();
    expect(snapshots.length).toBeGreaterThan(0);

    expect(store.restoreSnapshot(snapshots[0].id)).toBe(true);
    expect(store.getData().apiaries[0].name).toBe(beforeDeleteName);
  });

  it('includes conflict details in import preview for duplicate ids', () => {
    store.addApiary({ name: 'Local', location: 'L', notes: '' });
    const existing = store.getData().apiaries[0];

    const incoming = {
      apiaries: [
        { id: existing.id, name: 'Incoming', location: 'L2', createdAt: existing.createdAt, notes: '' }
      ],
      hives: [],
      inspections: []
    };

    const preview = store.previewImport(incoming);
    expect(preview).not.toBeNull();
    expect(preview!.duplicates.apiaries).toBe(1);
    expect(preview!.conflicts.apiaries.length).toBe(1);
    expect(preview!.conflicts.apiaries[0].existing.includes('Local')).toBe(true);
    expect(preview!.conflicts.apiaries[0].incoming.includes('Incoming')).toBe(true);
  });

  it('reports clean integrity and repairs orphan data from malformed storage', () => {
    localStorage.setItem('beez-data-v1', JSON.stringify({
      apiaries: [{ id: 'a1', name: 'A1', location: 'L1', createdAt: '2026-01-01', notes: '' }],
      hives: [
        { id: 'h1', apiaryId: 'a1', code: 'H1', queenYear: 2024, temperament: 'calm', status: 'active', createdAt: '2026-01-01' },
        { id: 'h2', apiaryId: 'missing', code: 'H2', queenYear: 2024, temperament: 'calm', status: 'active', createdAt: '2026-01-01' }
      ],
      inspections: [
        { id: 'i1', hiveId: 'h1', date: '2026-01-01', broodPattern: 'good', storesLevel: 'medium', honeyLevel: 50, broodSeen: true, open: false, notes: '', inspector: 'X', createdAt: '2026-01-01' },
        { id: 'i2', hiveId: 'missing', date: '2026-01-01', broodPattern: 'good', storesLevel: 'medium', honeyLevel: 50, broodSeen: true, open: false, notes: '', inspector: 'X', createdAt: '2026-01-01' }
      ]
    }));

    const malformed = new BeeStore();
    const report = malformed.getIntegrityReport();
    expect(report.orphanHives).toBe(0);
    expect(report.orphanInspections).toBe(0);

    // Nothing to repair because load normalization already cleaned invalid links.
    const repaired = malformed.repairIntegrity();
    expect(repaired.before.orphanHives).toBe(0);
    expect(repaired.before.orphanInspections).toBe(0);
    expect(repaired.after.orphanHives).toBe(0);
    expect(repaired.after.orphanInspections).toBe(0);
  });
});
