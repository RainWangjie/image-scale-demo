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
  const [isActive, setIsActive] = React.useState(false);
  const [size, setSize] = React.useState({ wrapHeight: 0, imgTop: 0, imgLeft: 0 });

  const elRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLDivElement>(null);

  const onLarge = () => {
    if (isLarge) {
      return;
    }

    // 窗口尺寸
    const { innerWidth, innerHeight } = window;

    // 获取当前元素的尺寸
    const { height: wrapHeight } = elRef.current!.getBoundingClientRect();
    const { x: imgLeft, y: imgTop } = imgRef.current!.getBoundingClientRect();

    // 固定block元素,
    setSize({ wrapHeight, imgLeft: imgLeft - innerWidth / 2, imgTop: imgTop - innerHeight / 2 });
    setIsActive(true);

    setIsLarge(true);

    // 阻止body滚动
    document.body.style.overflow = 'hidden';
  };

  const onSmall = () => {
    setIsLarge(false);
    setIsActive(true);

    document.body.style.overflow = 'auto';
  };

  React.useEffect(() => {
    if (isActive) {
      imgRef.current!.addEventListener(
        'transitionend',
        () => {
          setIsActive(false);
        },
        {
          once: true,
        }
      );
    }

    // eslint-disable-next-line
  }, [isLarge]);

  return (
    <El.Block
      className={classNames({
        large: isLarge,
        active: isActive,
      })}
      isLarge={isLarge}
      {...size}
      ref={elRef}
    >
      <div className='inner'>
        <div className='img-wrap' ref={imgRef} onClick={onLarge}>
          <img src={img} alt={title}></img>
        </div>

        <div className='gray-bg-wrap'></div>

        <div className='text-wrap'>
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
    <div className='App'>
      <Block img='https://img.pingcap.com/fe-hire/3-img-1.jpg' title='title1' sub='sub1'></Block>
      <Block img='https://img.pingcap.com/fe-hire/3-img-2.jpg' title='title2' sub='sub2'></Block>
      <Block img='https://img.pingcap.com/fe-hire/3-img-3.jpg' title='title3' sub='sub3'></Block>
    </div>
  );
}

export default App;
