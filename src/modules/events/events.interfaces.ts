export interface IEvent {
  event_id?: number;
  event_name: string;
  odds: number;
}

export interface IPagination {
  page?: number;
  pageSize?: number;
}
