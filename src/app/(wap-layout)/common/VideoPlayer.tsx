import React from "react";

interface VideoPlayerProps {
  srcMp4: string;
  srcWebM?: string;
  className?: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  srcMp4,
  srcWebM,
  className,
  poster,
}) => {
  return (
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      preload="auto"
      controlsList="nodownload nofullscreen noremoteplayback mix-blend-screen"
      poster={poster}
    >
      {srcWebM && <source src={srcWebM} type="video/webm" />}
      <source src={srcMp4} type="video/mp4" />
      {/* <track
        src="/videos/example-captions.vt"
        kind="captions"
        srcLang="en"
        label="English"
        default
      /> */}
    </video>
  );
};

export default VideoPlayer;
