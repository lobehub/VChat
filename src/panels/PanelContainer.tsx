'use client';

import Panel from '@/components/Panel';
import { configSelectors, useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { PropsWithChildren } from 'react';

interface PanelContainerProps {
  style?: React.CSSProperties;
  className?: string;
  panelKey: PanelKey;
  title?: string;
}

const PanelContainer = (props: PropsWithChildren<PanelContainerProps>) => {
  const { style, className, panelKey, title, children } = props;
  const [panel, setPanel, focusPanel, closePanel] = useConfigStore((s) => [
    s.panel,
    s.setPanel,
    s.focusPanel,
    s.closePanel,
  ]);
  const zIndex = useConfigStore((s) => configSelectors.getPanelZIndex(s, panelKey));

  return (
    <Panel
      style={style}
      className={className}
      zIndex={zIndex}
      onFocus={() => focusPanel(panelKey)}
      coordinates={panel[panelKey].coordinates}
      onCoordinatesChange={(coordinates) => setPanel(panelKey, { coordinates })}
      onClose={() => closePanel(panelKey)}
      title={title}
    >
      {children}
    </Panel>
  );
};

export default PanelContainer;
