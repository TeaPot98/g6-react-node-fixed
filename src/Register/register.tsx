import React, { ReactElement } from 'react';
import { IGroup, IShape, ModelConfig, ShapeOptions } from '@antv/g6';
import getShapeFromReact, { RawNode } from './getDataFromReactNode';
import getPositionUsingYoga, {
  LayoutedNode,
} from '../Layout/getPositionsUsingYoga';

export const registerNodeReact = (el: ReactElement) => {
  const result = getShapeFromReact(el);

  const target = getPositionUsingYoga(result);

  return target;
};

const renderTarget = (target: LayoutedNode, group: IGroup): IShape | IGroup => {
  let g = group;
  let keyshape: IShape | IGroup = group;
  const { attrs = {}, boundaryBox, type, children, props } = target;
  if (target.type !== 'group') {
    const shape = group.addShape(type, {
      attrs: {
        ...attrs,
        width: attrs.width === 'auto' ? undefined : attrs.width,
        height: attrs.height === 'auto' ? undefined : attrs.height,
      },
      origin: {
        boundaryBox,
        type,
        children,
      },
      ...props,
      name: 'test-unique-name',
    });
    keyshape = shape;
  } else {
    g = group.addGroup(props);
    keyshape = g;
  }

  if (target.children) {
    const keyshapes = target.children
      .map(n => renderTarget(n, g))
      .filter(e => e);
    if (keyshapes.length) {
      // @ts-ignore - we check if it's empty
      keyshape = keyshapes.pop();
    }
  }
  return keyshape;
};

export function createNodeFromReact(Component: React.FC<{ cfg: ModelConfig }>) {
  const structures: { [key: string]: LayoutedNode[] } = {};
  const compileXML = (cfg: ModelConfig) =>
    registerNodeReact(<Component cfg={cfg} />);

  return {
    draw(cfg: ModelConfig, fatherGroup) {
      const resultTarget = compileXML(cfg || {});
      let keyshape = (fatherGroup as unknown) as IShape;
      keyshape = renderTarget(resultTarget, fatherGroup) as IShape;

      structures[String(cfg.id)] = [resultTarget];
      return keyshape;
    },
    update(cfg: ModelConfig, node: any) {
      if (!structures[String(cfg.id)]) {
        structures[String(cfg.id)] = [];
      }
      const resultTarget = compileXML(cfg || {});
      const nodeGroup = node.getContainer();
      const getRealStructure = (target: LayoutedNode): LayoutedNode[] => {
        const { children } = target;
        target.children = [];
        let realChildren: LayoutedNode[] = [];
        for (let i = 0; i < children.length; i += 1) {
          const result = getRealStructure(children[i]);
          realChildren = realChildren.concat(result);
        }
        if (target.type !== 'group') {
          return [target, ...realChildren];
        } else {
          target.children = realChildren;
          return [target];
        }
      };
      const realTarget = getRealStructure(resultTarget);
      const diffTarget = (container: IGroup, shapeArr: LayoutedNode[]) => {
        const childrenList = [...container.getChildren()];

        for (let i = 0; i < childrenList.length; i += 1) {
          const lastShape = childrenList[i];
          const nowShape = shapeArr[i];

          if (!nowShape) {
            container.removeChild(lastShape, true);
          } else if (!lastShape) {
            renderTarget(nowShape, container);
          } else if (lastShape.cfg.type !== nowShape.type) {
            container.removeChild(lastShape, true);
            renderTarget(nowShape, container);
          } else {
            if (nowShape.props) {
              lastShape.cfg = {
                ...lastShape.cfg,
                ...nowShape.props,
              };
            }
            if (nowShape.attrs && lastShape.attr) {
              lastShape.attr(nowShape.attrs);
            }
            if (nowShape.type === 'group') {
              diffTarget(lastShape as IGroup, nowShape.children);
            }
          }
        }
      };

      diffTarget(nodeGroup, realTarget);
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
        [0.5, 1],
        [0.5, 0],
      ];
    },
  } as ShapeOptions;
}
