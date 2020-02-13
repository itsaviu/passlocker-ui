export class PwdDialogData {
  
    constructor(id: number, title: string, folderId: number, name: string, credentials: string, login: string, notes: string, url: string, editMode: boolean ) {
      this.id = id;
      this.title = title;
      this.name = name;
      this.folderId = folderId;
      this.credentials = credentials;
      this.login = login;
      this.notes = notes;
      this.url = url;
      this.editMode = editMode;
    }

    id: number;
    title: string;
    name: string;
    folderId: number;
    credentials: string;
    login: string;
    notes: string;
    url: string;
    editMode: boolean;
}
  