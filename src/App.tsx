import React from 'react';
import * as El from './styles';
import classNames from 'classnames';
interface IBlockProps {
  img: string;
  title: string;
  sub: string;
}

const Block: React.FC<IBlockProps> = (props) => {
  const { img, title, sub } = props;

  const [isLarge, setIsLarge] = React.useState(false);
  const [isLeave, setIsLeave] = React.useState(false);
  const [isEnter, setIsEnter] = React.useState(false);

  const [size, setSize] = React.useState({
    wrapHeight: 0,
    imgTop: 0,
    imgLeft: 0,
    bgTop: 0,
    bgLeft: 0,
    bgWidth: 0,
    bgHeight: 0,
    textTop: 0,
    textLeft: 0,
    textWidth: 0,
    textHeight: 0,
  });

  const elRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

  const onLarge = () => {
    if (isLarge) {
      return;
    }

    // 窗口尺寸
    const { innerWidth, innerHeight } = window;

    // 获取当前元素的尺寸
    const { height: wrapHeight } = elRef.current!.getBoundingClientRect();
    const { x: imgLeft, y: imgTop } = imgRef.current!.getBoundingClientRect();
    const {
      x: bgLeft,
      y: bgTop,
      width: bgWidth,
      height: bgHeight,
    } = bgRef.current!.getBoundingClientRect();
    const {
      x: textLeft,
      y: textTop,
      width: textWidth,
      height: textHeight,
    } = textRef.current!.getBoundingClientRect();
    // 固定block元素，并计算第一帧位置,
    setSize({
      wrapHeight,
      imgLeft: imgLeft - innerWidth / 2,
      imgTop: imgTop - innerHeight / 2,
      bgHeight,
      bgLeft,
      bgTop,
      bgWidth,
      textTop,
      textLeft,
      textWidth,
      textHeight,
    });

    setIsEnter(true);
    setIsLarge(true);

    // 阻止body滚动
    document.body.style.overflow = 'hidden';
  };

  // 动画结束后移除对应样式
  const removeAni = React.useCallback(() => {
    imgRef.current!.addEventListener(
      'transitionend',
      () => {
        setIsLeave(false);
      },
      {
        once: true,
      }
    );
  }, []);

  const onSmall = React.useCallback(() => {
    setIsLarge(false);
    setIsLeave(true);
    removeAni();
    document.body.style.overflow = 'auto';
  }, []);

  // 固定enter状态第一帧
  React.useLayoutEffect(() => {
    if (isEnter) {
      setTimeout(() => {
        setIsEnter(false);
      }, 0);
    }
  }, [isEnter]);

  return (
    <El.Block
      className={classNames({
        large: isLarge,
        enter: isEnter,
        leave: isLeave,
      })}
      isLarge={isLarge}
      isEnter={isEnter}
      isLeave={isLeave}
      {...size}
      ref={elRef}
    >
      <div className='inner'>
        <div className='img-wrap' ref={imgRef} onClick={onLarge}>
          <img src={img} alt={title}></img>
        </div>

        <div className='gray-bg-wrap' ref={bgRef}></div>

        <div className='text-wrap' ref={textRef}>
          <div className='title'>{title}</div>
          <div className='sub'>{sub}</div>
        </div>

        {isLarge && <div className='btn-close' onClick={onSmall}></div>}
      </div>
    </El.Block>
  );
};

function App() {
  return (
    <El.Wrap>
      <div>
        <Block img='https://img.pingcap.com/fe-hire/3-img-1.jpg' title='title1' sub='sub1'></Block>
        <Block img='https://img.pingcap.com/fe-hire/3-img-2.jpg' title='title2' sub='sub2'></Block>
      </div>
      <div>
        <Block img='https://img.pingcap.com/fe-hire/3-img-3.jpg' title='title3' sub='sub3'></Block>
        <Block img='https://img.pingcap.com/fe-hire/3-img-3.jpg' title='title4' sub='sub4'></Block>
      </div>
    </El.Wrap>
  );
}

export default App;
