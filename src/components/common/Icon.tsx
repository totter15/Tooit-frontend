function Icon({
  name,
  alt,
  style,
  className,
}: {
  name: string;
  alt: string;
  style?: any;
  className?: string;
}) {
  return (
    <img
      alt={alt}
      className={`icon ${className ? className : ''}`}
      src={`https://tooit-icon.s3.ap-northeast-2.amazonaws.com/${name}.png`}
      style={style && { ...style }}
    />
  );
}

export default Icon;
