import PropTypes from 'prop-types';
import Text from '@/ui/Text';
import styles from './StructurePreview.module.css';

export function PreviewLine({ children, textColor = 'secondary', topSpacing = false, strike = false }) {
  return (
    <div className={topSpacing ? styles['preview-line--top'] : undefined}>
      <Text
        variant="caption"
        color={textColor}
        mono
        strikethrough={strike}
      >
        {children}
      </Text>
    </div>
  );
}

PreviewLine.propTypes = {
  children: PropTypes.node,
  textColor: PropTypes.string,
  topSpacing: PropTypes.bool,
  strike: PropTypes.bool,
};

export function PreviewBranch({ children, topSpacing = false }) {
  const className = `${styles['preview-branch']}${topSpacing ? ` ${styles['preview-branch--top']}` : ''}`;
  return <div className={className}>{children}</div>;
}

PreviewBranch.propTypes = {
  children: PropTypes.node,
  topSpacing: PropTypes.bool,
};

export function PreviewArrow({ arrow }) {
  return (
    <Text color="accent">
      {arrow}
    </Text>
  );
}

PreviewArrow.propTypes = {
  arrow: PropTypes.node,
};

export default function StructureTreeNode({ node, icons, resolveToneColor }) {
  if (!node) return null;

  const isFolder = node.kind === 'folder';
  const icon = isFolder ? icons?.folder : icons?.file;
  const textColor = resolveToneColor ? resolveToneColor(node.tone) : 'secondary';

  const line = (
    <PreviewLine
      textColor={textColor}
      topSpacing={node.topSpacing}
      strike={node.strike}
    >
      {icon} {node.label}{isFolder ? '/' : ''}
    </PreviewLine>
  );

  if (!node.children?.length) {
    return line;
  }

  return (
    <>
      {line}
      <PreviewBranch>
        {node.children.map((child, index) => (
          <div key={`${node.label}-${child.label}-${index}`}>
            <StructureTreeNode
              node={child}
              icons={icons}
              resolveToneColor={resolveToneColor}
            />
          </div>
        ))}
      </PreviewBranch>
    </>
  );
}

StructureTreeNode.propTypes = {
  node: PropTypes.object,
  icons: PropTypes.object,
  resolveToneColor: PropTypes.func,
};
