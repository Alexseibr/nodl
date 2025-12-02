import { CreateBidDto, UpdateBidDto } from '../../../api/src/modules/bids/bids.dto';

const API_BASE = '/api';

export async function getBidsByTenderId(tenderId: string) {
  const response = await fetch(`${API_BASE}/tenders/${tenderId}/bids`);
  return response.json();
}

export async function createBid(payload: CreateBidDto) {
  const response = await fetch(`${API_BASE}/bids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function updateBid(id: string, payload: UpdateBidDto) {
  const response = await fetch(`${API_BASE}/bids/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function shortlistBid(tenderId: string, bidId: string) {
  const response = await fetch(`${API_BASE}/tenders/${tenderId}/bids/${bidId}/shortlist`, { method: 'POST' });
  return response.json();
}

export async function acceptBid(tenderId: string, bidId: string) {
  const response = await fetch(`${API_BASE}/tenders/${tenderId}/bids/${bidId}/accept`, { method: 'POST' });
  return response.json();
}

export async function getMyBids() {
  const response = await fetch(`${API_BASE}/bids/my`);
  return response.json();
}
