var APP = null;
var ENV = null;

const ORDER_CONTACTNAME_INPUT_ID =
  "item_order_synthesize_detail_et_contactsName"; //填写订单页 联系人文本框ID
const ORDER_CONTACTPHONE_INPUT_ID =
  "item_order_synthesize_detail_et_contactsMobile"; //填写订单页 联系电话文本框ID
const ORDER_CONTACTEMAIL_INPUT_ID =
  "item_order_synthesize_detail_et_contactsEmail"; //填写订单页 联系人邮箱文本框ID
const ORDER_PASSENGERSNAME_AGREE_ID = "activity_order_chb_agreement"; //填写订单页 同意
const ORDER_CONFIRM_ID = "agreement_confirm_bt"; // 代购同意书
const ORDER_PRICEDETAIL_ID = "activity_order_layout_priceDetail"; //填写订单页 明细ID
const ORDER_TOTALPRICE_ID = "activity_order_tv_totalPrice"; //填写订单页 明细总价ID
const ORDER_PASSENGERTYPE_ID = "price_detail_tv_tag"; //填写订单页 明细乘机人类型
const ORDER_TICKETPRICE_ID = "price_detail_tv_price"; //填写订单页 明细票面价
const ORDER_TAX_ID = "price_detail_tv_tax"; //填写订单页 明细税费
const ORDER_CUTPRICE_ID = "price_detail_tv_money_order_cut"; //填写订单页 明细直减价
const PASSENGER_ADD_PASSENGER_BTN2_ID = "activity_select_passenger_tv_add2"; //选择乘机人页 新增乘机人按钮ID
const PASSENGER_ADD_PASSENGER_BTN1_ID = "activity_select_passenger_tv_add"; //新增按钮
const PASSENGER_SCROLL_VIEW_ID = "activity_select_passenger_recycler_view"; //滚动层
const PASSENGER_PASSENGER_ITEM_ID = "item_passenger_rllt_container"; //选择乘机人页 乘机人列表ID
const PASSENGER_PASSENGER_NAME_ID = "item_passenger_tv_name"; //选择乘机人页 乘客姓名
const PASSENGER_PASSENGER_IDCARDNUMBER_ID = "item_passenger_tv_IDCard_number"; //选择乘机人页 身份证号
const ADDEDITPASSENGER_PASSENGER_NAME_ID =
  "book_view_domestic_passenger_et_name"; // 新增或编辑乘机人页 姓名ID
const ADDEDITPASSENGER_PASSENGER_CERTIFICATETYPE_ID =
  "book_view_domestic_passenger_tv_certificateType"; // 新增或编辑乘机人页 证件类型
const ADDEDITPASSENGER_PASSENGER_CERTIFICATENUMBER_ID =
  "book_view_domestic_passenger_et_certificateNumber"; //新增或编辑乘机人页 身份证号ID
const ADDEDITPASSENGER_PASSENGER_BIRTHDAY_ID =
  "book_view_domestic_passenger_tv_birthday"; //新增或编辑乘机人页 出生日期ID
const ADDEDITPASSENGER_PASSENGER_PHONE_ID =
  "book_view_domestic_passenger_et_phoneNumber"; //新增或编辑乘机人页 手机号ID
const ADDEDITPASSENGER_AGREE_ID = "book_activity_domestic_cb_agreePact"; //新增或编辑乘机人页 同意隐私通知ID
const ADDEDITPASSENGER_FINISH_BTN_ID =
  "book_activity_domestic_passenger_tv_finish"; //新增或编辑乘机人页 完成编辑按钮点击ID
const ORDER_NEXT_BTN_ID = "activity_order_tv_orderBook"; //填写订单 下一步ID
const ORDER_PAYMENT_BTN_ID = "activity_xproduct_click_order"; //填写订单 支付按钮ID
const ORDER_NO_ID = "activity_pay_order_tv_orderNo";
const CLEAR_CONTANT_EMAIL_BTN =
  "item_order_synthesize_detail_img_contactsEmailDet"; // 邮箱清除按钮
const BACK_HOME_AFTER_BOOKING = "book_home"; // 下单后 返回主页
const swipeheight = 1260; //选取可滑动的高度（1471-1052）/2，顶部到距离滑动块左上角的高度 （1471-1052）/2 + 1052 = 1260
const barHeight = 100; //日期一格高度
const PASSENGER_EDIT_BUTTON = "item_passenger_img_edit";
const BUTTON1 = "button1"; //提示弹窗 继续按钮
const BUTTON2 = "button2"; //提示弹窗 继续按钮
const ORDER_CERTIFACATEtYPE_CONFIRM_BUTTON_ID =
  "book_dialog_certificate_type_tv_confirm"; //其他证件类型确认按钮ID
const SCROLL_VIEW = "android.widget.ScrollView"; //添加乘机人页面滑动块
let actualPrices = []; // 结果
let getTotalPrice = 0; //支付总金额
let orderData = {};
let errorMessage = {
  noName: "姓名为空",
  noCardNo: "证件号为空",
  passengerExist: "乘机人已存在",
  notFoundCabinClass: "找不到舱等",
  sellOut: "航班售罄",
  foundNoFlight: "找不到航班",
  foundNoCabin: "找不到舱位",
  foundNoPrice: "价格不符合",
};

function indexOf(array, element) {
  let index = -1;
  if (array.length > 0) {
    for (index = 0; index < array.length; index++) {
      if (ENV.debugMode) {
        log("%s == %s => %s", element, array[index], element == array[index]);
      }
      if (element == array[index]) {
        break;
      }
    }
  }

  if (index === array.length) {
    index = -1;
  }

  return index;
}

function getLen(obj) {
  log("typeof(obj.length): " + typeof obj.length);
  switch (typeof obj.length) {
    case "function":
      return obj.length();
    case "number":
      return obj.length;
    default:
      return obj.length;
  }
}

