import { Aside, MediaQuery } from '@mantine/core';

import { AsideItem } from './AsideItem';

export const AppAside = () => {
  return (
    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
      <Aside py='md' width={{ xs: 64, md: 200 }}>
        <AsideItem name='Test' />
        <AsideItem name='Test' />
        <AsideItem name='Test' />
      </Aside>
    </MediaQuery>
  );
};
