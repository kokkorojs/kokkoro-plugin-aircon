# kokkoro-plugin-aircon

> 群空调，低碳环保无污染，就是没风

## 安装

```shell
# 切换至 bot 目录
cd bot

# 安装 npm 包
npm i kokkoro-plugin-aircon
```

## 配置项

```typescript
interface AirconOption extends Option {
  /** 开关 */
  power: boolean;
  /** 温度 */
  temperature: number;
}
```
