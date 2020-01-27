export class AuthAppholder {
    private title: string;
    private subHeader: string;
    private content: string;
    private btnValue: string;
    private isLogin: boolean;    

    constructor(title: string, subHeader: string, content: string, btnValue: string, isLogin: boolean) {
        this.title = title;
        this.subHeader = subHeader;
        this.content = content;
        this.btnValue = btnValue;
        this.isLogin = isLogin;
    }
    
}
