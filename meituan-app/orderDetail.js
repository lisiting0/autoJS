var APP = null;
var ENV = null;
const SCROLL_VIEW = 'android.widget.ScrollView';
const VIEW_GROUP = 'android.view.ViewGroup';
const TEXT_VIEW = 'android.widget.TextView';

/**
 * 支付、获取订单号和票号回填票号
 */
module.exports = {
    setEnv: function (env) {
        ENV = env;
    },
    init: function (a) {
        APP = a;
    },
    /**
     * "待付款"菜单
     */
    unPaidMenu: function () {
        sleep(3000);

        // 点击我的
        APP.me();
        sleep(5000);

        // 找到所有菜单的模块
        let recycleViewUiObject = APP.waitForId('mbc_recycler', 100, 2000);
        while (!recycleViewUiObject) {
            recycleViewUiObject = APP.waitForId('mbc_recycler', 100, 2000);
        }
        if (ENV.debugMode) {
            log('找到所有菜单的模块');
        }
        if (recycleViewUiObject) {
            let imageViewCollection = recycleViewUiObject.find(className('android.widget.ImageView').depth(14)).toArray();
            let frameLayoutCollection = recycleViewUiObject.find(className('android.widget.FrameLayout').depth(14));
            if (ENV.debugMode) {
                log('找到目标菜单的模块');
                // 如果有超出索引的异常，一定要查看get是否正确
                if (imageViewCollection.length == 3) {
                    log(frameLayoutCollection.get(2));
                } else {
                    log(frameLayoutCollection.get(3));
                }
            }
            if (frameLayoutCollection) {
                let viewGroupCollection = null;
                if (imageViewCollection.length == 3) {
                    // 如果有超出索引的异常，一定要查看depth是否正确
                    viewGroupCollection = frameLayoutCollection.get(2).findOne(className(VIEW_GROUP).depth(17).clickable(false));
                } else {
                    viewGroupCollection = frameLayoutCollection.get(3).findOne(className(VIEW_GROUP).depth(17).clickable(false));
                }
                if (ENV.debugMode) {
                    log('找到“待付款”菜单');
                    log(viewGroupCollection);
                }
                APP.clickArea(viewGroupCollection.child(0));
                sleep(2000);
            }
        }
    },
    /**
     * 下单完成后，获取订单号 
     * @param {array} passengers 
     * @param {string} payAmount 支付总金额
     * @returns
     */
    getOrderNo: function (passengers, payAmount) {
        this.unPaidMenu();

        let result = null;
        try {
            // 获取滚动组件
            let list = APP.waitForId('list', 100, 1000);
            // 获取订单列表
            let orderItems = list.find(id('order_item').depth(13)).toArray();
            log('订单数量' + orderItems.length);
            orderItems.forEach((itemEle, itemIndex) => {
                sleep(2000);
                log('索引：' + itemIndex);
                // 点击进入订单详情
                APP.clickArea(itemEle);
                sleep(5000);
                log('点击进入订单详情' + itemIndex);

                // 获取详情信息
                result = this.orderDetail(passengers, payAmount, null, null);
                if (result && result.orderNo) {
                    throw '订单信息获取成功';
                } else {
                    result = null;
                }
            });
        } catch (error) {
            if (error == '订单信息获取成功') {
            }
        }
        let mePage = APP.waitForContainsText("购物车", 100, 1000);
        while (!mePage) {
            back();
            sleep(500);
            mePage = APP.waitForContainsText("购物车", 100, 1000);
        }
        APP.home();
        return result;
    },
    /**
     * 查找待支付订单，并支付
     * @param {string} orderNo 订单号
     * @param {string} payAmount 支付总金额
     * @returns
     */
    orderToBePaid: function (orderNo, payAmount, password, phone) {
        log('找待支付订单啦')
        this.unPaidMenu();

        let result = null;
        try {
            // 获取滚动组件
            let list = APP.waitForId('list', 100, 1000);
            // 获取订单列表
            let orderItems = list.find(id('order_item').depth(13)).toArray();
            log('订单数量' + orderItems.length);
            if (orderItems.length == 0) {
                throw '不存在待付款订单';
            }
            orderItems.forEach((itemEle, itemIndex) => {
                sleep(2000);
                log('索引：' + itemIndex);
                // 点击进入订单详情
                APP.clickArea(itemEle);
                sleep(5000);
                log('点击进入订单详情' + itemIndex);

                // 获取详情信息
                result = this.orderDetail(null, payAmount, orderNo, 'payment', password, phone);
                // 如果订单号和结果返回的订单号一致，则支付成功
                if (result && result.orderNo == orderNo) {
                    throw '支付成功';
                } else {
                    result = null;
                }
            });
        } catch (error) {
            log('捕获到的异常:' + error);
            if (error == '支付成功') {
            } else if (error == '不存在待付款订单') {
                throw error;
            }
        }
        return result;
    },
    /**
     * 支付操作
     */
    payment: function (payAmount, password, phone) {
        // 点击“美团卡支付”
        let mtkUiobject = textStartsWith('美团卡').findOne();
        log('是否找到美团卡支付:：' + mtkUiobject);
        APP.clickArea(mtkUiobject.parent());
        sleep(800);
        if (ENV.debugMode) {
            log('点击“美团卡”支付');
        }
        // 点击确定支付
        let confirmPay = APP.waitForContainsText('确认支付', 100, 5000);
        if (confirmPay) {
            // 支付
            confirmPay.click();
            // 输入密码
            // 获取键盘的高度/4和宽度/3
            // const keyboardWidth = 720 - 0;
            // const keyboardHeight = 1600 - 1045;
            let position = {
                0: { x: 356, y: 1530, value: 0 },
                1: { x: 135, y: 1120, value: 1 },
                2: { x: 360, y: 1120, value: 2 },
                3: { x: 600, y: 1120, value: 3 },
                4: { x: 144, y: 1230, value: 4 },
                5: { x: 375, y: 1230, value: 5 },
                6: { x: 600, y: 1230, value: 6 },
                7: { x: 135, y: 1400, value: 7 },
                8: { x: 375, y: 1400, value: 8 },
                9: { x: 610, y: 1400, value: 9 },
            }

            let inputPwd = APP.waitForContainsText('请输入支付密码');
            if (inputPwd) {
                let addCrad = APP.waitForContainsText('添加银行卡支付', 100, 3000);
                if (addCrad) {
                    throw '美团卡余额不足';
                }

                let splitPwd = password.split('');
                log('分割后的密码' + splitPwd);
                for (let index = 0; index < splitPwd.length; index++) {
                    let element = splitPwd[index];
                    log('密码：' + element);
                    log('%s的X坐标%s，Y坐标%s', position[element].value, position[element].x, position[element].y);
                    if (element == position[element].value) {
                        click(position[element].x, position[element].y);
                        sleep(300);
                    }
                }
                sleep(2000);

                // 输入支付验证码 
                let code = APP.waitForContainsText('短信验证', 100, 5000);
                if (code) {
                    // 8秒后获取验证码
                    let msgCode = [];
                    setTimeout(() => {
                        let date = APP.getEscapeCurrentDate();
                        // 根据当前账号和支付日期获取验证码
                        var r = http.get("https://flight-change.yxho.com/api/flight-change/flight-change-message/list?sourceType=2&status=0&status=2&status=3&receptionTimeBegin=" + date + "&recivePhone=" + phone + "&sourceContent=%EF%BC%88%E6%94%AF%E4%BB%98%E9%AA%8C%E8%AF%81%E7%A0%81%EF%BC%89&skipCount=0&maxResultCount=3");
                        // 获取成功
                        if (r.statusCode == 200) {
                            let data = r.body.json();
                            data.items.forEach(element => {
                                let code = element.sourceContent.substring(4, 10);
                                log(code);
                                msgCode.push(code);
                            });
                            log('获取到的3个验证码：' + JSON.stringify(msgCode));
                        }
                    }, 8000);
                    // 输入支付验证码

                    // 点击确认支付
                    let confirmPay = APP.waitForContainsText('确认支付', 100, 3000);
                    confirmPay.click();
                }
                sleep(5000);

                let payFinish = APP.waitForContainsText('支付成功');
                while (!payFinish) {
                    payFinish = APP.waitForContainsText('支付成功', 100, 2000);
                }
                log('支付成功');
                if (payFinish) {
                    let finishText = APP.waitForContainsText('完成', 100, 2000);
                    if (finishText) {
                        finishText.click();
                        sleep(5000);
                        log('点击完成');
                    }
                    let returnHomePage = APP.waitForDesc('回到首页', 100, 2000);
                    while (!returnHomePage) {
                        returnHomePage = APP.waitForDesc('回到首页', 100, 2000);
                    }
                    returnHomePage.click();
                    sleep(5000);
                    log('点击回到首页');
                    return true;
                }
                return false;
            }
        }
    },
    /**
     * "我的订单"菜单
     */
    myOrderMenu: function (fullFlightNo) {
        // 点击我的
        APP.me();
        sleep(5000);

        // 找到所有菜单的模块
        let recycleViewUiObject = APP.waitForId('mbc_recycler', 100, 2000);
        while (!recycleViewUiObject) {
            recycleViewUiObject = APP.waitForId('mbc_recycler', 100, 2000);
        }
        if (ENV.debugMode) {
            log('找到所有菜单的模块');
        }
        if (recycleViewUiObject) {
            let imageViewCollection = recycleViewUiObject.find(className('android.widget.ImageView').depth(14)).toArray();
            let frameLayoutCollection = recycleViewUiObject.find(className('android.widget.FrameLayout').depth(14));
            if (ENV.debugMode) {
                log('找到目标菜单的模块');
                // 如果有超出索引的异常，一定要查看get是否正确
                if (imageViewCollection.length == 3) {
                    log(frameLayoutCollection.get(2));
                } else {
                    log(frameLayoutCollection.get(3));
                }
            }
            if (frameLayoutCollection) {
                let viewGroupCollection = null;
                if (imageViewCollection.length == 3) {
                    // 如果有超出索引的异常，一定要查看depth是否正确
                    viewGroupCollection = frameLayoutCollection.get(2).findOne(className(VIEW_GROUP).depth(17).clickable(true));
                } else {
                    viewGroupCollection = frameLayoutCollection.get(3).findOne(className(VIEW_GROUP).depth(17).clickable(true));
                }
                if (ENV.debugMode) {
                    log('找到“我的订单”');
                    log(viewGroupCollection);
                }
                viewGroupCollection.click();
                sleep(2000);
            }
        }

        // 点击搜索我的订单 
        APP.clickById('search_custom_action_bar_edit');
        sleep(1000);

        // 输入目标航班
        let searchEdit = APP.waitForId('search_edit', 100, 1000);
        searchEdit.setText(fullFlightNo);
        sleep(1000);

        // 点击搜索
        APP.clickById('search');
        sleep(2000);
    },
    /**
     * 获取票号（根据航班号获取订单，点击进去查看详情，拿到订单号，乘机人名称和票号），用于回填票号
     * @param {string} fullFlightNo // 航班号，根据航班号获取列表
     * @param {string} orderNo // 订单号
     * @returns
     */
    getTicketNo: function (fullFlightNo, orderNo) {
        this.myOrderMenu(fullFlightNo);

        sleep(2000);

        let result = null;
        try {
            // 获取组件
            let container = APP.waitForId('container', 100, 1000);
            while (!container) {
                container = APP.waitForId('container', 100, 1000);
            }
            log(container)
            // 获取滚动组件
            let list = container.findOne(id('list'));
            log(list)
            // 获取订单列表
            let orderItems = list.find(id('order_item')).toArray();
            log('订单数量' + orderItems.length);
            orderItems.forEach((itemEle, itemIndex) => {
                sleep(2000);
                log('索引：' + itemIndex);
                // 点击进入订单详情
                APP.clickArea(itemEle);
                sleep(8000);
                log('点击进入订单详情' + itemIndex);

                // 获取详情信息
                result = this.orderDetail(null, null, orderNo, null);
                if (result && result.orderNo == orderNo) {
                    throw '订单信息获取成功';
                } else {
                    result = null;
                }
            });
        } catch (error) {
            if (error == '订单信息获取成功') {
            }
        }
        sleep(1000);
        let mePage = APP.waitForContainsText("购物车", 100, 1000);
        while (!mePage) {
            back();
            sleep(500);
            mePage = APP.waitForContainsText("购物车", 100, 1000);
        }
        APP.home();
        return result;
    },
    /**
     * 获取订单详情
     * @param {array} passengers // 乘机人（下单完成后获取订单号，需比较乘机人是否和下单的一致）
     * @param {number} payAmount // 支付总金额（下单完成后，比较支付总金额）
     * @param {string} orderNo // 订单号（支付和获取票号需要比较订单号）
     * @param {array} status // 判断是否支付（用于支付）
     * @returns 
     */
    orderDetail: function (passengers, payAmount, orderNo, status, password, phone) {
        log('进入详情');
        sleep(2000);

        let loading = APP.waitForContainsText('重要公告', 100, 2000);
        while (!loading) {
            loading = APP.waitForContainsText('重要公告', 100, 2000);
        }

        log('关闭提示层');
        // 关闭提示层
        APP.closeDialog();

        // 等待订单详情出现
        let orderDetailPage = APP.waitForContainsText('明细', 100, 1000);
        while (!orderDetailPage) {
            orderDetailPage = APP.waitForContainsText('明细', 100, 1000);
        }

        let totalPriceUiObject = orderDetailPage.parent().findOne(className(TEXT_VIEW));
        let totalPrice = totalPriceUiObject.text().substring(2);

        log('等待详情加载完成');

        // 先找到订单号文字
        let orderNoUiObject = APP.waitForContainsText('订单号', 100, 2000);
        while (!orderNoUiObject) {
            orderNoUiObject = APP.waitForContainsText('订单号', 100, 2000);
        }
        // 获取订单号
        let orderNoText = orderNoUiObject.text().substring(4).replace(" ", "");
        log("获取到的订单号：" + orderNoText);
        log('目标订单号：' + orderNo);

        // 如果订单号不为空，需要判断订单号是否是一致，不一致则返回上一页，找下一个订单
        log('订单号是否一致：' + (orderNo && orderNo != orderNoText));
        if (orderNo && orderNo != orderNoText) {
            back();
            return;
        }

        // 找订单状态
        let statusUiObject = orderNoUiObject.parent().findOne(className(TEXT_VIEW));
        // 获取订单状态（已取消、已出票、）
        let statusText = statusUiObject.text();
        log('获取到的状态：' + statusText);
        if (statusText == '订单取消' || statusText == '退款成功') {
            back();
            return;
        }

        if (statusText == '出票中') {
            back();
            throw '当前订单状态为出票中，无法获取票号';
        }

        // 滑动一点距离 
        swipe(_env.screenWidth / 2, 1260, _env.screenWidth / 2, _env.screenHeight / 3, 500);
        sleep(1000);

        // 找到乘机人
        let passengerTextUiObject = APP.waitForContainsText('乘机人', 100, 1000);
        let passengerTextIndex = 0; // 单个乘机人需要用的索引，下一个索引即是乘机人姓名
        let existPassengers = []; // 保存乘机人姓名和票号

        // 查看证件、票号
        let checkCertificateAndTicketNo = APP.waitForContainsText('查看证件', 100, 3000);
        // 说明存在多个乘机人
        try {
            if (checkCertificateAndTicketNo) {
                log('存在查看证件、票号');
                APP.clickArea(checkCertificateAndTicketNo);
                sleep(2000);
                // 多个乘机人
                let scrollViewUiObject = passengerTextUiObject.parent().findOne(className(SCROLL_VIEW));
                if (scrollViewUiObject) {
                    let viewGroupCollection = scrollViewUiObject.find(className(VIEW_GROUP).depth(18)).toArray();
                    log('%s组乘机人', viewGroupCollection.length);
                    viewGroupCollection.forEach(element => {
                        let nameUiObject = element.findOne(className(TEXT_VIEW).depth(19));
                        log('乘机人名字：' + nameUiObject.text());
                        let ticketNoUiObject = element.findOne(textContains('票号'));
                        let ticketNo = '';
                        if (ticketNoUiObject) {
                            ticketNo = ticketNoUiObject.text().substring(3);
                            log('票号：' + ticketNo);
                        }
                        // 判断该乘机人是否是目标乘机人 
                        let targetPassengers = [];
                        if (passengers) {
                            targetPassengers = passengers.filter(p => p == nameUiObject.text());
                            log('存在目标乘机人' + targetPassengers.length > 0);
                            if (targetPassengers.length == 0) {
                                throw '该订单不属于该乘机人'
                            }
                        }
                        // 订单号相同或者乘机人一样则可以保存乘机人名称和票号
                        if (targetPassengers.length > 0 || (orderNo && orderNoText == orderNo)) {
                            existPassengers.push({
                                fullName: nameUiObject.text(),
                                ticketNo: ticketNo,
                            })
                        }
                    });
                }
            } else {
                // 获取乘机人子级文本
                let passengerTextViewChild = passengerTextUiObject.parent().find(className(TEXT_VIEW)).toArray();
                log('获取乘机人子级文本数量：' + passengerTextViewChild.length);
                passengerTextViewChild.forEach((textViewEle, textViewIndex) => {
                    log('文本索引：' + textViewIndex);
                    let eleText = textViewEle.text();
                    if (eleText.indexOf('乘机人') > -1) {
                        passengerTextIndex = textViewIndex + 1;
                        log('乘机人名称索引：' + passengerTextIndex);
                        return;
                    }
                    if (textViewIndex == passengerTextIndex) {
                        let ticketNoUiObject = APP.waitForContainsText('票号', 100, 1000);
                        let ticketNo = '';
                        if (ticketNoUiObject) {
                            ticketNo = ticketNoUiObject.text().substring(3);
                            log("票号：" + ticketNo);
                        }
                        log("乘机人名字：" + eleText);
                        // 判断该乘机人是否是目标乘机人
                        let targetPassengers = [];
                        if (passengers) {
                            targetPassengers = passengers.filter(p => p == eleText);
                            log('存在目标乘机人' + targetPassengers.length > 0);
                            if (targetPassengers.length == 0) {
                                throw '该订单不属于该乘机人'
                            }
                        }
                        // 订单号相同或者乘机人一样则可以保存乘机人名称和票号
                        log('订单号是否相同：%s', (orderNo && orderNoText == orderNo))
                        log(targetPassengers.length > 0 || (orderNo && orderNoText == orderNo));
                        if (targetPassengers.length || (orderNo && orderNoText == orderNo)) {
                            existPassengers.push({
                                fullName: eleText,
                                ticketNo: ticketNo,
                            })
                        }
                    }
                });
            }
        } catch (error) {
            if (error == '该订单不属于该乘机人') {
                back(); // 返回上一页，找下一个订单
                return;
            }
        }

        let orderDetail = {
            orderNo: orderNoText, // 订单号
            passengerOrders: existPassengers, // 乘机人姓名
            payAmount: totalPrice,
            status: statusText,// 状态
            paySuccess: existPassengers.length > 0 && existPassengers[0].ticketNo ? true : false
        }

        log('详情结果：' + JSON.stringify(orderDetail));
        // 如果是支付功能，则需要执行这步骤
        if (status == 'payment' && statusText == '待付款' && (orderNo && orderDetail.orderNo == orderNo)) {
            APP.swipeToTop();
            sleep(1000);
            if (payAmount == totalPrice) {
                let payBtn = APP.waitForContainsText('立即支付', 100, 2000);
                if (payBtn) {
                    APP.clickArea(payBtn);
                    sleep(12000);
                    let paySuccess = this.payment(totalPrice, password, phone);
                    orderDetail.paySuccess = paySuccess;
                    log('支付结果：' + JSON.stringify(orderDetail));
                    return orderDetail;
                }
            }
        }
        // 退出详情页
        back();
        return orderDetail;
    },
}