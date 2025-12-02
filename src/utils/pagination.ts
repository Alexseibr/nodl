export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const resolvePagination = (params: PaginationParams): { limit: number; offset: number; page: number } => {
  const page = params.page && params.page > 0 ? params.page : params.offset ? Math.floor(params.offset / (params.limit || 20)) + 1 : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 20;
  const offset = params.offset && params.offset >= 0 ? params.offset : (page - 1) * limit;
  return { limit, offset, page };
};

export const buildMeta = <T>(data: T[], total: number, page: number, pageSize: number): PaginatedResult<T> => ({
  items: data,
  total,
  page,
  pageSize,
  hasNext: page * pageSize < total,
  hasPrev: page > 1,
});
