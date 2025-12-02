import { CreateTenderDto, UpdateTenderDto } from '../../../api/src/modules/tenders/tenders.dto';

const API_BASE = '/api';

export async function getTenders(params: Record<string, unknown> = {}) {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const response = await fetch(`${API_BASE}/tenders${query ? `?${query}` : ''}`);
  return response.json();
}

export async function getTenderById(id: string) {
  const response = await fetch(`${API_BASE}/tenders/${id}`);
  return response.json();
}

export async function createTender(payload: CreateTenderDto) {
  const response = await fetch(`${API_BASE}/tenders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function updateTender(id: string, payload: UpdateTenderDto) {
  const response = await fetch(`${API_BASE}/tenders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function publishTender(id: string) {
  const response = await fetch(`${API_BASE}/tenders/${id}/publish`, { method: 'POST' });
  return response.json();
}

export async function cancelTender(id: string) {
  const response = await fetch(`${API_BASE}/tenders/${id}/cancel`, { method: 'POST' });
  return response.json();
}
