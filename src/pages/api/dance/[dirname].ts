import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dirname } = req.query;

  if (!dirname || Array.isArray(dirname)) {
    res.status(200).json({ success: false, errorMessage: '请指定目录名' });
    return;
  }

  const dancesDir = path.join(process.cwd(), '/public/dances');
  const danceDir = path.join(dancesDir, dirname);

  if (!fs.existsSync(danceDir)) {
    res.status(200).json({ success: false, errorMessage: '指定目录不存在' });
    return;
  }

  try {
    await fs.rmdirSync(danceDir, { recursive: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ success: false, errorMessage: '删除失败' });
  }
}
