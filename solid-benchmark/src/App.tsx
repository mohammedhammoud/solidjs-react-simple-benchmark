import { For, Show, createSignal, onMount } from 'solid-js';
import styles from './App.module.css';

const TOTAL_ITEMS_TO_RENDER = 10000;
const IMAGE: string = 'unique'; // 'unique' | 'same' | 'none';

const getImageUrl = (index: number) => {
  switch (IMAGE) {
    case 'unique':
      return `https://picsum.photos/200/200?random=${index}`;
    case 'same':
      return `https://picsum.photos/200/200`;
  }
}

type GalleryItemProps = {
  index: number;
  onRender: () => void;
};

const GalleryItem = ({ index, onRender }: GalleryItemProps) => {
  onMount(() => {
    if (IMAGE === 'none') {
      onRender();
    }
  });

  return (
    <div class={styles["gallery__item"]}>
      {IMAGE !== 'none' ? <img src={getImageUrl(index)} alt="" onLoad={onRender} onError={onRender} /> : null}
    </div>
  );
};

const items = Array.from({ length: TOTAL_ITEMS_TO_RENDER }, (_, i) => i);

type GalleryProps = {
  onRenderedAllItems: () => void;
};

const Gallery = ({ onRenderedAllItems }: GalleryProps) => {
  let renderedRef = 0;

  const onRenderItem = () => {
    renderedRef += 1;
    if (renderedRef === TOTAL_ITEMS_TO_RENDER) {
      onRenderedAllItems();
    }
  };

  return (
    <div class={styles.gallery}>
      <h1>Gallery</h1>
      <div class={styles["gallery__container"]}>
        <For each={items} fallback={<p>Loading...</p>}>
          {(index) => <GalleryItem index={index} onRender={onRenderItem} />}
        </For>
      </div>
    </div>
  );
};


const VideoPlayer = () => {
  const [time, setTime] = createSignal<number>(0);

  return (
    <div class={styles["video-player"]}>
      <span>Time: {time()}</span>
      <video controls autoplay loop muted onTimeUpdate={(e) => setTime((prev) => prev + 1)}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </div >
  );
};

const App = () => {
  const startTime = performance.now();
  const [endTime, setEndTime] = createSignal<number>();

  const onRenderedAllItems = () => {
    setEndTime(performance.now());
  };

  return (
    <div class={styles.App}>
      <Show when={startTime && endTime()} fallback={<p>Rendering...</p>}>
        <p>Rendering {TOTAL_ITEMS_TO_RENDER} items took {(endTime?.()! - startTime) / 1000} seconds</p>
      </Show>
      <Gallery onRenderedAllItems={onRenderedAllItems} />
      <VideoPlayer />
    </div>
  );
};

export default App;
