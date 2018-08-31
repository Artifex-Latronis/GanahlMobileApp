export interface UnitActivity {
  unitID: string;
  type: 'pull' | 'move' | 'xfr';
  empID: string;
  binID?: string;
  docID?: string;
}
