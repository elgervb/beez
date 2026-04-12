import { Injectable } from '@angular/core';
import { Apiary, BeeData, Hive, Inspection } from './models';
import { getSupabaseClient } from './supabase.client';

export type SyncedTodo = {
  id: string;
  hiveId: string;
  text: string;
  done: boolean;
  createdAt: string;
  closedAt?: string;
};

type ApiaryRow = {
  id: string;
  owner_id: string;
  name: string;
  location: string;
  notes: string | null;
  created_at: string;
};

type HiveRow = {
  id: string;
  owner_id: string;
  apiary_id: string;
  code: string;
  queen_year: number;
  temperament: 'calm' | 'mixed' | 'defensive';
  status: 'active' | 'weak' | 'wintering';
  notes: string | null;
  created_at: string;
};

type InspectionRow = {
  id: string;
  owner_id: string;
  hive_id: string;
  date: string;
  brood_pattern: 'excellent' | 'good' | 'poor';
  stores_level: 'high' | 'medium' | 'low';
  brood_seen: boolean;
  open: boolean;
  notes: string;
  inspector: string;
  created_at: string;
};

type TodoRow = {
  id: string;
  owner_id: string;
  hive_id: string;
  text: string;
  done: boolean;
  created_at: string;
  closed_at: string | null;
};

function toApiary(row: ApiaryRow): Apiary {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    notes: row.notes ?? undefined,
    createdAt: row.created_at
  };
}

function toHive(row: HiveRow): Hive {
  return {
    id: row.id,
    apiaryId: row.apiary_id,
    code: row.code,
    queenYear: row.queen_year,
    temperament: row.temperament,
    status: row.status,
    notes: row.notes ?? undefined,
    createdAt: row.created_at
  };
}

function toInspection(row: InspectionRow): Inspection {
  return {
    id: row.id,
    hiveId: row.hive_id,
    date: row.date,
    broodPattern: row.brood_pattern,
    storesLevel: row.stores_level,
    broodSeen: row.brood_seen,
    open: row.open,
    notes: row.notes,
    inspector: row.inspector,
    createdAt: row.created_at
  };
}

function toTodo(row: TodoRow): SyncedTodo {
  return {
    id: row.id,
    hiveId: row.hive_id,
    text: row.text,
    done: row.done,
    createdAt: row.created_at,
    closedAt: row.closed_at ?? undefined
  };
}

@Injectable({ providedIn: 'root' })
export class SupabaseStore {
  private supabaseClient: ReturnType<typeof getSupabaseClient> | null = null;

  isConfigured(): boolean {
    try {
      const client = this.client;
      return !!client;
    } catch {
      return false;
    }
  }

  private get client() {
    this.supabaseClient ??= getSupabaseClient();
    return this.supabaseClient;
  }

  async ensureSignedInAnonymously(): Promise<void> {
    const {
      data: { user }
    } = await this.client.auth.getUser();
    if (user) return;

    const { error } = await this.client.auth.signInAnonymously();
    if (error) throw error;
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const {
      data: { user },
      error
    } = await this.client.auth.getUser();
    if (error) throw error;
    return user?.email ?? null;
  }

  async hasActiveSession(): Promise<boolean> {
    const {
      data: { session },
      error
    } = await this.client.auth.getSession();
    if (error) throw error;
    return !!session;
  }

