import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

const TOTAL_ITEMS_TO_RENDER = 10000;

type GalleryItemProps = {
  index: number;
  onRender: () => void;
};

const GalleryItem = ({ index, onRender }: GalleryItemProps) => {
  const [url, setUrl] = useState<string>();

  // test after image loading

  useEffect(() => {
    const image = new Image();
    image.src = `https://picsum.photos/200/200?random=${index}`;
    // image.src = `https://picsum.photos/200/200`;
    image.onload = () => {
      setUrl(image.src);
      onRender();
    }
    image.onerror = onRender;
  }, [index, onRender]);

  // // test directly after mounting
  // useEffect(() => {
  //   onRender();
  // }, [onRender]);

  return (
    <div className="gallery__item">
      <img src={url} alt="" />
    </div>
  );
};

type GalleryProps = {
  onRenderedAllItems: () => void;
};

const Gallery = ({ onRenderedAllItems }: GalleryProps) => {
  const renderedRef = useRef(0);

  const onRenderItem = useCallback(() => {
    renderedRef.current += 1;
    if (renderedRef.current === TOTAL_ITEMS_TO_RENDER) {
      onRenderedAllItems();
    }
  }, [onRenderedAllItems])

  return (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="gallery__container">
        {Array.from({ length: TOTAL_ITEMS_TO_RENDER }, (_, i) => i).map((index) => (
          <GalleryItem key={index} index={index} onRender={onRenderItem} />
        ))}
      </div>
    </div>
  );
};

const VideoPlayer = () => {
  const [time, setTime] = useState<number>(0);

  return (
    <div className="video-player">
      <span>Time: {time}</span>
      <video controls autoPlay loop muted onTimeUpdate={(e) => setTime(time + 1)}>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>
    </div >
  );
};

function App() {
  const [startTime] = useState<number>(performance.now());
  const [endTime, setEndTime] = useState<number>();


  const onRenderedAllItems = useCallback(() => {
    setEndTime(performance.now());
  }, []);

  return (
    <div className="App">
      {!endTime ? <p>Loading...</p> : startTime ? <p>Rendering {TOTAL_ITEMS_TO_RENDER} items took {(endTime - startTime) / 1000} seconds</p> : null}
      <Gallery onRenderedAllItems={onRenderedAllItems} />
      <VideoPlayer />
    </div>
  );
}

export default App;
