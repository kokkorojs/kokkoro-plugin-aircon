"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kokkoro_1 = require("kokkoro");
const option = {
    apply: true,
    lock: false,
    power: false,
    temperature: 24,
};
const { version } = require('../package.json');
const plugin = new kokkoro_1.Plugin('aircon', option);
plugin
    .version(version);
plugin
    .command('open', 'group')
    .description('开空调')
    .sugar(/^(开|打开|启动)空调$/)
    .action(async (ctx) => {
    const { option } = ctx;
    const { power, temperature } = option;
    if (power) {
        await ctx.reply('空调开着呢！');
        return;
    }
    const emoji = getEmoji(temperature);
    await ctx.revise('power', true);
    await ctx.reply(`哔~\n${emoji} 当前温度 ${temperature} ℃`);
});
plugin
    .command('close', 'group')
    .description('关空调')
    .sugar(/^(关|关上|关闭)空调$/)
    .action(async (ctx) => {
    const { option } = ctx;
    const { power, temperature } = option;
    if (!power) {
        await ctx.reply('空调关着呢！');
        return;
    }
    await ctx.revise('power', false);
    await ctx.reply(`哔~\n💤 当前温度 ${temperature}℃`);
});
plugin
    .command('attemper <temperature>', 'group')
    .description('调节温度')
    .sugar(/^设置温度\s?(?<temperature>-?[1-9]\d*|0)$/)
    .action(async (ctx) => {
    const { query, option } = ctx;
    const { power } = option;
    const { temperature } = query;
    if (!power) {
        await ctx.reply('你空调没开！');
        return;
    }
    switch (true) {
        case temperature == option.temperature:
            await ctx.reply(`当前已设置 ${temperature}℃`);
            break;
        case temperature == 114514:
            await ctx.reply('这空调怎么这么臭（恼）');
            break;
        case temperature > 6000:
            await ctx.reply('温度最高不能超过 6000℃ 哦');
            break;
        case temperature < -273:
            await ctx.reply('温度最少不能低于 -273℃ 哦');
            break;
        default:
            const emoji = getEmoji(temperature);
            await ctx.revise('temperature', temperature);
            await ctx.reply(`哔~\n${emoji} 当前温度 ${temperature}℃`);
            break;
    }
});
plugin
    .command('state', 'group')
    .description('查看温度')
    .sugar(/^(群|当前|查看)温度$/)
    .action(async (ctx) => {
    const { option } = ctx;
    const { power, temperature } = option;
    if (!power) {
        await ctx.reply('空调关着呢！');
        return;
    }
    const emoji = getEmoji(temperature);
    await ctx.reply(`${emoji} 当前温度 ${temperature}℃`);
});
function getEmoji(temperature) {
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
