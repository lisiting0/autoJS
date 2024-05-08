module.exports = {
  getMonthDays: function (year, month) {
    const monthStartDate = new Date(year, month, 1);
    const monthEndDate = new Date(year, month + 1, 1);
    const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  },

  // 获取当前时间是第几周
  getWeekNum: function (date) {
    const firstDay = new Date(date.getFullYear(), 0, 1); // 本年的第一天,Js月份从0开始记！0就是1月啦。
    let dayWeek = date.getDay(); // 今天周几
    if (dayWeek === 0) {
      dayWeek = 7;
    }
    let startWeek = firstDay.getDay(); // 本年第一天周几
    if (startWeek === 0) {
      startWeek = 7;
    }
    // 第几周
    return Math.floor(
      ((date.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000) +
        startWeek -
        dayWeek) /
        7 +
        1
    );
  },
  // 获取上个月最后一天结束时间
  getLastMonthEndDate: function (date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month === 0) {
      month = 12;
      year = year - 1;
    }
    return new Date(year, month, 0);
  },

  // 获取上个月最后一天结束时间
  getNextMonthEndDate: function (date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 2;
    if (month === 12) {
      month = 1;
      year = year + 1;
    }
    return new Date(year, month, 0);
  },
  // 获取下个月最后一周结束时间
  getLastMonthEndDateWeeks: function (date) {
    return this.getWeekNum(this.getLastMonthEndDate(date));
  },
  // 获取当前月最后一天结束时间
  getCurrentMonthEndDate: function (date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month === 12) {
      month = 1;
      year = year + 1;
    }
    return new Date(year, month, 0);
  },
  getCurrentMonthEndDateWeeks: function (date) {
    return this.getWeekNum(this.getCurrentMonthEndDate(date));
  },
  // 获取在当前月中 1号 是星期几
  getWeekNumInCurrentMonth: function (date) {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return (day + (date.getDate() - 1)) / 7 | 0;
  },
};

