# 使用方式

这是一个示例仓库，用于定义 `vidol.chat` 中的人工智能体，目前该智能体的功能比较简单，只需上传如下信息即可：

- 模型文件 model.vrm
- 角色封面 cover.jpg
- 角色头像 avatar.jpg
- 基本的信息 meta.json

这些关于 Agent 的设定基本都可以从 Vroid hub 官网上获取。

## 模型文件获取方式

https://hub.vroid.com/characters/2843975675147313744/models/5644550979324015604

## 角色封面获取方式

尺寸限制为 300 x 400 的倍数效果最佳，格式为 jpg

![](./cover.jpg)

## 角色头像获取方式

尺寸限制为 150 x 150 的倍数效果最佳，格式为 jpg

![](./avatar.jpg)

## 基本信息的定义

```json
{
  "name": "A 模型",
  "description": "A 模型是 Vroid 的示例角色",
  "homepage": "https://hub.vroid.com/characters/2843975675147313744/models/5644550979324015604"
}
```
