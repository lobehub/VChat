import { Footer as LobeFooter, FooterProps } from '@lobehub/ui';

const columns: FooterProps['columns'] = [
  {
    items: [
      {
        description: 'AIGC Components',
        openExternal: true,
        title: '🤯 Lobe UI',
        url: 'https://github.com/lobehub/lobe-ui',
      },
      {
        description: 'Chatbot Client',
        openExternal: true,
        title: '🤯 Lobe Chat',
        url: 'https://github.com/lobehub/lobe-chat',
      },
      {
        description: 'Node Flow Editor',
        openExternal: true,
        title: '🤯 Lobe Flow',
        url: 'https://github.com/lobehub/lobe-flow',
      },
    ],
    title: 'Resources',
  },
  {
    items: [
      {
        description: 'AI Commit CLI',
        openExternal: true,
        title: '💌 Lobe Commit',
        url: 'https://github.com/lobehub/lobe-commit',
      },
      {
        description: 'Lint Config',
        openExternal: true,
        title: '📐 Lobe Lint',
        url: 'https://github.com/lobehub/lobe-lint',
      },
    ],
    title: 'More Products',
  },
];

const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return <LobeFooter bottom={`Copyright © 2023 ~ ${currentYear}`} columns={columns} />;
};

export default Footer;