function cardNoIndexOf(array, cardNo, passengerName) {
  let index = -1;
  if (array.length > 0) {
    for (index = 0; index < array.length; index++) {
      // 护照是9位，只比较后3位
      if (getLen(cardNo) <= 9) {
        if (ENV.debugMode) {
          log("比较证件号后3位");
          log(
            "目标证件号后3位：" +
              cardNo.substring(getLen(cardNo) - 3, getLen(cardNo))
          );
          log(
            array[index].cardNo.substring(
              getLen(array[index].cardNo) - 3,
              getLen(array[index].cardNo)
            )
          );
        }
        // 比较证件号的前4位和后3位
        if (
          cardNo.substring(getLen(cardNo) - 3, getLen(cardNo)) ==
            array[index].cardNo.substring(
              getLen(array[index].cardNo) - 3,
              getLen(array[index].cardNo)
            ) &&
          passengerName == array[index].name
        ) {
          break;
        }
      } else {
        if (ENV.debugMode) {
          log("比较证件号前4位");
          log(
            "%s == %s => %s",
            cardNo.substring(0, 4),
            array[index].cardNo.substring(0, 4),
            cardNo.substring(0, 4) == array[index].cardNo.substring(0, 4)
          );
          log("比较证件号后3位");
          log(
            "目标证件号后3位：" +
              cardNo.substring(getLen(cardNo) - 3, getLen(cardNo))
          );
          log(
            array[index].cardNo.substring(
              getLen(array[index].cardNo) - 3,
              getLen(array[index].cardNo)
            )
          );
        }
        // 比较证件号的前4位和后3位
        if (
          cardNo.substring(0, 4) == array[index].cardNo.substring(0, 4) &&
          cardNo.substring(getLen(cardNo) - 3, getLen(cardNo)) ==
            array[index].cardNo.substring(
              getLen(array[index].cardNo) - 3,
              getLen(array[index].cardNo)
            ) &&
          passengerName == array[index].name
        ) {
          break;
        }
      }
    }
  }

  if (index === array.length) {
    index = -1;
  }

  return index;
}

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  init: function (a) {
    APP = a;
  },
  // 上下滑
  slide: function (x1, x2, swipeCount) {
    swipe(x1, swipeheight, x2, swipeheight + swipeCount * barHeight, 800);
  },
  // 滑动某天：curDay页面的天或者当天，targetDay目标天
  scrollDay: function (curDay, targetDay) {
    //滑动选月
    if (ENV.debugMode) {
      log("正在自动找日：%s", targetDay);
    }
    let dayOfDifference = parseInt(
      curDay - parseInt(targetDay.replace(/\b(0+)/gi, ""))
    );
    if (ENV.debugMode) {
      log("与当前日相差：%s", dayOfDifference);
    }
    let picker = APP.waitForId("pickers", 100, 3000);
    if (picker) {
      let pickerCollection = picker.children().toArray();
      if (dayOfDifference > 0) {
        for (let index = 0; index < dayOfDifference; index++) {
          pickerCollection[2].scrollBackward();
          sleep(300);
        }
      } else {
        for (let index = 0; index < -dayOfDifference; index++) {
          pickerCollection[2].scrollForward();
          sleep(300);
        }
      }
    }
  },
  // 滑动某月：curMonth页面的月或者当月，targetMonth目标月
  scrollMonth: function (curMonth, targetMonth) {
    //滑动选月
    if (ENV.debugMode) {
      log("正在自动找月份：%s", targetMonth);
    }
    let monthOfDifference = parseInt(
      curMonth - parseInt(targetMonth.replace(/\b(0+)/gi, ""))
    );
    if (ENV.debugMode) {
      log("与当前月相差：%s", monthOfDifference);
    }
    sleep(800); //等待日历控件出现
    let picker = APP.waitForId("pickers", 100, 3000);
    if (picker) {
      let pickerCollection = picker.children().toArray();
      if (monthOfDifference > 0) {
        for (let index = 0; index < monthOfDifference; index++) {
          pickerCollection[1].scrollBackward();
          sleep(300);
        }
      } else {
        for (let index = 0; index < -monthOfDifference; index++) {
          pickerCollection[1].scrollForward();
          sleep(300);
        }
      }
    }
  },
  // 滑动某年：curYear页面的年或者当年，targetYear目标年
  scrollYear: function (curYear, targetYear) {
    //滑动选年
    if (ENV.debugMode) {
      log("正在自动找年份%s", targetYear);
    }
    let yearOfDifference = parseInt(curYear - parseInt(targetYear));
    if (ENV.debugMode) {
      log("年份差：%s", yearOfDifference);
    }
    sleep(800); //等待日历控件出现
    let picker = APP.waitForId("pickers", 100, 3000);
    if (picker) {
      let pickerCollection = picker.children().toArray();
      if (yearOfDifference > 0) {
        for (let index = 0; index < yearOfDifference; index++) {
          pickerCollection[0].scrollBackward();
          sleep(300);
        }
      }
    }
  },
  // 名单信息中录入年月日
  selectBirth: function (birth) {
    let isEdit = false;
    // 获取出生日期，值为必填，则是新增，其他值为修改
    let birthdayText = APP.getById(ADDEDITPASSENGER_PASSENGER_BIRTHDAY_ID);
    if (birthdayText.text().includes("必填")) {
      isEdit = false;
    } else {
      isEdit = true;
    }
    // 点击出生日期
    birthdayText.click();
    sleep(100);

    // 目标年月日
    let births = birth.split("-");
    let year,
      month,
      day = "";
    if (births.length > 2) {
      if (isEdit) {
        let birthdayStr = birthdayText.text().split("-");
        year = birthdayStr[0];
        month = birthdayStr[1];
        day = birthdayStr[2];
      } else {
        let date = new Date();
        year = date.getFullYear(); //获取完整的年份(4位)19870728
        month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        day = date.getDate(); //获取当前日(1-31)
      }
    }
    log("开始选择年月日 " + birth);
    this.scrollYear(year, births[0]);
    this.scrollMonth(month, births[1]);
    this.scrollDay(day, births[2]);
    // 点击确定
    sleep(300);
    APP.clickByText("确定");
  },
  // 0身份证1护照9其他
  selectCertificateType(curCertificateType, targetCertificateType) {
    if (ENV.debugMode) {
      log(
        "当前证件类型 %s ,目标证件类型 %s",
        curCertificateType,
        targetCertificateType
      );
    }
    let numberPicker = className("android.widget.NumberPicker");
    if (
      (curCertificateType == 0 && targetCertificateType == 1) ||
      (curCertificateType == 0 && targetCertificateType == 1)
    ) {
      // 当前证件类型是身份证，目标证件类型是护照，则滑动1格
      // 当前证件类型是护照，目标证件类型是其他证件，则滑动1格
      numberPicker.scrollForward();
      sleep(300);
    } else if (
      (curCertificateType == 1 && targetCertificateType == 0) ||
      (curCertificateType == 9 && targetCertificateType == 1)
    ) {
      // 当前证件类型是护照，目标证件类型是身份证，则向下滑动1格
      // 当前证件类型是其他，目标证件类型是护照，则向下滑动1格
      numberPicker.scrollBackward();
      sleep(300);
    } else if (curCertificateType == 9 && targetCertificateType == 0) {
      // 当前证件类型是其他，目标证件类型是身份证
      for (let index = 0; index < 2; index++) {
        numberPicker.scrollBackward();
        sleep(300);
      }
    } else if (curCertificateType == 0 && targetCertificateType == 9) {
      // 当前证件类型是身份证，目标证件类型是其他
      for (let index = 0; index < 2; index++) {
        numberPicker.scrollForward();
        sleep(300);
      }
    }
    // 点击确定关闭证件层
    APP.clickByText("确定");
  },
  // 新增或编辑乘机人
  addOrEditPassenger: function (passenger) {
    APP.waitForText("姓名");
    let nameInput = APP.getById(ADDEDITPASSENGER_PASSENGER_NAME_ID);
    if (!passenger.name.primary) {
      throw errorMessage.noName;
    }
    let passengerName = passenger.name.primary;
    if (passenger.name.secondary) {
      passengerName = passengerName + "/" + passenger.name.secondary;
    }
    nameInput.setText(passengerName); // 姓名

    // 证件类型  0身份证1护照9其他
    let targetCertificateType = passenger.identityInfo.type;
    let curCertificateType = 0;
    let certificateTypeInput = APP.getById(
      ADDEDITPASSENGER_PASSENGER_CERTIFICATETYPE_ID
    ); //获取值（身份证、护照、其他证件）
    //如果要检索的字符串值没有出现，则该方法返回 -1
    if (certificateTypeInput.text().indexOf("身份证") > -1) {
      curCertificateType = 0;
    } else if (certificateTypeInput.text().indexOf("护照") > -1) {
      curCertificateType = 1;
    } else if (certificateTypeInput.text().indexOf("其他") > -1) {
      curCertificateType = 9;
    }
    // 当前证件类型和目标证件类型不一致
    if (curCertificateType != targetCertificateType) {
      certificateTypeInput.click();
      sleep(300);
      this.selectCertificateType(curCertificateType, targetCertificateType);
    }
    // 证件号信息
    let certificateNumberInput = APP.getById(
      ADDEDITPASSENGER_PASSENGER_CERTIFICATENUMBER_ID
    );
    if (!passenger.identityInfo.cardNo) {
      throw errorMessage.noCardNo;
    }
    certificateNumberInput.click();
    sleep(300);
    // 滑动到底部
    let scrollView = className(SCROLL_VIEW);
    scrollView.scrollForward();
    certificateNumberInput.setText(passenger.identityInfo.cardNo); //证件号

    // 点击其他地方则可以自动绑定出生年月
    if (targetCertificateType == 0) {
      let cardNoUiOBject = APP.getById(
        ADDEDITPASSENGER_PASSENGER_CERTIFICATENUMBER_ID
      );
      sleep(300);
      if (cardNoUiOBject.text() == passenger.identityInfo.cardNo) {
        let phoneInput = APP.getById(ADDEDITPASSENGER_PASSENGER_PHONE_ID);
        if (phoneInput) {
          APP.clickArea(phoneInput);
        }
        if (passenger.phone) {
          sleep(200);
          phoneInput.setText(passenger.phone); // 手机号
        }
      }
    } else {
      this.selectBirth(passenger.birthDate);
    }
    // 检测登录是否异常
    APP.loginInvalid();
    // 点击同意
    APP.checkedById(ADDEDITPASSENGER_AGREE_ID, true);
    let finishBtn = APP.waitForId(ADDEDITPASSENGER_FINISH_BTN_ID, 50, 800);
    if (finishBtn) {
      // 完成编辑
      finishBtn.click();
    } else {
      APP.clickByText("完成新增");
    }

    function notSave() {
      let notSave = APP.waitForContainsText("不保存", 50, 800);
      if (ENV.debugMode) {
        log("是否保存");
      }
      if (notSave) {
        notSave.click();
      }
    }

    function returnPrePage() {
      // 添加乘机人页面返回上一页
      let returnBack = APP.waitForDesc("返回上一页", 50, 800);
      if (returnBack) {
        APP.clickArea(returnBack);
        sleep(300);
      }
      orderNotSubmitTip();
    }

    function returnInputOrderPage() {
      let inputPage = APP.waitForContainsText("填写订单", 50, 800);
      if (ENV.debugMode) {
        log("“填写订单”文字");
        log(inputPage);
      }
      while (inputPage == null) {
        // 添加乘机人页面返回上一页
        returnPrePage();
        orderNotSubmitTip();
        inputPage = APP.waitForContainsText("填写订单", 50, 800);
      }
    }

    function orderNotSubmitTip() {
      // 填写订单页面点击左上角返回
      const orderNotSubmitTip = APP.waitForContainsText(
        "订单暂未提交",
        50,
        800
      );
      if (orderNotSubmitTip) {
        const button2 = APP.waitForId("button2", 50, 500);
        while (!button2.click()) {
          sleep(10);
        }
      }
    }

    let t = 3000;
    let m = new Date().getTime() + t;
    while (m >= new Date().getTime()) {
      let passengerExistPrompt = APP.waitForContainsText(
        "已存在相同的乘机人",
        50,
        500
      );
      if (passengerExistPrompt) {
        log("已存在相同的乘机人");
        APP.clickByText("知道了");
        sleep(500);
        // 添加乘机人页面返回上一页
        returnPrePage();
        sleep(500);
        notSave();
        sleep(1000);
        // 添加乘机人页面返回上一页
        returnInputOrderPage();
        throw errorMessage.passengerExist;
      }
      let passengerExist2Prompt = APP.waitForContainsText(
        "乘机人已存在",
        50,
        500
      );
      if (passengerExist2Prompt) {
        log("乘机人已存在");
        APP.clickByText("确定");
        sleep(500);
        // 添加乘机人页面返回上一页
        returnPrePage();
        sleep(500);
        notSave();
        sleep(1000);
        // 添加乘机人页面返回上一页
        returnInputOrderPage();
        throw errorMessage.passengerExist;
      }

      let conflictPrompt = APP.waitForContainsText(
        "您的证件号与出生日期有冲突",
        50,
        500
      );
      if (conflictPrompt) {
        log("您的证件号与出生日期有冲突");
        p;
        APP.clickByText("知道了");
        sleep(500);
        returnPrePage();
        sleep(500);
        notSave();
        sleep(500);
        throw "您的证件号与出生日期有冲突，请重新检查；或当前修改的用户证件类型不是身份证，导致的异常";
      }

      let namePrompt = APP.waitForContainsText(
        "若您尝试输入英文或拼音",
        50,
        500
      );
      if (namePrompt) {
        log("若您尝试输入英文或拼音");
        APP.clickByText("知道了");
        sleep(500);
        returnPrePage();
        sleep(500);
        notSave();
        sleep(500);
        throw "若您尝试输入英文或拼音，请在姓和名之间加'/',如CHEN/XINYI";
      }
      sleep(200);
      let tip = APP.waitForContainsText("保存乘机人信息失败", 50, 500);
      if (tip) {
        log("保存乘机人信息失败");
        APP.clickByText("确定");
        sleep(500);
        returnPrePage();
        sleep(500);
        notSave();
        sleep(1000);
        throw "保存乘机人信息失败";
      }
    }
  },
  // 选择乘机人（点击新增或者编辑）
  selectOrAddPassenger: function (passengers, request) {
    // 检测登录是否异常
    APP.loginInvalid();
    sleep(2000);

    let needCheckedPassengers = [];
    // 如果直接跳到新增乘机人页面，说明该账号是新的，没有任何乘机人
    let addPassengerPage = APP.waitForContainsText(
      "识别证件添加信息",
      100,
      3000
    );
    log("是否在新增乘机人页面" + addPassengerPage);
    if (!addPassengerPage) {
      let selectPassenger = APP.waitForContainsText("选择乘机人");
      let count = 0;
      while (!selectPassenger && count < 10) {
        selectPassenger = APP.waitForContainsText("选择乘机人");
        count++;
      }
      if (!selectPassenger) {
        throw "选择乘机人页面进入失败";
      }
    } else {
      // 第一个乘机人添加上了不会默认选中
      let passengerName = "";
      if (passengers[0].name.secondary) {
        passengerName =
          passengers[0].name.primary + "/" + passengers[0].name.secondary;
      } else {
        passengerName = passengers[0].name.primary;
      }
      needCheckedPassengers.push({
        name: passengerName,
        cardNo: passengers[0].identityInfo.cardNo,
      });
    }
    log(needCheckedPassengers.length);
    // 目标集合
    let targetIdCardNos = [];
    passengers.forEach((p) => {
      let passengerName = "";
      if (p.name.secondary) {
        passengerName = p.name.primary + "/" + p.name.secondary;
      } else {
        passengerName = p.name.primary;
      }
      targetIdCardNos.push({
        name: passengerName,
        cardNo: p.identityInfo.cardNo,
      });
    });
    // 已有的集合
    if (ENV.debugMode) {
      log("目标乘客 %s", JSON.stringify(targetIdCardNos));
    }

    // 已存在的乘机人
    let existPassengers = this.recordExistPassengers();

    // 不存在則新增，存在則等待勾選
    try {
      passengers.forEach((p) => {
        sleep(800);
        let passengerName = "";
        if (p.name.secondary) {
          passengerName = p.name.primary + "/" + p.name.secondary;
        } else {
          passengerName = p.name.primary;
        }
        log("名字" + passengerName);
        if (
          cardNoIndexOf(existPassengers, p.identityInfo.cardNo, passengerName) <
          0
        ) {
          if (ENV.debugMode) {
            log(
              "目标乘客不存在，需要添加 %s",
              p.identityInfo.cardNo,
              passengerName
            );
          }
          // 有一个乘客以上的点击btn2按钮
          let addPassengerBtn2 = APP.waitForId(
            PASSENGER_ADD_PASSENGER_BTN2_ID,
            100,
            3000
          );
          if (addPassengerBtn2) {
            addPassengerBtn2.click();
          }
          this.addOrEditPassenger(p);
          if (ENV.debugMode) {
            log("新增乘客完成 %s", p);
          }
        } else {
          needCheckedPassengers.push({
            name: passengerName,
            cardNo: p.identityInfo.cardNo,
          });
        }
      });
    } catch (error) {
      switch (error) {
        case errorMessage.passengerExist:
          log("乘机人已存在，重新选择乘机人");
          this.inputInformationAndPayment(request);
          break;
        default:
          throw error;
      }
    }

    sleep(800); //等待页面切换动画

    // 选中所有目标用户
    this.checkedExistPassengers(targetIdCardNos, needCheckedPassengers);

    // 添加完乘机人后按确定
    let tip = APP.waitForText("确定", 50, 800);
    if (tip) {
      APP.clickByText("确定");
    }

    let tipError = APP.waitForText("请添加一位", 50, 1000);
    if (tipError) {
      throw "请添加一位18岁以上乘客";
    }

    let tip2 = APP.waitForText("提示", 50, 800);
    if (tip2) {
      APP.clickByText("确定");
    }
    sleep(1000);
  },
  // 记录已存在的乘机人
  recordExistPassengers() {
    sleep(1000);
    let existPassengers = [];
    let selectPassengerScrollView = APP.waitForId(
      PASSENGER_SCROLL_VIEW_ID,
      50,
      800
    ); // 滑动块
    let timeout = new Date().getTime() + 5000;
    let checkChildDeep = false;
    while (checkChildDeep == false && timeout > new Date().getTime()) {
      try {
        checkChildDeep = APP.checkChildDeep(selectedPassengerScrollView, 1, 3);
      } catch (error) {
        log(error);
        sleep(1000);
        selectPassengerScrollView = APP.waitForId(
          PASSENGER_SCROLL_VIEW_ID,
          50,
          800
        ); // 滑动块
      }
    }

    // 分页
    function nextPage(scrollView) {
      APP.scrollForward(scrollView);
    }

    if (selectPassengerScrollView) {
      if (!selectPassengerScrollView.scrollable()) {
        if (ENV.debugMode) {
          log("乘机人滑动块支持滑动");
        }
        sleep(800);
        let passengerList = selectPassengerScrollView
          .find(id(PASSENGER_PASSENGER_ITEM_ID))
          .toArray(); // 乘机人块
        if (passengerList.length > 0) {
          passengerList.forEach((p) => {
            let idCardNoText = p
              .findOne(id(PASSENGER_PASSENGER_IDCARDNUMBER_ID))
              .text();
            let idCardNo = "";
            if (idCardNoText.indexOf("身份证") > -1) {
              idCardNo = idCardNoText.substring(4);
            } else if (idCardNoText.indexOf("护照") > -1) {
              idCardNo = idCardNoText.substring(3);
            } else if (idCardNoText.indexOf("其他证件") > -1) {
              idCardNo = idCardNoText.substring(5);
            }
            let nameUiObject = p.findOne(id(PASSENGER_PASSENGER_NAME_ID));
            if (!nameUiObject) {
              return;
            }
            let passengerNameText = nameUiObject.text();
            let passengerName = passengerNameText.substring(
              0,
              getLen(passengerNameText) - 4
            );
            log(passengerName);
            // existPassengers.push(idCardNo);
            existPassengers.push({
              name: passengerName,
              cardNo: idCardNo,
            });
          });
        }
      } else {
        log("滑动记录已存在的乘机人");
        let lastCardNo = "";
        let currentCardNo;
        // 多页乘机人
        while (lastCardNo != currentCardNo) {
          lastCardNo = currentCardNo;
          selectPassengerScrollView = APP.getById(PASSENGER_SCROLL_VIEW_ID);
          let passengerList = selectPassengerScrollView
            .find(id(PASSENGER_PASSENGER_ITEM_ID))
            .toArray();
          if (passengerList.length > 0) {
            passengerList.forEach((p) => {
              let idCardNoPanel = p.findOne(
                id(PASSENGER_PASSENGER_IDCARDNUMBER_ID)
              );
              if (!idCardNoPanel) {
                return;
              }
              let idCardNoText = idCardNoPanel.text();
              let idCardNo = "";
              if (idCardNoText.indexOf("身份证") > -1) {
                idCardNo = idCardNoText.substring(4);
              } else if (idCardNoText.indexOf("护照") > -1) {
                idCardNo = idCardNoText.substring(3);
              } else if (idCardNoText.indexOf("其他证件") > -1) {
                idCardNo = idCardNoText.substring(5);
              }
              let nameUiObject = p.findOne(id(PASSENGER_PASSENGER_NAME_ID));
              if (!nameUiObject) {
                return;
              }
              let passengerNameText = nameUiObject.text();
              let passengerName = passengerNameText.substring(
                0,
                getLen(passengerNameText) - 4
              );
              log(passengerName);
              currentCardNo = idCardNo;
              // 不存在该乘客才追加
              let existPsg = existPassengers.filter(
                (e) => e.cardNo == idCardNo && e.name == passengerName
              );
              if (existPsg.length == 0) {
                // existPassengers.push(idCardNo);
                existPassengers.push({
                  name: passengerName,
                  cardNo: idCardNo,
                });
              }
            });
          }
          // 已有的集合
          if (ENV.debugMode) {
            log("已有乘客 %s", JSON.stringify(existPassengers));
          }
          nextPage(selectPassengerScrollView);
        }
        if (currentCardNo == lastCardNo) {
          // 恢复
          let selectPassengerScroll = APP.getById(PASSENGER_SCROLL_VIEW_ID);
          while (selectPassengerScroll.scrollBackward()) {
            selectPassengerScroll.scrollBackward();
            sleep(200);
          }
        }
      }
    }
    return existPassengers;
  },
  checkedExistPassengers(targetIdCardNos, needCheckedPassengers) {
    let checked = [];
    log("准备选择已存在的乘机人");
    let selectedPassengerScrollView = APP.waitForId(
      PASSENGER_SCROLL_VIEW_ID,
      50,
      800
    ); // 滑动块
    let timeout = new Date().getTime() + 5000;
    let checkChildDeep = false;
    while (checkChildDeep == false && timeout > new Date().getTime()) {
      try {
        checkChildDeep = APP.checkChildDeep(selectedPassengerScrollView, 1, 3);
      } catch (error) {
        log(error);
        sleep(1000);
        selectedPassengerScrollView = APP.waitForId(
          PASSENGER_SCROLL_VIEW_ID,
          50,
          800
        ); // 滑动块
      }
    }
    if (selectedPassengerScrollView) {
      if (!selectedPassengerScrollView.scrollable()) {
        var passengerItems = selectedPassengerScrollView
          .find(id(PASSENGER_PASSENGER_ITEM_ID))
          .toArray(); // 获取所有乘机人块
        passengerItems.forEach((f) => {
          sleep(800);
          let cardNoTextUiObject = f.findOne(
            id(PASSENGER_PASSENGER_IDCARDNUMBER_ID)
          );
          if (!cardNoTextUiObject) {
            return;
          }
          let cardNoText = cardNoTextUiObject.text();
          let cardNo = "";
          if (cardNoText.indexOf("身份证") > -1) {
            cardNo = cardNoText.substring(4);
          } else if (cardNoText.indexOf("护照") > -1) {
            cardNo = cardNoText.substring(3);
          } else if (cardNoText.indexOf("其他证件") > -1) {
            cardNo = cardNoText.substring(5);
          }
          let nameUiObject = f.findOne(id(PASSENGER_PASSENGER_NAME_ID));
          if (!nameUiObject) {
            return;
          }
          let passengerNameText = nameUiObject.text();
          let passengerName = passengerNameText.substring(
            0,
            getLen(passengerNameText) - 4
          );
          log(passengerName);
          if (cardNoIndexOf(targetIdCardNos, cardNo, passengerName) > -1) {
            if (
              cardNoIndexOf(needCheckedPassengers, cardNo, passengerName) > -1
            ) {
              let checkedOrNot = f.findOne(id("item_passenger_img_checked")); //检测当前乘机人是否选中
              if (checkedOrNot.checked() == false) {
                checked.push(cardNo);
                while (!f.click()) {
                  sleep(10);
                }
                if (ENV.debugMode) {
                  log("已选中乘机人 %s", cardNo);
                }
              }
            }
          }
        });
      } else {
        // 存在乘机人滚动块
        let lstCardNo = "";
        let curCardNo;

        // 分页
        function nextPage(scrollView) {
          APP.scrollForward(scrollView);
        }
        // 多页乘机人
        while (checked.length != needCheckedPassengers.length) {
          lstCardNo = curCardNo;
          selectedPassengerScrollView = APP.getById(PASSENGER_SCROLL_VIEW_ID);
          // 获取所有乘机人块
          var passengerItems = selectedPassengerScrollView
            .find(id(PASSENGER_PASSENGER_ITEM_ID))
            .toArray();
          passengerItems.forEach((f, i) => {
            sleep(1000);
            let cardNoTextUiObject = f.findOne(
              id(PASSENGER_PASSENGER_IDCARDNUMBER_ID)
            );
            if (!cardNoTextUiObject) {
              return;
            }
            let cardNoText = cardNoTextUiObject.text();
            let cardNo = "";
            if (cardNoText.indexOf("身份证") > -1) {
              cardNo = cardNoText.substring(4);
            } else if (cardNoText.indexOf("护照") > -1) {
              cardNo = cardNoText.substring(3);
            } else if (cardNoText.indexOf("其他证件") > -1) {
              cardNo = cardNoText.substring(5);
            }
            let nameUiObject = f.findOne(id(PASSENGER_PASSENGER_NAME_ID));
            if (!nameUiObject) {
              return;
            }
            let passengerNameText = nameUiObject.text();
            let passengerName = passengerNameText.substring(
              0,
              getLen(passengerNameText) - 4
            );
            log(passengerName);
            if (cardNoIndexOf(targetIdCardNos, cardNo, passengerName) > -1) {
              if (
                cardNoIndexOf(needCheckedPassengers, cardNo, passengerName) > -1
              ) {
                let checkedOrNot = f.findOne(id("item_passenger_img_checked")); //检测当前乘机人是否选中
                if (checkedOrNot.checked() == false) {
                  if (i > 9) {
                    this.slide(_env.screenWidth / 2, _env.screenWidth / 2, -1);
                  }
                  while (!f.click()) {
                    sleep(10);
                  }
                  curCardNo = cardNo;
                  checked.push(cardNo);
                  if (ENV.debugMode) {
                    log("已选中乘机人 %s", cardNo);
                  }
                }
              }
            }
          });
          nextPage(selectedPassengerScrollView);
        }
        if (curCardNo == lstCardNo) {
          // 滚动回顶部
          let selectedPassengerScroll = APP.getById(PASSENGER_SCROLL_VIEW_ID);
          while (selectedPassengerScroll.scrollBackward()) {
            selectedPassengerScroll.scrollBackward();
            sleep(200);
          }
        }
      }
    }
  },
  // 添加携带人
  addxdr() {
    let passengerNameList = APP.getListById(
      "item_order_select_passenger_tv_passengerName"
    ).toArray();
    if (passengerNameList.length > 0) {
      let infantIndex = 0;
      passengerNameList.forEach((p) => {
        let passengerNameText = p.text();
        sleep(800);
        // 婴儿需添加携带人
        if (passengerNameText.indexOf("婴儿") > -1) {
          // 找到携带人并点击
          let xdrObject = p
            .parent()
            .parent()
            .find(id("item_order_select_passenger_layout_carrier"));
          while (!xdrObject.click()) {
            if (ENV.debugMode) {
              log("已点击携带人");
            }
            sleep(10);
          }
          infantIndex++;
          if (infantIndex != 1) {
            sleep(300);
            this.slide(
              _env.screenWidth / 2,
              _env.screenWidth / 2,
              -infantIndex
            );
            sleep(300);
          }
          APP.clickByText("确定");
        }
      });
      sleep(1000);
    }
  },
  // 获取直减价格
  getDirectDiscount() {
    let getDiscount = 0;
    // 直减价格
    let discountFind = APP.waitForId(ORDER_CUTPRICE_ID, 50, 1000);
    if (discountFind != null) {
      // 截取直减价格（有特殊符号）
      let discountFindText = discountFind.text().substring(2);
      getDiscount = parseInt(discountFindText);
      if (ENV.debugMode) {
        log("获取到的直减价格" + getDiscount);
      }
    }
    return getDiscount;
  },
  // 票面价比较
  ticketPriceCompare(getTicketPrice, ticketPriceUpper, ticketPriceLower) {
    if (
      getTicketPrice >= ticketPriceLower &&
      getTicketPrice <= ticketPriceUpper
    ) {
      return true;
    } else {
      throw (
        "票面价比较不符合，无法进行下一步。页面票面价：" +
        getTicketPrice +
        ",票面价上限：" +
        ticketPriceUpper +
        ",票面价下限：" +
        ticketPriceLower
      );
    }
  },
  // 结算价比较（不含税）
  settlementPriceCompare(
    getSettlementPrice,
    settlementPriceUpper,
    settlementPriceLower
  ) {
    // 符合结算价<=下限 结算价>=上限
    if (
      getSettlementPrice >= settlementPriceLower &&
      getSettlementPrice <= settlementPriceUpper
    ) {
      return true;
    } else {
      throw (
        "结算价比较不符合，无法进行下一步。页面结算价：" +
        getSettlementPrice +
        ",结算价上限：" +
        settlementPriceUpper +
        ",票面价下限：" +
        settlementPriceLower
      );
    }
  },
  // 买入价比较（页面票面价-后台给的结算价）
  sellPriceCompare(getSellPrice, sellPriceUpper, sellPriceLower) {
    // 符合结算价<=下限 结算价>=上限
    if (getSellPrice >= sellPriceLower && getSellPrice <= sellPriceUpper) {
      return true;
    } else {
      throw (
        "买入价比较不符合，无法进行下一步。APP买入价：" +
        getSellPrice +
        ",买入价上限：" +
        sellPriceUpper +
        ",买入价下限：" +
        sellPriceLower
      );
    }
  },
  // 根据旅客类型获取对应的价格、税费
  passengerTypeChildren(passengerParent, passengerType, cabin) {
    let getTicketPrice = 0; //页面票面价
    let getTotalTax = 0; //页面税费
    // 获取所有乘机人的票面价、税费
    passengerParent
      .children()
      .toArray()
      .forEach((child) => {
        // 机票价格
        let ticketPriceText = child.findOne(id(ORDER_TICKETPRICE_ID));
        if (ticketPriceText) {
          getTicketPrice = parseInt(ticketPriceText.text().substring(1));
          if (ENV.debugMode) {
            log("APP票面价" + getTicketPrice);
          }
        }
        // 基建+燃油
        let totalTaxText = child.findOne(id(ORDER_TAX_ID));
        if (totalTaxText) {
          getTotalTax = parseInt(totalTaxText.text().substring(1));
          if (ENV.debugMode) {
            log("APP基建+燃油：" + getTotalTax);
          }
        }
      });
    actualPrices.push({
      type: passengerType, //乘客类型
      ticketPrice: getTicketPrice, //票面价
      totalTax: getTotalTax, //总税费
      airportTax: passengerType == 0 ? (getTotalTax < 50 ? 0 : 50) : 0, // 成人基建：50，儿童婴儿基建：0
      oilFee:
        passengerType == 0
          ? getTotalTax < 50
            ? getTotalTax
            : getTotalTax - 50
          : passengerType == 1
          ? getTotalTax
          : 0, //成人、儿童有燃油，婴儿是0
      cabin: cabin,
    });
  },
  // 价格比较
  priceCompare(passenger, order) {
    let cabinPriceInfo = order.cabinPriceInfos.filter(
      (p) => p.type === passenger.type
    );
    if (!cabinPriceInfo || cabinPriceInfo.length === 0) {
      throw "下单失败，未找到乘客类型的价格" + passenger.type;
    }

    let actualPrice = actualPrices.filter((p) => p.type === passenger.type);
    if (!actualPrice || actualPrice.length === 0) {
      throw "下单失败，未找到乘客类型的实际价格" + passenger.type;
    }

    let adultPrice = actualPrices.filter((p) => p.type === 0);

    // 获取直减
    let getDiscount = this.getDirectDiscount();
    if (ENV.debugMode) {
      log("APP直减：" + getDiscount);
    }
    const discountPassengers = order.passengers.filter((p) => p.type != 2); //成人和儿童有直减价格，直减价格均摊
    const discountPassengersCount = discountPassengers.length; //拥有直减价格人数
    if (ENV.debugMode) {
      log("拥有直减价格人数：" + discountPassengersCount);
    }

    // 成人
    if (passenger.type === 0) {
      let getSettlementPrice = 0; //结算价
      let getSellPrice = 0; //买入价
      // 只会比较单个成人结算价
      getSettlementPrice =
        actualPrice[0].ticketPrice - getDiscount / discountPassengersCount;
      if (ENV.debugMode) {
        log("成人结算价（不包含税费）：" + getSettlementPrice);
      }
      // 只会比较单个成人买入价：买入价=APP票面价-后台结算价
      getSellPrice =
        actualPrice[0].ticketPrice - cabinPriceInfo[0].settlementPrice;
      if (ENV.debugMode) {
        log("成人买入价：" + getSellPrice);
      }

      let settlementPrice = getSettlementPrice - cabinPriceInfo[0].couponAmount; //结算价 = 单个成人票面价 - 直减 ;
      let directDiscount = getDiscount / discountPassengersCount; //成人和儿童有直减价格，直减价格均摊

      this.ticketPriceCompare(
        actualPrice[0].ticketPrice - cabinPriceInfo[0].ticketPrice,
        order.createOrderRuleInfo.ticketPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit
      );
      this.settlementPriceCompare(
        settlementPrice - cabinPriceInfo[0].settlementPrice,
        order.createOrderRuleInfo.settlementPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit
      );
      this.sellPriceCompare(
        getSellPrice,
        order.createOrderRuleInfo.sellPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.sellPriceFloatRange.lowerLimit
      );

      actualPrice.forEach((element) => {
        element.settlementPrice = settlementPrice;
        element.directDiscount = directDiscount;
      });
    } else if (passenger.type === 1) {
      if (actualPrice.ticketPrice > adultPrice[0].ticketPrice) {
        throw "下单失败，儿童或婴儿票面价高于成人票面价";
      }

      let getSettlementPrice = 0; //结算价
      let getSellPrice = 0; //买入价
      // 只会比较单个成人结算价
      getSettlementPrice =
        actualPrice[0].ticketPrice - getDiscount / discountPassengersCount;
      if (ENV.debugMode) {
        log("成人结算价（不包含税费）：" + getSettlementPrice);
      }
      // 只会比较单个成人买入价：买入价=APP票面价-后台结算价
      getSellPrice =
        actualPrice[0].ticketPrice - cabinPriceInfo[0].settlementPrice;
      if (ENV.debugMode) {
        log("成人买入价：" + getSellPrice);
      }

      let settlementPrice = getSettlementPrice - cabinPriceInfo[0].couponAmount; //结算价 = 单个成人票面价 - 直减 ;
      let directDiscount = getDiscount / discountPassengersCount; //成人和儿童有直减价格，直减价格均摊

      this.ticketPriceCompare(
        actualPrice[0].ticketPrice - cabinPriceInfo[0].ticketPrice,
        order.createOrderRuleInfo.ticketPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit
      );
      this.settlementPriceCompare(
        settlementPrice - cabinPriceInfo[0].settlementPrice,
        order.createOrderRuleInfo.settlementPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit
      );
      this.sellPriceCompare(
        getSellPrice,
        order.createOrderRuleInfo.sellPriceFloatRange.upperLimit,
        order.createOrderRuleInfo.sellPriceFloatRange.lowerLimit
      );

      actualPrice.forEach((element) => {
        element.settlementPrice = settlementPrice;
        element.directDiscount = directDiscount;
      });
    } else {
      if (actualPrice.ticketPrice > adultPrice[0].ticketPrice) {
        throw "下单失败，儿童或婴儿票面价高于成人票面价";
      }
      // 获取婴儿的结算价
      actualPrice.forEach((item) => {
        item.settlementPrice = actualPrice[0].ticketPrice; //婴儿结算价直接等于婴儿票面价
        item.directDiscount = 0; //直减价格
      });
    }
  },
  // 展开价格详情
  expanPriceDetail: function (order) {
    // 订单总价
    let totalPriceTextFindOne = APP.getById(ORDER_TOTALPRICE_ID, 50, 1000);
    getTotalPrice = parseInt(totalPriceTextFindOne.text());
    if (ENV.debugMode) {
      log("APP订单总价：" + getTotalPrice);
    }

    // 点开明细查看总价、乘机人类型、票面价、税费
    let orderPage = APP.waitForId(ORDER_PRICEDETAIL_ID, 50, 1000);
    if (orderPage) {
      APP.clickById(ORDER_PRICEDETAIL_ID);
      sleep(500);
    }
    const cabin = order.cabinPriceInfos[0].cabin;
    // 乘机人类型、票面价ticketPrice、税费totalTax、直减directDiscount(多个)
    order.passengers.forEach((element) => {
      sleep(1000);
      switch (element.type) {
        case 0:
          // 查找成人模块的子集
          let adultParent = APP.waitForIdText(ORDER_PASSENGERTYPE_ID, "成人")
            .parent()
            .parent();
          this.passengerTypeChildren(adultParent, element.type, cabin);
          break;
        case 1:
          // 儿童模块的子集
          let childParent = APP.waitForIdText(ORDER_PASSENGERTYPE_ID, "儿童")
            .parent()
            .parent();
          this.passengerTypeChildren(childParent, element.type, cabin);
          break;
        case 2:
          // 婴儿模块的子集
          let infantParent = APP.waitForIdText(ORDER_PASSENGERTYPE_ID, "婴儿")
            .parent()
            .parent();
          this.passengerTypeChildren(infantParent, element.type, cabin);
          break;
      }
    });

    try {
      // 根据后台入参舱位价格数据比较
      order.passengers.forEach((element) => {
        this.priceCompare(element, order);
      });
    } catch (error) {
      back(); // 关闭价格详情
      sleep(1000);
      throw error;
    }

    // 关闭价格详情
    back();
    sleep(500);
    if (ENV.debugMode) {
      log("关闭价格详情");
    }
    return {
      actualPrices: actualPrices,
      totalPrice: getTotalPrice, //总价
    };
  },
  // 使用优惠券
  useCoupon: function (passengerCount) {
    sleep(2000);
    let couponScrollView = APP.waitForId(
      "discount_coupon_content_rv",
      100,
      5000
    );
    let lastCouponCode = ""; // 最近一次的优惠券代码
    let currentCouponCode; // 当前优惠券代码
    let findCouponCodes = 0; // 是否找到目标优惠券
    while (lastCouponCode != currentCouponCode) {
      lastCouponCode = currentCouponCode;
      try {
        couponScrollView = APP.waitForId(
          "discount_coupon_content_rv",
          100,
          5000
        );
        let couponItems = couponScrollView
          .find(className("android.widget.RelativeLayout").depth(10))
          .toArray();
        if (ENV.debugMode) {
          log("拥有优惠券%s张", couponItems.length);
        }
        if (couponItems.length < passengerCount) {
          throw (
            "优惠券不足，人数" +
            passengerCount +
            "实际优惠券剩余" +
            couponItems.length
          );
        }
        couponItems.forEach((element, eIndex) => {
          sleep(800);
          findCouponCodes = eIndex + 1;
          APP.clickArea(element);
          sleep(1000);
          let checkedConfirm = APP.waitForId(
            "dialog_discount_coupon_confirm_tv",
            100,
            3000
          );
          if (checkedConfirm) {
            checkedConfirm.click();
            sleep(1000);
          }
          if (findCouponCodes == passengerCount) {
            throw "找到优惠券";
          }
        });
      } catch (error) {
        log("捕获到的异常：" + error);
        if (error == "找到优惠券") {
          lastCouponCode = currentCouponCode;
        } else {
          throw error;
        }
      }
    }
    // 判断优惠券是否选中
    let checked = APP.getListById("discount_coupon_used_iv");
    log(checked);
    if (findCouponCodes == passengerCount && checked.size() == passengerCount) {
      log("选中的优惠券数量" + checked.size());
      // 点击确定
      APP.clickById("discount_coupon_confirm_bt");
      sleep(2000);
    } else {
      throw "优惠券可能不足，请查看";
    }
  },
  // 填写订单
  inputInformationAndPayment: function (request) {
    orderData = request;
    let netError1 = APP.waitForContainsText("您的网络好像不给力哦", 50, 500);
    if (netError1) {
      APP.clickByTextContains("确认");
      throw "下单失败，请检查账号是否异常，页面提示“您的网络好像不给力哦”";
    }
    let error = APP.waitForContainsText("不符合活动规则", 50, 1000);
    if (error) {
      if (error.text().includes("点击确认")) {
        APP.clickByTextContains("返回");
      } else {
        APP.clickByTextContains("确定");
      }
      throw "不符合活动规则" + error.text();
    }
    error = APP.waitForContainsText("不符合当前活动的购买条件", 50, 1000);
    if (error) {
      APP.clickByTextContains("确认");
      throw "不符合当前活动的购买条件" + +error.text();
    }
    // 免费领取大兴权益，出行更安心
    let cancelBtn = APP.waitForId("order_view_window_cancel_tv", 50, 1500);
    if (cancelBtn) {
      cancelBtn.click();
    }
    let orderPage = APP.waitForContainsText("填写订单", 100, 1000);
    while (!orderPage) {
      orderPage = APP.waitForContainsText("填写订单", 100, 1000);
    }
    let order = request.data;
    // 联系人
    const contactInfo = order.contactInfo;
    const contactsName = contactInfo.name;
    const contactsPhone = contactInfo.phone;
    const contactsEmail = contactInfo.email;
    let contactsNameInput = APP.getById(ORDER_CONTACTNAME_INPUT_ID);
    contactsNameInput.setText(contactsName); // 输入联系人
    // 联系电话
    let contactsPhoneInput = APP.getById(ORDER_CONTACTPHONE_INPUT_ID);
    contactsPhoneInput.setText(contactsPhone); // 输入联系电话
    sleep(1000);
    // 邮箱(选填)
    // let contactsEmailInput = APP.getById(ORDER_CONTACTEMAIL_INPUT_ID);
    // contactsEmailInput.click();
    // if (contactsEmail) {
    //     contactsEmailInput.setText(contactsEmail);
    // } else {
    //     APP.clickById(CLEAR_CONTANT_EMAIL_BTN, 100, 500);
    // }

    // 选择或添加乘机人
    const passengers = order.passengers; // 乘机人
    // 点击添加
    let addTextUiObject = APP.waitForContainsText("添加");
    while (!addTextUiObject) {
      addTextUiObject = APP.waitForContainsText("添加");
    }
    APP.clickArea(addTextUiObject);
    if (ENV.debugMode) {
      log("点击添加乘机人按钮");
    }

    this.selectOrAddPassenger(passengers, request);

    let adultNum = 0; // 已选择的成人数量
    let childNum = 0; // 已选择的儿童数量
    let infantNum = 0; // 已选择的儿童数量
    let countUiObject = APP.waitForId("item_order_synthesize_detail_passenger");
    log(countUiObject);
    if (countUiObject) {
      adultNum = countUiObject.text().split("成人")[1].substring(0, 1);
      if (ENV.debugMode) {
        log("APP成人人数：" + adultNum);
      }
      childNum = countUiObject.text().split("儿童")[1].substring(0, 1);
      if (ENV.debugMode) {
        log("APP儿童人数：" + childNum);
      }
      infantNum = countUiObject.text().split("婴儿")[1].substring(0, 1);
      if (ENV.debugMode) {
        log("APP婴儿人数：" + infantNum);
      }
    }
    const adultCount = passengers.filter((p) => p.type == 0).length;
    const childCount = passengers.filter((p) => p.type == 1).length;
    const infantCount = passengers.filter((p) => p.type == 2).length;
    log("成人目标数量%s，实际下单人数%s", adultCount, adultNum);
    log("儿童目标数量%s，实际下单人数%s", childCount, childNum);
    log("婴儿目标数量%s，实际下单人数%s", infantCount, infantNum);
    if (
      adultCount != adultNum ||
      childCount != childNum ||
      infantCount != infantNum
    ) {
      throw (
        "下单人数与目标人数不一致，请重新下单。已选择的成人：" +
        adultNum +
        "，儿童：" +
        childNum +
        "，婴儿：" +
        infantNum
      );
    }

    // 如果存在婴儿，需要为婴儿选择携带人
    this.addxdr();

    sleep(500);
    let scroll = APP.getById("activity_order_new_scrollView");
    scroll.scrollForward();
    sleep(500);
    // 滚动到底部
    scroll.scrollForward();
    sleep(500);

    // 使用优惠券
    if (order.cabinPriceInfos[0].couponAmount > 0) {
      sleep(1000);
      log("即将点击优惠券");
      // 点击优惠券
      APP.clickById("item_order_segment_flight_detail_lly_coupon");
      sleep(2000);
      // 选择优惠券
      let passengerCount = passengers.filter((p) => p.type != 2).length;
      log("获取使用优惠券的人数" + passengerCount);
      this.useCoupon(passengerCount);
    }

    // 展开详细
    actualPrices = [];
    const priceDetail = this.expanPriceDetail(order);
    if (ENV.debugMode) {
      log("结果集");
      log(priceDetail);
    }
    sleep(500); // 等待明细消失

    // 勾选请阅读并接受协议
    APP.clickById(ORDER_PASSENGERSNAME_AGREE_ID);
    sleep(800);

    // 下一步
    APP.clickById(ORDER_NEXT_BTN_ID);
    sleep(300);

    orderData = {};
    // 一小时内登记提示，点击继续
    let inOneHourCheckInTip = APP.waitForContainsText(
      "请您尽快支付并办理登机牌",
      50,
      800
    );
    if (inOneHourCheckInTip) {
      let btn2 = APP.waitForId(BUTTON2, 50, 500);
      if (btn2) {
        while (!btn2.click()) {
          sleep(10);
        }
      }
    }
    // 该订单不符合活动规则提示，点击返回
    let incompatibleTip = APP.waitForContainsText("不符合活动规则", 50, 800);
    if (incompatibleTip) {
      if (incompatibleTip.text().includes("点击确认")) {
        APP.clickByTextContains("返回");
      } else {
        APP.clickById(BUTTON2);
      }
      throw "不符合活动规则 " + incompatibleTip.text();
    }
    // 无内容的提示，点击继续
    let noConentTip = APP.waitForContainsText("提示", 50, 800);
    if (noConentTip) {
      let btn2 = APP.waitForId(BUTTON2, 50, 500);
      if (btn2) {
        while (!btn2.click()) {
          sleep(10);
        }
      }
    }
    // 提示，你选择的是0成人1儿童0婴儿，与订单中的1成人/0儿童、0婴儿不一致、可能导致价格变动，是否继续
    APP.waitPrompt();

    // 检测下一步按钮是否存在，存在则说明加载中的图片也存在
    let nextBtn = APP.waitForId(ORDER_NEXT_BTN_ID, 50, 800);
    if (nextBtn) {
      // 右滑一下，重新点击下一步
      gesture(
        200,
        [0, _env.screenHeight / 2],
        [_env.screenWidth * 0.8, _env.screenHeight / 2]
      );
      sleep(300);
      nextBtn.click();
      sleep(300);
    }

    // 证件确认
    let certificateTip = APP.waitForContainsText("证件确认", 50, 800);
    if (certificateTip) {
      let confirmBtn = APP.waitForId(
        ORDER_CERTIFACATEtYPE_CONFIRM_BUTTON_ID,
        50,
        500
      );
      if (confirmBtn) {
        while (!confirmBtn.click()) {
          sleep(10);
        }
      }
    }

    // 放弃购买航空保险
    let giveUpId = APP.waitForId(
      "book_item_order_insurance_dialog_tv_give_up",
      50,
      1500
    );
    if (giveUpId) {
      giveUpId.click();
      sleep(800);
    }

    // 南航客票代购承诺书
    let orderConfirmId = APP.waitForId(ORDER_CONFIRM_ID, 50, 2500);
    if (orderConfirmId) {
      orderConfirmId.click();
      sleep(800);
    }

    // 出现优选服务，才点击支付
    let yxfw = APP.waitForContainsText("优选服务", 50, 2000);
    if (yxfw) {
      // 检测登录是否异常
      APP.loginInvalid();
      // 点击支付
      APP.clickById(ORDER_PAYMENT_BTN_ID);
      sleep(800); //等待动画消失

      let t = 8000;
      let m = new Date().getTime() + t;
      while (m >= new Date().getTime()) {
        let error = APP.waitForContainsText("暂时没有符合条件的航班", 50, 300);
        if (error) {
          APP.clickById(BUTTON1);
          throw "暂时没有符合条件的航班";
        }

        error = APP.waitForContainsText("不符合当前活动的购买条件", 50, 300);
        if (error) {
          APP.clickByTextContains("确认");
          throw "不符合当前活动的购买条件" + +error.text();
        }

        error = APP.waitForContainsText("不能同时使用", 50, 300);
        if (error) {
          APP.clickByTextContains("确认");
          throw error.text();
        }

        // 该订单不符合活动规则提示，点击返回
        let error2 = APP.waitForContainsText("不符合活动规则", 50, 300);
        if (error2) {
          if (error2.text().includes("点击确认")) {
            APP.clickByTextContains("返回");
          } else {
            APP.clickById(BUTTON2);
          }
          throw "不符合活动规则，" + error2.text();
        }

        let error3 = APP.waitForContainsText("不支持在线购买", 50, 300);
        if (error3) {
          APP.clickById(BUTTON1);
          throw "不支持在线购买30分钟内截止办理登记手续的航班，请联系机场票务柜台。";
        }

        let error9 = APP.waitForContainsText("不支持在线购买", 50, 300);
        if (error9) {
          APP.clickById(BUTTON1);
          error9.text();
          throw "不支持在线购买30分钟内截止办理登记手续的航班，请联系机场票务柜台。";
        }

        let netError = APP.waitForContainsText("您的网络好像不给力哦", 50, 300);
        if (netError) {
          throw "下单失败，请检查账号是否异常，页面提示“您的网络好像不给力哦”";
        }

        let error4 = APP.waitForContainsText("剩余票数紧张", 50, 300);
        if (error4) {
          APP.clickById(BUTTON1);
        }

        let error5 = APP.waitForContainsText("订座失败", 50, 300);
        if (error5) {
          APP.clickById(BUTTON1);
          throw "抱歉，因疫情防控，订座失败";
        }

        let error6 = APP.waitForContainsText("系统错误", 50, 300);
        if (error6) {
          APP.clickById(BUTTON1);
          throw "系统错误，请您稍后重试";
        }

        let error7 = APP.waitForContainsText(
          "当前活动仅支持身份证购买",
          50,
          300
        );
        if (error7) {
          APP.clickById(BUTTON1);
          throw "当前活动仅支持身份证购买";
        }

        let error8 = APP.waitForContainsText(
          "年龄不符合该运价限制的乘机人年龄",
          50,
          300
        );
        if (error8) {
          APP.clickById(BUTTON1);
          throw "年龄不符合该运价限制的乘机人年龄";
        }

        let createError = APP.waitForContainsText("创建订单失败", 50, 300);
        if (createError) {
          let btn1 = APP.waitForId(BUTTON1);
          if (btn1) {
            APP.clickById(BUTTON1);
          } else {
            APP.clickById(ORDER_PAYMENT_BTN_ID);
          }
          throw "创建订单失败，请重新下单";
        }

        let tip = APP.waitForContainsText("大家太热情啦", 50, 300);
        if (tip) {
          let confirm = APP.waitForContainsText("确定", 50, 300);
          if (confirm) {
            APP.clickByTextContains("确定");
          }
          sleep(800);
        }
        // 返回按钮
        let backBtn = APP.waitForId("back_btn", 50, 300);
        if (backBtn) {
          APP.clickById("back_btn");
        }

        let waitBtn = APP.waitForContainsText("稍等片刻", 50, 300);
        if (waitBtn) {
          APP.clickByTextContains("稍等片刻");
          throw "大家太热情啦，请稍后再试";
        }
      }
    }

    // 支付订单页面
    let payPage = APP.waitForContainsText("支付订单", 500, 10000);
    if (payPage) {
      log("支付订单页");
      // 检测不到订单号
      const orderNo = APP.waitForId(ORDER_NO_ID);
      if (!orderNo) {
        throw "创建订单失败，请重新下单";
      }

      // // 南航账户支付
      // let payType = APP.waitForId('item_order_pay_type_layout_pay_type', 50, 1000);
      // if (payType) {
      //     while (!payType.parent().click()) {
      //         sleep(10);
      //     }
      // }

      // // 输入支付密码
      // let edit = APP.waitForId('balance_payment_password_et', 50, 1000);
      // if (edit) {
      //     edit.setText();
      // }

      // // 点击支付
      // let payBtn = APP.waitForId('credit_card_pay_bt', 50, 1000);
      // if (payBtn) {
      //     payBtn.click();
      // }

      // 返回首页
      let homeBtn = APP.waitForId(BACK_HOME_AFTER_BOOKING);
      if (homeBtn) {
        while (!homeBtn.click()) {
          sleep(10);
        }
      }

      if (ENV.debugMode) {
        log("下单成功");
      }

      return {
        orderNo: orderNo.text().substring(5),
        actualPrices: priceDetail.actualPrices,
        totalPrice: parseInt(priceDetail.totalPrice), //总价
      };
    } else {
      throw "创建订单失败，请重新下单";
    }
  },
};
