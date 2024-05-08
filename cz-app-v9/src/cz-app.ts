import {
  AppDeviceStatusType,
  AccountInfo,
  TicketOrderFlight,
  CabinClassType,
  CreateOrderArgs,
  PassengerType,
  PassengerInfo,
  IdentityCardType,
  ContactInfo,
  CreateOrderPriceDetailDto,
  PassengerName,
  NameType,
  GenderType,
  CreateTicketChangeOrderPrice,
} from "app-base-v9";
import { formatToTimeZone } from "date-fns-timezone";
import * as selector from "ui-selector-ext-v9";
import {
  CZAppProductInfo,
  CZCreateOrderArgsDto,
  CZCreateOrderResultDto,
  CZDirectDiscountDetail,
  CZDirectDiscountResultDto,
  CZFlightDetailDto,
  CZFlightsDto,
  CZPayArgsDto,
  CZPayMethodType,
  CZPayResultDto,
  CZQueryDirectDiscountDto,
  CZQueryFlightsDto,
  PriceDetail,
  CZQueryFlightPricesDto,
  CZFlightPriceDto,
  CZFlightPricesDto,
  CZFlightCabinPriceDto,
  CZPriceDetail,
  CZCreateChangeOrderArgsDto,
  CZCreateChangeOrderResultDto,
} from "./dtos";
import * as app from "app";
import { UiObject } from "ui_object";
import { environment } from "./environment";
import { delay } from "lang";
import {
  accessibility,
  back,
  click,
  scrollForward,
  select,
  swipe,
} from "accessibility";
import { exec } from "shell";
import { showToast } from "toast";
import { CZSignalRHandler } from "./signalr";
import { UiObjectHelper } from "./ui-object-helper";

export const appId = "com.csair.mbp";
const HOME_BTN = "main_home_txt";
const BOOKING_BTN = "include_main_home_view_booking_llyt_querybtn";
const DATE_PATTERN = "YYYY-MM-DD";
const timezoneOptions = {
  timeZone: "Asia/Shanghai",
};


const accounts: string[] = [
  "413437822367",
  "615975162381",
  "618316613775",
  "519927547764",
  "018470327296",
  "615932905520",
  "315968988840",
  "312746549939",
  "213924039670",
  "418166035234",
  "113767112915",
  "013729439459",
  "515800231391",
  "318138704076",
  "115015081044",
];

const contacts = [{
  concatName: '赵先生',
  concatPhone: "13622219236",
},
{
  concatName: '钱女士',
  concatPhone: "18565201889",
},
{
  concatName: '孙先生',
  concatPhone: "18565201802",
},
{
  concatName: '李女士',
  concatPhone: "13725366358",
},
{
  concatName: '周先生',
  concatPhone: "13434251837",
},
{
  concatName: '吴小姐',
  concatPhone: "15917449016",
},
{
  concatName: '唐先生',
  concatPhone: "18565201119",
},
{
  concatName: '王先生',
  concatPhone: "18565201807",
},
{
  concatName: '李先生',
  concatPhone: "18565201882",
},
{
  concatName: '廖先生',
  concatPhone: "13622207539",
},
{
  concatName: '曾先生',
  concatPhone: "15817030174",
},
{
  concatName: '陈女士',
  concatPhone: "13660567305",
},
{
  concatName: '黄先生',
  concatPhone: "13711133262",
},
{
  concatName: '林先生',
  concatPhone: "13660486937",
},
{
  concatName: '徐先生',
  concatPhone: "15989110684",
},
{
  concatName: '魏先生',
  concatPhone: "13660264920"
}
]

let compareDetailStr: string = "";
let compareDetail: string[] = [];

export interface PassengerNameCardNo {
  name: string | "",
  cardNo: string | ""
};

import { getNationCodeName } from "./nationCode";
import { device } from "device";

export class CZApp {
  private _handler?: CZSignalRHandler;
  private _failedCount: number = 0;
  private _networkErrorCount: number = 0;
  private _loginTokenCount: number = 0;

  async init(handler: CZSignalRHandler): Promise<void> {
    handler.update(AppDeviceStatusType.Initializing);
    this._handler = handler;
    console.log(`启动APP: ${app.launch(appId)}`);
    await delay(5000);
    try {
      // 关闭登机牌遮挡
      await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
      await this.backToHome();
      await this.openMine();
      const account = await this.getAccount();
      environment.loginAccount = account;
      handler.update(AppDeviceStatusType.Ready, account);
    } catch (error) {
      console.error(error);
      const msg = (error as Error)?.message;
      handler.update(AppDeviceStatusType.Unknown);
      handler.log(msg);
      await this.backToHome();
    }
  }

  async changeProxy(proxyUrl: string): Promise<boolean> {
    // 设置代理
    if (environment.adb) {
      const result = await exec(
        `settings put global http_proxy ${proxyUrl}`,
        {
          adb: true,
        }
      );
      console.log(result);

      showToast(
        `设置代理 ${proxyUrl} 结果 ${result.code == 0 ? "成功" : "失败"
        }`
      );
      return result.code == 0;
    } else {
      showToast("设置代理失败没有adb权限");
      return false;
    }
  }

  async getAccount(): Promise<string> {
    const loginBtn = await selector.findByTextContains("登录", 100, 2000);
    if (loginBtn) {
      this.log("当前设备未登录");
      return "";
    }

    (await selector.getById("mine_new_scrollview")).scrollBackward();
    let pearlMember = await selector.findByTextContains(
      "明珠会员",
      1000,
      20000
    );
    if (!pearlMember?.parent) {
      // throw new Error("找不到 明珠会员");
      // 不抛异常，直接返回空
      return "";
    }

    let cardNo: string = "";
    let retry = 15;
    while (retry > 0) {
      retry--;
      pearlMember = await selector.findByTextContains(
        "明珠会员",
        1000,
        20000
      );
      if (!pearlMember?.parent) {
        throw new Error(`找不到 明珠会员 retry:${retry}`);
      }

      cardNo = pearlMember.parent.children[1].text;
      console.log(`等待账号出现 ${cardNo}`);
      if (!cardNo || cardNo === "" || cardNo.trim() === "") {
        await delay(500);
        continue;
      }

      break;
    }

    if (cardNo === "") {
      throw new Error("等待账号出现失败");
    }

    console.log("开始获取账号");

    const localCardNo = this.getLocalCardNo(cardNo);
    if (localCardNo) {
      console.log(`获取到本地账号 ${localCardNo} 原始账号 ${cardNo}`);
      return localCardNo;
    }

    if (cardNo.includes("*")) {
      console.log(`点击展示卡号 ${pearlMember.parent.children[2].click()}`);
      await delay(1000);
    }

    retry = 15;
    while (retry > 0) {
      retry--;
      const temp = await selector.findAllByTextContains("明珠会员");
      if (temp.length === 0) {
        throw new Error(`找不到 明珠会员 retry:${retry}`);
      }

      cardNo = temp[temp.length - 1].parent?.children[1].text ?? "*";
      if (cardNo.includes("*")) {
        await delay(1000);
        continue;
      }

      return cardNo;
    }

    return "";
  }

  private getLocalCardNo(cardNo: string): string | undefined {
    const last4char = cardNo.slice(cardNo.length - 4);
    return accounts.find((x) => x.endsWith(last4char));
  }

  async login(account: AccountInfo): Promise<void> {
    await this.openMine();

    const loginBtn = await selector.getById("mine_new_head", 200, 2000);
    loginBtn.click();

    let memberLoginBtn = await selector.findById(
      "activity_login_type_right_radioButton",
      200,
      2000
    );

    if (!memberLoginBtn) {
      const logged = await selector.findByTextContains(
        "会员身份验证",
        200,
        2000
      );
      if (logged) {
        await click(300, 1560);
        back();

        await this.clickIfIdExists(
          "login_verification_dialog_left_btn",
          100,
          1000
        );

        const username = await this.getAccount();
        if (username === account.userName) {
          environment.loginAccount = account.userName;
          return;
        } else {
          await this.logout();
          await this.login(account);
          return;
        }
      } else {
        const basicInfoText = await selector.findByTextContains(
          "基本信息",
          200,
          5000
        );
        if (basicInfoText) {
          back();
          await delay(2000);
          const username = await this.getAccount();
          if (username === account.userName) {
            environment.loginAccount = account.userName;
            return;
          } else {
            await this.logout();
            await this.login(account);
            return;
          }
        } else {
          throw new Error(`登录失败 获取不到登录页面`);
        }
      }
    }

    memberLoginBtn.click();

    await selector.getById("activity_login_llyt_member_layout", 100, 2000);
    await this.clickIfIdExists(
      "activity_login_userid_delete_btn",
      100,
      1000
    );

    await this.getAndInputText(
      "activity_login_et_member_account",
      account.userName
    );
    await this.getAndInputText(
      "activity_login_et_member_password_id",
      account.password
    );

    await this.ensureChecked("activity_login_privacy_policy");
    await this.ensureChecked("activity_login_tbtn_save_account_tip");

    const confirmBtn = await selector.getById(
      "activity_login_btn_login_button"
    );

    confirmBtn.click();

    await this.waitForLoading();
    await this.waitForTip(true, true);

    environment.loginAccount = account.userName;
    this._loginTokenCount = 0;
  }

  private async ensureChecked(id: string) {
    let retry = 3;
    while (retry > 0) {
      retry--;
      const checkBox = await selector.getById(id);
      if (checkBox.checkable && !checkBox.checked) {
        checkBox.click();
        await delay(500);
      } else {
        return;
      }
    }
  }

  private async getAndInputText(
    id: string,
    text: string,
    click?: boolean
  ): Promise<void> {
    const item = await selector.getById(id);
    item.showOnScreen();
    if (click) {
      item.click();
    }
    item.setText(text);
  }

  private async logout(): Promise<void> {
    await this.openMine();

    const settingBtn = await selector.findById("img_setting", 200, 2000);
    if (settingBtn) {
      settingBtn.click();
    } else {
      (await selector.getById("mine_new_setting_img")).click();
    }

    const logoutBtn = await selector.findById("tv_loginLogout", 500, 5000);
    if (!logoutBtn) {
      environment.loginAccount = "";
      back();
      return;
    }

    logoutBtn.click();

    await this.waitForTip(false, true);

    environment.loginAccount = "";

    await this.backToHome();
  }

  private async openMine(): Promise<void> {
    const mineBtn = await selector.findById("main_mine_txt", 200, 2000);
    if (!mineBtn) {
      throw new Error(`找不到 我 按钮`);
    }

    selector.findClickableParent(mineBtn)?.click();

    let retry = 5;
    let item: UiObject | null = null;
    while (retry > 0) {
      retry--;
      item = await selector.findById(
        "personal_center_offline_map_view",
        100,
        400
      );
      if (item) {
        break;
      }
    }

    if (!item) {
      throw new Error(`跳转 我 页面失败`);
    }
  }

  private async waitForTipAndClose(
    content: string,
    clickTargetId: string,
    interval?: number,
    timeout?: number
  ): Promise<void> {
    interval ??= 100;
    timeout ??= 1000;
    const tip = await selector.findByTextContains(
      content,
      interval,
      timeout
    );
    if (tip) {
      (await selector.findById(clickTargetId, 100, 1000))?.click();
    }
  }

  private async waitForTip(
    throwError: boolean,
    clickBtn: boolean,
    clickCancel?: boolean
  ): Promise<string | undefined> {
    clickCancel ??= false;
    let panel = await selector.findById("buttonPanel", 200, 3000);
    if (panel) {
      let messageText = await selector.findById("message", 200, 3000);
      if (!messageText) {
        panel = await selector.findById("buttonPanel", 200, 1000);
        if (!panel) {
          return undefined;
        } else {
          messageText = await selector.findById("message", 200, 1000);
          if (!messageText) {
            return undefined;
          }
        }
      }
      if (clickBtn) {
        if (clickCancel) {
          (await selector.findById("button2", 100, 1000))?.click();
        }

        (await selector.findById("button1", 100, 1000))?.click();
      }

      if (throwError) {
        throw new Error(`出现提示报错 ${messageText.text}`);
      } else {
        return messageText.text;
      }
    }
  }

  private async waitForResultTip(
    throwError: boolean,
    clickBtn: boolean,
    clickCancel?: boolean
  ): Promise<string | undefined> {
    clickCancel ??= false;
    let panel = await selector.findById("parentPanel", 200, 3000);
    if (panel) {
      let messageText = await selector.findById("message", 200, 3000);
      if (!messageText) {
        panel = await selector.findById("parentPanel", 200, 1000);
        if (!panel) {
          return undefined;
        } else {
          messageText = await selector.findById("message", 200, 1000);
          if (!messageText) {
            return undefined;
          }
        }
      }
      if (clickBtn) {
        if (clickCancel) {
          (await selector.findById("button2", 100, 1000))?.click();
        }

        (await selector.findById("button1", 100, 1000))?.click();
      }

      if (throwError) {
        throw new Error(`出现提示报错 ${messageText.text}`);
      } else {
        return messageText.text;
      }
    }
  }

  private async clickIfIdExists(
    id: string,
    interval: number,
    timeout: number
  ): Promise<boolean> {
    const item = await selector.findById(id, interval, timeout);
    if (item && item.clickable) {
      item.click();
      return true;
    } else {
      return false;
    }
  }

  private async clickIfDescContains(
    desc: string,
    interval: number,
    timeout: number
  ): Promise<boolean> {
    const item = await selector.findByDescContains(desc, interval, timeout);
    if (item && item.clickable) {
      item.click();
      return true;
    }

    return false;
  }

  private async backToHome(): Promise<UiObject> {
    console.log(`当前找不到首页按钮，尝试回到主页 adb权限${environment.adb}`);

    let home = await selector.findById(HOME_BTN, 200, 2000);
    if (!home) {
      await this.waitForTip(false, true);
      await this.clickIfIdExists("close", 100, 1000);
      await this.clickIfIdExists("agreement_exit_bt", 100, 1000);
      await this.clickIfIdExists("main_youth_protect_dialog_more_than_14", 100, 1000);
      await this.clickIfIdExists("tv_cancel", 100, 1000);
      await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
      await this.clickIfDescContains("首页", 50, 1000);

      if (!(await this.clickIfIdExists("book_home", 100, 1000)) && !(await this.clickIfIdExists("h5_bt_image", 100, 1000))) {
        while (await this.clickIfDescContains("返回上一页", 100, 1000)) {
          await delay(1000);
        }
      }

      home = await selector.findById(HOME_BTN, 100, 1000);
      if (home) {
        return home;
      }

      let retry = 5;
      while (retry > 0) {
        retry--;
        back();
        await this.waitForTip(false, true);
        await this.clickIfIdExists("book_home", 100, 1000);
        await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
        await this.clickIfDescContains("首页", 50, 1000);

        home = await selector.findById(HOME_BTN, 200, 2000);
        if (home) {
          return home;
        }

        console.log(`启动APP: ${app.launch(appId)}`);
        await delay(3000);
      }

      throw new Error("打开主页失败 找不到首页按钮");
    } else {
      return home;
    }
  }

  // async waitForLoading(
  //     interval?: number,
  //     timeout?: number
  // ): Promise<boolean> {
  //     interval ??= 500;
  //     timeout ??= 60000;

  //     await delay(interval);
  //     let m = new Date().getTime() + timeout;
  //     let root = await accessibility.root();
  //     let retry = 10;
  //     while (!root && retry > 0) {
  //         retry--;
  //         await delay(500);
  //         continue;
  //     }

  //     if (!root) {
  //         return false;
  //     }

  //     let isLoading: UiObject[] = root.children.filter(
  //         (x: UiObject) => x.clickable
  //     );
  //     while (isLoading.length > 0 && m >= new Date().getTime()) {
  //         root = await accessibility.root();
  //         let r = 10;
  //         while (!root && r > 0) {
  //             r--;
  //             await delay(500);
  //             continue;
  //         }

  //         if (!root) {
  //             return false;
  //         }

  //         isLoading = root.children.filter((x: UiObject) => x.clickable);
  //         if (isLoading.length > 0) {
  //             console.log(`等待加载中`);
  //             await delay(interval);
  //         }
  //     }

  //     return isLoading.length > 0;
  // }

  async waitForLoading(
    interval?: number,
    timeout?: number
  ): Promise<boolean> {
    interval ??= 500;
    timeout ??= 60000;

    await delay(interval);
    let m = new Date().getTime() + timeout;
    let root = await accessibility.root();
    let retry = 10;
    while (!root && retry > 0) {
      retry--;
      await delay(500);
      continue;
    }

    if (!root) {
      return false;
    }

    let isLoading: UiObject[] = root.children.filter(
      (x: UiObject) => x.className == 'content'
    );
    while (isLoading.length > 0 && m >= new Date().getTime()) {
      root = await accessibility.root();
      let r = 10;
      while (!root && r > 0) {
        r--;
        await delay(500);
        continue;
      }

      if (!root) {
        return false;
      }

      isLoading = root.children.filter((x: UiObject) => x.className == 'content');
      if (isLoading.length > 0) {
        await delay(interval);
      }
    }

    return isLoading.length > 0;
  }

  async searchFlight(
    orig: string,
    dest: string,
    date: Date,
    backDate?: Date
  ): Promise<void> {
    const oriInput = await selector.getById(
      "include_main_home_view_booking_tv_start"
    );
    oriInput.click();
    await this.inputAirport(orig);
    const destInput = await selector.getById(
      "include_main_home_view_booking_tv_back"
    );
    destInput.click();
    await this.inputAirport(dest);

    if (backDate != undefined) {
      await this.selectWFDate(date, backDate);
    } else {
      await this.selectDate(date);
    }
    const searchBtn = await selector.getById(BOOKING_BTN);
    searchBtn.click();
  }

  async selectDate(date: Date) {
    let retry = 5;
    while (retry > 0) {
      retry--;
      const dateBtn = await selector.getById(
        "include_main_home_view_booking_tv_month_start"
      );
      const currentDate = await this.getCurrentDate(dateBtn.text, new Date());

      const currentDateText = formatToTimeZone(
        currentDate,
        DATE_PATTERN,
        timezoneOptions
      );
      const targetDateText = formatToTimeZone(
        date,
        DATE_PATTERN,
        timezoneOptions
      );
      console.log(`当前日期 ${currentDateText} 目标日期 ${targetDateText}`);
      if (currentDateText === targetDateText) {
        return;
      } else {
        if (!dateBtn.parent) {
          throw new Error(`日期控件父级未找到`);
        }

        dateBtn.parent.click();
        await this.inputDate(date);
        console.log(`已点击目标日期`);
      }
    }
  }

  async selectWFDate(date: Date, backDate: Date) {
    const dateBtn = await selector.getById(
      "include_main_home_view_booking_tv_month_start"
    );
    const backDateBtn = await selector.findById(
      "include_main_home_view_booking_tv_month_back",
      50,
      500
    );

    let retry = 1;
    while (retry > 0) {
      retry--;
      const currentDate = await this.getCurrentDate(
        dateBtn.text,
        new Date()
      );

      const currentDateText = formatToTimeZone(
        currentDate,
        DATE_PATTERN,
        timezoneOptions
      );
      const targetDateText = formatToTimeZone(
        date,
        DATE_PATTERN,
        timezoneOptions
      );

      if (!dateBtn.parent) {
        throw new Error(`日期控件父级未找到`);
      }

      dateBtn.parent.click();
      await this.inputDate(date);
    }

    // 返程时间
    if (backDateBtn) {
      const currentEndDate = await this.getCurrentDate(
        backDateBtn.text,
        new Date()
      );

      const currentEndDateText = formatToTimeZone(
        currentEndDate,
        DATE_PATTERN,
        timezoneOptions
      );
      const targetEndDateText = formatToTimeZone(
        backDate,
        DATE_PATTERN,
        timezoneOptions
      );

      if (!backDateBtn.parent) {
        throw new Error(`日期控件父级未找到`);
      }

      backDateBtn.parent.click();
      await this.inputDate(backDate);
    }

    await delay(500);
    const confirmBtn = await selector.getById(
      "view_calendar_confirm_bt",
      100,
      1000
    );
    confirmBtn.click();
    await delay(500);
  }

  private async inputDate(date: Date): Promise<void> {
    const scrollView = await selector.getById("calendar_content_rv");
    scrollView.scrollBackward();
    scrollView.scrollBackward();
    scrollView.scrollBackward();
    scrollView.scrollBackward();
    await delay(1000);

    const targetDateText = formatToTimeZone(
      date,
      "YYYY年M月D号",
      timezoneOptions
    );
    const targetDateMonthDayText = formatToTimeZone(
      date,
      "M月D日",
      timezoneOptions
    );
    let retry = 5;
    let outer = false;
    while (retry > 0) {
      retry--;
      outer = false;

      let monthViews = await selector.findAllById(
        "calendar_month_view",
        100,
        5000
      );

      for (const monthView of monthViews) {
        for (const day of monthView.children.reverse()) {
          // if (day.text.includes('年')) {
          //   if (day.text.includes(targetDateText)) {
          //     if (day.boundsInScreen.centerY < 0) {
          //       scrollView.scrollForward();
          //       await delay(1000);
          //       outer = true;
          //       break;
          //     }
          //     click(
          //       day.boundsInScreen.centerX,
          //       day.boundsInScreen.centerY
          //     );

          //     return;
          //   }
          // } else {
            // console.log(`当前页(${day.text}) 目标月日日期 ${targetDateMonthDayText}，是否包含目标月日 ${day.text.includes(targetDateMonthDayText)}`);
            if (day.text.includes(targetDateMonthDayText)) {
              console.log(`获取到的当前页面的所有日期 ${day.text} ${day.boundsInScreen.centerY}`)
              if (day.boundsInScreen.centerY < 0) {
                scrollView.scrollForward();
                await delay(1000);
                outer = true;
                break;
              }
              click(
                day.boundsInScreen.centerX,
                day.boundsInScreen.centerY
              );

              console.log(`已找到目标日期，已点击`);
              return;
            // }
          }
        }
        if (outer) {
          break;
        }
      }

      if (!outer) {
        scrollView.scrollForward();
        await delay(1000);
      }
    }

    throw new Error(`选择日期失败 ${targetDateText}`);
  }

  private async getCurrentDate(dateText: string, now: Date): Promise<Date> {
    const dateNumbers = dateText.match(/\d+/g);
    if (dateNumbers?.length === 2) {
      const d = new Date(
        now.getFullYear(),
        +dateNumbers[0] - 1,
        +dateNumbers[1]
      );

      if (
        d < new Date(now.getFullYear(), now.getMonth(), now.getDate())
      ) {
        d.setFullYear(d.getFullYear() + 1);
      }

      return d;
    } else {
      throw new Error(`无法解析日期 ${dateText}`);
    }
  }

