'use client';

import { ActionIcon, Header as LobeHeader, Logo } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';

const Header = () => {
  return (
    <LobeHeader
      logo={<Logo extra={'V-idol'} size={36} type={'combine'} />}
      actions={[
        <ActionIcon
          size="large"
          key="github"
          icon={GithubIcon}
          onClick={() => window.open('https://github.com/v-idol/vidol.chat', '_blank')}
        />,
      ]}
    />
  );
};

export default Header;
