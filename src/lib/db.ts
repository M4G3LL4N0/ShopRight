import type { ScanRecord } from "@/types/scan";

const scanHistory: ScanRecord[] = [];

export function addScan(record: ScanRecord): void {
  scanHistory.unshift(record);
}

export function getScanHistory(): ScanRecord[] {
  return [...scanHistory];
}

export function getScanById(id: string): ScanRecord | undefined {
  return scanHistory.find(scan => scan.id === id);
}
