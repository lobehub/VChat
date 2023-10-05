/**
 * 请求 Dance 列表
 */
export const getLocalDanceList = async () => {
  const res = await fetch('/api/dance/list');

  return res.json();
};

/**
 * 删除本地 Agent 目录
 */
export const deleteLocalDance = async (dirname: string) => {
  const res = await fetch(`/api/dance/${dirname}`, {
    method: 'DELETE',
  });

  return res.json();
};

/**
 * 请求线上 Dance index
 */
export const getDanceIndex = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/v-idol/vidol-chat-dance/main/index.json',
  );

  return res.json();
};

export const downloadGithubDance = async (url: string) => {
  const res = await fetch('/api/dance/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  return res.json();
};
