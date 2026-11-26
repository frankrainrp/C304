import { randomUUID } from '../id.js';
import { changeDashboard, createDefaultDashboard } from './layout.js';

let layout = createDefaultDashboard();
const listeners = new Set();

export function getDashboardLayout() {
  return layout;
}

export async function applyDashboardAction(action) {
  layout = changeDashboard(layout, action, randomUUID);
  for (const listener of listeners) listener();
  return layout;
}

export function subscribeDashboard(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
