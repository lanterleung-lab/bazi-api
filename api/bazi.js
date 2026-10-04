const { Solar } = require('lunar-javascript');

export default function handler(req, res) {
  // 從請求的網址中取得使用者傳入的年月日時
  const { year, month, day, hour } = req.query;

  // 錯誤處理：確保資料都有填寫
  if (!year || !month || !day || !hour) {
    return res.status(400).json({ error: '請提供完整的國曆年月日時參數' });
  }

  try {
    // 將國曆日期轉換為農曆與八字
    const solar = Solar.fromYmdH(parseInt(year), parseInt(month), parseInt(day), parseInt(hour));
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();

    // 整理成整齊的 JSON 格式準備輸出
    const result = {
      year_pillar: baZi.getYear(),   // 年柱
      month_pillar: baZi.getMonth(), // 月柱
      day_pillar: baZi.getDay(),     // 日柱
      hour_pillar: baZi.getTime(),   // 時柱
      zodiac: lunar.getYearShengXiao() // 生肖
    };

    // 成功時回傳 200 狀態碼與算好的資料
    res.status(200).json(result);
  } catch (error) {
    // 發生錯誤時回傳 500 狀態碼
    res.status(500).json({ error: '八字計算發生錯誤，請檢查輸入的日期格式' });
  }
}