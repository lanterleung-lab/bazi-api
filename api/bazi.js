const { Solar } = require('lunar-javascript');

export default function handler(req, res) {
  const { year, month, day, hour } = req.query;

  if (!year || !month || !day || !hour) {
    return res.status(400).json({ error: '請提供完整的國曆年月日時參數' });
  }

  try {
    const solar = Solar.fromYmdHms(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), 0, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();

    const result = {
      year_pillar: baZi.getYear(),
      month_pillar: baZi.getMonth(),
      day_pillar: baZi.getDay(),
      hour_pillar: baZi.getTime(),
      zodiac: lunar.getYearShengXiao()
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: '發生錯誤', details: error.message });
  }
}