'use client';

import { Header as LobeHeader, Logo } from '@lobehub/ui';

const Header = () => {
  return <LobeHeader logo={<Logo extra={'V-idol'} size={36} type={'combine'} />} />;
};

export default Header;
