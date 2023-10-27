import React from 'react';
import { Group, Rect, Text, Circle } from '../src';

const Node = () => {
  return (
    <Group name="node">
      <Circle style={{ r: 40 }}>
        <Rect
          style={{ width: 20, height: 20, marginTop: 10, marginLeft: 10 }}
        />
      </Circle>
      <Text style={{ fill: '#000', fontSize: 16 }}>Text</Text>
      <Circle style={{ r: 10, x: 60, y: 0 }}></Circle>
    </Group>
  );
};
