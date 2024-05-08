import { select } from "accessibility";
import { delay } from "lang";
import { UiObject } from "ui_object";
import { SelectorQuery, UiSelector } from "ui_selector";

export var defaultinterval = 200; // 检查控件是否出现的间隔 单位 毫秒
export var defaultTimeout = 15000; // 控件出现超时 单位 毫秒
export async function findById(
    id: string,
    interval?: number,
    timeout?: number
): Promise<null | UiObject> {
    let item: null | UiObject = null;
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    console.log("开始查询" + id);

    while (item == null && m >= new Date().getTime()) {
        item = await select({ id: id }).firstOrNull();
        if (!item) {
            await delay(i);
        }
    }

    return item;
}

export async function findByTextContains(
    text: string,
    interval?: number,
    timeout?: number
): Promise<null | UiObject> {
    let item: null | UiObject = null;
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    while (item == null && m >= new Date().getTime()) {
        item = await select({ text: new RegExp(text) }).firstOrNull();
        if (!item) {
            await delay(i);
        }
    }

    return item;
}

export async function findAllByTextContains(
    text: string,
    interval?: number,
    timeout?: number
): Promise<UiObject[]> {
    let items: UiObject[] = [];
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    while (items.length === 0 && m >= new Date().getTime()) {
        items = await select({ text: new RegExp(text) }).all();
        if (items.length === 0) {
            await delay(i);
        }
    }

    return items;
}

export async function findByDescContains(
    text: string,
    interval?: number,
    timeout?: number
): Promise<null | UiObject> {
    let item: null | UiObject = null;
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    while (item == null && m >= new Date().getTime()) {
        item = await select({ desc: new RegExp(text) }).firstOrNull();
        if (!item) {
            await delay(i);
        }
    }

    return item;
}

export async function findAllByDescContains(
    text: string,
    interval?: number,
    timeout?: number
): Promise<UiObject[]> {
    let items: UiObject[] = [];
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    while (items.length === 0 && m >= new Date().getTime()) {
        items = await select({ desc: new RegExp(text) }).all();
        if (items.length === 0) {
            await delay(i);
        }
    }

    return items;
}

export async function findAllById(
    id: string,
    interval?: number,
    timeout?: number
): Promise<UiObject[]> {
    let items: UiObject[] = [];
    let i = interval || defaultinterval;
    let t = timeout || defaultTimeout;
    let m = new Date().getTime() + t;

    while (items.length === 0 && m >= new Date().getTime()) {
        items = await select({ id: id }).all();
        if (items.length === 0) {
            await delay(i);
        }
    }

    return items;
}

export async function getById(
    id: string,
    interval?: number,
    timeout?: number
): Promise<UiObject> {
    const item = await findById(id, interval, timeout);
    if (!item) {
        throw new Error("未找到Id:" + id);
    }

    return item;
}

export function findClickableParent(uiObject: UiObject): undefined | UiObject {
    if (uiObject.clickable) {
        return uiObject;
    }

    let parent: undefined | UiObject = uiObject.parent;
    while (parent) {
        if (parent.clickable) {
            return parent;
        } else {
            parent = parent.parent;
        }
    }

    return undefined;
}

//深度优先遍历
export function findChildById(uiObject: UiObject, id: string): UiObject | null {
    if (uiObject.id === id) {
        return uiObject;
    }

    for (const child of uiObject.children) {
        const found = findChildById(child, id);
        if (found) {
            return found;
        }
    }

    return null;
}

//深度优先遍历
export function getChildById(uiObject: UiObject, id: string): UiObject {
    const child = findChildById(uiObject, id);

    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }

    return child;
}

//深度优先遍历
export function findChildByText(
    uiObject: UiObject,
    text: string
): UiObject | null {
    if (uiObject.text === text) {
        return uiObject;
    }

    for (const child of uiObject.children) {
        const found = findChildByText(child, text);
        if (found) {
            return found;
        }
    }

    return null;
}

//深度优先遍历
export function getChildByText(uiObject: UiObject, id: string): UiObject {
    const child = findChildByText(uiObject, id);

    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }

    return child;
}
