import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const danceList = [];
  const danceDir = path.join(process.cwd(), '/public/dances');
  if (!fs.existsSync(danceDir)) {
    fs.mkdirSync(danceDir);
  }
  const dances = fs.readdirSync(danceDir, { withFileTypes: true });
  for (const dance of dances) {
    const danceMeta = fs.readFileSync(path.join(danceDir, dance.name, 'meta.json'), 'utf8');
    const readme = fs.readFileSync(path.join(danceDir, dance.name, 'readme.txt'), 'utf8');
    const meta = JSON.parse(danceMeta);
    const { src, audio } = meta;
    danceList.push({
      ...meta,
      dirname: dance.name,
      src: `/dances/${dance.name}/${src}`,
      audio: `/dances/${dance.name}/${audio}`,
      cover: `/dances/${dance.name}/cover.jpg`,
      thumb: `/dances/${dance.name}/thumb.jpg`,
      readme,
    });
  }

  res.status(200).json({ data: danceList });
}
