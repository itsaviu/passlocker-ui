import { AuthAppholder } from "../models/authappholder";

const AUTHINHERITABLEDATA: Array<AuthAppholder> = [
    new AuthAppholder(
        "Welcome",
        "Register for a PassLocker account here",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "REGISTER HERE",
        true),
    new AuthAppholder(
        "Register",
        "Secure your account",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "I ALREADY HAVE AN ACCOUNT",
        false)];

export const dataFeeder = (flag :string) => {
    switch(flag) {
        case "LOGIN":
            return AUTHINHERITABLEDATA[0]
            break;
        case "REGISTER":
            return AUTHINHERITABLEDATA[1];
            break;
    }
}