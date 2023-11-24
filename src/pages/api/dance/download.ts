import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { simpleGit } from 'simple-git';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body;
  const git = simpleGit();

  const dancesDir = path.join(process.cwd(), '/public/dances');
  if (!fs.existsSync(dancesDir)) {
    fs.mkdirSync(dancesDir);
  }

  const danceDirName = url.split('/').pop().replace('.git', '');

  const danceDir = path.join(dancesDir, danceDirName);

  if (fs.existsSync(danceDir)) {
    res.status(200).json({ success: false, errorMessage: '舞蹈文件夹已存在' });
  }

  try {
    await git.clone(url, danceDir, {
      '--depth': 1,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: false, errorMessage: '下载失败' });
  }
}
