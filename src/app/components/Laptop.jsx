import { useEffect, useState } from "react";


const LaptopMockup = ({ videoSrc, isOpened }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);


  return (
    <>
    <div className={`mockup mockup-macbook ${isLoaded ? 'loaded' : ''} ${isOpened ? 'opened' : ''}`}>
        <div className="part top">
          <img src="https://d1xm195wioio0k.cloudfront.net/images/mockup/macbook-top.svg" alt="" className="top" />
          <img src="https://d1xm195wioio0k.cloudfront.net/images/mockup/macbook-cover.svg" alt="" className="cover" />

          {videoSrc && (
            <video autoPlay loop muted playsInline>
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="part bottom">
          <img src="https://d1xm195wioio0k.cloudfront.net/images/mockup/macbook-cover.svg" alt="" className="cover" />
          <img src="https://d1xm195wioio0k.cloudfront.net/images/mockup/macbook-bottom.svg" alt="" className="bottom" />
        </div>
      </div>

      <style>{`
        .mockup {
          display: inline-block;
          position: relative;
          z-index: 3;
          text-align: center;
          font-size: 0;
          perspective: 2400px;
          perspective-origin: 50% 100%;
          opacity: 0;
          transition: 500ms opacity;
        }

        .mockup.loaded {
          opacity: 1;
        }

        .mockup .part .top,
        .mockup .part .bottom {
          position: absolute;
          top: 0;
          left: 0;
        }

        .mockup .part.top {
          transform: translate3d(0, 0, 0) rotateX(-90deg);
        }

        .mockup .part {
          display: inline-block;
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 100%;
          transition: 900ms;
        }

        .mockup.opened .part.top {
          transform: translate3d(0, 0, 0) rotateX(0deg);
        }

        .mockup.opened .part .top {
          transform: translate3d(0, 0, -11px) rotateX(90deg) scale(1, 1);
        }

        .mockup .part .top {
          transform-origin: 50% 0;
          transform: translate3d(0, 0, -11px) rotateX(90deg);
          transition: 900ms;
        }

        .mockup img {
          display: block;
          max-width: 100%;
          backface-visibility: hidden;
        }

        .mockup .part .cover {
          position: relative;
        }

        .mockup video {
          display: block;
          position: absolute;
          top: 8%;
          left: 4%;
          width: 92%;
          border-radius: 6px;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 1px);
        }

        .mockup .part.bottom {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate3d(0, 0, 0) rotateX(-90deg);
        }

        .mockup .part .bottom {
          transform-origin: 50% 0;
          transform: translate3d(0,0,0) rotateX(90deg);
        }
      `}</style>
    </>
  );
};

export default LaptopMockup;
