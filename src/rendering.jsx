
export const Point = props =>
{
  const x = () => props.at[0];
  const y = () => props.at[1];
  return <circle cx={x()} cy={y()} r="14" fill={props.color} onClick={() => props.onClick( [ x(), y() ] )} />;
}

export const Line = props =>
{
  const x1 = () => props.start[0];
  const y1 = () => props.start[1];
  const x2 = () => props.end[0];
  const y2 = () => props.end[1];

  return <line x1={x1()} x2={x2()} y1={y1()} y2={y2()} stroke={props.color} stroke-width="5"/>
}
