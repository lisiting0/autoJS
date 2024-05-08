import { UiObject } from "ui_object";

export class UiObjectHelper {
    constructor(readonly _obj: UiObject) {}

    public findChild(className: string, index: number): UiObjectHelper | null {
        const items = this._obj.children.filter(
            (x) => x.className == className
        );
        if (items.length <= index) {
            return null;
        }
        return new UiObjectHelper(items[index]);
    }

    public get item(): UiObject {
        return this._obj;
    }

    public click(): boolean {
        return this._obj.click();
    }
}
