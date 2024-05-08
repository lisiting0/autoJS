import { MainActivity } from "app-base-v9";
import { environment } from "./environment";

export class MUMainActivity extends MainActivity {
    appName: string = environment.appName;
    version: string = environment.version;
    adbPermission: boolean = environment.adb;
}
