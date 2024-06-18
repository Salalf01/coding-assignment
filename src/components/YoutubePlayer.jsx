import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  width="60vw"
  height="60vh"
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;