import { createSignal, onMount } from 'solid-js';
import styles from './App.module.css';

const TOTAL_ITEMS_TO_RENDER = 10000;

type GalleryItemProps = {
  index: number;
  onRender: () => void;
};

const GalleryItem = ({ index, onRender }: GalleryItemProps) => {
  const [url, setUrl] = createSignal<string>();

  // test after image loading

  onMount(() => {
    const image = new Image();
    image.src = `https://picsum.photos/200/200?random=${index}`;
    // image.src = `https://picsum.photos/200/200`;
    image.onload = () => {
      setUrl(image.src)
      onRender();
    };
    image.onerror = onRender;
  });

  // // test directly after mounting
  // onMount(() => {
  //   onRender();
  // });

  return (
    <div class={styles["gallery__item"]}>
      <img src={url()} alt="" />
    </div>
  );
};

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
        {Array.from({ length: TOTAL_ITEMS_TO_RENDER }, (_, i) => i).map((index) => (
          <GalleryItem index={index} onRender={onRenderItem} />
        ))}
      </div>
    </div>
  );
};


const VideoPlayer = () => {
  const [time, setTime] = createSignal<number>(0);

  return (
    <div class={styles["video-player"]}>
      <span>Time: {time()}</span>
      <video controls autoplay loop muted onTimeUpdate={(e) => setTime(time() + 1)}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </div >
  );
};

const App = () => {
  const [startTime, setStartTime] = createSignal<number>(performance.now());
  const [endTime, setEndTime] = createSignal<number>();

  const onRenderedAllItems = () => {
    setEndTime(performance.now());
  };

  return (
    <div class={styles.App}>
      {!endTime() ? <p>Loading...</p> : startTime() ? <p>Rendering {TOTAL_ITEMS_TO_RENDER} items took {(endTime?.()! - startTime?.()!) / 1000} seconds</p> : null}
      <Gallery onRenderedAllItems={onRenderedAllItems} />
      <VideoPlayer />
    </div>
  );
};

export default App;
