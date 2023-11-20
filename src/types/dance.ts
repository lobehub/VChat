export interface Dance {
  /**
   * 舞蹈名
   */
  name: string;
  /**
   * 本地目录
   */
  agentId?: string;
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
