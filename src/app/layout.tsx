import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import Layout from '@/layout';

const RootLayout = ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr
  const cookieStore = cookies();
  const appearance = cookieStore.get(VIDOL_THEME_APPEARANCE);

  return (
    <html lang="cn" suppressHydrationWarning>
      <body>
        <Layout defaultAppearance={appearance?.value}>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: 'Vidol.Chat',
};
