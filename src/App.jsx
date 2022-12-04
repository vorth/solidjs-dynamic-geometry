import styles from './App.module.css';

import { createSignal, createEffect, Switch } from "solid-js";
import { createStore } from "solid-js/store";

const [ height, setHeight ] = createSignal( 500 );

const GET = 0;
const SET = 1;

// This simulates a saved JSON file, as might be created during an earlier editing session.
const data = {
  A: { type: 'point', at: [50,50], offset: 20, color: 'red' },
  B: { type: 'point', at: [200,40], offset: 30, color: 'blue' },
  C: { type: 'linesegment', start: 'A', end: 'B', color: 'purple' },
  D: { type: 'perpendicular', point: 'B', line: 'C' },
}

const Point = props =>
{
  const x = () => props.at[0];
  const y = () => props.at[1];
  const onClick = () => {
    // This is a quick-and-dirty alternative to dragging, which is a lot harder
    props.setter( { at: [ x() + props.offset, y() + props.offset ] } );
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
  const stores = {}
  for ( const name in data ) {
    const spec = data[ name ];
    switch ( spec.type )
    {
      case 'point':
        stores[ name ] = createStore( spec );
        break;
    
      case 'linesegment': {
        const { start, end, type, color } = spec; // start & end here are just names
        const [ store, setStore ] = createStore( {} );
        createEffect( () => {
          setStore( { type, color, start: stores[ start ][ GET ] .at, end: stores[ end ][ GET ] .at } )
        });
        stores[ name ] = [ store ]; // don't need the setter; the effect will handle all updates
        break;
      }
    
      default:
        break;
    }
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>

        <svg version="1.1"
            width="800" height={height()}
            xmlns="http://www.w3.org/2000/svg">

          <rect width="100%" height="100%" fill="lightgrey" />

          {/* Order is reversed so the points will be on top, for better click/drag */}
          <For each={Object.entries( stores ) .reverse()}>{ ( [ name, store ] ) =>
            <Switch>
              <Match when={store[ GET ].type === 'point'}>
                <Point at={store[ GET ] .at} offset={store[ GET ] .offset} color={store[ GET ] .color} setter={store[ SET ]} />
              </Match>
              <Match when={store[ GET ].type === 'linesegment'}>
                <Line start={store[ GET ] .start} end={store[ GET ] .end} color={store[ GET ] .color} />
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
