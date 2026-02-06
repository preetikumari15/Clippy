import React, { useEffect } from 'react'
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from 'remotion'

const RemotionVideo = ({ imageList = [], audioFileUrl, setDurationInFrame }) => {
  const { fps } = useVideoConfig();

  const duration = imageList.length > 0 ? imageList.length * 60 : 60;

  useEffect(() => {
    setDurationInFrame(duration);
  }, [duration]);

  return (
    <AbsoluteFill className='bg-black'>

      {imageList.length > 0 &&
        imageList.map((item, index) => (
          <Sequence key={index} from={index * 60} durationInFrames={60}>
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Sequence>
        ))
      }

      {audioFileUrl && <Audio src={audioFileUrl} />}

    </AbsoluteFill>
  );
};

export default RemotionVideo;