  async inputAirport(airport: string): Promise<void> {
    const inputBtn = await selector.getById(
      "book_activity_city_list_tv_citySearch"
    );
    inputBtn.click();
    const input = await selector.getById(
      "book_activity_city_list_et_citySearch"
    );
    input.setText(airport);

    let cityCode: UiObject | undefined;
    let cityClickBtn: UiObject | undefined;
    let pages = 0;
    while (pages < 5 && !cityClickBtn) {
      pages++;

      let retry = 5;
      let cityCodeList = await selector.findAllById(
        "tv_code3",
        500,
        5000
      );
      while (retry > 0 && cityCodeList.length === 0) {
        retry--;
        input.setText("");
        await delay(500);
        input.setText(airport);
        await delay(1000);
        cityCodeList = await selector.findAllById(
          "tv_code3",
          500,
          5000
        );
      }

      if (cityCodeList.length === 0) {
        throw new Error(`机场代码 ${airport} 无法查询到出发城市`);
      }

      const targetCityCodeList = cityCodeList.filter(
        (x) => x.text === airport
      );

      if (targetCityCodeList.length === 0) {
        cityCode = cityCodeList[0];
        cityClickBtn = selector.findClickableParent(cityCodeList[0]);
      } else {
        for (const code of targetCityCodeList) {
          const btn = selector.findClickableParent(code);
          if (btn) {
            const title = selector.findChildById(btn, "tv_title");
            if (title?.text == "机场") {
              cityCode = code;
              cityClickBtn = btn;
              break;
            } else {
              console.log(`不是机场跳过 ${title?.text}`);
            }
          }
        }
      }

      if (cityClickBtn) {
        break;
      } else {
        const listView = await selector.getById(
          "book_activity_city_list_rcyView_searchCities"
        );
        console.log(`滑动机场选择 ${listView.scrollForward()}`);
        await delay(800);
      }
    }

    if (!cityClickBtn) {
      throw new Error(`机场三字码${airport}选择失败`);
    }

    console.log(`点击城市按钮 ${cityCode?.text} ${cityClickBtn.click()}`);
  }

  private async ensureLogin(accountInfo: AccountInfo) {
    if (environment.loginAccount === "") {
      await this.login(accountInfo);
    } else {
      if (environment.loginAccount !== accountInfo.userName) {
        await this.logout();
        await this.login(accountInfo);
      }
    }
    this._handler?.update(
      AppDeviceStatusType.Processing,
      environment.loginAccount
    );
  }

  async openHome(): Promise<void> {
    await this.clickIfIdExists("home_dialog_close_button", 100, 1000);

    let home = await selector.findById(HOME_BTN, 200, 2000);
    if (!home) {
      home = await this.backToHome();
    }

    selector.findClickableParent(home)?.click();

    await this.clickIfIdExists("home_dialog_close_button", 100, 1000);

    await selector.getById(BOOKING_BTN);
  }

  log(message: string): void {
    this._handler?.log(message);
  }

  /**
   * 爬取直减运价
   * @param input 只接收出发到达，没有航班号
   * @returns
   */
  async QueryDirectDiscount(
    input: CZQueryDirectDiscountDto
  ): Promise<CZDirectDiscountResultDto> {
    try {
      await this.openHome();

      // 如果要求账号和当前账号不一致 则重新登录
      await this.ensureLogin(input.accountInfo);

      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      );

      await this.openHome();
      const currDate = new Date(input.date);

      const result = {
        success: true,
        discounts: [] as CZDirectDiscountDetail[],
      } as CZDirectDiscountResultDto;

      (
        await selector.getById(
          "include_main_home_view_booking_rb_singletrip",
          100,
          1000
        )
      ).click();

      await this.searchFlight(
        input.originAirport,
        input.destinationAirport,
        currDate
      );

      if (await this.waitForLoading()) {
        throw new Error("加载航班列表超时");
      }
      await this.waitForTip(false, true);

      await this.clickIfIdExists("close", 200, 2000);
      await this.clickIfIdExists("close_btn", 200, 1000);
      if (await this.waitForLoading()) {
        throw new Error("加载航班列表超时");
      }

      const currDateText = formatToTimeZone(
        currDate,
        DATE_PATTERN,
        timezoneOptions
      );

      let flights = await selector.findAllById(
        "item_card_view",
        100,
        1000
      );

      if (flights.length === 0) {
        const noFlights = await selector.findByTextContains(
          "暂时没有可预订",
          100,
          1000
        );
        const sellOut = await selector.findByTextContains(
          "已售罄",
          100,
          1000
        );
        if (noFlights || sellOut) {
          this.log(`该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
        } else {
          throw new Error(`该日期的航班查询失败  ${input.originAirport}-${input.destinationAirport} ${currDateText}`)
        }

        return result;
      }

      let flightPanel = await selector.getById(
        "domestic_list_data_rv",
        400,
        2000
      );

      let validFlights: UiObject[] = [];
      let flightNos: string[] = [];
      let lastFlightCount: number = 0;
      let lowest: UiObject | undefined;
      let lowestFlightNo: string | undefined;
      let retry = 5;
      let cnt = 0;
      while (retry > 0 && validFlights.length === 0) {
        retry--;

        lastFlightCount = flightNos.length;
        for (const flight of flights) {
          const fullFlightNo = this.getFullFlightNoFromCard(flight);
          if (!flightNos.find((x) => x === fullFlightNo)) {
            flightNos.push(fullFlightNo);
          } else {
            continue;
          }

          const flightStopInfo = this.getStopInfoFromCard(flight);
          if (flightStopInfo && flightStopInfo.includes("中转")) {
            continue;
          }

          const cut = selector.findChildById(
            flight,
            "book_single_list_cut_tv"
          );

          if (cut) {
            validFlights.push(flight);
            const ticketPrice = selector.findChildById(
              flight,
              "book_single_list_price_tv"
            );
            if (lowest) {
              const lowestTicketPrice = selector.findChildById(
                lowest,
                "book_single_list_price_tv"
              );
              if (
                Number(ticketPrice?.text) <
                Number(lowestTicketPrice?.text)
              ) {
                lowest = flight;
                lowestFlightNo = this.getFullFlightNoFromCard(flight);
              }
            } else {
              lowest = flight;
              lowestFlightNo =
                this.getFullFlightNoFromCard(flight);
            }
          }
        }

        if (lastFlightCount === flightNos.length) {
          cnt++;
          if (cnt > 1) {
            break;
          }
        }

        flightPanel.scrollForward();
        await delay(1000);
        flightPanel = await selector.getById(
          "domestic_list_data_rv",
          400,
          2000
        );
        flights = await selector.findAllById(
          "item_card_view",
          100,
          1000
        );
      }

      if (validFlights.length === 0) {
        this.log(`该日期航班都被排除 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
      } else {
        // const flightDiscountLabel = await selector.getById(
        //     "book_single_list_cut_tv",
        //     200,
        //     2000
        // );

        // const card = selector.findClickableParent(flightDiscountLabel);
        // if (!card) {
        //     throw new Error("点击航班出错");
        // }

        // this.log(`找到直减航班`);

        // const fullFlightNo = this.getFullFlightNoFromCard(card);
        // card.click();

        let fullFlightNo = "";
        if (lowest && lowestFlightNo) {
          let flightFlightNoLabel = await selector.findByTextContains(
            lowestFlightNo,
            100,
            1000
          );
          // 中转航班可能和目标航班一样，要排除中转航班
          let transit = flightFlightNoLabel?.parent?.children.find(x => x.id === "book_single_list_flight_no_transit_tv");
          if (flightFlightNoLabel && !transit) {
            const card = this.findParent(
              flightFlightNoLabel,
              "item_card_view"
            );
            if (!card) {
              throw new Error("点击航班出错");
            }
            fullFlightNo = this.getFullFlightNoFromCard(card);
            card.click();
          } else {
            let t = 3;
            while (t > 0) {
              t--;
              flightPanel.scrollBackward();
              await delay(1000);
              flightPanel = await selector.getById(
                "domestic_list_data_rv",
                400,
                2000
              );
              flightFlightNoLabel =
                await selector.findByTextContains(
                  lowestFlightNo,
                  100,
                  1000
                );
              transit = flightFlightNoLabel?.parent?.children.find(x => x.id === "book_single_list_flight_no_transit_tv");
              if (flightFlightNoLabel && !transit) {
                const card = this.findParent(
                  flightFlightNoLabel,
                  "item_card_view"
                );
                if (!card) {
                  throw new Error("点击航班出错");
                }
                fullFlightNo = this.getFullFlightNoFromCard(card);
                card.click();
                break;
              }
            }
          }
        }

        if (await this.waitForLoading()) {
          throw new Error("加载航班详情超时");
        }
        await this.waitForTip(true, true);

        let discountLabel = await selector.findById(
          "cabin_details_order_cut_tv",
          200,
          2000
        );

        if (!discountLabel) {
          await scrollForward();
          discountLabel = await selector.findById(
            "cabin_details_order_cut_tv",
            200,
            2000
          );
        }

        if (!discountLabel) {
          const tabContainer = await selector.getById(
            "cabin_tab_container"
          );

          const busTab = tabContainer.children.find((x) =>
            selector
              .getChildById(x, "view_cabin_tab_tv_title")
              .text.includes("公务")
          );

          if (busTab) {
            console.log(`点击公务舱 ${busTab.desc} ${busTab.click()}`);

            await delay(700);
            discountLabel = await selector.findById(
              "cabin_details_order_cut_tv",
              200,
              2000
            );
          }
        }

        const detail = {
          date: currDateText,
          destinationAirport: input.destinationAirport,
          originAirport: input.originAirport,
          discountAmount: 0,
          fullFlightNo: fullFlightNo,
        } as CZDirectDiscountDetail;

        if (!discountLabel) {
          detail.fullFlightNo = "查询直减成功有航班但获取直减金额失败";
        } else {
          const discountAmountText = discountLabel.text.replace("立减¥", "");

          const amount = Number(discountAmountText);
          if (isNaN(amount)) {
            detail.fullFlightNo = `解析直减金额失败 ${discountAmountText}`;
            detail.discountAmount = -5;
          } else {
            detail.discountAmount = amount;
          }

          if (discountLabel.parent) {
            const cabinText = selector.findChildById(
              discountLabel.parent,
              "cabin_details_code_tv"
            );

            detail.cabin = cabinText?.text ?? "找到直减，但舱位解析失败";
          }
        }

        result.discounts.push(detail);
        back();
      }

      return result;
    }
    catch (error) {
      // 判断登录是否失效
      const login = await this.checkLoginStatus();
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      this._failedCount++;
      if (msg?.includes("网络好像不给力")) {
        this._networkErrorCount++;
      }

      if (this._networkErrorCount > 1) {
        this.stopApp();
        this._networkErrorCount = 0;
      }
      return {
        success: false,
        message: msg,
        detail: JSON.stringify(error),
        discounts: [
          {
            fullFlightNo: msg,
            date: input.date,
            destinationAirport: input.destinationAirport,
            originAirport: input.originAirport,
          } as CZDirectDiscountDetail,
        ],
      } as CZDirectDiscountResultDto;
    } finally {
      await this.changeProxy(":0");
      if (this._failedCount > 2) {
        try {
          await this.restartApp();
          this._failedCount = 0;
        } catch (error) {
          const msg = (error as Error)?.message;
          this._handler?.log(msg);
        }
      }
      await this.backToHome();
    }
  }

  findParent(
    uiObject: UiObject,
    id: string
  ): UiObject | undefined {
    if (!uiObject.parent) {
      return undefined;
    }

    if (uiObject.parent.id === id) {
      return uiObject.parent;
    } else {
      return this.findParent(uiObject.parent, id);
    }
  }

  private getFullFlightNoFromCard(card: UiObject): string {
    const flightNoText = selector.getChildById(
      card,
      "book_single_list_flight_no_tv"
    );

    const fullFlightNo = flightNoText.text.split(" ")[0];
    return fullFlightNo;
  }

  private getStopInfoFromCard(card: UiObject): string | undefined | null {
    const stopInfo = selector.findChildById(
      card,
      "book_single_list_stop_tv"
    );

    if (!stopInfo) {
      return undefined;
    }
    return stopInfo.text;
  }

  // 爬取价格
  async QueryFlights(input: CZQueryFlightsDto): Promise<CZFlightsDto> {
    try {
      await this.openHome();

      // 如果要求账号和当前账号不一致 则重新登录
      await this.ensureLogin(input.accountInfo);
      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      );

      await this.openHome();
      const beginDate = new Date(input.beginDate);
      const endDate = new Date(input.endDate);
      let currDate = beginDate;
      // 开始查询
      await this.searchFlight(
        input.originAirport,
        input.destinationAirport,
        beginDate
      );

      await this.waitForLoading();
      await this.waitForTip(false, true);

      const flightsResult: CZFlightDetailDto[] = [];
      const result = {
        success: true,
        flights: flightsResult,
      } as CZFlightsDto;

      while (currDate <= endDate) {
        await this.waitForLoading();
        await this.waitForTip(true, true);

        await this.clickIfIdExists("close", 200, 2000);

        const currDateText = formatToTimeZone(
          currDate,
          DATE_PATTERN,
          timezoneOptions
        );

        const flights = await selector.findAllById(
          "item_card_view",
          500,
          2000
        );

        if (flights.length === 0) {
          const noFlights = await selector.findByTextContains(
            "暂时没有可预订",
            100,
            1000
          );
          const sellOut = await selector.findByTextContains(
            "已售罄",
            100,
            1000
          );
          if (noFlights || sellOut) {
            this.log(
              `该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`
            );

            // 下一天
            // const nextDayBtn = await selector.getById(
            //     "include_flight_list_date_bar_rll_right"
            // );
            // nextDayBtn.click();
            // currDate.setDate(currDate.getDate() + 1);
            continue;
          } else {
            throw new Error("查询失败 加载航班失败");
          }
        }

        for (const flight of flights) {
          const fullFlightNo = this.getFullFlightNoFromCard(flight);
          const flightStopInfo = this.getStopInfoFromCard(flight);
          if (flightStopInfo && flightStopInfo.includes("中转")) {
            console.log(`中转航班 ${fullFlightNo} 跳过`);
            continue;
          }

          const card = selector.getChildById(
            flight,
            "item_flight_time_card"
          );
          const texts = card.children
            .map((x) => x.text)
            .filter((x) => x.length > 0);

          const detail = {
            date: currDateText,
            originAirport: input.originAirport,
            destinationAirport: input.destinationAirport,
            fullFlightNo: fullFlightNo,
          } as CZFlightDetailDto;
          if (texts.length > 4) {
            detail.originAirportName = texts[2];
            detail.destinationAirportName = texts[4];
          }

          flightsResult.push(detail);
          break;
        }

        if (currDate > endDate) {
          break;
        }
        // 下一天
        // const nextDayBtn = await selector.getById(
        //     "include_flight_list_date_bar_rll_right"
        // );
        // nextDayBtn.click();
        // currDate.setDate(currDate.getDate() + 1);
      }

      return result;
    } catch (error) {
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      return {
        success: false,
        message: msg,
        detail: JSON.stringify(error),
      } as CZFlightsDto;
    }
  }

  // 删除常旅客
  async deleteFrequentFlyer(max: number): Promise<number> {
    await this.openMine();

    await this.clickFrequentlyPassengers();

    // 点击中国境内
    await this.clickIfIdExists(
      "book_activity_passenger_list_tv_domestic",
      100,
      1000
    );
    await delay(500);

    let passengerListView = await selector.findById(
      "book_activity_passenger_list_rv_passengerList",
      500,
      5000
    );

    if (!passengerListView) {
      this.log(`没找到乘机人列表，跳过乘机人删除过程`);
      return 0;
    }

    if (passengerListView.childCount <= 0) {
      return 0;
    }

    // 滑动到最底部，同时记录乘客信息+人数 然后从后往前 保留max个乘客 删除其他乘客 一次最多删除10人
    let nameCards: string[] = [];
    let deleteCount = 0;
    let retry = 30;
    while (retry > 0) {
      retry--;
      const countWhenStart = nameCards.length;
      for (const p of passengerListView.children) {
        const cardNoText = selector.findChildById(
          p,
          "book_item_my_passenger_tv_certNum"
        );

        const nameText = selector.findChildById(
          p,
          "book_item_my_passenger_tv_psgName"
        );

        if (!cardNoText || !nameText) {
          continue;
        }

        const nameCardNo = nameText.text + cardNoText.text;
        if (!nameCards.find((x) => x === nameCardNo)) {
          nameCards.push(nameCardNo);
        }

        if (nameCards.length > max) {
          deleteCount++;
          const checkBox = selector.getChildById(
            p,
            "book_item_my_passenger_cb_check"
          );
          if (!checkBox.checked) {
            checkBox.click();
          }
        }
      }

      if (nameCards.length === countWhenStart) {
        break;
      }

      passengerListView.scrollForward();
      await delay(500);
      passengerListView = await selector.getById(
        "book_activity_passenger_list_rv_passengerList"
      );
    }

    this.log(`获取所有乘客证件号${nameCards.length}个 ${nameCards.join("|")}`);
    if (nameCards.length <= max) {
      this.log(`不需要删除常旅客`);
      back();
      return 0;
    } else {
      // 点击删除
      const deleteBtn = await selector.getById(
        "book_activity_passenger_list_menu_delete"
      );

      this.log(`点击乘机人批量删除按钮 ${deleteBtn.click()}`);
      if (await this.waitForLoading()) {
        back();
        await delay(1000);
        back();
        return deleteCount;
      }

      await this.waitForTip(false, true);
      back();
      await delay(1000);
      back();
      return deleteCount;
    }
  }

  async useCoupon(input: CZCreateOrderArgsDto): Promise<void> {
    const couponCabinPrices = input.cabinPriceInfos.filter(
      (x) => x.couponCode
    );
    const couponCount = couponCabinPrices.length;
    if (couponCount > 0) {
      const couponAmount = couponCabinPrices[0].couponAmount;

      const couponBtn = await selector.getById(
        "item_order_segment_flight_detail_lly_coupon"
      );
      couponBtn.click();

      await this.waitForLoading();

      let couponContent = await selector.getById("discount_coupon_content_rv");

      let checkedCount = 0;

      let retry = 5;
      while (retry > 0) {
        retry--;
        for (const layout of couponContent.children.reverse()) {
          const couponCodeText = selector.findChildById(
            layout,
            "discount_coupon_number_tv"
          );
          if (!couponCodeText) {
            continue;
          }
          const disabled = selector.findChildById(
            layout,
            "discount_coupon_bottom_disable_rl"
          );
          let used = selector.findChildById(
            layout,
            "discount_coupon_used_iv"
          );
          if (used || disabled) {
            continue;
          }
          // 校验金额
          const couponAmountText = selector.getChildById(
            layout,
            "discount_coupon_price_tv"
          );
          const amount = Number(couponAmountText.text);
          if (isNaN(amount)) {
            back();
            await this.waitForTip(false, true, false);
            throw new Error(`解析优惠券金额失败 ${couponAmountText.text}不是有效的数字`);
          }
          if (amount !== couponAmount) {
            back();
            await this.waitForTip(false, true, false);
            throw new Error(`优惠券金额不匹配 预期${couponAmount} 实际${amount}`);
          }
          await click(layout.boundsInScreen.centerX, layout.boundsInScreen.centerY);
          await delay(700);

          if (couponCount > 1) {
            await this.clickIfIdExists("dialog_discount_coupon_confirm_tv", 100, 2000);
            await delay(1000);
          }

          checkedCount++;
          if (checkedCount == couponCount) {
            break;
          }
        }
        if (checkedCount == couponCount) {
          break;
        }
        // 多人的时候才需要翻页
        if (couponCount > 1) {
          couponContent.scrollForward();
          await delay(1000);
          couponContent = await selector.getById("discount_coupon_content_rv");
        }
      }

      if (checkedCount < couponCount) {
        back();
        await this.waitForTip(false, true, false);
        throw new Error(`优惠券数量不足 需要${couponCount}个 实际${checkedCount} 个`);
      } else {
        await delay(700);
        if (couponCount > 1) {
          const confirmBtn = await selector.getById(
            "discount_coupon_confirm_bt"
          );
          confirmBtn.click();
        }
      }
    }
  }

  async useCouponRoundTrip(input: CZCreateOrderArgsDto): Promise<void> {
    const couponCabinPrices = input.cabinPriceInfos.filter(
      (x) => x.couponCode
    );
    const couponCount = couponCabinPrices.length;
    if (couponCount > 0) {
      const couponAmount = couponCabinPrices[0].couponAmount;

      const couponBtn = await selector.getById(
        "item_order_segment_flight_detail_lly_coupon"
      );
      couponBtn.click();
      const couponPriceLabels = await selector.findAllById(
        "discount_coupon_price_rl",
        200,
        2000
      );

      let index = 0;
      for (const label of couponPriceLabels) {
        const couponItem = selector.findClickableParent(label);
        if (!couponItem) {
          throw new Error("选择优惠券失败，找不到可点击优惠券对象");
        }

        const disabled = selector.findChildById(
          couponItem,
          "discount_coupon_bottom_disable_rl"
        );
        if (disabled) {
          continue;
        }

        // 校验金额
        const couponAmountText = selector.getChildById(
          couponItem,
          "discount_coupon_price_tv"
        );

        const amount = Number(couponAmountText.text);
        if (isNaN(amount)) {
          back();
          await this.waitForTip(false, true, false);
          throw new Error(`解析优惠券金额失败 ${couponAmountText.text} 不是有效的数字`);
        }

        if (amount !== couponAmount) {
          back();
          await this.waitForTip(false, true, false);
          throw new Error(`优惠券金额不匹配 预期${couponAmount} 实际${amount} `);
        }

        couponItem.click();
        const confirm = await selector.getById("dialog_discount_coupon_confirm_tv");
        confirm.click();
        index++;

        if (index >= couponCount) {
          break;
        }
      }

      if (index < couponCount) {
        back();
        await this.waitForTip(false, true, false);
        throw new Error(`优惠券数量不足 需要${couponCount}个 实际${index} 个`);
      } else {
        await delay(700);
        const confirmBtn = await selector.getById(
          "discount_coupon_confirm_bt"
        );
        confirmBtn.click();
      }
    }
  }

  async stopApp(): Promise<void> {
    await delay(2000);

    if (environment.adb) {
      this.log(`关闭APP ${await exec(`am force-stop ${appId}`, { adb: true, })} `);
      process.exit(-666);
    } else {
      await this.backToHome();
      back();
      back();
      back();
      process.exit(-666);
    }
  }

  async restartApp(): Promise<boolean> {
    if (environment.adb) {
      this.log(`关闭APP ${await exec(`am force-stop ${appId}`, { adb: true, })} `);
      await delay(3000);
      this.log(`启动APP ${app.launch(appId)} `);
      return true;
    } else {
      showToast("重启APP失败没有adb权限");
      return false;
    }
  }

  async checkLoginStatus(): Promise<boolean> {
    const loginPage = await selector.findById(
      "activity_login_rgp",
      100,
      1000
    );
    if (loginPage) {
      environment.loginAccount = "";
      back();
      return false;
    } else {
      const newPearlCard = await selector.findById(
        "pearlCard",
        100,
        3000
      );
      if (newPearlCard) {
        environment.loginAccount = "";
        back();
        return false;
      } else {
        const loginBtn = await selector.findById(
          "ll_head_portrait",
          100,
          1000
        );
        if (loginBtn) {
          environment.loginAccount = "";
          back();
          return false;
        }
      }

      return true;
    }
  }

  async confirmOrder(): Promise<string> {
    (await selector.getById("activity_order_tv_orderBook")).click();

    await this.waitForLoading();

    // 可能提示乘机人不一致
    await this.waitForTipAndClose("你选择的是", "button1", 100, 1000);
    await this.waitForTipAndClose("请您尽快支付并办理登机牌", "button2", 100, 1000);
    await this.waitForTipAndClose("证件确认", "book_dialog_certificate_type_tv_confirm", 100, 1000);
    await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);

    const insuranceTip = await selector.findById(
      "book_item_order_insurance_dialog_tv_give_up",
      100,
      1000
    );
    if (insuranceTip) {
      console.log(`点击放弃保险 ${insuranceTip.click()} `);
    }

