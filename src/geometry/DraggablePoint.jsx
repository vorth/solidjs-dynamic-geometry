
import { createSignal } from "solid-js";

import { Point } from "../rendering.jsx";

export const DraggablePoint = props =>
{
  const { name, at, color, offset, dictionary } = props; // we don't care about reactivity here!!!
  const [ point, setPoint ] = createSignal( { at, color, offset } );
  dictionary[ name ] = point;

  const onClick = ( [x,y] ) => {
    // This is a quick-and-dirty alternative to dragging, which is a lot harder
    setPoint( { at: [ x + offset, y + offset ], offset, color } );
    // TODO also update the recipe, for saving
  }

  return <Point {...{ offset, color, onClick }} at={point() .at} />
}