import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { agentId } = req.query;

  if (!agentId || Array.isArray(agentId)) {
    res.status(200).json({ success: false, errorMessage: '请指定目录名' });
    return;
  }

  const agentsDir = path.join(process.cwd(), '/public/agents');
  const agentDir = path.join(agentsDir, agentId);

  if (!fs.existsSync(agentDir)) {
    res.status(200).json({ success: false, errorMessage: '指定目录不存在' });
    return;
  }

  try {
    await fs.rmdirSync(agentDir, { recursive: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: false, errorMessage: '删除失败' });
  }
}
