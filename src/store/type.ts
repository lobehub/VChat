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
}

export interface Dance {
  name: string;
  src: string;
  audio: string;
  cover: string;
  thumb: string;
  readme: string;
}
