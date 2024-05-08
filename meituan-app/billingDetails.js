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
     * 美团卡详情
     * @param {object} input
     * @returns 
     */
    detail: function (beginTime) {
        log('结束时间' + beginTime);
        // 跳转到我的钱包页面
        APP.toMEITUANCardPage();

        // 美团卡明细
        const detailUiObject = APP.waitForId('button_rr', 100, 2000);
        if (detailUiObject) {
            if (ENV.debugMode) {
                log('找到“查看明细”');
            }
            APP.clickArea(detailUiObject);
            sleep(1000);
        }

        let detailResult = this.detailPagination(beginTime);
        return detailResult;
    },
    /**
     * 美团卡明细页面分页
     */
    detailPagination(beginTime) {
        let detailResult = [];
        // 存在乘机人滚动块
        let lastCreateTime = '';
        let currentCreateTime;

        function nextPage(detailContainerUiObjectN) {
            let scrollable = detailContainerUiObjectN.findOne(className('android.view.View').depth(17));
            scrollable.scrollForward()
            sleep(500);
            log('滑动一页');
        }

        // 滚动回顶部 
        function scrollTop() {
            let detailBlockUiObjectT = APP.waitForId('app', 100, 1000);
            let classTypeUiObjectT = detailBlockUiObjectT.findOne(className('android.widget.ListView').depth(16));
            while (!classTypeUiObjectT) {
                classTypeUiObjectT = detailBlockUiObjectT.findOne(className('android.widget.ListView').depth(16));
            }
            log(classTypeUiObjectT);
            let detailContainerUiObjectT = classTypeUiObjectT.parent().findOne(className('android.view.View').depth(16));
            log(detailContainerUiObjectT);
            let scrollTop = detailContainerUiObjectT.findOne(className('android.view.View').depth(17));
            log('准备回滚到顶部');
            while (scrollTop.scrollBackward()) {
                scrollTop.scrollBackward();
                sleep(200);
            }
        }

        // 美团卡明细页面
        const MEITUANCardPage = APP.waitForContainsText('美团卡明细', 100, 2000);
        if (MEITUANCardPage) {
            let moreTip = APP.waitForContainsText('没有更多了', 100, 1000)
            while (!moreTip) {
                moreTip = APP.waitForContainsText('没有更多了', 100, 1000);
                let detailBlockUiObject = APP.waitForId('app', 100, 1000);
                let classTypeUiObject = detailBlockUiObject.findOne(className('android.widget.ListView').depth(16));
                let detailContainerUiObject = classTypeUiObject.parent().findOne(className('android.view.View').depth(16));
                nextPage(detailContainerUiObject);
                moreTip = APP.waitForContainsText('没有更多了', 100, 2000);
                log('没有更多了' + moreTip);
            }

            scrollTop();

            let detailBlockUiObject2 = APP.waitForId('app', 100, 1000);
            let classTypeUiObject2 = detailBlockUiObject2.findOne(className('android.widget.ListView').depth(16));
            if (ENV.debugMode) {
                log('找到“tab菜单”');
            }
            let detailContainerUiObject2 = classTypeUiObject2.parent().findOne(className('android.view.View').depth(16));
            let scrollableUiObject2 = detailContainerUiObject2.findOne(className('android.view.View').depth(17));

            // 获取所有时间
            let createTimeCollection = scrollableUiObject2.find(className('android.widget.TextView').depth(20)).toArray();
            if (ENV.debugMode) {
                log('有%s组可点击数据', createTimeCollection.length);
            }

            let createTimeArr = [];
            createTimeCollection.forEach((createTimeEle) => {
                createTimeArr.push(createTimeEle.text());
            })

            if (lastCreateTime == '') {
                lastCreateTime = createTimeArr[createTimeCollection.length - 1];
                if (ENV.debugMode) {
                    log('最后一个时间：%s', createTimeArr[createTimeCollection.length - 1]);
                }
            }

            try {
                while (lastCreateTime != currentCreateTime) {
                    sleep(2000);
                    log(lastCreateTime + '!=' + currentCreateTime);
                    createTimeArr.forEach((time, clickIndex) => {
                        currentCreateTime = time;
                        if (beginTime && beginTime == time) {
                            throw '查询结束';
                        }
                        let hasCreateTimeData = detailResult.filter(r => r.createTime == currentCreateTime);
                        log(hasCreateTimeData);
                        if (hasCreateTimeData.length == 0) {
                            log('点击%s的数据', currentCreateTime);
                            if (ENV.debugMode) {
                                log('点击单个明细块');
                            }
                            // 点击单个详情
                            APP.clickByText(time);
                            sleep(2000);

                            // 获取详细信息
                            const detailInfoUiObject = APP.waitForId('app');
                            const detailInfoCollection = detailInfoUiObject.find(className('android.view.View').depth(14)).toArray();
                            if (detailInfoCollection) {
                                if (ENV.debugMode) {
                                    log('获取到明细块的详细信息');
                                }
                                // 获取每条详情的内容
                                let money, type, createTime, serialNumber, remark;
                                detailInfoCollection.forEach((infoEle, infoIndex) => {
                                    switch (infoIndex) {
                                        case 0:
                                            money = infoEle.child(0).child(1).text();
                                            break;
                                        case 1:
                                            type = infoEle.child(1).text();
                                            break;
                                        case 2:
                                            createTime = infoEle.child(1).text();
                                            break;
                                        case 3:
                                            serialNumber = infoEle.child(1).text();
                                            break;
                                        default:
                                            remark = infoEle.child(1).text();
                                            detailResult.push({
                                                money: money,
                                                type: type,
                                                createTime: createTime,
                                                serialNumber: serialNumber,
                                                remark: remark
                                            })
                                            if (ENV.debugMode) {
                                                log('获取完信息后,点击返回到明细列表');
                                            }
                                            // 返回按钮 
                                            APP.clickById('button_ll');
                                            sleep(1000);
                                            break;
                                    }
                                });
                                const surplus = Math.floor(clickIndex / 10); //取余
                                if (surplus) {
                                    for (let index = 0; index < surplus; index++) {
                                        // 滑动一组数据
                                        // swipe(_env.screenWidth / 2, (1260 + 143), _env.screenWidth / 2, 1260, 500);
                                        // sleep(300);
                                        swipe(_env.screenWidth / 2, 1260, _env.screenWidth / 2, 1260 / 9, 500);
                                        sleep(300);
                                    }
                                }
                            }
                        } else {
                            return;
                        }
                    })
                }
            } catch (error) {
                log(error);
            }

            if (lastCreateTime == currentCreateTime) {
                // 返回按钮 
                APP.clickById('button_ll');
                sleep(1000);
                // 返回按钮 
                APP.clickById('button_ll');
                sleep(1000);
                back();
                sleep(1000);
                APP.home();
            }
        }
        log(JSON.stringify(detailResult))
        return detailResult;
    }
}