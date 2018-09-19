export interface UnitActivity {
  unitID: string;
  type: 'pull' | 'move' | 'xfr';
  userID: string;
  binID?: string;
  docID?: string;
  override: 'y' | 'n';
}
