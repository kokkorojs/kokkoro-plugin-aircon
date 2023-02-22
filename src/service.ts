import { Plugin } from '@kokkoro/core';

export class Service {
  constructor(
    /** 插件 */
    private plugin: Plugin,
  ) { }

  /**
   * 获取温度 emoji
   * 
   * @param temperature - 温度
   * @returns emoji
   */
  getEmoji(temperature: number) {
    let emoji = null;

    switch (true) {
      case temperature < 1:
        emoji = '🥶';
        break;
      case temperature < 26:
        emoji = '❄️';
        break;
      case temperature < 40:
        emoji = '☀️';
        break;
      case temperature <= 100:
        emoji = '🥵';
        break;
      case temperature <= 6000:
        emoji = '💀';
        break;
    }
    return emoji;
  }
}
