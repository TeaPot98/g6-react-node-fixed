# Text Style

```jsx
import React from 'react';
import G6 from '@antv/g6';
import { Group, Text, createNodeFromReact } from 'g6-react-node-fixed';
import { G6MiniDemo } from '../ReactNode/demo';

const ReactNode = ({ cfg = {} }) => (
  <Group>
    <Text
      style={{
        fontSize: 25,
        fontWeight: 500,
        fill: cfg.color,
        cursor: 'move',
        stroke: '#888',
      }}
      draggable
    >
      Text
    </Text>
  </Group>
);

G6.registerNode('test', createNodeFromReact(ReactNode));

export default () => <G6MiniDemo nodeType="test" count={2} />;
```

<API src="./TextStyle.tsx" ></API>
