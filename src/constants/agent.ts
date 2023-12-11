import { Agent } from '@/types/agent';

export const VIDOL_SAMPLE_AGENT_A: Agent = {
  name: 'A 模型',
  description: 'A 模型是 Vroid 的示例角色',
  homepage: 'https://hub.vroid.com/characters/2843975675147313744/models/5644550979324015604',
  systemRole:
    "请你扮演私人助理的角色，我是主人。请使用幽默可爱而简洁的语气回答我的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和我对话时必须全程用“主人”来称呼我。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。",
  touch: {
    head: [],
    arm: [],
    leg: [],
    chest: [],
    belly: [],
    enabled: false,
  },
  tts: {
    engine: 'edge',
    locale: 'zh-CN',
    voice: 'zh-CN-XiaoxiaoNeural',
    speed: 1.1,
    pitch: 1.25,
  },
  agentId: 'vidol-sample-agent-a',
  model: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/model.vrm',
  cover: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/cover.jpg',
  avatar: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/avatar.jpg',
  readme:
    "AvatarSample_Aは、VRoid Studioに付属されているサンプルモデルの１つです。\r\n良識の範囲内で、本モデルに設定されているVRoid Hubの利用条件に沿って利用することができます。\r\nVRoid Hub連携アプリや、外部サービス等でぜひご活用ください。\r\nなお、本モデルはCC0ライセンスではありません、著作権は放棄はしておりませんので予めご了承ください。\r\n本モデルの利用条件は、以下ヘルプ記事をご覧ください。\r\nvroid.pixiv.help/hc/ja/articles/4402394424089\r\n\r\nAvatarSample_A is one of the sample models included in VRoid Studio.\r\nIt can be used in accordance with its VRoid Hub conditions of use, within reason.\r\nFeel free to use this model in applications linked to VRoid Hub and on external services.\r\nPlease note that this model is not under the CC0 license and its copyright has not been waived.\r\nTo learn more about this model's conditions of use, consult the following Help article.\r\nvroid.pixiv.help/hc/en-us/articles/4402394424089",
};

export const VIDOL_SAMPLE_AGENT_B: Agent = {
  name: 'B 模型',
  description: 'B 模型是 Vroid 的示例角色',
  homepage: 'https://hub.vroid.com/characters/7939147878897061040/models/2292219474373673889',
  systemRole:
    "请你扮演私人助理的角色，我是主人。请使用幽默可爱的语气回答我的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和我对话时必须全程用“主人”来称呼我。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。",
  touch: {
    head: [],
    arm: [],
    leg: [],
    chest: [],
    belly: [],
    enabled: false,
  },
  tts: {
    engine: 'edge',
    locale: 'zh-CN',
    voice: 'zh-CN-XiaoxiaoNeural',
    speed: 1,
    pitch: 1,
  },
  agentId: 'vidol-sample-agent-b',
  model: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-b/1.0.0/files/model.vrm',
  cover: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-b/1.0.0/files/cover.png',
  avatar: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-b/1.0.0/files/avatar.webp',
  readme: `AvatarSample_B
    AvatarSample_Bは、VRoid Studioに付属されているサンプルモデルの１つです。
    良識の範囲内で、本モデルに設定されているVRoid Hubの利用条件に沿って利用することができます。
    VRoid Hub連携アプリや、外部サービス等でぜひご活用ください。
    なお、本モデルはCC0ライセンスではありません、著作権は放棄はしておりませんので予めご了承ください。
    本モデルの利用条件は、以下ヘルプ記事をご覧ください。
    vroid.pixiv.help/hc/ja/articles/4402394424089
    
    AvatarSample_B is one of the sample models included in VRoid Studio.
    It can be used in accordance with its VRoid Hub conditions of use, within reason.
    Feel free to use this model in applications linked to VRoid Hub and on external services.
    Please note that this model is not under the CC0 license and its copyright has not been waived.
    To learn more about this model's conditions of use, consult the following Help article.
    vroid.pixiv.help/hc/en-us/articles/4402394424089`,
};

export const VIDOL_SAMPLE_AGENT_C: Agent = {
  name: 'C 模型',
  description: 'C 模型是 Vroid 的示例角色',
  homepage: 'https://hub.vroid.com/characters/1248981995540129234/models/8640547963669442173',
  systemRole:
    "请你扮演私人助理的角色，我是主人。请模拟动画《黑执事》中管家的语气回答我的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和我对话时必须全程用“主人”来称呼我。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。",
  touch: {
    head: [],
    arm: [],
    leg: [],
    chest: [],
    belly: [],
    enabled: false,
  },
  tts: {
    engine: 'edge',
    locale: 'zh-CN',
    voice: 'zh-CN-YunxiNeural',
    speed: 1,
    pitch: 1,
  },
  agentId: 'vidol-sample-agent-c',
  model: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-c/1.0.0/files/model.vrm',
  cover: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-c/1.0.0/files/cover.png',
  avatar: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-c/1.0.0/files/avatar.webp',
  readme: `AvatarSample_Cは、VRoid Studioに付属されているサンプルモデルの１つです。
  良識の範囲内で、本モデルに設定されているVRoid Hubの利用条件に沿って利用することができます。
  VRoid Hub連携アプリや、外部サービス等でぜひご活用ください。
  なお、本モデルはCC0ライセンスではありません、著作権は放棄はしておりませんので予めご了承ください。
  本モデルの利用条件は、以下ヘルプ記事をご覧ください。
  vroid.pixiv.help/hc/ja/articles/4402394424089
  
  AvatarSample_C is one of the sample models included in VRoid Studio.
  It can be used in accordance with its VRoid Hub conditions of use, within reason.
  Feel free to use this model in applications linked to VRoid Hub and on external services.
  Please note that this model is not under the CC0 license and its copyright has not been waived.
  To learn more about this model's conditions of use, consult the following Help article.
  vroid.pixiv.help/hc/en-us/articles/4402394424089`,
};

export const DEFAULT_AGENTS = [VIDOL_SAMPLE_AGENT_A, VIDOL_SAMPLE_AGENT_B, VIDOL_SAMPLE_AGENT_C];
