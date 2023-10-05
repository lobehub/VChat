import fs from 'fs';
import path from 'path';
import { simpleGit } from 'simple-git';

export default async function handler(req, res) {
  const { url } = req.body;
  const git = simpleGit();

  const agentsDir = path.join(process.cwd(), '/public/agents');

  const agentDirName = url.split('/').pop().replace('.git', '');

  const agentDir = path.join(agentsDir, agentDirName);
  if (fs.existsSync(agentDir)) {
    res.status(200).json({ success: false, errorMessage: '角色文件夹已存在' });
  }

  try {
    await git.clone(url, agentDir);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: false, errorMessage: '下载失败' });
  }
}
