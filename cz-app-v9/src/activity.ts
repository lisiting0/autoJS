import { MainActivity } from "app-base-v9";
import { environment } from "./environment";

export class CZMainActivity extends MainActivity {
    appName: string = environment.appName;
    version: string = environment.version;
    adbPermission: boolean = environment.adb;
}
