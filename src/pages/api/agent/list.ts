import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
//查找个人与商业使用的角色列表 https://hub.vroid.com/models?is_other_users_available=1&personal_commercial_use=profit

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const agentList = [];
  const agentsDir = path.join(process.cwd(), '/public/agents');
  if (!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir);
  }
  const agents = fs.readdirSync(agentsDir, { withFileTypes: true });
  for (const agent of agents) {
    const agentMeta = fs.readFileSync(path.join(agentsDir, agent.name, 'meta.json'), 'utf8');
    agentList.push({
      ...JSON.parse(agentMeta),
      dirname: agent.name,
      model: `/agents/${agent.name}/model.vrm`,
      cover: `/agents/${agent.name}/cover.jpg`,
      avatar: `/agents/${agent.name}/avatar.jpg`,
    });
  }

  res.status(200).json({ data: agentList });
}
