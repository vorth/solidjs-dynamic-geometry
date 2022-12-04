import styles from './App.module.css';

import { createSignal, Switch } from "solid-js";
import { createStore } from 'solid-js/store'
import { DraggablePoint } from './geometry/DraggablePoint';
import { LineSegment } from './geometry/LineSegment';
import { PerpendicularLine } from './geometry/PerpendicularLine';

const [ height, setHeight ] = createSignal( 500 ); // Not using the setter yet

// This simulates a saved JSON file, as might be created during an earlier editing session.
const loadedData = {
  A: { type: 'point', at: [50,50], offset: 20, color: 'red' },
  B: { type: 'point', at: [200,40], offset: 30, color: 'blue' },
  C: { type: 'linesegment', start: 'A', end: 'B', color: 'purple' },
  D: { type: 'perpendicular', point: 'B', line: 'C', color: 'orange' },
}
const [ recipe, setRecipe ] = createStore( loadedData ); // Not using the setter yet

const dictionary = {};  // will hold all the signal / memo getters

const App = () =>
{
  return (
    <div class={styles.App}>
      <header class={styles.header}>

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="800" height={height()}>

          <rect width="100%" height="100%" fill="lightgrey" />

          <For each={Object.entries( recipe )}>{ ( [ name, spec ] ) =>
            <Switch>
              <Match when={spec.type === 'point'}>
                <DraggablePoint name={name} {...spec} dictionary={dictionary} />
              </Match>
              <Match when={spec.type === 'linesegment'}>
                <LineSegment name={name} {...spec} dictionary={dictionary} />
              </Match>
              <Match when={spec.type === 'perpendicular'}>
                <PerpendicularLine name={name} {...spec} dictionary={dictionary} />
              </Match>
            </Switch>
          }
          </For>

        </svg>

        <p>
          Click on the dots to make them move, and the lines will follow.
        </p>
      </header>
    </div>
  );
}

export default App;
