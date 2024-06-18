import YoutubePlayer from './YoutubePlayer';
import '../styles/lightbox.scss';

export default function Lightbox({ videoKey, isOpen, onClose }) {

  const handleClose = (e) => {
    e.preventDefault();
    onClose();

  }
  return (
    isOpen && (
      <div className="lightbox-overlay" onClick={handleClose}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <YoutubePlayer videoKey={videoKey} />
          <div className='close-btn-wrapper'>
            <button className="close-button" onClick={handleClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    )
  );
}
