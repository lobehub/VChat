/**
 * 请求本地 Agent 列表
 */
export const getLocalAgentList = async () => {
  const res = await fetch('/api/agent/list');

  return res.json();
};

/**
 * 删除本地 Agent 目录
 */
export const deleteLocalAgent = async (dirname: string) => {
  const res = await fetch(`/api/agent/${dirname}`, {
    method: 'DELETE',
  });

  return res.json();
};

/**
 * 请求线上 Agent index
 */
export const getAgentIndex = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/v-idol/vidol-chat-agents/main/index.json',
  );

  return res.json();
};

export const downloadGithubAgent = async (url: string) => {
  const res = await fetch('/api/agent/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  return res.json();
};
