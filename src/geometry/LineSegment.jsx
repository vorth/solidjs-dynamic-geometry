
import { createMemo } from "solid-js";

import { Line } from "../rendering.jsx";

export const offset = ( v1, v2 ) =>
{
  const [ x1, y1 ] = v1;
  const [ x2, y2 ] = v2;
  return [ x2-x1, y2-y1 ];
}

export const length = ( v ) =>
{
  const [ x, y ] = v;
  return Math.sqrt( x**2 + y**2 );
}

export const normalize = ( v ) =>
{
  const [ x, y ] = v;
  const norm = length( v );
  return [ x/norm, y/norm ];
}

export const LineSegment = props =>
{
  const { name, start, end, color, dictionary } = props; // we don't care about reactivity here (I think)!!!
  const v1 = () => dictionary[ start ]() .at;
  const v2 = () => dictionary[ end ]() .at;
  const vector = () => normalize( offset( v1(), v2() ) );
  const segment = createMemo( () => ({ color, start: v1(), end: v2(), vector: vector() }) );
  dictionary[ name ] = segment;

  return <Line color={color} start={segment() .start} end={segment() .end} />
}
