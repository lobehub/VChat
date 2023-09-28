/**
 * 请求 Dance 列表
 */
export const getDanceList = async () => {
  const res = await fetch('/api/dance');

  return res.json();
};
