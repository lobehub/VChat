import fs from 'fs';
import path from 'path';
import { simpleGit } from 'simple-git';

export default function handler(req, res) {
  const { url } = req.body;
  const git = simpleGit();

  const agentsDir = path.join(process.cwd(), '/public/agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir);
  }
  try {
    git.clone(url, agentsDir);
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(200).json({});
  }
}
