export interface Agent {
  /**
   * 角色名
   */
  name: string;
  /**
   * 本地目录
   */
  dirname?: string;
  /**
   * 角色描述
   */
  description: string;
  /**
   * 主页地址，一般为 Vroid Hub 的地址
   */
  homepage: string;
  /**
   * 模型文件路径
   */
  model: string;
  /**
   * 封面图片路径
   */
  cover: string;
  /**
   * 头像图片路径
   */
  avatar: string;
  /**
   * 说明文件
   */
  readme: string;
}

export interface Dance {
  /**
   * 舞蹈名
   */
  name: string;
  /**
   * 本地目录
   */
  dirname?: string;
  /**
   * 舞蹈文件
   */
  src: string;
  /**
   * 音频文件
   */
  audio: string;
  /**
   * 封面图片
   */
  cover: string;
  /**
   * 缩略图
   */
  thumb: string;
  /**
   * 说明文件
   */
  readme: string;
}

export enum TouchAreaEnum {
  Head = 'head',
  Arm = 'arm',
  Leg = 'leg',
  Chest = 'chest',
  Belly = 'belly',
}
