/**
 * 请求 Agent 列表
 */
export const getAgentList = async () => {
  const res = await fetch('/api/agent');

  return res.json();
};