    await this.waitForLoading();

    let agreementBtn = await selector.findById(
      "agreement_confirm_bt",
      500,
      5000
    );
    if (agreementBtn) {
      console.log(`点击承诺书 ${agreementBtn.click()} `);
    }

    // 填写订单页面点击了去支付按钮后，会重新回到填写订单页面，出现剩余票数的提示
    await this.waitForTipAndClose("剩余票数紧张", "button1", 400, 2000);

    await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);

    const yxffPage = await selector.findByTextContains(
      "优选服务",
      100,
      1000
    );
    if (yxffPage) {
      this.log(`当前页面是优选服务`);
      let payBtn = await selector.findById(
        "activity_xproduct_click_order",
        200,
        1000
      );

      let retry = 10;
      while (retry > 0 && !payBtn) {
        retry--;
        await this.waitForLoading();

        this.log(`未找到支付按钮尝试再次点击 agreement_confirm_bt`);
        let agreementBtn = await selector.findById(
          "agreement_confirm_bt",
          500,
          5000
        );
        if (agreementBtn) {
          console.log(`点击承诺书 ${agreementBtn.click()} `);
        }

        await this.waitForTipAndClose(
          "剩余票数紧张",
          "button1",
          400,
          2000
        );

        if (retry == 1) {
          back();
          back();
          await delay(1000);
        }

        payBtn = await selector.findById(
          "activity_xproduct_click_order",
          200,
          1000
        );
      }

      if (!payBtn) {
        throw new Error("找不到支付按钮");
      }

      this.log(`点击支付按钮后等待1秒 ${payBtn.click()} `);

      await delay(1000);

      await this.waitForLoading();
      await this.waitForTipAndClose("剩余票数紧张", "button1", 200, 2000);

      let msg = await this.waitForResultTip(false, false, false);
      retry = 10;
      while (msg && msg.indexOf("剩余票数紧张") > -1 && retry > 0) {
        retry--;
        await this.waitForLoading();
        await this.waitForTipAndClose("剩余票数紧张", "button1", 400, 2000);
        await delay(1000);
        msg = await this.waitForResultTip(false, false, false);
      }
    }

    let orderNoText = await selector.findById(
      "activity_pay_order_tv_orderNo",
      100,
      1000
    );
    if (!orderNoText) {
      this.log(`未找到订单号`);
      const msg = await this.waitForResultTip(false, true, true);
      this.log(`下单出现提示 ${msg} `);
      if (msg?.includes("不符合活动规则") || msg?.includes("系统错误") || msg?.includes("大家太热情啦")
        || msg?.includes("您的优惠券") || msg?.includes("您参与活动的次数已达上限") || msg?.includes("网络好像不给力")
        || msg?.includes("服务器繁忙") || msg?.includes("系统开了一个小差") || msg?.includes("20000")) {
        throw new Error(`下单出现错误 ${msg} `);
      }

      const payPage = await selector.findByTextContains(
        "支付订单",
        500,
        10000
      );
      if (!payPage) {
        // 当前
        throw new Error("下单失败，跳转下单成功页面失败");
      }

      orderNoText = await selector.findById(
        "activity_pay_order_tv_orderNo",
        500,
        5000
      );

      if (!orderNoText) {
        throw new Error("下单成功但获取订单号失败");
      }
    }

    return orderNoText.text.substring(5);
  }

  async confirmOrderRoundTrip(notIdentityCards: boolean): Promise<string> {
    await click(865, 2250);
    await delay(2000);

    if (notIdentityCards) {
      await click(755, 1580);
      await delay(1000);
    }

    await click(282, 2220);
    await delay(1000);

    const toPayBtn = await selector.findByTextContains("去支付", 200, 2000);
    if (!toPayBtn) {
      throw new Error("未找到去支付");
    }
    toPayBtn.click();
    await delay(5000);

    let dialog = await select({ className: 'android.app.Dialog' }).firstOrNull()
    if (dialog) {
      const textViewItem = new UiObjectHelper(dialog)
        .findChild("android.view.View", 0)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 0);
      console.log(textViewItem?.item.text)
      let msg = textViewItem?.item.text
      if (msg && (msg.includes('不符合活动规则') || msg.includes('系统错误') || msg.includes('下单出现错误'))) {
        await click(530, 1500);
        throw new Error(msg);
      } else {
        // 点击剩余票数紧张
        await click(530, 1500);
        await delay(1000);
      }
    }

    let orderNoText = await selector.findById(
      "activity_pay_order_tv_orderNo",
      500,
      20000
    );
    if (!orderNoText) {
      dialog = await select({ className: 'android.app.Dialog' }).firstOrNull()
      if (dialog) {
        const textViewItem = new UiObjectHelper(dialog)
          .findChild("android.view.View", 0)
          ?.findChild("android.view.View", 0)
          ?.findChild("android.view.View", 0)
          ?.findChild("android.widget.TextView", 0);
        console.log(textViewItem?.item.text)
        let msg = textViewItem?.item.text
        if (msg && (msg.includes('不符合活动规则') || msg.includes('系统错误') || msg.includes('下单出现错误'))) {
          await click(530, 1500);
          throw new Error(msg);
        } else {
          // 点击剩余票数紧张
          await click(540, 1500);
          await delay(1000);
        }
      }

      await click(350, 1460);
      await delay(1000);

      const payPage = await selector.findByTextContains(
        "支付订单",
        500,
        10000
      );
      if (!payPage) {
        // 当前
        throw new Error("下单失败，跳转下单成功页面失败");
      }

      orderNoText = await selector.findById(
        "activity_pay_order_tv_orderNo",
        500,
        5000
      );

      if (!orderNoText) {
        throw new Error("下单成功但获取订单号失败");
      }
    }

    return orderNoText.text.substring(5);
  }

  async getTotalPrice(): Promise<number> {
    const totalPriceText = await selector.getById(
      "activity_order_tv_totalPrice"
    );
    const totalPrice = Number(totalPriceText.text);
    if (isNaN(totalPrice)) {
      throw new Error(`解析支付总价失败 ${totalPriceText.text} 不是有效的数字`);
    }

    return totalPrice;
  }

  async getTotalPriceRoundTrip(): Promise<number> {
    const totalLabel = await selector.findByTextContains(
      "订单总额",
      200,
      2000
    );
    console.log(totalLabel);

    const totalText = totalLabel?.parent?.children.find(x => x.text.includes("¥"))?.text?.replace("¥", "");

    const totalPrice = Number(totalText);
    if (isNaN(totalPrice)) {
      throw new Error(`解析支付总价失败 ${totalText} 不是有效的数字`);
    }

    return totalPrice;
  }

  async checkPrices(
    args: CreateOrderArgs,
    product: CZAppProductInfo
  ): Promise<CreateOrderPriceDetailDto[]> {
    const result: CreateOrderPriceDetailDto[] = [];
    const priceDetailBtn = await selector.getById(
      "activity_order_layout_priceDetail"
    );
    priceDetailBtn.click();
    try {
      const container = await selector.getById("ll_container");
      const priceTexts = this.getPrices(container);

      let childTicketPrice: number | undefined = undefined;
      let childOilFee: number | undefined = undefined;

      const adultDetail = priceTexts.find(
        (x) => x.type === PassengerType.Adult
      );

      if (!adultDetail) {
        throw new Error("未找到成人价格");
      }

      const adultTicketPrice = Number(adultDetail.ticket);
      if (isNaN(adultTicketPrice)) {
        throw new Error(`解析成人详情结算价失败 ${adultDetail.ticket} 不是有效的数字`);
      }
      if (product.ticketPrice != adultTicketPrice) {
        throw new Error(`成人票面下单前变价${product.ticketPrice} -> ${adultTicketPrice} `);
      }

      const childDetail = priceTexts.find((x) => x.type === PassengerType.Child);
      if (childDetail) {
        childTicketPrice = Number(childDetail.ticket);
        if (isNaN(childTicketPrice)) {
          throw new Error(`解析儿童详情结算价失败 ${childDetail.ticket} 不是有效的数字`);
        }

        childOilFee = Number(childDetail.tax);
        if (isNaN(childOilFee)) {
          throw new Error(`解析儿童燃油失败 ${childDetail.tax} 不是有效的数字`);
        }
      }

      const discount = product.ticketPrice - product.settlementPrice;
      const couponCodes = args.cabinPriceInfos.filter((x) => x.couponCode).length;
      for (const cabinPrice of args.cabinPriceInfos) {
        const actualPrice = cabinPrice as CreateOrderPriceDetailDto;
        // 如果总税费，不等与实际总税费,那么基建不变,实际燃油 = 后台给的燃油 - （后台给的总税费 - 实际总税费）
        switch (actualPrice.type) {
          case PassengerType.Adult:
            actualPrice.ticketPrice = adultTicketPrice;
            actualPrice.settlementPrice = adultTicketPrice - (couponCodes > 0 ? actualPrice.couponAmount : discount);
            actualPrice.cabin = product.cabin;
            actualPrice.airportTax = Number(adultDetail.tax) !== (cabinPrice.airportTax + cabinPrice.oilFee) ? cabinPrice.airportTax - (cabinPrice.totalTax - Number(adultDetail.tax)) : cabinPrice.airportTax;
            actualPrice.oilFee = cabinPrice.oilFee;
            actualPrice.totalTax = actualPrice.airportTax + actualPrice.oilFee;
            break;
          case PassengerType.Child:
            const tp = childTicketPrice ?? actualPrice.ticketPrice;
            actualPrice.ticketPrice = tp;
            actualPrice.settlementPrice = tp - (couponCodes > 0 ? actualPrice.couponAmount : discount);
            actualPrice.cabin = product.cabin;
            actualPrice.airportTax = 0;
            actualPrice.oilFee = childOilFee ?? 0;
            actualPrice.totalTax =
              actualPrice.airportTax + actualPrice.oilFee;
            break;
          case PassengerType.Infant:
            break;
          default:
            break;
        }
        result.push(actualPrice);
      }
      return result;
    } finally {
      back();
    }
  }

  async checkPricesRoundTrip(
    args: CreateOrderArgs,
    product: CZAppProductInfo
  ): Promise<CreateOrderPriceDetailDto[]> {
    const result: CreateOrderPriceDetailDto[] = [];
    let priceDetailBtn = await selector.findByTextContains(
      "明细",
      200,
      2000
    );

    if (!priceDetailBtn) {
      throw new Error("明细不存在");
    }

    priceDetailBtn.click();
    await delay(1200);
    try {
      let root = await selector.getById("root");
      let detailPanel =
        root.children[0].children[root.children[0].childCount - 1]
          .children[1];
      let retry = 5;
      while (retry > 0 && !root.children[0]) {
        root = await selector.getById("root");
        detailPanel =
          root.children[0].children[root.children[0].childCount - 1]
            .children[1];
      }
      this.printNode(detailPanel, "");
      const prices = this.getPriceDetails(detailPanel);

      const adult = prices.find((x) => x.type === PassengerType.Adult);
      if (!adult) {
        throw new Error("找不到成人价格");
      }

      if (product.ticketPrice != adult.ticketPrice) {
        throw new Error(`成人票面下单前变价${product.ticketPrice} -> ${adult.ticketPrice} `);
      }

      let childTicketPrice: number | undefined = undefined;
      let childOilFee: number | undefined = undefined;
      const child = prices.find((x) => x.type === PassengerType.Child);
      if (child) {
        childTicketPrice = child.ticketPrice;
        childOilFee = child.totalTax;
      }

      const discount = product.ticketPrice - product.settlementPrice;
      const couponCodes = args.cabinPriceInfos.filter((x) => x.couponCode).length;
      for (const cabinPrice of args.cabinPriceInfos) {
        const actualPrice = cabinPrice as CreateOrderPriceDetailDto;
        switch (actualPrice.type) {
          case PassengerType.Adult:
            actualPrice.ticketPrice = adult.ticketPrice;
            actualPrice.settlementPrice = adult.ticketPrice - (couponCodes > 0 ? actualPrice.couponAmount : discount);;
            actualPrice.cabin = product.cabin;
            actualPrice.airportTax = cabinPrice.airportTax;
            actualPrice.oilFee = cabinPrice.oilFee;
            actualPrice.totalTax =
              actualPrice.airportTax + actualPrice.oilFee;
            break;
          case PassengerType.Child:
            const tp = childTicketPrice ?? actualPrice.ticketPrice;
            actualPrice.ticketPrice = tp;
            actualPrice.settlementPrice = tp - (couponCodes > 0 ? actualPrice.couponAmount : discount);
            actualPrice.cabin = product.cabin;
            actualPrice.airportTax = 0;
            actualPrice.oilFee = childOilFee ?? 0;
            actualPrice.totalTax =
              actualPrice.airportTax + actualPrice.oilFee;
            break;
          case PassengerType.Infant:
            break;
          default:
            break;
        }
        result.push(actualPrice);
      }

      return result;
    } finally {
      priceDetailBtn = await selector.findByTextContains(
        "明细",
        200,
        2000
      );

      if (!priceDetailBtn) {
        throw new Error("明细不存在");
      }

      priceDetailBtn.click();
      await delay(1200);
    }
  }

  getPriceDetails(detailPanel: UiObject): CZPriceDetail[] {
    const details: CZPriceDetail[] = [];
    for (const price of detailPanel.children) {
      if (price.childCount == 0) {
        continue;
      }
      const typeText = price.children[0].text;
      const ticketPriceText = price.children[1].children[2].text;
      const taxText = price.children[2].text.replace("税费¥", "");

      const ticketPrice = Number(ticketPriceText);
      if (isNaN(ticketPrice)) {
        throw new Error(`解析详情票面价失败 ${ticketPriceText} 不是有效的数字`);
      }

      const tax = Number(taxText);
      if (isNaN(tax)) {
        throw new Error(`解析详情税费失败 ${taxText} 不是有效的数字`);
      }

      details.push({
        type: typeText.includes("成人")
          ? PassengerType.Adult
          : PassengerType.Child,
        ticketPrice: ticketPrice,
        totalTax: tax,
      } as CZPriceDetail);
    }

    return details;
  }

  getPrices(container: UiObject): PriceDetail[] {
    // 根据文字描述提取价格信息
    const result: PriceDetail[] = [];

    // const regex = /(?<type>.+?)[:：](?<total>[0-9\.]+?)元.+?(?<count>\d)人.+?(?<ticket>[0-9\.]+?)元.+?(?<tax>[0-9\.]+)/;
    const regex = /(?<type>.+?)[, :：]{1,2}(?<total>[0-9\.]+?)元.+?(?<count>\d)人.+?(?<ticket>[0-9\.]+?)元.+?(?<tax>[0-9\.]+)/;

    for (const item of container.children) {
      if (!item.desc) {
        // const cutText = selector.findChildById(
        //     item,
        //     "price_detail_tv_money_order_cut"
        // );
        continue;
      }

      const match = regex.exec(item.desc);
      if (!match || !match.groups) {
        // throw new Error(`解析价格失败 ${item.desc} `);
        continue;
      }

      const detail = {} as PriceDetail;
      if (match.groups?.type === "成人") {
        detail.type = PassengerType.Adult;
      } else {
        detail.type = PassengerType.Child;
      }
      detail.total = match.groups?.total;
      detail.ticket = match.groups?.ticket;
      detail.count = match.groups?.count;
      detail.tax = match.groups?.tax;
      result.push(detail);
    }

    return result;
  }

  async inputContactAndCheck(contact: ContactInfo): Promise<void> {
    await this.getAndInputText(
      "item_order_synthesize_detail_et_contactsName",
      contact.name
    );

    await this.getAndInputText(
      "item_order_synthesize_detail_et_contactsMobile",
      contact.phone
    );

    await this.getAndInputText(
      "item_order_synthesize_detail_et_contactsEmail",
      contact.email
    );

    const confirmCheckBox = await selector.getById(
      "activity_order_chb_agreement"
    );
    confirmCheckBox.showOnScreen();
    confirmCheckBox.click();
  }

  async inputContactRoundTrip(contact: ContactInfo): Promise<void> {
    const contactPhoneText = await selector.findByTextContains("联系电话");
    if (contactPhoneText) {
      const editText = contactPhoneText.parent?.children.find(
        (x) => x.className == "android.widget.EditText"
      );
      if (editText) {
        editText.click();
        await delay(500);
        const contactPhoneClose =
          contactPhoneText.parent?.children.filter(
            (x) => x.className == "android.widget.TextView"
          );
        if (contactPhoneClose && contactPhoneClose.length > 0) {
          contactPhoneClose[1].click();
          await delay(500);
        }
        editText.setText(contact.phone);
        await delay(500);
        const cjrText = await selector.findByTextContains("乘机人");
        if (cjrText) {
          await click(
            cjrText.boundsInScreen.centerX,
            cjrText.boundsInScreen.centerY
          );
        }
      }
    }
  }

  async inputContactAndCheckRoundTrip(contact: ContactInfo): Promise<void> {
    for (let index = 0; index < 4; index++) {
      await swipe(500, 1700, 500, 400, 2000);
      await delay(700);
    }

    const x = 78;
    let y = device.screenHeight - 420;
    for (let index = 0; index < 6; index++) {
      await click(x, y);
      console.log(`Y坐标 ${y}`);
      await delay(700);
      y -= 80;
    }

    // for (let index = 0; index < 4; index++) {
    //     await swipe(500, 400, 500, 1700, 2000);
    //     await delay(700);
    // }
  }

  async inputPassenger(args: CZCreateOrderArgsDto): Promise<void> {
    const passengerAddBtn = await selector.getById(
      "book_order_passenger_add_layout_add_passenger"
    );
    passengerAddBtn.click();

    if (await this.waitForLoading()) {
      throw new Error("加载乘机人列表超时");
    }
    await this.waitForTip(false, true);

    await this.createOrSelectPassenger(args.passengers);

    // 检查已选择乘机人证件
    await this.validatePassengerCardNo(args.passengers);
  }

  async inputPassengerRoundTrip(args: CZCreateOrderArgsDto): Promise<void> {
    const root = await selector.getById("root");
    const listView = new UiObjectHelper(root.children[0]).findChild(
      "android.widget.ListView",
      0
    );

    if (listView) {
      const views = listView.item.children.length;
      const passengerAddBtn = new UiObjectHelper(root.children[0])
        .findChild("android.widget.ListView", 0)
        ?.findChild("android.view.View", views - 1);

      if (passengerAddBtn == null) {
        throw new Error("点击添加乘机人失败");
      }

      passengerAddBtn.click();
    }

    if (await this.waitForLoading()) {
      throw new Error("加载乘机人列表超时");
    }

    await this.waitForTip(false, true);

    await this.selectPassengersRoundTrip(args.passengers);

    const nextBtns = await selector.findAllByTextContains(
      "下一步",
      200,
      2000
    );

    if (nextBtns.length === 0) {
      this.log(`出现提示点击确定 ${await click(715, 1460)} `);
    }

    await delay(1000);
  }

  async validatePassengerCardNo(passengers: PassengerInfo[]): Promise<void> {
    let passengerListView = await selector.getById(
      "book_order_passenger_list_rcy_passengers"
    );

    let infCount = 0;
    const selectedCardNos: string[] = [];
    for (
      let index = 0;
      index < passengerListView.children.length;
      index++
    ) {
      const p = passengerListView.children[index];
      const checked = selector.getChildById(
        p,
        "book_order_passenger_item_cb_select"
      ).checked;
      if (!checked) {
        continue;
      }
      const no = selector.getChildById(
        p,
        "book_order_passenger_item_tv_psgCertificate"
      );
      selectedCardNos.push(no.text);

      const carrier = selector.findChildById(
        p,
        "book_order_passenger_item_layout_carry"
      );

      if (carrier) {
        if (infCount > 0) {
          throw new Error("一个订单只支持一个婴儿");
        }

        this.log(`婴儿需要选择携带人 点击选择携带人 ${carrier.click()} `);

        const confirm = await selector.getById(
          "dialog_bottom_one_wheel_confrim",
          200,
          2000
        );

        this.log(`点击确认携带人 ${confirm.click()} `);
        infCount++;
        passengerListView = await selector.getById(
          "book_order_passenger_list_rcy_passengers"
        );
      }
    }

    for (const p of passengers) {
      if (!selectedCardNos.find((x) => x.includes(p.identityInfo.cardNo))) {
        throw new Error(`校验已选择的乘机人失败 乘机人${this.getFullName(p.name)} 未选中`);
      }
    }
  }

  // 点击常用乘机人
  async clickFrequentlyPassengers() {
    let basicInfo = await selector.findByTextContains(
      "基本信息",
      100,
      2000
    );

    if (!basicInfo) {
      return;
    }

    basicInfo.showOnScreen();
    selector.findClickableParent(basicInfo)?.click();

    let passengerManager = await selector.findByTextContains(
      "常用乘机人",
      200,
      2000
    );

    if (passengerManager) {
      selector.findClickableParent(passengerManager)?.click();
    } else {
      return;
    }

    await this.waitForLoading();
  }

  /**
   * 往返：常用乘机人页面新增常用乘机人
   * @param passengers 乘机人
   * @returns
   */
  async createPassengersRoundTrip(passengers: PassengerInfo[]): Promise<void> {
    await delay(2000);

    await this.clickFrequentlyPassengers();

    // 点击中国境内
    await this.clickIfIdExists(
      "book_activity_passenger_list_tv_domestic",
      100,
      1000
    );

    // 检查是否已有，如果有则跳过
    // const existNameCardNos: string[] = [];
    // const targetNameCardNos: string[] = passengers.map(
    //   (x) => this.getFullName(x.name) + x.identityInfo.cardNo
    // );
    const existNames: string[] = [];
    const targetNames: string[] = passengers.map((x) => this.getFullName(x.name) + '');

    let passengerListView = await selector.findById(
      "book_activity_passenger_list_rv_passengerList",
      500,
      5000
    );

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，新增常用乘机人失败");
    }

    // this.log(`目标乘机人信息 ${JSON.stringify(targetNameCardNos)} `);
    this.log(`目标乘机人信息 ${JSON.stringify(targetNames)}`);

    if (passengerListView.children.length > 0) {
      let retry = 30;
      // let lastNameCardNo: string = "";
      let lastName: string = "";
      while (retry > 0) {
        retry--;
        const lastChild = passengerListView.children.at(-1);
        if (lastChild) {
          // const lastNameCardNos = await this.getNameAndCardNoRoundTrip(lastChild);
          // if (lastNameCardNos === lastNameCardNo) {
          //   break;
          // }
          const lastNames = await this.getNameRoundTrip(lastChild);
          if (lastNames === lastName) {
            break;
          }
        }

        for (const p of passengerListView.children) {
          // const nameCardNo = await this.getNameAndCardNoRoundTrip(p);
          // for (const item of targetNameCardNos) {
          //   this.log(
          //     `是否存在目标乘机人 ${this.isMatch(
          //       nameCardNo,
          //       item
          //     )
          //     } `
          //   );
          //   if (this.isMatch(nameCardNo, item)) {
          //     this.log(`跳过已存在的乘机人 ${nameCardNo} `);
          //     if (existNameCardNos.filter(x => x === nameCardNo)?.length === 0) {
          //       existNameCardNos.push(nameCardNo);
          //     }
          //   }
          // }
          // lastNameCardNo = nameCardNo;
          const name = await this.getNameRoundTrip(p);
          for (const item of targetNames) {
            this.log(`是否存在目标乘机人 ${this.isMatch(name, item)} `
            );
            if (this.isMatch(name, item)) {
              this.log(`跳过已存在的乘机人 ${name} `);
              if (existNames.filter(x => x === name)?.length === 0) {
                existNames.push(name);
              }
            }
          }
          lastName = name;
        }

        passengerListView.scrollForward();
        await delay(1000);
        passengerListView = await selector.getById(
          "book_activity_passenger_list_rv_passengerList"
        );
      }
    }

    // this.log(`已存在的乘机人有： ${existNameCardNos.join(",")} `);

    // if (targetNameCardNos.length === existNameCardNos.length) {
    //   this.log(
    //     `目标乘机人数${targetNameCardNos.length} 选中乘机人数${existNameCardNos.length} 相等，退出当前页面`
    //   );
    //   back();
    //   return;
    // }
    this.log(`已存在的乘机人有： ${existNames.join(",")} `);

    if (targetNames.length === existNames.length) {
      this.log(
        `目标乘机人数${targetNames.length} 选中乘机人数${existNames.length} 相等，退出当前页面`
      );
      back();
      return;
    }

    // 新建
    for (const psg of passengers) {
      const namecard = this.getFullName(psg.name) + psg.identityInfo.cardNo;
      if (existNames.length > 0) {
        for (const ex of existNames) {
          if (this.isMatch(ex, namecard)) {
            console.log(`跳过已存在的乘机人 ${namecard} `);
            continue;
          } else {
            this.log(`新增乘机人`);
            await this.addPassengerRoundTrip(psg);
          }
        }
      } else {
        this.log(`新增乘机人`);
        await this.addPassengerRoundTrip(psg);
      }
    }

    await delay(1000);
    back();
  }

  // async getNameAndCardNoRoundTrip(item: UiObject): Promise<string> {
  //   const name = selector.getChildById(
  //     item,
  //     "book_item_my_passenger_tv_psgName"
  //   ).text;
  //   const cardNoRaw = selector.getChildById(
  //     item,
  //     "book_item_my_passenger_tv_certNum"
  //   ).text;

  //   const nameCardNo = name + cardNoRaw.split(" ").at(-1);
  //   console.log(
  //     `获取乘机人信息 ${name} ${cardNoRaw} 最终结果 ${nameCardNo} `
  //   );

  //   return nameCardNo;
  // }

  async getNameRoundTrip(item: UiObject): Promise<string> {
    const name = selector.getChildById(
      item,
      "book_item_my_passenger_tv_psgName"
    ).text;
    console.log(`获取乘机人信息 ${name}`);

    return name;
  }

  async selectPassengersRoundTrip(
    passengers: PassengerInfo[]
  ): Promise<void> {
    const selectedNameCardNos: string[] = [];
    const targetNameCardNos: string[] = passengers.map(
      (x) => this.getFullName(x.name) + x.identityInfo.cardNo
    );

    let root = await selector.getById("root");
    let passengerListView = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0);

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    let index = 1
    for (
      ;
      index < 8;
      index++
    ) {
      const element = passengerListView.item?.children[index];
      if (!element) {
        break;
      }
      if (element.childCount < 1) {
        continue;
      }
      const nameItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 0);
      const cardItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 1);

      if (
        !nameItem ||
        !cardItem ||
        !nameItem.item.text ||
        !cardItem.item.text
      ) {
        continue;
      }

      const nameCardNo = this.getNameCardNoRoundTrip(
        nameItem.item.text,
        cardItem.item.text
      );

      if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
        if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
          await click(
            nameItem.item.boundsInScreen.centerX,
            nameItem.item.boundsInScreen.centerY
          );
          selectedNameCardNos.push(nameCardNo);
          await delay(700);
        }
      }
    }

    if (targetNameCardNos.length === selectedNameCardNos.length) {
      await this.confirmPassengerRoundTrip();
      return;
    }

    await swipe(500, 2150, 500, 300, 3000);
    await delay(1000);
    console.log("翻页");

    root = await selector.getById("root");
    passengerListView = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0);

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    this.log(`获取到列表数 ${passengerListView.item.childCount} `);

    for (
      ;
      index < 16;
      index++
    ) {
      const element = passengerListView.item?.children[index];
      if (!element) {
        break;
      }
      if (element.childCount < 1) {
        continue;
      }
      const nameItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 0);
      const cardItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 1);

      if (
        !nameItem ||
        !cardItem ||
        !nameItem.item.text ||
        !cardItem.item.text
      ) {
        continue;
      }

      const nameCardNo = this.getNameCardNoRoundTrip(
        nameItem.item.text,
        cardItem.item.text
      );

      if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
        if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
          await click(
            nameItem.item.boundsInScreen.centerX,
            nameItem.item.boundsInScreen.centerY
          );
          selectedNameCardNos.push(nameCardNo);
          await delay(700);
        }
      }
    }

    if (targetNameCardNos.length === selectedNameCardNos.length) {
      await this.confirmPassengerRoundTrip();
      return;
    }

    // 第3次翻页
    await swipe(500, 2150, 500, 300, 3000);
    await delay(1000);
    console.log("翻页");

    root = await selector.getById("root");
    passengerListView = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0);

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    for (
      ;
      index < 24;
      index++
    ) {
      const element = passengerListView.item?.children[index];
      if (!element) {
        break;
      }
      if (element.childCount < 1) {
        continue;
      }
      const nameItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 0);
      const cardItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 1);

      if (
        !nameItem ||
        !cardItem ||
        !nameItem.item.text ||
        !cardItem.item.text
      ) {
        continue;
      }

      const nameCardNo = this.getNameCardNoRoundTrip(
        nameItem.item.text,
        cardItem.item.text
      );

      if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
        if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
          await click(
            nameItem.item.boundsInScreen.centerX,
            nameItem.item.boundsInScreen.centerY
          );
          selectedNameCardNos.push(nameCardNo);
          await delay(700);
        }
      }
    }

    if (targetNameCardNos.length === selectedNameCardNos.length) {
      await this.confirmPassengerRoundTrip();
      return;
    }

    // 第4次翻页
    await swipe(500, 2150, 500, 300, 3000);
    await delay(1000);

    root = await selector.getById("root");
    passengerListView = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0);

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    for (
      ;
      index < 32;
      index++
    ) {
      const element = passengerListView.item?.children[index];
      if (!element) {
        break;
      }
      if (element.childCount < 1) {
        continue;
      }
      const nameItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 0);
      const cardItem = new UiObjectHelper(element)
        .findChild("android.view.View", 1)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.widget.TextView", 1);

      if (
        !nameItem ||
        !cardItem ||
        !nameItem.item.text ||
        !cardItem.item.text
      ) {
        continue;
      }

      const nameCardNo = this.getNameCardNoRoundTrip(
        nameItem.item.text,
        cardItem.item.text
      );

      if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
        if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
          await click(
            nameItem.item.boundsInScreen.centerX,
            nameItem.item.boundsInScreen.centerY
          );
          selectedNameCardNos.push(nameCardNo);
          await delay(700);
        }
      }
    }

    if (targetNameCardNos.length === selectedNameCardNos.length) {
      await this.confirmPassengerRoundTrip();
      return;
    }

    throw new Error(`乘机人不匹配 目标${targetNameCardNos.join(",")} 实际${selectedNameCardNos.join(",")} `);
  }

  isMatch(encrypted: string, full: string): boolean {
    if (encrypted.length != full.length) {
      return false;
    }

    for (let index = 0; index < encrypted.length; index++) {
      const element = encrypted[index];
      const element2 = full[index];
      if (element === "*") {
        continue;
      }

      if (element !== element2) {
        return false;
      }
    }

    return true;
  }

  getNameCardNoRoundTrip(name: string, card: string): string {
    const textRegex = /(?<name>.+?)\((?<type>[\u4e00-\u9fa5]+)\)/;
    const cardRegex =
      /(?<cardType>[\u4e00-\u9fa5]+)(?<cardNo>[\dA-Za-z\*]+)/;

    const nameMatch = textRegex.exec(name);
    if (!nameMatch) {
      throw new Error("姓名提取失败");
    }

    const cardMatch = cardRegex.exec(card);
    if (!cardMatch) {
      throw new Error("证件提取失败");
    }

    const nameCard = (nameMatch.groups?.name ?? "") + cardMatch.groups?.cardNo;

    return nameCard;
  }

  async createOrSelectPassenger(passengers: PassengerInfo[]): Promise<void> {
    // 删除名字不一致证件号一致的乘机人（名字太长用...省略）
    // const delCardNos: string[] = [];
    // const delNameCardNos: PassengerNameCardNo[] = passengers.map((x) => {
    //   return { name: this.getFullName(x.name) || "", cardNo: x.identityInfo.cardNo };
    // });

    // 检查是否已有，如果有则选中
    const selectedNameCardNos: string[] = [];
    // 检查是否已有，如果有则选中(2023/12/05)
    // const selectedCardNos: string[] = [];
    // 目标名称和证件号
    const targetNameCardNos: string[] = passengers.map(
      (x) => this.getFullName(x.name) + x.identityInfo.cardNo
    );
    // 目标证件号
    // const targetCardNos: string[] = passengers.map(
    //   (x) => x.identityInfo.cardNo
    // );

    let passengerListView = await selector.findById(
      "book_activity_order_select_passenger_rcy_passengerList",
      500,
      5000
    );

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    if (passengerListView.children.length > 0) {
      let retry = 30;
      let lastNameCardNo: string = "";
      // let lastCardNo: string = "";
      while (retry > 0) {
        retry--;
        const lastChild = passengerListView.children.at(-1);
        if (lastChild) {
          const lastNameCardNos = await this.getNameCardNo(lastChild);
          if (lastNameCardNos === lastNameCardNo) {
            break;
          }
          // const lastCardNos = await this.getCardNo(lastChild);
          // if (lastCardNos === lastCardNo) {
          //   break;
          // }
        }

        // for (const p of passengerListView.children) {
        //   const nameCardNo = await this.getExistNameCardNo(p);
        //   const nameCardNoSpilt = nameCardNo.split(":");
        //   const name = nameCardNoSpilt[0];
        //   const cardNo = nameCardNoSpilt[1];
        //   if (name !== delNameCardNos.find((x) => x.name === name)?.name && cardNo === delNameCardNos.find((x) => x.cardNo === cardNo)?.cardNo) {
        //     const checkBox = selector.getChildById(
        //       p,
        //       "book_order_passenger_item_cb_select"
        //     );
        //     if (!checkBox.checked) {
        //       this.log(`选中证件号相同的乘机人 ${cardNo} ${checkBox.click()}`);
        //     }
        //     delCardNos.push(cardNo);
        //   }
        // }
        // if (delCardNos.length > 0) {
        //   this.clickIfIdExists("book_activity_passenger_list_menu_delete", 100, 1000);
        //   await this.waitForTip(false, true);
        //   await delay(1000);
        // }

        for (const p of passengerListView.children) {
          const nameCardNo = await this.getNameCardNo(p);
          // const cardNo = await this.getCardNo(p);

          if (
            targetNameCardNos.find((x) => x === nameCardNo) &&
            !selectedNameCardNos.find((x) => x === nameCardNo)
          ) {
            const checkBox = selector.getChildById(
              p,
              "book_order_passenger_item_cb_select"
            );
            if (!checkBox.checked) {
              this.log(`选中已存在乘机人 ${nameCardNo} ${checkBox.click()} `);
            }

            selectedNameCardNos.push(nameCardNo);
          }
          // if (
          //   targetCardNos.find((x) => x === cardNo) &&
          //   !selectedCardNos.find((x) => x === cardNo)
          // ) {
          //   const checkBox = selector.getChildById(
          //     p,
          //     "book_order_passenger_item_cb_select"
          //   );
          //   if (!checkBox.checked) {
          //     this.log(`选中已存在乘机人 ${cardNo} ${checkBox.click()} `);
          //   }

          //   selectedCardNos.push(cardNo);
          // }

          lastNameCardNo = nameCardNo;
          // lastCardNo = cardNo;
        }

        passengerListView.scrollForward();
        await delay(1000);
        passengerListView = await selector.getById(
          "book_activity_order_select_passenger_rcy_passengerList"
        );
      }
    }

    if (targetNameCardNos.length === selectedNameCardNos.length) {
      await this.confirmPassenger();
      return;
    }
    // if (targetCardNos.length === selectedCardNos.length) {
    //   await this.confirmPassenger();
    //   return;
    // }

    // 新建
    for (const psg of passengers) {
      const namecard = this.getFullName(psg.name) + psg.identityInfo.cardNo;
      if (selectedNameCardNos.find((x) => x === namecard)) {
        continue;
      }

      await this.addPassenger(psg);
    }
    // for (const psg of passengers) {
    //   const card = psg.identityInfo.cardNo;
    //   if (selectedCardNos.find((x) => x === card)) {
    //     continue;
    //   }

    //   await this.addPassenger(psg);
    // }

    await this.confirmPassenger();
  }

  private async confirmPassenger() {
    (
      await selector.getById(
        "book_activity_order_select_passenger_tv_ensure"
      )
    ).click();
    await delay(1000);

    const confirmTip = await this.waitForTip(false, true);
    if (confirmTip?.includes("请添加一位18岁以上的乘机人")) {
      await delay(500);
      back();
      // 不保存 已选择的乘机人 button2
      await this.waitForTipAndClose("已选择的乘机人", "button2");
      throw new Error(confirmTip);
    } else {
      // 偶尔无法关闭
      await this.waitForTip(false, true);
    }
  }

  private async confirmPassengerRoundTrip() {
    const root = await selector.getById("root");
    let passengerListView = new UiObjectHelper(root.children[0]).findChild(
      "android.view.View",
      0
    );

    if (!passengerListView) {
      throw new Error("找不到乘机人列表，编辑乘机人失败");
    }

    const btn =
      passengerListView.item.children[
        passengerListView.item.childCount - 1
      ].children[0];

    await click(btn.boundsInScreen.centerX, btn.boundsInScreen.centerY);

    await delay(800);

    const confirmTip = await this.waitForTip(false, true);
    if (confirmTip?.includes("请添加一位18岁以上的乘机人")) {
      await delay(500);
      back();
      // 不保存 已选择的乘机人 button2
      await this.waitForTipAndClose("已选择的乘机人", "button2");
      throw new Error("请添加一位18岁以上的乘机人");
    } else {
      console.log(`保存乘机人出现提示 ${confirmTip} `);
    }
  }

  getFullName(name: PassengerName): string | undefined {
    switch (name.nameType) {
      case NameType.English:
        return `${name.primary}/${name.secondary}`;
      case NameType.Chinese:
        return name.primary;
      default:
        return undefined;
    }
  }

  async addPassenger(psg: PassengerInfo): Promise<void> {
    const addBtn = await selector.getById(
      "book_activity_order_select_passenger_layout_addPassenger"
    );
    addBtn.click();

    await this.inputPassengerInfo(psg);
  }

  async addPassengerRoundTrip(psg: PassengerInfo): Promise<void> {
    const addBtn = await selector.getById(
      "book_activity_passenger_list_layout_addPassenger"
    );
    addBtn.click();
    this.log(`点击新增常用乘机人`);

    await this.inputPassengerInfo(psg);
  }

  /**
   * 输入乘机人信息
   * @param psg 乘机人信息
   */
  async inputPassengerInfo(psg: PassengerInfo) {
    if (psg.identityInfo.cardNo.length === 18 && (psg.identityInfo.cardNo.startsWith('8300') || psg.identityInfo.cardNo.startsWith('8100'))) {
      psg.identityInfo.type = IdentityCardType.SX;
    }
    if (psg.identityInfo.type == IdentityCardType.HX) {
      psg.identityInfo.type = IdentityCardType.HM;
    }
    if (psg.identityInfo.type == IdentityCardType.TI) {
      psg.identityInfo.type = IdentityCardType.TW;
    }

    if (psg.identityInfo.type === IdentityCardType.NI) {
      const name = this.getFullName(psg.name) ?? "";
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_name",
        name
      );

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_certificateNumber",
        psg.identityInfo.cardNo,
        true
      );

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_phoneNumber",
        psg.phone,
        true
      );

      const identityCardType = await selector.findByTextContains("请输入正确的有效证件号", 100, 1000);
      if (identityCardType) {
        throw new Error("请输入正确的有效证件号 " + psg.identityInfo.cardNo);
      }
    } else if (psg.identityInfo.type === IdentityCardType.SX) {
      const certTypeBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certificateType"
      );
      certTypeBtn.click();
      await delay(300);

      const ppBtn = await selector.findByTextContains("护照");
      if (!ppBtn) {
        throw new Error("未找到 护照");
      }
      ppBtn.click();
      await delay(300);

      const sxBtn = await selector.findByTextContains("港澳台居民居住证");
      if (!sxBtn) {
        throw new Error("未找到 港澳台居民居住证");
      }
      sxBtn.click();
      await delay(1000);

      (await selector.getById("dialog_bottom_wheel_confrim")).click();

      const name = this.getFullName(psg.name) ?? "";
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_name",
        name
      );

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_certificateNumber",
        psg.identityInfo.cardNo
      );

      await this.inputBirthDay(psg.birthDate);

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_phoneNumber",
        psg.phone,
        true
      );

    } else if (psg.identityInfo.type === IdentityCardType.PP || psg.identityInfo.type === IdentityCardType.RP || psg.identityInfo.type === IdentityCardType.HY || psg.identityInfo.type === IdentityCardType.YJ) {
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_phoneNumber",
        psg.phone,
        true
      );

      const certTypeBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certificateType"
      );
      certTypeBtn.click();
      await delay(700);

      const ppBtn = await selector.findByTextContains("护照");
      if (!ppBtn) {
        throw new Error("未找到 护照");
      }
      ppBtn.click();
      if (psg.identityInfo.type === IdentityCardType.YJ || psg.identityInfo.type === IdentityCardType.HY) {
        await delay(300);
        const sxBtn = await selector.findByTextContains("港澳台居民居住证");
        if (!sxBtn) {
          throw new Error("未找到 港澳台居民居住证");
        }
        sxBtn.click();
        await delay(300);

        const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
        if (!hmBtn) {
          throw new Error("未找到 港澳居民来往内地通行证");
        }
        hmBtn.click();
        await delay(300);

        const twBtn = await selector.findByTextContains("台湾居民来往大陆通行证");
        if (!twBtn) {
          throw new Error("未找到 台湾居民来往大陆通行证");
        }
        twBtn.click();
        await delay(300);

        const csyxzmBtn = await selector.findByTextContains("出生医学证明");
        if (!csyxzmBtn) {
          throw new Error("未找到 出生医学证明");
        }
        csyxzmBtn.click();
        await delay(300);

        const rpBtn1 = await selector.findByTextContains("外国人永久居留证（新版）");
        if (!rpBtn1) {
          throw new Error("未找到 外国人永久居留证（新版）");
        }
        rpBtn1.click();

        const rpBtn = await selector.findByTextContains("外国人永久居留证");
        if (!rpBtn) {
          throw new Error("未找到 外国人永久居留证");
        }
        rpBtn.click();

        if (psg.identityInfo.type === IdentityCardType.HY) {
          await delay(300);
          // 目标选择海员证   
          const hyzBtn = await selector.findByTextContains("海员证");
          if (!hyzBtn) {
            throw new Error("未找到 海员证");
          }
          hyzBtn.click();
        }
      }

      await delay(1000);
      (await selector.getById("dialog_bottom_wheel_confrim")).click();

      await this.commonInput(psg);

      const certIssueCountryBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certIssueCountry"
      );
      const countryCodeName = getNationCodeName(psg.identityInfo.countryCode);
      if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
        console.log("签发地 " + countryCodeName);
        certIssueCountryBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          // 选择签发地
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          console.log('签发地列表 ' + listView);
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          console.log('签发地列表国家数量 ' + viewTexts && viewTexts?.length);
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              console.log('获取到的签发地 ' + viewText.text);
              if (viewText.text.includes(countryCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            // 滑动
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }

      if (psg.identityInfo.certificateValidityDate) {
        await this.inputCertificateValidityDate(
          psg.identityInfo.certificateValidityDate
        );
      }

      await this.inputBirthDay(psg.birthDate);

      if (psg.gender) {
        if (psg.gender == GenderType.Female) {
          await this.clickIfIdExists(
            "book_view_domestic_passenger_new_rb_female",
            50,
            1000
          );
        } else {
          await this.clickIfIdExists(
            "book_view_domestic_passenger_new_rb_male",
            50,
            1000
          );
        }
      }

      const nationalityBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_nationality"
      );
      const nationCodeName = getNationCodeName(psg.identityInfo.nationCode);
      if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
        nationalityBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          // 选择国家
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              console.log('获取到的国家 ' + viewText.text);
              if (viewText.text.includes(nationCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            // 滑动
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }
    } else if (psg.identityInfo.type === IdentityCardType.HM) {
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_phoneNumber",
        psg.phone,
        true
      );

      const certTypeBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certificateType"
      );
      certTypeBtn.click();
      await delay(300);

      const ppBtn = await selector.findByTextContains("护照");
      if (!ppBtn) {
        throw new Error("未找到 护照");
      }
      ppBtn.click();
      await delay(300);

      const sxBtn = await selector.findByTextContains("港澳台居民居住证");
      if (!sxBtn) {
        throw new Error("未找到 港澳台居民居住证");
      }
      sxBtn.click();
      await delay(300);

      const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
      if (!hmBtn) {
        throw new Error("未找到 港澳居民来往内地通行证");
      }
      hmBtn.click();
      await delay(1000);

      (await selector.getById("dialog_bottom_wheel_confrim")).click();

      const name = this.getFullName(psg.name) ?? "";
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_name",
        name
      );

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_certificateNumber",
        psg.identityInfo.cardNo,
        true
      );

      const certIssueCountryBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certIssueCountry"
      );
      const countryCodeName = getNationCodeName(psg.identityInfo.countryCode);
      if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
        console.log("签发地 " + countryCodeName);
        certIssueCountryBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              console.log('获取到的签发地 ' + viewText.text);
              if (viewText.text.includes(countryCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }

      await this.inputBirthDay(psg.birthDate);

      const nationalityBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_nationality"
      );
      const nationCodeName = getNationCodeName(psg.identityInfo.nationCode);
      if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
        nationalityBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              if (viewText.text.includes(nationCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }
    } else if (psg.identityInfo.type === IdentityCardType.TW || psg.identityInfo.type === IdentityCardType.HR || psg.identityInfo.type === IdentityCardType.BC) {
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_phoneNumber",
        psg.phone,
        true
      );

      const certTypeBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certificateType"
      );
      certTypeBtn.click();
      await delay(300);

      const ppBtn = await selector.findByTextContains("护照");
      if (!ppBtn) {
        throw new Error("未找到 护照");
      }
      ppBtn.click();
      await delay(300);

      const sxBtn = await selector.findByTextContains("港澳台居民居住证");
      if (!sxBtn) {
        throw new Error("未找到 港澳台居民居住证");
      }
      sxBtn.click();
      await delay(300);

      const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
      if (!hmBtn) {
        throw new Error("未找到 港澳居民来往内地通行证");
      }
      hmBtn.click();
      await delay(300);

      const twBtn = await selector.findByTextContains("台湾居民来往大陆通行证");
      if (!twBtn) {
        throw new Error("未找到 台湾居民来往大陆通行证");
      }
      twBtn.click();
      if (psg.identityInfo.type === IdentityCardType.HR) {
        const hkbBtn = await selector.findByTextContains("户口簿");
        if (!hkbBtn) {
          throw new Error("未找到 户口簿");
        }
        hkbBtn.click();
      } else if (psg.identityInfo.type === IdentityCardType.BC) {

        const csyxBtn = await selector.findByTextContains("出生医学证明");
        if (!csyxBtn) {
          throw new Error("未找到 出生医学证明");
        }
        csyxBtn.click();
      }
      await delay(1000);

      (await selector.getById("dialog_bottom_wheel_confrim")).click();

      const name = this.getFullName(psg.name) ?? "";
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_name",
        name
      );

      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_certificateNumber",
        psg.identityInfo.cardNo
      );

      const certIssueCountryBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_certIssueCountry"
      );
      const countryCodeName = getNationCodeName(psg.identityInfo.countryCode);
      if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
        certIssueCountryBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              if (viewText.text.includes(countryCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }

      await this.inputBirthDay(psg.birthDate);

      const nationalityBtn = await selector.getById(
        "book_view_domestic_passenger_new_tv_nationality"
      );
      const nationCodeName = getNationCodeName(psg.identityInfo.nationCode);
      if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
        nationalityBtn.click();
        await delay(1500);
        let tryCount = 20;
        while (tryCount > 0) {
          tryCount--;
          let listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
          let viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          if (viewTexts && viewTexts?.length > 0) {
            for (const viewText of viewTexts) {
              console.log('获取到的国家 ' + viewText.text);
              if (viewText.text.includes(nationCodeName)) {
                viewText.click();
                tryCount = 0;
                break;
              }
            }
            await swipe(400, 1700, 400, 300, 1000);
            await delay(1000);
            listView = await select({ className: 'android.widget.ListView' }).firstOrNull();
            viewTexts = listView?.parent?.children.filter(x => x.className === 'android.view.View');
          }
        }
      }
    } else {
      throw new Error("暂不支持除身份证、护照、港澳台居民居住证、港澳居民来往内地通行证、台湾居民来往大陆通行证、户口簿、出生医学证明、外国人永久居留证、海员证以外的证件类型");
    }

    const checkBox = await selector.getById(
      "book_activity_domestic_passenger_new_cb_agreePact"
    );
    if (!checkBox.checked) {
      console.log(`点击同意乘机人信息 ${checkBox.click()}`);
    }
    await delay(500);

    const confirmBtn = await selector.getById(
      "book_activity_domestic_passenger_new_tv_finish"
    );

    this.log(`点击乘机人信息确认 ${confirmBtn.click()}`);

    await this.waitForLoading();
    await this.waitForTip(true, true);
  }

  // 除身份证和港澳台居民居住证外的其他证件类型的公用块
  async commonInput(psg: PassengerInfo) {
    await this.getAndInputText(
      "book_view_domestic_passenger_new_et_certificateNumber",
      psg.identityInfo.cardNo,
      true
    );

    if (psg.surName && psg.givenName) {
      // 输入姓
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_surname",
        psg.surName
      );
      // 输入名
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_givenName",
        psg.givenName
      );
    } else {
      const name = this.getFullName(psg.name) ?? "";
      const nameSplit = name.split("/");
      if (nameSplit.length == 0) {
        throw new Error("名字格式不符合");
      }
      const textRegex = /^[\u4e00-\u9fa5]+$/;
      const match = textRegex.exec(name);
      if (match) {
        throw new Error(`名字格式不符合 ${name}`);
      }
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_surname",
        nameSplit[0]
      );
      await this.getAndInputText(
        "book_view_domestic_passenger_new_et_givenName",
        nameSplit[1]
      );
    }
  }

  async inputBirthDay(birthDate: string): Promise<void> {
    const birthdayBtn = await selector.getById(
      "book_view_domestic_passenger_new_tv_birthday"
    );

    const currentDate = birthdayBtn.text.includes("必填") ? new Date() : new Date(birthdayBtn.text);

    const targetDate = new Date(birthDate);

    birthdayBtn.click();

    const pickerItem = await selector.getById("pickers");
    const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
    const monthDiff = currentDate.getMonth() - targetDate.getMonth();
    const dayDiff = currentDate.getDate() - targetDate.getDate();
    await this.pickerScroll(pickerItem.children[2], yearDiff);
    await this.pickerScroll(pickerItem.children[1], monthDiff);
    await this.pickerScroll(pickerItem.children[0], dayDiff);

    (await selector.getById("dialog_bottom_wheel_confrim")).click();
  }

  async inputCertificateValidityDate(birthDate: string): Promise<void> {
    const certificateBtn = await selector.getById(
      "book_view_domestic_passenger_new_tv_certificateDeadline"
    );

    const currentDate = certificateBtn.text.includes("必填") ? new Date() : new Date(certificateBtn.text);

    const targetDate = new Date(birthDate);

    certificateBtn.click();

    const pickerItem = await selector.getById("pickers");
    const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
    const monthDiff = currentDate.getMonth() - targetDate.getMonth();
    const dayDiff = currentDate.getDate() - targetDate.getDate();
    await this.pickerScroll(pickerItem.children[2], yearDiff);
    await this.pickerScroll(pickerItem.children[1], monthDiff);
    await this.pickerScroll(pickerItem.children[0], dayDiff);

    (await selector.getById("dialog_bottom_wheel_confrim")).click();
  }

  async pickerScroll(item: UiObject, diff: number): Promise<void> {
    if (diff > 0) {
      for (let index = 0; index < diff; index++) {
        item.scrollBackward();
        await delay(300);
      }
    } else {
      for (let index = 0; index < Math.abs(diff); index++) {
        item.scrollForward();
        await delay(300);
      }
    }
  }

  async getExistNameCardNo(item: UiObject): Promise<string> {
    const name = selector.getChildById(
      item,
      "book_order_passenger_item_tv_psgName"
    ).text;
    const cardNoRaw = selector.getChildById(
      item,
      "book_order_passenger_item_tv_psgCertificate"
    ).text;

    const nameCardNo = name + ':' + cardNoRaw.split("：").at(-1)?.trim();

    return nameCardNo;
  }

  private async getNameCardNo(item: UiObject): Promise<string> {
    const name = selector.getChildById(
      item,
      "book_order_passenger_item_tv_psgName"
    ).text;
    const cardNoRaw = selector.getChildById(
      item,
      "book_order_passenger_item_tv_psgCertificate"
    ).text;

    const nameCardNo = name + cardNoRaw.split("：").at(-1);

    return nameCardNo;
  }

  // 英文名显示不全，只检查证件号
  private async getCardNo(item: UiObject): Promise<string> {
    const cardNoRaw = selector.getChildById(
      item,
      "book_order_passenger_item_tv_psgCertificate"
    ).text;

    const cardNo = '' + cardNoRaw.split("：").at(-1);

    return cardNo;
  }

  private async selectProduct(input: CZCreateOrderArgsDto): Promise<CZAppProductInfo> {
    const bestProduct = await this.findTargetProduct(input);
    this.log(`点击选购 ${bestProduct.bookingBtn.click()}`);

    if (bestProduct.bookingBtn.text.includes("订")) {
      const notUpgradeBtn = await selector.findById(
        "dialog_upgrade_cancel_tv",
        200,
        2000
      );

      if (notUpgradeBtn) {
        notUpgradeBtn.click();
      }

      const cancelBtn = await selector.findById(
        "order_view_window_cancel_tv",
        200,
        2000
      );

      if (cancelBtn) {
        cancelBtn.click();
      }

      await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);

      // 检查是否登录失效
      await this.waitForTip(true, true);
      return bestProduct;
    }

    const extraProducts = await selector.getById("cabin_details_child_rv");
    const commonBuyPanel = extraProducts.children.find((x) => selector.getChildById(x, "cabin_details_child_name_tv").text.includes("普通预订"));

    if (!commonBuyPanel) {
      throw new Error(`普通购买按钮未找到`);
    }

    const commonBuyBtn = selector.getChildById(commonBuyPanel, "cabin_details_child_price_book_tv");

    commonBuyBtn.click();

    const notUpgradeBtn = await selector.findById(
      "dialog_upgrade_cancel_tv",
      200,
      2000
    );

    if (notUpgradeBtn) {
      notUpgradeBtn.click();
      console.log("点击我不升级");
    }

    const cancelBtn = await selector.findById(
      "order_view_window_cancel_tv",
      200,
      2000
    );

    if (cancelBtn) {
      cancelBtn.click();
    }

    await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);

    // 检查是否登录失效
    await this.waitForTip(true, true);
    return bestProduct;
  }

  async findTargetProduct(args: CZCreateOrderArgsDto): Promise<CZAppProductInfo> {
    let products = await this.getProducts();
    const productText = products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|");

    // 根据要求的产品 + 价格 + 舱位 筛选
    products = this.filterByProductCodes(products, args.productCodes);
    console.log(`根据产品类型筛选结果 ${products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|")}`);
    products = this.filterByRules(products, args);
    this.log(`根据比价规则筛选最优产品 ${products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|")}`);

    if (products.length === 0) {
      const compareDetailSplit = compareDetailStr.split("||");
      const err = `${compareDetail}, 没有符合条件的产品，查到的产品(${productText}) \n 产品代码：(${args.productCodes}) \n 比价结果：${compareDetailSplit[compareDetailSplit.length - 1]})`;
      throw new Error(err);
    }

    products.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);

    const bestProduct = products[0];
    this.log(`已选择最优产品 ${bestProduct.productName}:${bestProduct.cabin}-(${bestProduct.ticketPrice},${bestProduct.settlementPrice})`);

    return bestProduct;
  }

  // 往返选择价格舱位（往返也有直减，没有产品类型）
  async selectProductPriceCabinRoundTrip(
    input: CZCreateOrderArgsDto
  ): Promise<CZAppProductInfo> {
    await delay(3000);
    const error = await selector.findByTextContains('大家太热情啦', 100, 1000);
    if (error) {
      throw error.text
    }

    const bestProduct = await this.findTargetProductPriceCabinRoundTrip(input);

    if (bestProduct.bookingBtn.text.includes("预订")) {
      this.log(`点击选购/预订 ${bestProduct.bookingBtn.click()}`);

      const notUpgradeBtn = await selector.findById(
        "dialog_upgrade_cancel_tv",
        200,
        2000
      );

      if (notUpgradeBtn) {
        notUpgradeBtn.click();
        console.log("点击我不升级");
      }

      const cancelBtn = await selector.findById(
        "order_view_window_cancel_tv",
        200,
        2000
      );

      if (cancelBtn) {
        cancelBtn.click();
        console.log("点击下次再说");
      }

      await this.waitForTip(true, true);
      return bestProduct;
    }

    let root = await selector.getById("root");
    let rootChildren = new UiObjectHelper(root.children[0]);
    let allCabin = rootChildren.item.children
      .filter((x) => x.className == "android.view.View")
      .at(-1);
    let listView = allCabin?.children
      ?.filter((x) => x.className == "android.widget.ListView")
      .at(-1);
    let retry = 5;
    while (retry > 0 && !listView) {
      retry--;
      root = await selector.getById("root");
      rootChildren = new UiObjectHelper(root.children[0]);
      allCabin = rootChildren.item.children
        .filter((x) => x.className == "android.view.View")
        .at(-1);
      listView = allCabin?.children
        ?.filter((x) => x.className == "android.widget.ListView")
        .at(-1);
    }

    if (listView != null) {
      for (const item of listView.children) {
        const packupText = item.children[0].children.find((x) => x.className === "android.widget.TextView" && x.text == "普通购买");
        if (packupText) {
          const bookText = packupText?.parent?.children.filter((x) => x.className === "android.widget.TextView" && x.text == "预订");
          if (bookText && bookText.length > 0) {
            await delay(2000);
            this.log(`点击预订 ${bookText[0].click()}`);
            await this.waitForTip(true, true);
            return bestProduct;
          }
        }
      }
    }

    const notUpgradeBtn = await selector.findById(
      "dialog_upgrade_cancel_tv",
      200,
      2000
    );

    if (notUpgradeBtn) {
      notUpgradeBtn.click();
      console.log("点击我不升级");
    }

    const cancelBtn = await selector.findById(
      "order_view_window_cancel_tv",
      200,
      2000
    );

    if (cancelBtn) {
      cancelBtn.click();
      console.log("点击下次再说");
    }

    await this.waitForTip(true, true);
    return bestProduct;
  }

  // 往返查找目标产品价格和舱位
  async findTargetProductPriceCabinRoundTrip(
    args: CZCreateOrderArgsDto
  ): Promise<CZAppProductInfo> {
    await delay(5000);

    let products = await this.getProductPriceCabinsRoundTrip();
    const productText = products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|");


    // 根据要求的产品 + 价格 + 舱位 筛选
    // products = this.filterByProductCodes(products, args.productCodes);
    products = this.filterByRulesRoundTrip(products, args);

    if (products.length === 0) {
      throw new Error(`${compareDetail}, 没有符合条件的产品，查到的产品(${productText}) 产品代码(${args.productCodes}) 规则 ${JSON.stringify(args.createOrderRuleInfo)}`);
    }

    products.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);

    const bestProduct = products[0];

    return bestProduct;
  }

  // 往返的产品价格和舱位
  async getProductPriceCabinsRoundTrip(): Promise<CZAppProductInfo[]> {
    let result: CZAppProductInfo[] = [];
    let root = await selector.getById("root");
    let allCabin = root.children[0].children.at(-1);
    let allCabinListView = allCabin?.children
      .filter((x) => x.className == "android.widget.ListView")
      .at(0);
    let allCabinList = allCabinListView?.children;
    let retry = 5;
    while (retry > 0 && (!allCabin || !allCabinListView || !allCabinList)) {
      retry--;
      root = await selector.getById("root");
      allCabin = root.children[0].children.at(-1);
      allCabinListView = allCabin?.children
        .filter((x) => x.className == "android.widget.ListView")
        .at(0);
      allCabinList = allCabin?.children;
    }

    if (allCabinList) {
      for (const element of allCabinList) {
        console.log(element.id);
        await click(
          element.boundsInScreen.centerX,
          element.boundsInScreen.centerY
        );
        await delay(1000);
      }
    }

    root = await selector.getById("root");
    allCabin = root.children[0].children.at(-1);
    let listViews = allCabin?.children?.filter((x) => x.className == "android.widget.ListView");

    let tryRetry = 5;
    while (tryRetry > 0 && (listViews && listViews.length <= 1)) {
      tryRetry--;
      await click(520, 468);
      await delay(500);
      await click(320, 720);
      root = await selector.getById("root");
      allCabin = root.children[0].children.at(-1);
      listViews = allCabin?.children?.filter((x) => x.className == "android.widget.ListView");
    }

    let listView = listViews?.at(-1);

    if (listView != null) {
      await swipe(400, 1600, 400, 300, 1000);
      await delay(1000);

      for (const item of listView.children) {
        const productInfos = await this.getProductPriceCabinInfoRoundTrip(
          item.children[0]
        );
        if (productInfos.length > 0)
          for (const productInfo of productInfos) {
            const exists = result.find(
              (x) =>
                x.cabin === productInfo.cabin &&
                x.productName === productInfo.productName &&
                x.ticketPrice === productInfo.ticketPrice
            );

            if (!exists) {
              result.push(productInfo);
            } else {
              return result;
            }
          }
      }
    }
    return result.sort((a, b) => a.ticketPrice - b.ticketPrice);
  }

  printNode(node: UiObject, level: string) {
    console.log(`${level}${node.className}:${node.text}`);
    if (node.childCount > 0) {
      for (const child of node.children) {
        this.printNode(child, level + "--");
      }
    }
  }

  // 往返的产品类型价格和舱位信息
  async getProductPriceCabinInfoRoundTrip(
    item: UiObject
  ): Promise<CZAppProductInfo[]> {
    let productName: string = "特价经济舱";

    const textViews = item.children.filter(
      (x) => x.className === "android.widget.TextView"
    );
    let expertPro = textViews.filter((x) => x.text.includes("家庭专区") || x.text.includes("长者特惠") || x.text.includes("会员多人特惠") || x.text.includes("新客专享"));
    if (expertPro.length > 0) {
      return [];
    }
    let productNameText = textViews.filter((x) =>
      x.text.includes("往返特惠")
    );
    if (productNameText.length > 0) {
      productName = productNameText[0].text;
      this.log(`获取到的产品名称 ${productName}`);
    }

    const priceText = textViews.filter((x) => x.text.includes("¥"))[0];
    const ticketPrice = Number(priceText.text.replace("¥", ""));
    if (isNaN(ticketPrice)) {
      throw new Error(
        `解析票面价失败 ${priceText.text.replace(
          "¥",
          ""
        )}不是有效的数字`
      );
    }
    let qcCabin: string = "";
    let fcCabin: string = "";
    const wfcabinText = textViews.filter((x) => x.text.includes("+"));
    if (wfcabinText.length > 0) {
      // 往返舱位一样
      const cabinText = wfcabinText[0].text.split("+");
      qcCabin = cabinText[0];
      fcCabin = cabinText[0];
    } else {
      const cabinText = textViews.filter((x) => x.text.includes("舱"));
      qcCabin = cabinText[0].text;
      fcCabin = cabinText[1].text;
    }

    let directDiscount: number = 0;
    const directDiscountText = textViews.filter((x) =>
      x.text.includes("立减")
    );
    if (directDiscountText.length > 0) {
      directDiscount = Number(directDiscountText[0].text.substring(3));
      if (isNaN(directDiscount)) {
        directDiscount = 0;
      }
    }

    const bookingBtnTexts = textViews.filter((x) =>
      x.text.includes("预订")
    );
    let bookingBtn: UiObject | undefined;
    if (bookingBtnTexts.length > 0) {
      bookingBtn = bookingBtnTexts[0];
    } else {
      const xgBtnTexts = textViews.filter((x) => x.text.includes("选购"));
      xgBtnTexts[0].click();
      await delay(500);

      bookingBtn = xgBtnTexts[0];
    }
    return [
      {
        productName: productName,
        cabin:
          qcCabin.replace("舱", "").trim() +
          "|" +
          fcCabin.replace("舱", "").trim(),
        cabinClass: CabinClassType.EconomyClass,
        ticketPrice: ticketPrice,
        settlementPrice: ticketPrice - directDiscount,
        bookingBtn: bookingBtn,
      } as CZAppProductInfo,
    ];
  }

  filterByProductCodes(
    products: CZAppProductInfo[],
    productCodes: string
  ): CZAppProductInfo[] {
    productCodes = productCodes?.trim();
    if (productCodes && productCodes.length > 0) {
      const productCodeList = productCodes.split("|");
      return products.filter((x) => productCodeList.find((y) => y.includes(x.productName)));
    } else {
      return products;
    }
  }

  filterByRules(
    products: CZAppProductInfo[],
    args: CreateOrderArgs
  ): CZAppProductInfo[] {
    const adultPassenger = args.passengers.find((x) => x.type === PassengerType.Adult);
    if (!adultPassenger) {
      throw new Error(`不支持没有成人下单`);
    }

    const adultPrice = args.cabinPriceInfos.find((x) => x.identityCardNo === adultPassenger.identityInfo.cardNo);

    if (!adultPrice) {
      throw new Error(`未找到成人价格 ${this.getFullName(adultPassenger.name)}`);
    }

    let result: CZAppProductInfo[] = [];
    const compareDetail: string[] = [];
    for (const product of products) {
      console.log('根据产品要求+价格+舱位获取到的票面价 ' + product.ticketPrice);
      const ticket = product.ticketPrice - adultPrice.ticketPrice;
      if (
        args.createOrderRuleInfo?.ticketPriceFloatRange &&
        (args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit > ticket || ticket > args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit)
      ) {
        compareDetail.push(`APP票面-OTA票面 ${product.ticketPrice}-${adultPrice.ticketPrice}=${ticket}，不符合票面价要求${args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit}`);
        continue;
      }

      let settlement = 0
      if (args.cabinPriceInfos.filter(x => x.couponCode).length > 0) {
        settlement = product.ticketPrice - adultPrice.couponAmount - adultPrice.settlementPrice;
      } else {
        settlement = product.settlementPrice - adultPrice.settlementPrice;
      }

      if (
        args.createOrderRuleInfo?.settlementPriceFloatRange &&
        (args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit > settlement
          || settlement > args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit)
      ) {
        compareDetail.push(`APP结算-OTA结算=${settlement}，不符合结算价要求${args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit}`);
        continue;
      }
      const sell = product.ticketPrice - adultPrice.settlementPrice;
      if (
        args.createOrderRuleInfo?.sellPriceFloatRange &&
        (args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit > sell
          || sell > args.createOrderRuleInfo.sellPriceFloatRange.upperLimit)
      ) {
        compareDetail.push(`APP票面-OTA结算=${sell}，不符合销售范围${args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.sellPriceFloatRange.upperLimit}`);
        continue;
      }

      if (args.createOrderRuleInfo.fixCabin) {
        if (adultPrice.cabin[0] !== product.cabin[0]) {
          compareDetail.push(`要求固定舱位${adultPrice.cabin[0]}，实际舱位${product.cabin[0]}不符合`);
          continue;
        }
      } else {
        if (
          args.createOrderRuleInfo.allowedCabins &&
          args.createOrderRuleInfo.allowedCabins != "*"
        ) {
          const allowedCabins = args.createOrderRuleInfo.allowedCabins.split("|");

          if (!allowedCabins.find((x) => x[0] === product.cabin[0])) {
            compareDetail.push(`实际舱位不符合 ${product.cabin[0]}，不在允许的舱位范围中 ${args.createOrderRuleInfo.allowedCabins}`);
            continue;
          }
        }
      }

      result.push(product);
    }

    compareDetailStr = compareDetail.join("||");

    return result;
  }

  // 往返校验规则
  filterByRulesRoundTrip(
    products: CZAppProductInfo[],
    args: CreateOrderArgs
  ): CZAppProductInfo[] {
    // 成人
    const adultPassenger = args.passengers.find(
      (x) => x.type === PassengerType.Adult
    );
    if (!adultPassenger) {
      throw new Error(`不支持没有成人下单`);
    }

    const adultPriceInfo = args.cabinPriceInfos.filter(
      (x) => x.identityCardNo === adultPassenger.identityInfo.cardNo
    );
    if (!adultPriceInfo) {
      throw new Error(`未找到成人价格 ${this.getFullName(adultPassenger.name)}`);
    }
    const adultPrice = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.ticketPrice, 0);
    const adultCouponAmount = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.couponAmount, 0);
    const adultSettlementPrice = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.settlementPrice, 0);

    let result: CZAppProductInfo[] = [];

    for (const product of products) {
      const ticket = product.ticketPrice - adultPrice;

      const qcCabin = product.cabin.split("|").at(0);
      const fcCabin = product.cabin.split("|").at(-1);
      if (args.createOrderRuleInfo.fixCabin) {
        if (args.cabinPriceInfos[0].cabin !== qcCabin || args.cabinPriceInfos[1].cabin != fcCabin) {
          compareDetail.push(`舱位不符，目标去程舱位${args.cabinPriceInfos[0].cabin}，实际去程舱位${qcCabin}不符合，目标返程舱位${args.cabinPriceInfos[1].cabin}，实际返程舱位${fcCabin}不符合`);
          continue;
        }
      } else {
        if (args.createOrderRuleInfo.allowedCabins && args.createOrderRuleInfo.allowedCabins != "*") {
          const allowedCabins = args.createOrderRuleInfo.allowedCabins.split("|");
          if (!allowedCabins.find((x) => x[0] === qcCabin) || !allowedCabins.find((x) => x[0] === fcCabin)) {
            compareDetail.push(`实际舱位不符合去程舱位${qcCabin}，返程舱位${fcCabin} 不在允许的舱位范围中 ${args.createOrderRuleInfo.allowedCabins}`);
            continue;
          }
        }
      }

      if (args.createOrderRuleInfo?.ticketPriceFloatRange && (args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit > ticket || ticket > args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit)) {
        compareDetail.push(`APP票面-OTA票面 ${product.ticketPrice}-${adultPrice}=${ticket}，不符合票面价要求${args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit}`);
        continue;
      }

      const settlement = product.settlementPrice - adultCouponAmount - adultSettlementPrice;

      if (args.createOrderRuleInfo?.settlementPriceFloatRange
        && (args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit > settlement || settlement > args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit)) {
        compareDetail.push(`APP结算-OTA结算=${settlement}，不符合结算价要求${args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit}`);
        continue;
      }
      const sell = product.ticketPrice - adultSettlementPrice;
      if (args.createOrderRuleInfo?.sellPriceFloatRange && (args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit > sell || sell > args.createOrderRuleInfo.sellPriceFloatRange.upperLimit)) {
        compareDetail.push(`APP票面-OTA结算=${sell}，不符合销售范围${args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.sellPriceFloatRange.upperLimit}`);
        continue;
      }

      result.push(product);
    }

    return result;
  }

  async getProducts(): Promise<CZAppProductInfo[]> {
    let result: CZAppProductInfo[] = [];

    const tabContainer = await selector.findById(
      "cabin_tab_container",
      50,
      500
    );
    if (tabContainer) {
      const echoTab = tabContainer.children.find((x) => selector.findChildById(x, "view_cabin_tab_tv_title")?.text === "经济舱");
      if (echoTab) {
        console.log(`点击经济舱 ${echoTab.desc} ${echoTab.click()}`);
        await delay(700);
      }
    }

    const productListView = await selector.findById(
      "domestic_full_cabin_rv_flight_cabin",
      100,
      3000
    );
    if (!productListView) {
      throw new Error(`找不到产品列表`);
    }

    let retry = 5;
    while (retry > 0) {
      retry--;
      const items = productListView.children;
      // 根据文字提示判断首乘专享、长者特惠
      const detailTipText = await selector.findById("cabin_details_tips_content_iv", 50, 1000);
      if (detailTipText) {
        if (detailTipText.text.includes("首次")) {
          const tagMore = await selector.findById("cabin_details_fc_tag_more", 100, 1000);
          if (tagMore) {
            await click(
              tagMore.boundsInScreen.centerX +
              tagMore.boundsInScreen.width / 4,
              tagMore.boundsInScreen.centerY
            );
            await delay(1000);
          }
        }
      }
      for (const item of items) {
        const productInfos = await this.getProductInfo(item);
        for (const productInfo of productInfos.reverse()) {
          const exists = result.find(
            (x) =>
              x.cabin === productInfo.cabin &&
              x.productName === productInfo.productName &&
              x.ticketPrice === productInfo.ticketPrice
          );

          if (!exists) {
            result.push(productInfo);
          } else {
            return result;
          }
        }
      }

      productListView.scrollDown();
      await delay(1000);
    }

    return result;
  }

  async getProductInfo(item: UiObject): Promise<CZAppProductInfo[]> {
    let productName!: string;
    let specialProduct = false;
    let productNameText = selector.findChildById(
      item,
      "cabin_details_name_tv"
    );
    if (productNameText) {
      productName = productNameText.text;
    } else {
      productNameText = selector.findChildById(
        item,
        "cabin_details_fc_title_1"
      );

      if (productNameText) {
        productName = productNameText.text;
      } else {
        productNameText = selector.getChildById(
          item,
          "cabin_details_tips_content_iv"
        );

        if (!productNameText) {
          throw new Error("获取产品类型失败");
        } else {
          const detailTipText = selector.findChildById(
            item,
            "cabin_details_tips_content_iv"
          );
          if (detailTipText) {
            if (detailTipText.text.includes("长者旅客") || detailTipText.text.includes("长者旅行产品")) {
              productName = "长者特惠";
            } else if (detailTipText.text.includes("额外400里程")) {
              productName = "额外400里程"
            } else {
              productName = "会员多人特惠";
            }
          }
        }

        specialProduct = true;
      }
    }

    const priceText = selector.getChildById(item, "cabin_details_price_tv");
    const cabinText = selector.getChildById(item, "cabin_details_code_tv");

    const directDiscountText = selector.findChildById(
      item,
      "cabin_details_order_cut_tv"
    );

    const bookingBtn = selector.getChildById(
      item,
      "cabin_details_price_book_tv"
    );

    const ticketPrice = Number(priceText.text.replace("起", ""));
    if (isNaN(ticketPrice)) {
      throw new Error(
        `解析票面价失败 ${priceText.text.replace(
          "起",
          ""
        )}不是有效的数字`
      );
    }

    let directDiscount: number;
    if (directDiscountText) {
      directDiscount = Number(directDiscountText.text.substring(3));
      if (isNaN(directDiscount)) {
        console.log(
          `解析直减金额失败 ${directDiscountText.text.substring(
            3
          )}不是有效的数字`
        );

        directDiscount = 0;
      }
    } else {
      directDiscount = 0;
    }

    return [
      {
        productName: productName,
        cabin: cabinText.text.replace("舱", "").trim(),
        cabinClass: CabinClassType.EconomyClass,
        ticketPrice: ticketPrice,
        settlementPrice: ticketPrice - directDiscount,
        bookingBtn: bookingBtn,
        specialProduct: specialProduct,
      } as CZAppProductInfo,
    ];
  }

  async flightDateTimeMatch(): Promise<{ groups?: { [key: string]: string; }; }> {
    const detailPanel = await selector.getById(
      "domestic_full_cabin_flight_detail",
      100,
      3000
    );
    const flightDetailPanel = detailPanel.children.filter((x) => x.desc)[0];
    const flightDetailText = flightDetailPanel.desc;
    // const flightDetailRegex = /.+?(?<flight_no>[A-Z]{2}[A-Z\d]{4}[A-Z]?).+?(?<date>\d{4}-\d{2}-\d{2}).+?(?<dep_time>\d+点((\d+分)|(整))).+?(?<arr_time>\d+点((\d+分)|(整)))/;
    const flightNoRegex = /航班号：?(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]{0,1})/
    const dateRegex = /出发时间\s*\|\s*(?<date>\d{4}-\d{2}-\d{2})\s*\|.*?(?<dep_time>\d+点整|\d+点\d+分)，到达时间.*?(?<arr_time>\d+点整|\d+点\d+分)/

    // 从描述中提取信息进行校验
    // const match = flightDetailRegex.exec(flightDetailText);
    const flightNoMatch = flightNoRegex.exec(flightDetailText);
    const dateMatch = dateRegex.exec(flightDetailText);
    if (!flightNoMatch || !dateMatch) {
      throw new Error(`解析航班信息失败 ${flightDetailText}`);
    }
    let matchRes = {
      groups: {
        flight_no: flightNoMatch?.groups?.flight_no || '',
        date: dateMatch?.groups?.date || '',
        dep_time: dateMatch?.groups?.dep_time || '',
        arr_time: dateMatch?.groups?.arr_time || '',
      }
    };
    return matchRes;
  }

  async validateFlightInfo(
    departureDateTime: string,
    arrivalDateTime: string,
    fullFlightNo: string
  ): Promise<void> {
    const detailPanel = await selector.getById(
      "domestic_full_cabin_flight_detail",
      100,
      3000
    );

    const flightDetailPanel = detailPanel.children.filter((x) => x.desc)[0];
    const flightDetailText = flightDetailPanel.desc;
    // const flightDetailRegex = /航班号：(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]?).+?(?<date>\d{4}-\d{2}-\d{2}).+?(?<dep_time>\d+点((\d+分)|(整))).+?(?<arr_time>\d+点((\d+分)|(整)))/;
    const flightNoRegex = /航班号：?(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]{0,1})/
    const dateRegex = /出发时间\s*\|\s*(?<date>\d{4}-\d{2}-\d{2})\s*\|.*?(?<dep_time>\d+点整|\d+点\d+分)，到达时间.*?(?<arr_time>\d+点整|\d+点\d+分)/
    // 从描述中提取信息进行校验
    // const match = flightDetailRegex.exec(flightDetailText);
    const flightNoMatch = flightNoRegex.exec(flightDetailText);
    const dateMatch = dateRegex.exec(flightDetailText);
    if (!flightNoMatch || !dateMatch) {
      throw new Error(`解析航班信息失败 ${flightDetailText}`);
    }

    if (flightNoMatch.groups?.flight_no !== fullFlightNo) {
      throw new Error(`校验航班信息 航班号不匹配 预期${fullFlightNo} 实际${flightNoMatch.groups?.flight_no}`);
    }

    const depDateTime = new Date(departureDateTime);
    const arrDateTime = new Date(arrivalDateTime);
    const depDateExp = formatToTimeZone(
      depDateTime,
      DATE_PATTERN,
      timezoneOptions
    );
    const depTimeExp = formatToTimeZone(
      depDateTime,
      "H点m分",
      timezoneOptions
    );
    const arrTimeExp = formatToTimeZone(
      arrDateTime,
      "H点m分",
      timezoneOptions
    );

    if (depDateExp !== dateMatch.groups?.date) {
      throw new Error(`校验航班信息 出发日期不匹配 预期${depDateExp} 实际${dateMatch.groups?.date}`);
    }

    const depTime = dateMatch.groups?.dep_time.replace("整", "0分");
    if (depTimeExp !== depTime) {
      throw new Error(`校验航班信息 出发时间不匹配 预期${depTimeExp} 实际${dateMatch.groups?.dep_time}`);
    }

    const arrTime = dateMatch.groups?.arr_time.replace("整", "0分");
    if (arrTimeExp !== arrTime) {
      throw new Error(`校验航班信息 到达时间不匹配 预期${arrTimeExp} 实际${dateMatch.groups?.arr_time}`);
    }
  }

  // 校验往返航班信息
  async validateFlightInfoRoundTrip(flights: TicketOrderFlight[]): Promise<void> {
    const root = await selector.getById("root");
    // 获取去程航班信息
    let detailPanel = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0)
      ?.findChild("android.view.View", 0);
    if (detailPanel) {
      let qcFlightNo: string = "";
      let qcDate: string = "";
      let qcDepartureTime = false;
      let qcDepartureDateTime: string = "";
      let qcArrivalDateTime: string = "";

      for (const qcView of detailPanel.item.children) {
        if (qcView.className === "android.widget.TextView") {
          if (!qcView.text) {
            continue;
          }
          if (qcView.text.includes("CZ")) {
            qcFlightNo = qcView.text;
          }
          if (qcView.text.includes("-")) {
            qcDate = qcView.text;
          }
        }
        if (qcView.className === "android.view.View") {
          for (const timeView of qcView.children) {
            if (timeView.className === "android.widget.TextView") {
              if (!timeView.text) {
                continue;
              }
              if (!qcDepartureTime && !qcDepartureDateTime && timeView.text.includes(":")) {
                qcDepartureTime = true;
                qcDepartureDateTime = timeView.text.trim();
                continue;
              }

              if (qcDepartureTime && qcDepartureDateTime && !qcArrivalDateTime && timeView.text.includes(":")) {
                qcArrivalDateTime = timeView.text.trim();
                return;
              }
            }
          }
        }
        if (qcArrivalDateTime) {
          return;
        }
      }

      if (qcFlightNo !== flights[0].fullFlightNo) {
        throw new Error(`校验航班信息 去程航班号不匹配 预期${qcFlightNo} 实际${flights[0].fullFlightNo}`);
      }

      const depDateTime = new Date(flights[0].departureDateTime);
      const arrDateTime = new Date(flights[0].arrivalDateTime);
      const depDateExp = formatToTimeZone(
        depDateTime,
        DATE_PATTERN,
        timezoneOptions
      );

      const depTimeExp = formatToTimeZone(
        depDateTime,
        "HH:mm",
        timezoneOptions
      );
      const arrTimeExp = formatToTimeZone(
        arrDateTime,
        "HH:mm",
        timezoneOptions
      );

      if (depDateExp !== qcDate) {
        throw new Error(`校验去程航班信息，出发日期不匹配 预期${depDateExp} 实际${qcDate}`);
      }

      if (depTimeExp !== qcDepartureDateTime) {
        throw new Error(`校验去程航班信息出发时间不匹配 预期${depTimeExp} 实际${qcDepartureDateTime}`);
      }

      if (arrTimeExp !== qcArrivalDateTime) {
        throw new Error(`校验去程航班信息到达时间不匹配 预期${arrTimeExp} 实际${qcArrivalDateTime}`);
      }
    }

    // 获取返程航班信息
    const fcDetailPanel = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 0)
      ?.findChild("android.view.View", 1);
    if (fcDetailPanel) {
      let fcFlightNo: string = "";
      let fcDate: string = "";
      let fcDepartureTime = false;
      let fcDepartureDateTime: string = "";
      let fcArrivalDateTime: string = "";
      for (const fcView of fcDetailPanel.item.children) {
        if (fcView.className === "android.widget.TextView") {
          if (!fcView.text) {
            continue;
          }
          if (fcView.text.includes("CZ")) {
            fcFlightNo = fcView.text;
          }
          if (fcView.text.includes("-")) {
            fcDate = fcView.text;
          }
        }
        if (fcView.className === "android.view.View") {
          for (const timeView of fcView.children) {
            if (timeView.className === "android.widget.TextView") {
              if (!timeView.text) {
                continue;
              }

              if (!fcDepartureTime && !fcDepartureDateTime && timeView.text.includes(":")) {
                fcDepartureTime = true;
                fcDepartureDateTime = timeView.text.trim();
                continue;
              }

              if (fcDepartureTime && !fcArrivalDateTime && timeView.text.includes(":")) {
                fcArrivalDateTime = timeView.text.trim();
                return;
              }
            }
            if (fcArrivalDateTime) {
              return;
            }
          }
        }
      }
      if (fcFlightNo !== flights[1].fullFlightNo) {
        throw new Error(`校验返程航班信息，返程航班号不匹配，预期${fcFlightNo}，实际${flights[1].fullFlightNo}`);
      }

      const fcDepDateTime = new Date(flights[1].departureDateTime);
      const fcArrDateTime = new Date(flights[1].arrivalDateTime);
      const fcDepDateExp = formatToTimeZone(
        fcDepDateTime,
        DATE_PATTERN,
        timezoneOptions
      );

      if (fcDepDateExp !== fcDate) {
        throw new Error(`校验返程航班信息出发日期不匹配，预期${fcDepDateExp}，实际${fcDate}`);
      }

      // 目标起飞时间格式化
      const fcDepTimeExp = formatToTimeZone(
        fcDepDateTime,
        "HH:mm",
        timezoneOptions
      );

      // 目标到达时间格式化
      const fcArrTimeExp = formatToTimeZone(
        fcArrDateTime,
        "HH:mm",
        timezoneOptions
      );

      if (fcDepTimeExp !== fcDepartureDateTime) {
        throw new Error(`校验返程航班信息出发时间不匹配，预期${fcDepTimeExp}，实际${fcDepartureDateTime}`);
      }

      if (fcArrTimeExp !== fcArrivalDateTime) {
        throw new Error(`校验返程航班信息到达时间不匹配，预期${fcArrTimeExp}，实际${fcArrivalDateTime}`);
      }
    }
  }

  private async findTargetFlight(
    flight: TicketOrderFlight
  ): Promise<UiObject | undefined> {
    let flights = await selector.findAllById("item_card_view", 100, 1000);

    if (flights.length === 0) {
      if (
        await selector.findByTextContains("暂时没有可预订", 100, 1000)
      ) {
        throw new Error("当天没有航班");
      } else {
        throw new Error("加载航班列表失败");
      }
    }

    let flightPanel = await selector.getById(
      "domestic_list_data_rv",
      400,
      2000
    );
    let flightNos: string[] = [];
    let lastFlightCount: number = 0;
    let retry = 5;
    let cnt = 0;
    while (retry > 0) {
      retry--;

      lastFlightCount = flightNos.length;
      for (const flightCard of flights) {
        const fullFlightNo = this.getFullFlightNoFromCard(flightCard);
        if (!flightNos.find((x) => x === fullFlightNo)) {
          flightNos.push(fullFlightNo);
        } else {
          continue;
        }

        if (fullFlightNo === flight.fullFlightNo) {
          const sellOut = selector.findChildById(
            flightCard,
            "book_single_list_sell_out_tv"
          );
          if (sellOut) {
            throw new Error(`${fullFlightNo}航班${sellOut.text}`)
          }
          return flightCard;
        }
      }

      if (lastFlightCount === flightNos.length) {
        cnt++;
        if (cnt > 1) {
          break;
        }
      }

      flightPanel.scrollForward();
      await delay(1000);

      flightPanel = await selector.getById(
        "domestic_list_data_rv",
        400,
        2000
      );
      flights = await selector.findAllById("item_card_view", 100, 1000);
    }
    return undefined;
  }

  // 去程航班
  async findTargetQCFlight(
    fullFlightNo: string
  ): Promise<UiObject | undefined> {
    if (await selector.findByTextContains("暂时没有可预订", 100, 1000)) {
      throw new Error("当天没有航班");
    } else if (
      await selector.findByTextContains("大家太热情啦", 100, 1000)
    ) {
      throw new Error("大家太热情啦，请稍后再试。");
    }

    let root = await selector.getById("root");
    let viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
    while (!viewCount) {
      root = await selector.getById("root");
      viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
    }

    // 去程模块 
    let leftFlights = new UiObjectHelper(root.children[0])
      ?.findChild("android.view.View", viewCount.length - 2)
      ?.findChild("android.view.View", 0)
      ?.findChild("android.view.View", 1)
      ?.findChild("android.widget.ListView", 0);

    let retry = 5;
    while (retry > 0 && !leftFlights) {
      retry--;
      root = await selector.getById("root");
      leftFlights = new UiObjectHelper(root.children[0])
        ?.findChild("android.view.View", viewCount.length - 2)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.widget.ListView", 0);
    }

    let leftFlightNos: string[] = [];
    let leftLastFlightNo: string = "";
    let leftRetry = 5;
    while (leftRetry > 0) {
      leftRetry--;

      if (leftFlights) {
        const lastChild = leftFlights.item.children.at(-1);
        if (lastChild) {
          const lastFlightNo = lastChild.children.filter(
            (x) =>
              x.className === "android.widget.TextView" &&
              x.text.includes("CZ")
          );
          if (lastFlightNo.length > 0) {
            if (leftLastFlightNo === lastFlightNo[0].text.trim()) {
              break;
            }
          }
        }
        for (const flightCard of leftFlights.item.children) {
          const fullFlightNos = flightCard.children.filter(
            (x) =>
              x.className === "android.widget.TextView" &&
              x.text.includes("CZ")
          );
          if (fullFlightNos.length > 0) {
            const qcFullFlightNo = fullFlightNos[0].text.trim();
            this.log(`找到去程的航班号 ${qcFullFlightNo}`);
            if (!leftFlightNos.find((x) => x === qcFullFlightNo)) {
              leftFlightNos.push(qcFullFlightNo);
            }
            leftLastFlightNo = qcFullFlightNo;
            if (qcFullFlightNo === fullFlightNo) {
              return flightCard;
            }
          }
        }
      }

      await swipe(400, 1750, 400, 400, 2000);
      await delay(1000);

      root = await selector.getById("root");
      leftFlights = new UiObjectHelper(root.children[0])
        ?.findChild("android.view.View", viewCount.length - 2)
        ?.findChild("android.view.View", 0)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.widget.ListView", 0);
    }
    return undefined;
  }

  // 返程航班
  async findTargetFCFlight(
    fullFlightNo: string
  ): Promise<UiObject | undefined> {
    await delay(3000);

    if (await this.waitForLoading()) {
      throw new Error("加载航班详情超时");
    }

    if (await selector.findByTextContains("暂时没有可预订", 100, 1000)) {
      throw new Error("当天没有航班");
    } else if (
      await selector.findByTextContains("大家太热情啦", 100, 1000)
    ) {
      throw new Error("大家太热情啦，请稍后再试。");
    }

    let root = await selector.getById("root");
    let viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
    while (!viewCount) {
      root = await selector.getById("root");
      viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
    }

    let rightFlights = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", viewCount.length - 2)
      ?.findChild("android.view.View", 1)
      ?.findChild("android.view.View", 1)
      ?.findChild("android.widget.ListView", 0);
    let retry = 5;
    while (retry > 0 && !rightFlights) {
      retry--;
      root = await selector.getById("root");
      rightFlights = new UiObjectHelper(root.children[0])
        .findChild("android.view.View", viewCount.length - 2)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.widget.ListView", 0);
    }
    let rightFlightNos: string[] = [];
    let rightLastFlightNo: string = "";
    let rightRetry = 5;
    while (rightRetry > 0) {
      rightRetry--;
      if (rightFlights) {
        const lastChild = rightFlights.item.children.at(-1);
        if (lastChild) {
          const lastFlightNo = lastChild.children.filter(
            (x) =>
              x.className === "android.widget.TextView" &&
              x.text.includes("CZ")
          );
          if (lastFlightNo.length > 0) {
            if (rightLastFlightNo === lastFlightNo[0].text.trim()) {
              break;
            }
          }
        }

        for (const flightCard of rightFlights?.item.children) {
          const fullFlightNos = flightCard.children.filter(
            (x) =>
              x.className === "android.widget.TextView" &&
              x.text.includes("CZ")
          );
          if (fullFlightNos.length > 0) {
            const fcFullFlightNo = fullFlightNos[0].text.trim();
            if (!rightFlightNos.find((x) => x === fcFullFlightNo)) {
              rightFlightNos.push(fcFullFlightNo);
            }
            rightLastFlightNo = fcFullFlightNo;
            if (fcFullFlightNo === fullFlightNo) {
              return flightCard;
            }
          }
        }
      }

      await swipe(800, 1750, 800, 400, 2000);
      await delay(1000);

      root = await selector.getById("root");
      rightFlights = new UiObjectHelper(root.children[0])
        .findChild("android.view.View", viewCount.length - 2)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.view.View", 1)
        ?.findChild("android.widget.ListView", 0);
      await delay(1000);
    }
    return undefined;
  }

  // 下单
  async CreateOrder(input: CZCreateOrderArgsDto): Promise<CZCreateOrderResultDto> {
    try {
      const otheridentityType = input.passengers.filter(p => p.identityInfo.type == IdentityCardType.OT).length;
      if (otheridentityType > 0) {
        throw new Error("南航下单不支持证件类型是其他，请转人工");
      }
      const allPassengersType1 = input.passengers.every(passenger => passenger.type === PassengerType.Child);

      const singlePassengerType1 = input.passengers.length === 1 && input.passengers[0].type === PassengerType.Child;

      if (allPassengersType1 || singlePassengerType1) {
        throw new Error("南航下单不支持单个儿童，请转人工");
      }

      const host = input.proxyHost === undefined ? "" : input.proxyHost;
      const proxyUrl = `${host ?? ""}:${input.proxyPort}`;
      await this.changeProxy(proxyUrl);

      await this.openHome();

      const useLoggedAccount = environment.loginAccount === input.createOrderAccountInfo.userName;

      if (this._loginTokenCount > 10) {
        await this.logout();
      }

      await this.ensureLogin(input.createOrderAccountInfo);

      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      );

      const flight = input.flights[0];

      await this.deleteFrequentFlyer(30);

      if (input.flights.length > 1) {
        await this.createPassengersRoundTrip(input.passengers);
      }

      await this.openHome();

      var ppPassenger = input.passengers.filter(p => p.identityInfo.type == IdentityCardType.PP);
      if (ppPassenger.length > 0) {
        ppPassenger.forEach(element => {
          if (element.identityInfo.certificateValidityDate && new Date(element.identityInfo.certificateValidityDate).getFullYear() > Number(2101)) {
            throw element.surName + '/' + element.givenName + '乘机人证件有效期' + element.identityInfo.certificateValidityDate + '不在APP证件有效期范围内';
          }
        })
      }

      const beginDate = new Date(flight.departureDateTime);
      const currDateText = formatToTimeZone(
        beginDate,
        DATE_PATTERN,
        timezoneOptions
      );
 
      if (input.flights.length <= 1) { 
        (
          await selector.getById(
            "include_main_home_view_booking_rb_singletrip",
            100,
            1000
          )
        ).click();
      } else {
        (
          await selector.getById(
            "include_main_home_view_booking_rb_backtrip",
            100,
            1000
          )
        ).click();
      }
      await delay(500);

      const backDate = input.flights.length > 1 ? new Date(input.flights[1].departureDateTime) : undefined;

      await this.searchFlight(
        flight.originAirport,
        flight.destinationAirport,
        beginDate,
        backDate
      );

      if (await this.waitForLoading(100, 2000)) {
        throw new Error("加载航班列表超时");
      }

      await this.waitForTip(false, true);

      let bestProduct: CZAppProductInfo;

      if (input.flights.length <= 1) {
        await this.clickIfIdExists("close", 200, 2000);
        await this.clickIfIdExists("close_btn", 200, 1000);

        if (await this.waitForLoading(100, 2000)) {
          throw new Error("加载航班列表超时");
        }

        // 单程
        const targetFlight = await this.findTargetFlight(flight);
        if (!targetFlight) {
          throw new Error(`该日期${currDateText}未找到航班${flight.fullFlightNo}`);
        }
        this.log(`点击目标航班 ${targetFlight.click()}`);

        if (await this.waitForLoading(100, 2000)) {
          throw new Error("加载航班详情超时");
        }
        await this.waitForTip(true, true);

        let retry = 5;
        while (retry > 0) {
          retry--;

          const cabinTab = await selector.findById(
            "domestic_full_cabin_tabs",
            200,
            2000
          );
          if (cabinTab) {
            break;
          }

          if (await this.waitForLoading(100, 2000)) {
            throw new Error("加载航班详情超时");
          }
          await this.waitForTip(true, true);
        }

        await this.validateFlightInfo(
          flight.departureDateTime,
          flight.arrivalDateTime,
          flight.fullFlightNo
        );

        bestProduct = await this.selectProduct(input);
      } else {
        await delay(1000);
        await click(350, 150);
        await delay(500);
        await click(350, 150);

        const targetQCFlights = await this.findTargetQCFlight(
          flight.fullFlightNo
        );
        if (!targetQCFlights) {
          throw new Error(`该日期${currDateText}未找到去程航班${flight.fullFlightNo}`);
        }
        this.log(`点击目标去程的航班号 ${targetQCFlights.click()}`);

        const targetFCFlights = await this.findTargetFCFlight(
          input.flights[1].fullFlightNo
        );
        if (!targetFCFlights) {
          throw new Error(`该日期${currDateText}未找到返程航班${input.flights[1].fullFlightNo}`);
        }
        this.log(`点击目标返程的航班号 ${targetFCFlights.click()}`);

        const nextBtn = await selector.findByTextContains("下一步", 100, 3000);
        if (nextBtn) {
          this.log(`点击下一步 ${nextBtn.click()}`);
        }

        if (await this.waitForLoading(100, 2000)) {
          throw new Error("加载航班详情超时");
        }

        await this.waitForTip(true, true);

        await this.validateFlightInfoRoundTrip(input.flights);

        bestProduct = await this.selectProductPriceCabinRoundTrip(input);
      }

      await delay(700);
      let actualPrices: CreateOrderPriceDetailDto[];
      let totalPrice: number;
      let orderNo: string;
      if (input.flights.length <= 1) {
        await this.inputPassenger(input);

        await this.inputContactAndCheck(input.contactInfo);

        await this.useCoupon(input);

        actualPrices = await this.checkPrices(input, bestProduct);

        totalPrice = await this.getTotalPrice();

        orderNo = await this.confirmOrder();
      } else {
        await this.inputContactRoundTrip(input.contactInfo);

        await this.inputPassengerRoundTrip(input);

        totalPrice = await this.getTotalPriceRoundTrip();

        actualPrices = await this.checkPricesRoundTrip(
          input,
          bestProduct
        );

        await this.inputContactAndCheckRoundTrip(input.contactInfo);

        const notIdentityCards = input.passengers.filter(x => x.identityInfo.type !== IdentityCardType.NI).length > 0
        orderNo = await this.confirmOrderRoundTrip(notIdentityCards);
      }

      if (useLoggedAccount) {
        this._loginTokenCount++;
      }
      this._failedCount = 0;
      this._networkErrorCount = 0;

      return {
        success: true,
        orderNo: orderNo,
        prices: actualPrices,
        totalPrice: totalPrice,
        message: "下单成功",
      } as CZCreateOrderResultDto;
    } catch (error) {
      const login = await this.checkLoginStatus();
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      this._failedCount++;
      if (msg?.includes("网络好像不给力")) {
        this._networkErrorCount++;
      }

      if (this._networkErrorCount > 1) {
        this.stopApp();
        this._networkErrorCount = 0;
      }
      return {
        success: false,
        message: !login ? "登录已失效," + msg : msg,
        detail: JSON.stringify(error),
      } as CZCreateOrderResultDto;
    } finally {
      await this.changeProxy(":0");
      if (this._failedCount > 2) {
        try {
          await this.restartApp();
          this._failedCount = 0;
        } catch (error) {
          const msg = (error as Error)?.message;
          console.log(msg);
          this._handler?.log(msg);
        }
      }
      await this.backToHome();
    }
  }

  private async openOrderPage(): Promise<void> {
    let menuBar = await selector.findById(
      "rv_personal_center_menu",
      200,
      2000
    );
    let myOrderBtn: UiObject | undefined;
    if (!menuBar) {
      menuBar = await selector.getById("mine_order_rv");
      const myOrderText = selector.getChildByText(
        menuBar as UiObject,
        "机票订单"
      );
      myOrderBtn = selector.findClickableParent(myOrderText);
    } else {
      const myOrderText = selector.getChildByText(menuBar, "我的订单");
      myOrderBtn = selector.findClickableParent(myOrderText);
    }

    if (!myOrderBtn) {
      throw new Error("找不到我的订单按钮");
    }

    myOrderBtn.click();
    await selector.getById("root");
  }

  async selectPayOrder(orderNo: string) {
    await delay(700);
    let loading = await select({ id: "csair_loading" }).firstOrNull();
    let retry = 10;
    while (loading != null && retry > 0) {
      retry--;
      await delay(1000);
      loading = await select({ id: "csair_loading" }).firstOrNull();
    }

    if (loading != null) {
      throw new Error("加载全部订单列表超时");
    }

    (await selector.getById("m-tabs-0-1")).click();
    await delay(700);

    loading = await select({ id: "csair_loading" }).firstOrNull();
    retry = 10;
    while (loading != null && retry > 0) {
      retry--;
      await delay(1000);
      loading = await select({ id: "csair_loading" }).firstOrNull();
    }

    if (loading != null) {
      throw new Error("加载待付款订单列表超时");
    }

    const orderListViewText = await selector.findByTextContains(
      "下拉可刷新列表",
      200,
      2000
    );
    if (!orderListViewText || !orderListViewText.parent) {
      throw new Error("找不到 下拉可刷新列表 文字");
    }

    const orderListView = orderListViewText.parent;
    if (
      orderListView.children.filter(
        (x) => x.className === "android.view.View"
      ).length === 0
    ) {
      await swipe(400, 800, 400, 1000, 1000);
      await delay(2000);
      loading = await select({ id: "csair_loading" }).firstOrNull();
      retry = 10;
      while (loading != null && retry > 0) {
        retry--;
        await delay(1000);
        loading = await select({ id: "csair_loading" }).firstOrNull();
      }

      if (loading != null) {
        throw new Error("加载待付款订单列表超时");
      }
    }

    retry = 5;
    while (retry > 0) {
      retry--;

      const orderNoText = await selector.findByTextContains(
        orderNo,
        100,
        1000
      );

      if (orderNoText) {
        const btn = selector.findClickableParent(orderNoText);
        if (!btn) {
          throw new Error("点击订单详情失败");
        }
        btn.click();
        return;
      }

      orderListView.scrollForward();
      await delay(700);
    }

    throw new Error(`找不到待支付订单 ${orderNo} 订单可能已取消`);
  }

  async Pay(input: CZPayArgsDto): Promise<CZPayResultDto> {
    try {
      const host = input.proxyHost === undefined ? "" : input.proxyHost;
      const proxyUrl = `${host ?? ""}:${input.proxyPort}`;
      await this.changeProxy(proxyUrl);

      await this.openHome();
      const useLoggedAccount =
        environment.loginAccount ===
        input.createOrderAccountInfo.userName;

      // 如果要求账号和当前账号不一致 则重新登录
      if (this._loginTokenCount > 10) {
        await this.logout();
      }

      await this.ensureLogin(input.createOrderAccountInfo);
      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      );

      await this.openMine();
      await this.openOrderPage();
      await this.selectPayOrder(
        input.buyTicketOrderIdInfo.buyOrderNo.trim()
      );

      await delay(700);

      await this.checkOrderNo(input.buyTicketOrderIdInfo.buyOrderNo);

      const total = await this.getPayTotalPrice();
      if (total > input.totalAmount) {
        throw new Error(`实际支付金额${total}大于预期金额${input.totalAmount}`);
      } else {
        this.log(`实际支付金额${total} 预期金额${input.totalAmount}`);
      }

      this.log(`点击支付订单按钮${(await selector.getById("pay_order_btn")).click()}`);

      await delay(700);
      if (await this.waitForLoading()) {
        throw new Error("进入支付页面超时");
      }

      let timestamp = "";
      let sn = "";
      switch (input.payType) {
        case CZPayMethodType.CreditCard:
          throw new Error(`不支持的支付方式 ${input.payType}`);
        case CZPayMethodType.Wallet:
          ({ timestamp, sn } = await this.payWithWallet(
            input.paymentPassword,
            total
          ));
          break;
        default:
          throw new Error(`不支持的支付方式 ${input.payType}`);
      }

      if (useLoggedAccount) {
        this._loginTokenCount++;
      }
      this._failedCount = 0;
      this._networkErrorCount = 0;

      return {
        success: true,
        totalAmount: total,
        message: "下单成功",
        paymentSerialNo: sn,
        timestamp: timestamp,
      } as CZPayResultDto;
    } catch (error) {
      const login = await this.checkLoginStatus();
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      this._failedCount++;
      if (msg?.includes("网络好像不给力")) {
        this._networkErrorCount++;
      }

      if (this._networkErrorCount > 1) {
        this.stopApp();
        this._networkErrorCount = 0;
      }
      return {
        success: false,
        message: !login ? "登录已失效," + msg : msg,
        detail: JSON.stringify(error),
      } as CZPayResultDto;
    } finally {
      await this.changeProxy(":0");
      if (this._failedCount > 2) {
        try {
          await this.restartApp();
          this._failedCount = 0;
        } catch (error) {
          const msg = (error as Error)?.message;
          console.log(msg);
          this._handler?.log(msg);
        }
      }
      await this.backToHome();
    }
  }

  async checkOrderNo(buyOrderNo: string) {
    const orderNoText = await selector.getById("order_id_tv");
    if (!orderNoText.text.includes(buyOrderNo)) {
      throw new Error(`订单详情校验订单号不通过，实际 ${orderNoText.text}，预期 ${buyOrderNo}`);
    } else {
      this.log(`校验订单号通过 ${orderNoText.text} ${buyOrderNo}`);
    }
  }

  async payWithWallet(
    password: string,
    total: number
  ): Promise<{ timestamp: string; sn: string }> {
    const walletPayTextView = await selector.findByTextContains("南航账户");
    if (!walletPayTextView) {
      throw new Error("南航账户字符未找到");
    }

    const amountText = walletPayTextView.text
      .replace("南航账户(¥", "")
      .replace(")", "");

    this.log(`账户余额 ${amountText}`);
    const amount = Number(amountText);
    if (!isNaN(amount) && amount < total) {
      throw new Error(`南航账户余额不足实际${amount} 订单金额${total}`);
    }

    const parent = selector.findClickableParent(walletPayTextView);
    if (!parent) {
      throw new Error("南航账户支付按钮未找到");
    }

    parent.click();
    await delay(700);

    const passwordInput = await selector.getById("balance_payment_password_et");

    passwordInput.setText(password);

    const ts = new Date();
    this.log(`点击立即支付按钮${(await selector.getById("credit_card_pay_bt")).click()}`);

    if (await this.waitForLoading()) {
      throw new Error("等待支付完成超时");
    }

    await this.waitForTip(true, true);
    this.log("检查错误提示完成，开始查找支付成功文字");

    let successText = await selector.findByTextContains(
      "支付成功",
      200,
      2000
    );

    if (successText) {
      this.log(`支付成功`);
    } else {
      const memberText = await selector.findByTextContains(
        "我要入会",
        200,
        2000
      );
      if (memberText) {
        back();
        successText = await selector.findByTextContains(
          "支付成功",
          200,
          2000
        );
        if (successText) {
          this.log(`支付成功`);
        } else {
          throw new Error(
            "点击支付成功，但跳转支付完成页面失败，请人工检查实际是否成功"
          );
        }
      } else {
        const dialogUpgrade = await selector.findById(
          "dialog_upgrade",
          200,
          2000
        );
        if (dialogUpgrade) {
          const content = await selector.findById(
            "invite_meeting__content_tv"
          );
          if (content) {
            this.log(content.text);
          }
          await this.clickIfIdExists(
            "invite_meeting__cancel_tv",
            200,
            1000
          );
          this.log("点击放弃福利");
        } else {
          throw new Error(
            "点击支付成功，但跳转支付完成页面失败，请人工检查实际是否成功"
          );
        }
      }
    }

    return { timestamp: ts.getTime().toString(), sn: "" };
  }

  async getPayTotalPrice(): Promise<number> {
    const text = (await selector.getById("order_price")).text;

    if (!text) {
      throw new Error("获取支付总金额失败");
    }

    const amountText = text.slice(1);
    const amount = Number(amountText);
    if (isNaN(amount)) {
      throw new Error(`解析支付总金额失败 ${text.slice(1)}`);
    } else {
      return amount;
    }
  }

  /**
   * 获取航班的价格和舱位信息
   * @returns
   */
  async getFlightPrices(fullFlightNo: string): Promise<CZFlightPriceDto> {
    let isSharedFlight: boolean = false;
    let isSharedFlightText = await selector.findById(
      "book_share_label",
      100,
      1000
    );
    if (isSharedFlightText) {
      isSharedFlight = true;
    }

    let actualCarrierFullFlightNo: string = "";
    let actualCarrierFullFlightNoText = await selector.findById(
      "book_share_real_flight_no",
      100,
      1000
    );
    if (actualCarrierFullFlightNoText) {
      actualCarrierFullFlightNo = actualCarrierFullFlightNoText.text
        .replace(")", "")
        .trim();
    }

    const match = this.flightDateTimeMatch();

    let flight: CZFlightPriceDto = {
      fullFlightNo: fullFlightNo,
      isSharedFlight: isSharedFlight,
      actualCarrierFullFlightNo: actualCarrierFullFlightNo,
      aircraftModel: "",
      airportTax: null,
      oilFee: null,
      cabins: [],
      departureDate: (await match).groups?.date,
      arrivalDate: (await match).groups?.date,
      departureTime: (await match).groups?.dep_time
        .replace("整", "00")
        .replace("点", ":")
        .replace("分", ""),
      arrivalTime: (await match).groups?.arr_time
        .replace("整", "00")
        .replace("点", ":")
        .replace("分", ""),
    } as CZFlightPriceDto;
    const productListView = await selector.findById(
      "domestic_full_cabin_rv_flight_cabin",
      100,
      3000
    );
    if (!productListView) {
      throw new Error(`找不到产品列表`);
    }

    let retry = 5;
    while (retry > 0) {
      retry--;
      const items = productListView.children;
      // 根据文字提示判断首乘专享、长者特惠
      const detailTipText = await selector.findById(
        "cabin_details_tips_content_iv",
        100,
        1000
      );
      if (detailTipText) {
        if (detailTipText.text.includes("首次")) {
          this.log(`找到首次乘坐南航航班旅客专享优惠`);
          const tagMore = await selector.findById(
            "cabin_details_fc_tag_more",
            200,
            1000
          );
          if (tagMore) {
            await click(
              tagMore.boundsInScreen.centerX +
              tagMore.boundsInScreen.width / 4,
              tagMore.boundsInScreen.centerY
            );
            this.log(`点击会员多人特惠或长者特惠`);
            await delay(1000);
          }
        }
      }

      let allExists = false;
      for (const item of items) {
        const cabinPriceInfo = await this.getCabinPriceInfo(item);
        this.log(
          `获取到的舱位价格信息：${JSON.stringify(cabinPriceInfo)}`
        );

        const exists = flight.cabins.find(
          (x) =>
            flight.cabins[0].cabin === cabinPriceInfo.cabin &&
            flight.cabins[0].productName ===
            cabinPriceInfo.productName &&
            flight.cabins[0].ticketPrice ===
            cabinPriceInfo.ticketPrice
        );

        if (!exists) {
          flight.cabins.push(cabinPriceInfo);
        } else {
          allExists = true;
        }
      }

      if (allExists) {
        break;
      }

      productListView.scrollDown();
      await delay(1000);
    }

    return flight;
  }

  async getCabinPriceInfo(item: UiObject): Promise<CZFlightCabinPriceDto> {
    let productName!: string;
    let productNameText = selector.findChildById(
      item,
      "cabin_details_name_tv"
    );
    if (productNameText) {
      productName = productNameText.text;
    } else {
      productNameText = selector.findChildById(
        item,
        "cabin_details_fc_title_1"
      );

      if (productNameText) {
        productName = productNameText.text;
      } else {
        productNameText = selector.getChildById(
          item,
          "cabin_details_fc_tag_more"
        );

        if (!productNameText) {
          throw new Error("获取产品类型失败");
        } else {
          // 根据文字提示判断首乘专享、长者特惠
          const detailTipText = selector.findChildById(
            item,
            "cabin_details_tips_content_iv"
          );
          if (detailTipText) {
            if (detailTipText.text.includes("长者旅客")) {
              productName = "长者特惠";
            } else {
              productName = "会员多人特惠";
            }
          }
        }
      }
    }

    const priceText = selector.getChildById(item, "cabin_details_price_tv");
    this.log(`获取到的价格${priceText.text}`);
    const cabinText = selector.getChildById(item, "cabin_details_code_tv");

    const directDiscountText = selector.findChildById(
      item,
      "cabin_details_order_cut_tv"
    );

    this.log(
      `找到产品 ${productName}:${priceText.text}|${cabinText.text}|${directDiscountText?.text}`
    );

    const ticketPrice = Number(priceText.text.replace("起", ""));
    if (isNaN(ticketPrice)) {
      throw new Error(
        `解析票面价失败 ${priceText.text.replace(
          "起",
          ""
        )}不是有效的数字`
      );
    }

    let directDiscount: number;
    if (directDiscountText) {
      directDiscount = Number(directDiscountText.text.substring(3));
      if (isNaN(directDiscount)) {
        console.log(
          `解析直减金额失败 ${directDiscountText.text.substring(
            3
          )}不是有效的数字`
        );

        directDiscount = 0;
      }
    } else {
      directDiscount = 0;
    }

    // 剩余张数
    let votes: number = 9;
    const votesText = selector.findChildById(
      item,
      "cabin_details_remaining_tickets_count"
    );
    if (votesText) {
      console.log(`解析剩余票数 ${votesText.text.substring(1, 2)}`);
      votes = Number(votesText.text.substring(1, 2));
    }
    return {
      cabin: cabinText.text.replace("舱", "").trim(),
      cabinClass: CabinClassType.EconomyClass,
      productName: productName,
      status: votes,
      currency: "CNY",
      passengerType: PassengerType.Adult,
      ticketPrice: ticketPrice,
      settlementPrice: ticketPrice - directDiscount,
    } as CZFlightCabinPriceDto;
  }

  /**
   * 爬取运价(R舱)
   * @param input
   * @returns
   */
  async QueryFlightPrices(input: CZQueryFlightPricesDto): Promise<CZFlightPricesDto> {
    try {
      await this.openHome();

      // 如果要求账号和当前账号不一致 则重新登录
      await this.ensureLogin(input.accountInfo);

      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      );

      await this.openHome();
      const currDate = new Date(input.date);

      let result = {
        success: true,
        prices: [] as CZFlightPriceDto[],
      } as CZFlightPricesDto;

      // 单程
      (
        await selector.getById(
          "include_main_home_view_booking_rb_singletrip",
          100,
          1000
        )
      ).click();

      // 开始查询
      await this.searchFlight(
        input.originAirport,
        input.destinationAirport,
        currDate
      );

      if (await this.waitForLoading()) {
        throw new Error("加载航班列表超时");
      }
      await this.waitForTip(false, true);

      await this.clickIfIdExists("close", 200, 2000);
      await this.clickIfIdExists("close_btn", 200, 1000);
      if (await this.waitForLoading()) {
        throw new Error("加载航班列表超时");
      }

      const currDateText = formatToTimeZone(
        currDate,
        DATE_PATTERN,
        timezoneOptions
      );

      const flightPanel = await selector.getById(
        "domestic_list_data_rv",
        400,
        2000
      );

      // 获取所有航班
      let flights = await selector.findAllById(
        "item_card_view",
        100,
        1000
      );

      if (flights.length === 0) {
        const noFlights = await selector.findByTextContains(
          "暂时没有可预订",
          100,
          1000
        );
        const sellOut = await selector.findByTextContains(
          "已售罄",
          100,
          1000
        );
        if (noFlights || sellOut) {
          this.log(`该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
        } else {
          this.log(`该日期查询失败 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
          throw new Error(`该日期的航班查询失败  ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
        }
        return result;
      }

      let flightNos: string[] = [];
      let lastFlightCount: number = 0;
      let retry = 3;
      let cnt = 0;

      while (retry > 0) {
        retry--;

        lastFlightCount = flightNos.length;
        for (const flight of flights) {
          const fullFlightNo = this.getFullFlightNoFromCard(flight);
          const flightStopInfo = this.getStopInfoFromCard(flight);
          if (flightStopInfo && flightStopInfo.includes("中转")) {
            console.log(`中转航班 ${fullFlightNo} 跳过`);
            continue;
          }
          // 售罄
          const sellOut = selector.findChildById(
            flight,
            "book_single_list_sell_out_tv"
          );
          if (sellOut) {
            console.log(`售罄航班 ${fullFlightNo} 跳过`);
            continue;
          }

          if (!flightNos.find((x) => x === fullFlightNo)) {
            flightNos.push(fullFlightNo);
            // 存在目标航班号
            if (
              input.fullFlightNo != null &&
              input.fullFlightNo != undefined
            ) {
              if (input.fullFlightNo === fullFlightNo) {
                flight.click();
                await delay(700);
                const prices = await this.getFlightPrices(
                  fullFlightNo
                );
                result.prices.push(prices);
                return result;
              }
            } else {
              flight.click();
              await delay(700);
              this.log(`点击${fullFlightNo}航班`);
              const price = await this.getFlightPrices(
                fullFlightNo
              );
              result.prices.push(price);
              await this.clickIfDescContains(
                "返回上一页",
                100,
                1000
              );
              await delay(1000);
            }
          } else {
            continue;
          }
        }

        if (lastFlightCount === flightNos.length) {
          cnt++;
          if (cnt > 1) {
            // 两次都相同退出
            break;
          }
        }

        flightPanel.scrollForward();
        await delay(1000);
        flights = await selector.findAllById(
          "item_card_view",
          100,
          1000
        );
        console.log(`翻页后查询航班`);
      }

      return result;
    } catch (error) {
      // 判断登录是否失效
      const login = await this.checkLoginStatus();
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      this._failedCount++;
      if (msg?.includes("网络好像不给力")) {
        this._networkErrorCount++;
      }

      if (this._networkErrorCount > 1) {
        this.stopApp();
        this._networkErrorCount = 0;
      }
      return {
        success: false,
        message: !login ? "登录已失效," + msg : msg,
        detail: JSON.stringify(error),
      } as CZFlightPricesDto;
    } finally {
      await this.changeProxy(":0");
      if (this._failedCount > 2) {
        try {
          await this.restartApp();
          this._failedCount = 0;
        } catch (error) {
          const msg = (error as Error)?.message;
          console.log(msg);
          this._handler?.log(msg);
        }
      }
      await this.backToHome();
    }
  }

  /**
   * 改签--进入'所有订单'页面
   */
  private async OpenMyOrderPage(): Promise<void> {
    let myOrderBtn = await selector.findById(
      "mine_order_all_tv",
      100,
      2000
    );
    if (!myOrderBtn) {
      myOrderBtn = await selector.findByTextContains(
        "全部订单",
        100,
        2000
      );
      if (!myOrderBtn) {
        throw new Error("找不到我的订单按钮");
      }
    }
    myOrderBtn.parent?.click();
    this.log("进入我的订单页面");
  }

  /**
   * 改签--选择改签订单
   * @param orderNo 订单号
   */
  private async SelectChangeOrder(orderNo: string) {
    // 点击搜索按钮
    const searchBtn = await selector.findByTextContains("订单查询", 100, 3000);
    if (searchBtn) {
      searchBtn.click();
      await delay(700);
      this.log('点击订单查询');
    }

    // 订单号查询
    const orderNoTabBtn = await selector.findByTextContains("订单号查询", 100, 2000);
    if (orderNoTabBtn) {
      orderNoTabBtn.click();
      await delay(700);
      this.log('订单号查询');
    }

    const orderNoInput = await selector.findByTextContains("输入机票订单号", 100, 2000);
    if (orderNoInput) {
      orderNoInput.children[0].click();
      this.log('输入机票订单号');
      orderNoInput.children[0].setText(orderNo);
    }

    const confirmBtn = await selector.findByTextContains("确定", 100, 1000);
    if (confirmBtn) {
      confirmBtn.click();
      this.log('点击确定');
      await delay(700);
    }
  }

  /**
   * 改签--'机票退改'操作
   * @param passengersCount 乘机人数量
   */
  private async ChangeOrderDetail(passengersCount: number): Promise<void> {
    this.log("等待详情加载");
    let ticketChangeClick = await selector.findByTextContains("机票退改", 100, 1000);
    let count = passengersCount + 1;
    while (count > 0) {
      count--;
      await swipe(400, 1000, 400, 400, 1000);
      await delay(500);
    }
    ticketChangeClick = await selector.findByTextContains("机票退改", 100, 1000);
    if (ticketChangeClick) {
      this.log(`点击--机票退改`);
      ticketChangeClick.parent?.click();
      await delay(1000)
    } else {
      throw new Error(`错误：未找到机票退改操作`);
    }

    await this.waitForChangeError();
  }

  /**
   * 改签--'变更'操作
   */
  private async ClickTicketChange(): Promise<void> {
    let ticketChangeClick = await selector.findByTextContains("变更", 100, 1000);
    if (!ticketChangeClick) {
      await this.waitForChangeLoading();
      ticketChangeClick = await selector.findByTextContains("变更", 100, 1000);
    }
    ticketChangeClick?.parent?.click();
    await delay(700);

    await this.waitForChangeError();
  }

  /**
   * 改签--选择乘客
   */
  private async SelectChangePassengers(): Promise<void> {
    var passengers = [];
    var selectPassenger = await selector.findByTextContains("请选择乘机人", 100, 1000);

    if (!selectPassenger?.parent) {
      throw new Error("错误：选择乘机人异常");
    } else {
      // 多人的情况下先翻页，确保都能选中
      await swipe(400, 1000, 400, 400, 1000);
      await delay(500);

      for (var i = 0; i < selectPassenger?.parent?.childCount; i++) {
        if (i < 3) {
          continue
        }
        var child = selectPassenger?.parent?.children[i];
        if (child.className.includes("android.view.View")) {
          passengers.push(child);
        }
      }
      passengers.pop();
      passengers.pop();
      // 多乘客时处理
      if (passengers.length > 1) {
        for (let index = 0; index < passengers.length; index++) {
          const element = passengers[index];
          element.children[0].click();
          await delay(700)
          await this.waitForChangeLoading();
        }
      }

      var selectDate = await selector.findByTextContains("选择日期", 100, 1000);
      // 选择日期
      selectDate?.click();
      await this.waitForChangeLoading();

      // 温馨提示--继续
      (await selector.findByTextContains("继", 100, 2000))?.click();

      var selectZeroPessager = await selector.findByTextContains("勾选乘机人", 50, 2000);
      // 没选择任何乘客时的处理
      if (selectZeroPessager) {
        var selectZeroPessagerConfirm = await selector.findByTextContains("确", 100, 2000);
        selectZeroPessagerConfirm?.click();
        await delay(800)
        await this.SelectChangePassengers();
      }

      // 不管什么提示都关闭
      let tip = await selector.findByTextContains('温馨提示', 100, 2000);
      if (tip) {
        (await selector.findByTextContains("确", 100, 1000))?.click();
      }
    }
  }

  /**
   * 改签--加载中
   * @param interval 时间
   * @param timeout 失效时间
   * @returns 
   */
  private async waitForChangeLoading(interval?: number, timeout?: number): Promise<boolean> {
    interval ??= 500;
    timeout ??= 10000;
    await delay(interval);
    let m = new Date().getTime() + timeout;
    let isLoading = await selector.findByTextContains("加载中", 50, 1500);
    while (isLoading && m >= new Date().getTime()) {
      isLoading = await selector.findByTextContains("加载中", 50, 1500);
      if (isLoading) {
        await delay(interval);
      }
    }
    return isLoading === null ? true : false;
  }

  /**
   * 改签--处理中
   * @param interval 时间
   * @param timeout 失效时间
   * @returns 
   */
  private async waitForChangeHandle(interval?: number, timeout?: number): Promise<boolean> {
    interval ??= 500;
    timeout ??= 10000;
    await delay(interval);
    let m = new Date().getTime() + timeout;
    let isHandling = await selector.findByTextContains("正在为您处理", 50, 1500);
    while (isHandling && m >= new Date().getTime()) {
      isHandling = await selector.findByTextContains("正在为您处理", 50, 1500);
      if (isHandling) {
        await delay(interval);
      }
    }
    return isHandling === null ? true : false;
  }

  /**
   * 改签--异常捕获
   */
  private async waitForChangeError(): Promise<void> {
    const tip = await selector.findByTextContains('当前您没有可办理退改的机票', 100, 2000);
    const tip1 = await selector.findByTextContains('该单的变更申请正在处理中', 100, 2000);
    if (tip != null || tip1 != null) {
      const wxTip = await selector.findByTextContains('温馨提示', 100, 1000);
      let tipParent = wxTip?.parent;
      while (!tipParent) {
        tipParent = wxTip?.parent;
      }
      let tipPChildren = tipParent.children;
      while (tipPChildren.length < 1) {
        tipPChildren = tipParent.children;
      }
      (await selector.findByTextContains("确", 100, 1000))?.click();
      if (tip1) {
        throw new Error('下单可能成功：' + wxTip?.parent?.children.filter(x => x.className === "android.view.View")[0].children[0].text);
      } else if (tip) {
        throw new Error('错误：' + wxTip?.parent?.children.filter(x => x.className === "android.view.View")[0].children[0].text);
      }
    }
  }

  // 改签--改签日期
  private async SelectChangeDate(oldFlightDepartureDate: string, newFlightInfo: TicketOrderFlight) {
    await this.waitForChangeLoading();
    const oldDepartureDate = new Date(oldFlightDepartureDate);
    const departureDate = new Date(newFlightInfo.departureDateTime)
    const departureDateFormat = formatToTimeZone(
      departureDate,
      "YYYY-MM-DD",
      timezoneOptions
    );
    const targetYearMonth = departureDateFormat.substring(0, 7);
    const targetDay = departureDateFormat.substring(8, 10);
    let selectDate = false;
    let tempIndex = 0;

    const date1 = new Date(oldDepartureDate);
    const date2 = new Date(targetYearMonth);
    console.log(date1 < date2);
    console.log(date1 > date2);
    if (date1 < date2) {
      await swipe(400, 1830, 400, 620, 700);
      await delay(700);
    } else if (date1 > date2) {
      await swipe(400, 620, 400, 1830, 700);
      await delay(700);
    }
    let root = await selector.getById("root", 50, 2000);
    let dayContainer = new UiObjectHelper(root.children[0])
      .findChild("android.view.View", 1)
      ?.findChild("android.view.View", 1);
    const days = dayContainer?.item.children;
    if (!days) {
      throw new Error('错误：日期列表查询失败')
    }
    for (let index = 0; index < days.length; index++) {
      const element = days[index];
      if (element.childCount === 0) {
      }
      if (element.childCount === 0 && element.text === targetYearMonth) {
        tempIndex = index;
        break;
      }
    }
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      if (selectDate) {
        break;
      }
      const element = days[dayIndex];
      if (dayIndex > tempIndex && element.childCount > 0) {
        for (let childIndex = 0; childIndex < element.children.length; childIndex++) {
          const dayEle = element.children[childIndex];
          if (dayEle.text && dayEle.text !== undefined && parseInt(dayEle.text) === parseInt(targetDay)) {
            await click(dayEle.boundsInScreen.centerX, dayEle.boundsInScreen.centerY);
            await delay(700);
            selectDate = true;
            break;
          }
        }
      }
    }
    if (!selectDate) {
      throw new Error('错误：改签日期选择无效')
    }
  }

  /**
   * 改签--改签航班
   */
  private async SelectChangeFlight(oldFlightDepartureDate: string, newFlightInfo: TicketOrderFlight) {
    await this.waitForChangeLoading();

    // 不管什么提示都关闭
    let tip = await selector.findByTextContains('网络异常', 100, 2000);
    if (!tip) {
      tip = await selector.findByTextContains('温馨提示', 100, 2000);
      if (tip) {
        let tipParent = tip.parent;
        while (!tipParent) {
          tipParent = tip.parent;
        }
        let tipPChildren = tipParent.children;
        while (tipPChildren.length < 1) {
          tipPChildren = tipParent.children;
        }
        (await selector.findByTextContains("确", 100, 1000))?.click();
        throw new Error('错误：' + tip.parent?.children.filter(x => x.className === "android.view.View")[0].children[0].text);
      }
    } else {
      (await selector.findByTextContains("确", 100, 2000))?.click();
      await delay(800);
      // 重新选择日期
      const departureDate = new Date(newFlightInfo.departureDateTime)
      const departureDateFormat = formatToTimeZone(
        departureDate,
        "YYYY-MM-DD",
        timezoneOptions
      );
      const currDate = await selector.findByTextContains(departureDateFormat, 100, 1000);
      if (currDate) {
        currDate.click();
        this.SelectChangeDate(oldFlightDepartureDate, newFlightInfo);
      }
    }

    await swipe(500, 1650, 500, 980, 800);
    await delay(800);
    await swipe(500, 980, 500, 1650, 800);
    await delay(800);
    let fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
    if (fullFlightNos.length === 0) {
      await click(560, 705);
      await delay(800);
      await swipe(500, 1650, 500, 980, 800);
      await delay(800);
      await swipe(500, 980, 500, 1650, 800);
      await delay(800);
      fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
      if (fullFlightNos.length === 0) {
        const more = await selector.findByTextContains('更多选择', 100, 2000);
        console.log(more)
        more?.click();
        await swipe(500, 1650, 500, 980, 800);
        await delay(800);
        await swipe(500, 980, 500, 1650, 800);
        await delay(800);
      }
      await click(560, 705);
      await delay(800);
    }
    fullFlightNos = await selector.findAllByTextContains('CZ');
    let booking = false;
    for (let flightIndex = 0; flightIndex < fullFlightNos.length; flightIndex++) {
      const changeFlightNoText = fullFlightNos[flightIndex].text.match(/CZ\d+/g);
      if (changeFlightNoText && changeFlightNoText[0] === newFlightInfo.fullFlightNo) {
        booking = true;
        console.log(`选择航班${fullFlightNos[flightIndex].boundsInScreen.centerX + 350}, ${fullFlightNos[flightIndex].boundsInScreen.centerY - 100}`)
        await click(fullFlightNos[flightIndex].boundsInScreen.centerX + 350, fullFlightNos[flightIndex].boundsInScreen.centerY - 100);
        await delay(1000);
        await swipe(500, 1650, 500, 980, 500);
        await delay(500);
        break;
      }
      if (flightIndex !== 0 && flightIndex % 3 === 0) {
        // await swipe(500, 1650, 500, 980, 800);
        await swipe(500, 2070, 500, 600, 800);
        await delay(800);
        fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
      }
    }

    if (!booking) {
      throw new Error(`错误：${newFlightInfo.fullFlightNo} 该航班不存在`);
    }

    // 点击第一个选择按钮
    const selectBtns = await selector.findAllByTextContains("选择", 50, 1000);
    if (selectBtns.length === 1) {
      throw new Error(`找不到 选择按钮`);
    }
    await click(selectBtns[1].boundsInScreen.centerX - 200, selectBtns[1].boundsInScreen.centerY);
    await delay(1000);

    await this.waitForChangeLoading();
  }

  /**
   * 改签--创建改签订单
   * @returns input
   */
  async CreateChangeOrder(input: CZCreateChangeOrderArgsDto): Promise<CZCreateChangeOrderResultDto> {
    try {
      await this.openHome();

      this.log(`当前已登录账号 ${environment.loginAccount} 下单账号 ${input.accountInfo.userName} 账号使用计数 ${this._loginTokenCount}`);

      if (this._loginTokenCount > 10) {
        this.log(`当前账号 ${environment.loginAccount} 下单次数超过10次 需要注销`);
        await this.logout();
      }

      await this.ensureLogin(input.accountInfo);

      this._handler?.update(
        AppDeviceStatusType.Processing,
        environment.loginAccount
      )

      await this.openMine();

      await this.OpenMyOrderPage();

      await this.SelectChangeOrder(input.buyOrderNo.trim());

      await this.ChangeOrderDetail(input.buyOrderPassengerInfos.length);

      await this.ClickTicketChange();

      await this.waitForChangeLoading();

      let oldFlightInfo = await selector.findByTextContains('南方航空 CZ', 100, 2000);
      if (!oldFlightInfo) {
        oldFlightInfo = await selector.findByTextContains('南方航空 CZ', 100, 2000);
        if (!oldFlightInfo) {
          throw new Error('改签详情获取失败，无法选择乘机人');
        }
      }
      const oldFlightDepartureDate = oldFlightInfo?.text.substring(0, 7);

      await this.SelectChangePassengers();

      if (oldFlightDepartureDate) {
        
        await this.SelectChangeDate(oldFlightDepartureDate, input.newFlightInfos[0]);
        
        await this.SelectChangeFlight(oldFlightDepartureDate, input.newFlightInfos[0]);
      }

      await this.waitForChangeError();

      await swipe(555, 2200, 555, 490, 800);
      await delay(700);

      if (input.buyOrderPassengerInfos.length > 5) {
        await swipe(555, 1950, 555, 1125, 800);
        await delay(700);
      }

      const totalChangeFeeBtn = await selector.findByTextContains('变更费用', 100, 1000);
      if (totalChangeFeeBtn) {
        totalChangeFeeBtn.click();
        await delay(500);
      } else {
        throw new Error(`错误：变更费用详情获取失败`)
      }
      const totalChangeFeeText = totalChangeFeeBtn?.parent?.children[totalChangeFeeBtn?.parent?.children.length - 1].text.match(/\d+(\.\d+)?/);
      let totalChangeFee = 0;
      if (totalChangeFeeText) {
        totalChangeFee = Number(totalChangeFeeText[0]);
      }

      let prices: CreateTicketChangeOrderPrice[] = [];
      let adultCount = 0;
      let adultCabinChangeFee: number = 0;
      let adultReissueFee: number = 0;
      let childCount = 0;
      let childCabinChangeFee: number = 0;
      let childReissueFee: number = 0;
      let infantCount = 0;
      let infantCabinChangeFee: number = 0;
      let infantReissueFee: number = 0;

      if (totalChangeFee <= 0) {
        input.buyOrderPassengerInfos.forEach(passEle => {
          prices.push({
            passengerType: passEle.type,
            cabinChangeFee: 0,
            reissueFee: 0
          })
        })
      } else {
        const adultText = await selector.findByTextContains('成人 × ');
        if (adultText) {
          adultCount = parseInt(adultText?.text.split('×')[1].trim());
        }
        const cabinPriceeDetail = await selector.findAllByTextContains('票价差额');
        const reissueFeeDetail = await selector.findAllByTextContains('变更手续费');
        if (cabinPriceeDetail[0]) {
          const adultCabinChangeFeeText = cabinPriceeDetail[0].text.match(/\d+\.\d+/);
          if (adultCabinChangeFeeText) {
            adultCabinChangeFee = Number(adultCabinChangeFeeText[0]);
          }
        }
        if (reissueFeeDetail[1]) {
          const adultReissueFeeText = reissueFeeDetail[1].text.match(/\d+\.\d+/);
          if (adultReissueFeeText) {
            adultReissueFee = Number(adultReissueFeeText[0]);
          }
        }
        for (let index = 0; index < adultCount; index++) {
          prices.push({
            passengerType: 0,
            cabinChangeFee: adultCabinChangeFee,
            reissueFee: adultReissueFee
          })
        }
        const childText = await selector.findByTextContains('儿童 × ');
        if (childText) {
          childCount = parseInt(childText?.text.split('×')[1].trim());
        }
        if (cabinPriceeDetail[1]) {
          const childCabinChangeFeeText = cabinPriceeDetail[1].text.match(/\d+\.\d+/);
          if (childCabinChangeFeeText) {
            childCabinChangeFee = Number(childCabinChangeFeeText[0]);
          }
        }
        if (reissueFeeDetail[2]) {
          const childReissueFeeText = reissueFeeDetail[2].text.match(/\d+\.\d+/);
          if (childReissueFeeText) {
            childReissueFee = Number(childReissueFeeText[0]);
          }
        }
        for (let index = 0; index < childCount; index++) {
          prices.push({
            passengerType: 1,
            cabinChangeFee: childCabinChangeFee,
            reissueFee: childReissueFee
          })
        }
        const infantText = await selector.findByTextContains('婴儿 × ')
        if (infantText) {
          infantCount = parseInt(infantText?.text.split('× ')[1].trim());
        }
        if (cabinPriceeDetail[2]) {
          const infantCabinChangeFeeText = cabinPriceeDetail[2].text.match(/\d+\.\d+/);
          if (infantCabinChangeFeeText) {
            infantCabinChangeFee = Number(infantCabinChangeFeeText[0]);
          }
        }
        if (reissueFeeDetail[3]) {
          const adultReissueFeeText = reissueFeeDetail[3].text.match(/\d+\.\d+/);
          if (adultReissueFeeText) {
            adultReissueFee = Number(adultReissueFeeText[0]);
          }
        }
        for (let index = 0; index < infantCount; index++) {
          prices.push({
            passengerType: 1,
            cabinChangeFee: infantCabinChangeFee,
            reissueFee: infantReissueFee
          })
        }
      }

      await swipe(500, 2150, 500, 300, 800);
      await delay(700);

      const contactInfo = contacts[Math.floor(Math.random() * contacts.length)];
      await this.getAndInputText("contact", contactInfo.concatName);
      await this.getAndInputText("contactPhone", contactInfo.concatPhone);

      const radio = await selector.findById('radio1', 100, 1000);
      if (radio) {
        await this.ensureChecked("radio1");
        await swipe(500, 2150, 500, 300, 800);
        await delay(700);
      }

      await this.ensureChecked("reading");

      const submitChange = await selector.findByTextContains("提交变更");
      if (submitChange) {
        this.log(`提交变更 ${submitChange.click()}`);
      }

      await this.waitForLoading();

      await this.waitForChangeHandle();

      await delay(18000);

      let tip = await selector.findByTextContains('网络异常', 100, 1000);
      if (!tip) {
        tip = await selector.findByTextContains('温馨提示', 100, 2000);
        if (tip) {
          let tipParent = tip.parent;
          while (!tipParent) {
            tipParent = tip.parent;
          }
          let tipPChildren = tipParent.children;
          while (tipPChildren.length < 1) {
            tipPChildren = tipParent.children;
          }
          (await selector.findByTextContains("确", 100, 1000))?.click();
          throw new Error('错误：' + tip.parent?.children.filter(x => x.className === "android.view.View")[0].children[0].text);
        }
      } else {
        (await selector.findByTextContains("确", 100, 1000))?.click();
      }

      let orderNoText = await selector.findByTextContains("订单编号");
      if (!orderNoText) {
        orderNoText = await selector.findByTextContains("订单编号");
        if (!orderNoText) {
          throw new Error("下单可能成功，但未获取到改签单号");
        }
      }
      const changeOrderNo = orderNoText.text.substring(5);
      this.log(JSON.stringify({ orderNo: changeOrderNo, samllPnr: '', bigPnr: '', paymentAmount: totalChangeFee, currency: 'CNY', prices: prices } as CZCreateChangeOrderResultDto))
      return {
        orderNo: changeOrderNo,
        samllPnr: '',
        bigPnr: '',
        paymentAmount: totalChangeFee,
        currency: 'CNY',
        prices: prices
      } as CZCreateChangeOrderResultDto;
    } catch (error) {
      await this.checkLoginStatus();
      console.error(error);
      const msg = (error as Error)?.message;
      this._handler?.log(msg);
      this._failedCount++;
      if (msg?.includes("网络好像不给力") || msg?.includes("网络异常")) {
        this._networkErrorCount++;
      }

      if (this._networkErrorCount > 1) {
        this.stopApp();
        this._networkErrorCount = 0;
      }
      return {
        orderNo: msg,
        samllPnr: '',
        bigPnr: '',
        paymentAmount: 0,
        currency: 'CNY',
        prices: []
      } as CZCreateChangeOrderResultDto;
    } finally {
      await this.changeProxy(":0");
      if (this._failedCount > 2) {
        try {
          await this.restartApp();
          this._failedCount = 0;
        } catch (error) {
          const msg = (error as Error)?.message;
          console.log(msg);
          this._handler?.log(msg);
        }
      }
      await this.backToHome();
    }
  }
}
