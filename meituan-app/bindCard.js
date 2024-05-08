var APP = null;
var ENV = null;

module.exports = {
    setEnv: function (env) {
        ENV = env;
        DateWidth = ENV.screenWidth / 7;
    },
    init: function (a) {
        APP = a;
    },
    /**
     * 充值
     * @param {object} input
     * @returns 
     */
    bind: function (input) {
        // 跳转到我的钱包页面
        APP.toMEITUANCardPage();

        let bindResult = [];
        // 绑定N张卡
        input.meiTuanRechargeCards.forEach(element => {
            sleep(1000);
            // 卡号卡密绑定
            let cardBindObject = APP.waitForContainsText('卡号卡密绑定', 100, 2000);
            if (cardBindObject) {
                if (ENV.debugMode) {
                    log('找到“卡号卡密绑定”');
                }
                while (!cardBindObject.click()) {
                    sleep(10);
                }
                if (ENV.debugMode) {
                    log('点击“卡号卡密绑定”');
                }
                sleep(3000);
            }

            // 身份验证页面
            let verificatePage = APP.waitForContainsText('身份验证', 100, 2000);
            while (!verificatePage) {
                verificatePage = APP.waitForContainsText('身份验证', 100, 2000);
            }
            let splitPwd = input.createOrderAccountInfo.password.split('');
            let appUiObject = APP.waitForId('app', 100, 3000);
            if (appUiObject) {
                if (ENV.debugMode) {
                    log('找到ID为app');
                    log(appUiObject)
                }
                let keyboardUiObject = appUiObject.findOne(className('android.view.View').clickable(true));
                log(keyboardUiObject)
                while (!keyboardUiObject) {
                    log(keyboardUiObject)
                    keyboardUiObject = appUiObject.findOne(className('android.view.View').clickable(true));
                }
                if (keyboardUiObject) {
                    if (ENV.debugMode) {
                        log('准备输入支付密码');
                        log(keyboardUiObject)
                    }
                    for (let index = 0; index < splitPwd.length; index++) {
                        let element = splitPwd[index];
                        let num = keyboardUiObject.findOne(textContains(element));
                        APP.clickArea(num);
                        sleep(200);
                    }
                    sleep(5000);
                }
            }

            // 绑定美团卡页面
            let bindMTCardUiObject = APP.waitForIdText('tv_titans_title_content', '绑定美团卡', 100, 2000);
            while (!bindMTCardUiObject) {
                bindMTCardUiObject = APP.waitForIdText('tv_titans_title_content', '绑定美团卡', 100, 2000);
            }
            // 输入卡号
            const cardBlockUiObject = APP.waitForContainsText('卡号', 100, 2000);
            if (cardBlockUiObject) {
                const cardEditTextUiObject = cardBlockUiObject.parent().children().findOne(className('android.widget.EditText'));
                if (cardEditTextUiObject) {
                    cardEditTextUiObject.click();
                    sleep(500);
                    cardEditTextUiObject.setText(element.cardNo);
                    sleep(500);
                }
            }
            // 输入密码
            const passwordBlockUiObject = APP.waitForContainsText('密码', 100, 2000);
            if (passwordBlockUiObject) {
                const passwordEditTextUiObject = passwordBlockUiObject.parent().children().findOne(className('android.widget.EditText'));
                if (passwordEditTextUiObject) {
                    passwordEditTextUiObject.click();
                    sleep(500);
                    passwordEditTextUiObject.setText(element.password);
                    sleep(500);
                }
            }

            APP.clickByText('确认绑卡');
            sleep(2500);

            const bindSuccess = APP.waitForContainsText('绑定成功', 100, 3000);
            if (bindSuccess) {
                if (ENV.debugMode) {
                    log(element.cardNo + '绑定成功');
                }
                APP.clickByText('我知道了', 100, 1000);
                sleep(1000);
                bindResult.push({
                    cardNo: element.cardNo,
                    result: '绑定成功'
                });
            } else {
                let bindCardError = APP.waitForContainsText('您历史绑定美团卡总额已达到', 100, 1000);
                if (bindCardError) {
                    let closeBtn = bindCardError.parent().parent().findOne(className('android.view.View').depth(14));
                    APP.clickArea(closeBtn);
                    sleep(800);
                    // 返回
                    APP.clickById('button_ll');
                    throw '您历史绑定美团卡总额已达到1000元，根据国家规定，需要进行实名验证才能绑定新的美团卡';
                }

                // 如果还停留在绑定美团卡页面，点击确认绑卡N次，超过N次说明绑定失败
                let bindCardPage = APP.waitForIdText('tv_titans_title_content', '绑定美团卡', 100, 1000);
                let bindCount = 0;
                while (bindCardPage && bindCount < 2) {
                    sleep(10000); // 重复点击，美团规定等待30秒
                    APP.clickByText('确认绑卡');
                    bindCount++;
                    bindCardPage = APP.waitForIdText('tv_titans_title_content', '绑定美团卡', 100, 1000);
                    // 隐藏键盘
                    APP.closeKeyboard();
                }
                if (bindCount == 2) {
                    if (ENV.debugMode) {
                        log(element.cardNo + '绑定失败');
                    }
                    bindResult.push({
                        cardNo: element.cardNo,
                        result: '绑定失败'
                    });
                    sleep(5000);
                    // 返回
                    APP.clickById('button_ll');
                }
            }
        });
        log(JSON.stringify(bindResult));
        return bindResult;
    },
}