  async signInWithGoogle(redirectTo: string): Promise<void> {
    const { error } = await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    });
    if (error) throw error;
  }

  async signInWithEmailMagicLink(email: string, redirectTo: string): Promise<void> {
    const { error } = await this.client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });
    if (error) throw error;
  }

  async signInWithEmailPassword(email: string, password: string): Promise<void> {
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signUpWithEmailPassword(email: string, password: string): Promise<void> {
    const { error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async fetchAll(): Promise<BeeData> {
    const [{ data: apiaries, error: apiaryError }, { data: hives, error: hiveError }, { data: inspections, error: inspectionError }] =
      await Promise.all([
        this.client.from('apiaries').select('*').order('created_at', { ascending: false }),
        this.client.from('hives').select('*').order('created_at', { ascending: false }),
        this.client.from('inspections').select('*').order('date', { ascending: false })
      ]);

    if (apiaryError) throw apiaryError;
    if (hiveError) throw hiveError;
    if (inspectionError) throw inspectionError;

    return {
      apiaries: (apiaries ?? []).map((r) => toApiary(r as ApiaryRow)),
      hives: (hives ?? []).map((r) => toHive(r as HiveRow)),
      inspections: (inspections ?? []).map((r) => toInspection(r as InspectionRow))
    };
  }

  async fetchTodos(): Promise<SyncedTodo[]> {
    const { data, error } = await this.client.from('todos').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row) => toTodo(row as TodoRow));
  }

  async addApiary(payload: Pick<Apiary, 'name' | 'location' | 'notes'>): Promise<Apiary> {
    const { data, error } = await this.client
      .from('apiaries')
      .insert({
        name: payload.name.trim(),
        location: payload.location.trim(),
        notes: payload.notes?.trim() || null
      })
      .select()
      .single();

    if (error) throw error;
    return toApiary(data as ApiaryRow);
  }

  async updateApiary(id: string, payload: Pick<Apiary, 'name' | 'location' | 'notes'>): Promise<void> {
    const { error } = await this.client
      .from('apiaries')
      .update({
        name: payload.name.trim(),
        location: payload.location.trim(),
        notes: payload.notes?.trim() || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteApiary(id: string): Promise<void> {
    const { error } = await this.client.from('apiaries').delete().eq('id', id);
    if (error) throw error;
  }

  async addHive(payload: Pick<Hive, 'apiaryId' | 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>): Promise<Hive> {
    const { data, error } = await this.client
      .from('hives')
      .insert({
        apiary_id: payload.apiaryId,
        code: payload.code.trim().toUpperCase(),
        queen_year: payload.queenYear,
        temperament: payload.temperament,
        status: payload.status,
        notes: payload.notes?.trim() || null
      })
      .select()
      .single();

    if (error) throw error;
    return toHive(data as HiveRow);
  }

  async updateHive(id: string, payload: Pick<Hive, 'code' | 'queenYear' | 'temperament' | 'status' | 'notes'>): Promise<void> {
    const { error } = await this.client
      .from('hives')
      .update({
        code: payload.code.trim().toUpperCase(),
        queen_year: payload.queenYear,
        temperament: payload.temperament,
        status: payload.status,
        notes: payload.notes?.trim() || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteHive(id: string): Promise<void> {
    const { error } = await this.client.from('hives').delete().eq('id', id);
    if (error) throw error;
  }

  async addInspection(payload: Omit<Inspection, 'id' | 'createdAt'>): Promise<Inspection> {
    const { data, error } = await this.client
      .from('inspections')
      .insert({
        hive_id: payload.hiveId,
        date: payload.date,
        brood_pattern: payload.broodPattern,
        stores_level: payload.storesLevel,
        brood_seen: payload.broodSeen,
        open: payload.broodSeen ? payload.open : false,
        notes: payload.notes.trim(),
        inspector: payload.inspector.trim()
      })
      .select()
      .single();

    if (error) throw error;
    return toInspection(data as InspectionRow);
  }

  async updateInspection(id: string, payload: Omit<Inspection, 'id' | 'createdAt' | 'hiveId'>): Promise<void> {
    const { error } = await this.client
      .from('inspections')
      .update({
        date: payload.date,
        brood_pattern: payload.broodPattern,
        stores_level: payload.storesLevel,
        brood_seen: payload.broodSeen,
        open: payload.broodSeen ? payload.open : false,
        notes: payload.notes.trim(),
        inspector: payload.inspector.trim(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  }

  async deleteInspection(id: string): Promise<void> {
    const { error } = await this.client.from('inspections').delete().eq('id', id);
    if (error) throw error;
  }

  /** Upsert all records from local storage into Supabase. Uses client-generated IDs so records created
   *  offline are inserted once and subsequent calls are idempotent (last-write-wins on conflict). */
  async upsertAll(data: BeeData): Promise<void> {
    if (data.apiaries.length > 0) {
      const { error } = await this.client.from('apiaries').upsert(
        data.apiaries.map((a) => ({
          id: a.id,
          name: a.name,
          location: a.location,
          notes: a.notes ?? null,
          created_at: a.createdAt
        })),
        { onConflict: 'id' }
      );
      if (error) throw error;
    }

    if (data.hives.length > 0) {
      const { error } = await this.client.from('hives').upsert(
        data.hives.map((h) => ({
          id: h.id,
          apiary_id: h.apiaryId,
          code: h.code,
          queen_year: h.queenYear,
          temperament: h.temperament,
          status: h.status,
          notes: h.notes ?? null,
          created_at: h.createdAt
        })),
        { onConflict: 'id' }
      );
      if (error) throw error;
    }

    if (data.inspections.length > 0) {
      const { error } = await this.client.from('inspections').upsert(
        data.inspections.map((i) => ({
          id: i.id,
          hive_id: i.hiveId,
          date: i.date,
          brood_pattern: i.broodPattern,
          stores_level: i.storesLevel,
          brood_seen: i.broodSeen,
          open: i.open,
          notes: i.notes,
          inspector: i.inspector,
          created_at: i.createdAt
        })),
        { onConflict: 'id' }
      );
      if (error) throw error;
    }
  }

  async upsertTodos(todos: SyncedTodo[]): Promise<void> {
    if (todos.length === 0) return;

    const { error } = await this.client.from('todos').upsert(
      todos.map((todo) => ({
        id: todo.id,
        hive_id: todo.hiveId,
        text: todo.text,
        done: todo.done,
        created_at: todo.createdAt,
        closed_at: todo.closedAt ?? null
      })),
      { onConflict: 'id' }
    );

    if (error) throw error;
  }
}
