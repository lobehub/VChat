import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon, Avatar } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Dropdown, List, MenuProps, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { MoreVertical, Trash2 } from 'lucide-react';
import { memo, useRef } from 'react';

const { Text } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
}));

interface SessionListProps {
  filter?: string;
}

const SessionList = (props: SessionListProps) => {
  const { filter } = props;
  const [switchSession] = useSessionStore((s) => [s.switchSession]);
  const [sessionListIds, getAgentById] = useSessionStore((s) => [
    sessionSelectors.sessionListIds(s),
    sessionSelectors.getAgentById(s),
  ]);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));
  const { styles } = useStyles();

  const items: MenuProps['items'] = [
    {
      key: 'delete',
      label: '删除对话',
      icon: <Trash2 />,
      danger: true,
    },
  ];

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionListIds.filter((agentId) => {
        const agent = getAgentById(agentId);
        const { name, description } = agent?.meta || {};
        return !filter || name?.includes(filter) || description?.includes(filter);
      })}
      renderItem={(agentId) => {
        const agent = getAgentById(agentId);
        const { name, description, avatar } = agent?.meta || {};
        const ref = useRef(null);
        const isHovering = useHover(ref);

        return (
          <List.Item
            onClick={() => switchSession(agentId)}
            className={classNames(styles.listItem, {
              [styles.active]: agentId === currentAgent?.agentId,
            })}
            ref={ref}
            style={{ padding: 12 }}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar} size={48} />}
              title={name}
              description={<Text ellipsis>{description}</Text>}
            />
            {isHovering ? (
              <Dropdown
                menu={{
                  items,
                  onClick: ({ domEvent }) => {
                    domEvent.stopPropagation();
                  },
                }}
                trigger={['click']}
              >
                <ActionIcon
                  icon={MoreVertical}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Dropdown>
            ) : null}
          </List.Item>
        );
      }}
    />
  );
};

export default memo(SessionList);
