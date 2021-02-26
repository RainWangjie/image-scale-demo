import React from 'react';
import * as El from './styles';

interface IBlockProps {
  img: string;
  title: string;
  sub: string;
}

const Block: React.FC<IBlockProps> = (props) => {
  const { img, title, sub } = props;

  const [isLarge, setIsLarge] = React.useState(false);
  const elRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const onLarge = () => {
    // 获取当前元素的尺寸
    const { width, height } = elRef.current!.getBoundingClientRect();
    // 固定元素
    setSize({ width, height });
    !isLarge && setIsLarge(true);
  };

  const onSmall = () => {
    setIsLarge(false);
  };

  return (
    <El.Block
      className={isLarge ? 'large' : ''}
      height={isLarge ? size.height : undefined}
      ref={elRef}
    >
      <div className='inner'>
        <div className='img-wrap' onClick={onLarge}>
          <img src={img} alt={title}></img>
        </div>
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
      <Block img='https://img.pingcap.com/fe-hire/3-img-2.jpg' title='title1' sub='sub1'></Block>
      <Block img='https://img.pingcap.com/fe-hire/3-img-3.jpg' title='title1' sub='sub1'></Block>
    </div>
  );
}

export default App;
