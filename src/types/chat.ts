import { LLMRoleType } from './llm';

/**
 * 消息元数据,包括头像,背景色,描述,名称等
 */
export interface MetaData {
  /**
   * 角色头像
   */
  avatar?: string;
  /**
   *  背景色
   */
  backgroundColor?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 名称
   */
  title?: string;
}

/**
 * 消息体定义,与 LobeUI ChatList 组件一致
 */
export interface ChatMessage {
  /**
   * 消息内容
   */
  content: string;
  /**
   * 错误
   */
  error?: any;
  /**
   * 角色
   */
  role: LLMRoleType;
  /**
   * 创建时间
   */
  createAt: number;
  /**
   * 更新时间
   */
  updateAt: number;
  /**
   * 额外信息
   */
  extra?: any;
  /**
   * 元数据
   */
  meta: MetaData;
  /**
   * 消息id
   */
  id: string;
}
