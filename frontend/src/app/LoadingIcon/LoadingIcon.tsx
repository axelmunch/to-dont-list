import styles from './LoadingIcon.module.css';

export default function LoadingIcon(props: {
  size: string;
  color?: string;
  visible?: boolean;
}) {
  const containerStyle = {
    width: props.size,
    height: props.size,
    color: props.color,
  };

  return props.visible ? (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.loader}></div>
    </div>
  ) : null;
}
