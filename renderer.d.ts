export interface IInvoncify {
  exportData(docToExport: any): { err: Error | null; result: any };
  platform: string;
  type: string;
  isDev: string;
  openDialog(dialogOptions: Object, returnChannel: string, ...rest: any): void;
  settings: {
    changePreviewWindowProfile(newProfile: Object): void;
    changePreviewWindowLanguage(newLang: string): void;
  };
  appConfig: {
    getSync(key: string): any;
  };
  encryption: {
    encrypt(data): string;
    decrypt(data): string | Object;
    getSettings(): Object;
    setSettings(data: Object): Object;
    validateSecret(data: Object): { result: boolean };
  };
  pouchDB: any;
  invoice: {
    previewInvoice(docDecrypted): void;
  };
}

declare global {
  interface Window {
    invoncify: IInvoncify;
  }
}
