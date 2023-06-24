import { Footer as LobeFooter, FooterProps } from '@lobehub/ui';

const columns: FooterProps['columns'] = [
  {
    items: [
      {
        description: 'Vidol Ghost',
        openExternal: true,
        title: 'Ghost',
        url: 'https://github.com/v-idol/ghost',
      },
      {
        description: 'Vidol Shell',
        openExternal: true,
        title: 'Shell',
        url: 'https://github.com/v-idol/shell',
      },
    ],
    title: 'Resources',
  },
];

const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return <LobeFooter bottom={`Copyright © 2023 ~ ${currentYear}`} columns={columns} />;
};

export default Footer;
