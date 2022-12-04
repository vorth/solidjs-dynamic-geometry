
import { createMemo } from "solid-js";

import { Line } from "../rendering.jsx";

const perpendicular = ( [x, y] ) => [ -y, x ];

export const PerpendicularLine = props =>
{
   // we don't care about props reactivity here!!
  const { point, line, name, color, dictionary } = props; // point & line here are just names

  const segment = createMemo( () => {
    const center = dictionary[ point ]() .at;
    const vector = perpendicular( dictionary[ line ]() .vector );
    const start = [ center[0]-900*vector[0], center[1]-900*vector[1] ];
    const end = [ center[0]+900*vector[0], center[1]+900*vector[1] ];
    return { color, start, end, vector };
  } );
  dictionary[ name ] = segment;

  return <Line color={color} start={segment() .start} end={segment() .end} />
}
