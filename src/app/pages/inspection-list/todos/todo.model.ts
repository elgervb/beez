export interface InspectionTodo {
  id: string;
  hiveId: string;
  text: string;
  done: boolean;
  createdAt: string;
  closedAt?: string;
}
