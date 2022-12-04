import styles from './App.module.css';

import { createSignal, createMemo, Switch } from "solid-js";

const [ height, setHeight ] = createSignal( 500 );

// This simulates a saved JSON file, as might be created during an earlier editing session.
const data = {
  A: { type: 'point', at: [50,50], offset: 20, color: 'red' },
  B: { type: 'point', at: [200,40], offset: 30, color: 'blue' },
  C: { type: 'linesegment', start: 'A', end: 'B', color: 'purple' },
  D: { type: 'perpendicular', point: 'B', line: 'C', color: 'orange' },
}

const Point = props =>
{
  const x = () => props.at[0];
  const y = () => props.at[1];
  const onClick = () => {
    // This is a quick-and-dirty alternative to dragging, which is a lot harder
    props.setter( { at: [ x() + props.offset, y() + props.offset ], offset: props.offset, color: props.color, type: 'point' } );
  }
  return <circle cx={x()} cy={y()} r="9" fill={props.color} onClick={onClick} />;
}

const Line = props =>
{
  const x1 = () => props.start[0];
  const y1 = () => props.start[1];
  const x2 = () => props.end[0];
  const y2 = () => props.end[1];

  return <line x1={x1()} x2={x2()} y1={y1()} y2={y2()} stroke={props.color} stroke-width="5"/>
}

const App = () =>
{
  // We could render the data directly, but then we would not have a dynamic geometry system,
  //  so we must convert it into a DAG of reactive objects.
  const getters = {}
  const setters = {}
  for ( const name in data ) {
    const spec = data[ name ];
    let getter, setter;
    switch ( spec.type )
    {
      case 'point': {
        [ getter, setter ] = createSignal( spec );
        break;
      }
    
      case 'linesegment': {
        const { start, end, type, color } = spec; // start & end here are just names
        getter = createMemo( () => ({ type, color, start: getters[ start ]() .at, end: getters[ end ]() .at }) );
        break;
      }
    
      case 'perpendicular': {
        const { point, line, color } = spec; // point & line here are just names
        getter = createMemo( () => {
          const { start, end } = getters[ line ]();
          const offset = [ -(end[1]-start[1]), end[0]-start[0] ];
          const newStart = getters[ point ]() .at;
          const newEnd = [ newStart[0]+offset[0], newStart[1]+offset[1] ];
          return { type: 'linesegment', color, start: newStart, end: newEnd };
        } );
        break;
      }
    
      default:
        break;
    }
    getters[ name ] = getter;
    setters[ name ] = setter;
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>

        <svg version="1.1"
            width="800" height={height()}
            xmlns="http://www.w3.org/2000/svg">

          <rect width="100%" height="100%" fill="lightgrey" />

          {/* Order is reversed so the points will be on top, for better click/drag */}
          <For each={Object.entries( getters ) .reverse()}>{ ( [ name, get ] ) =>
            <Switch>
              <Match when={get().type === 'point'}>
                <Point at={get().at} offset={get().offset} color={get().color} setter={setters[ name ]} />
              </Match>
              <Match when={get().type === 'linesegment'}>
                <Line start={get().start} end={get().end} color={get().color} />
              </Match>
            </Switch>
          }
          </For>

        </svg>

        <p>
          Click on the dots to make them move, and the line will follow.
        </p>
      </header>
    </div>
  );
}

export default App;
