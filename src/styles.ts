import styled, { keyframes } from 'styled-components';

// 文字动画
const textAni = keyframes`
  0%{
    opacity:0
  }
  100%{
    opacity:1
  }
`;

// 左右交错布局
export const Wrap = styled.div`
  margin: 10px auto;
  width: 700px;
  display: flex;
  justify-content: space-between;
  & > div {
    flex: 1;
  }
  & > div:last-child {
    padding-top: 40px;
  }
`;

interface IBlockProps {
  isLarge: boolean;
  isEnter: boolean;
  isLeave: boolean;
  wrapHeight: number;
  imgLeft: number;
  imgTop: number;
  bgWidth: number;
  bgHeight: number;
  bgTop: number;
  bgLeft: number;
}

const aniTime = 1;
export const Block = styled.div<Partial<IBlockProps>>`
  width: 280px;
  height: ${(props) =>
    props.isLarge || props.isEnter || props.isLeave
      ? props.wrapHeight + 'px'
      : 'auto'}; // 动画态占位
  margin-bottom: 20px;

  .inner {
    position: relative;
    background: #fff0;
    padding-top: 140px;
    transition: background ${aniTime}s; // 替代透明遮罩
  }

  .img-wrap {
    cursor: zoom-in;
    position: absolute;
    top: 0;
    left: 20px;
    width: 240px;
    transform: translate(0, 0);
    z-index: 1;
    img {
      width: 100%;
    }
  }

  .gray-bg-wrap {
    position: relative;
    height: 260px;
    background: #dddd;
    margin-bottom: 20px;
  }

  .text-wrap {
    .title {
      font-weight: 600;
      font-size: 18px;
    }
    .sub {
      font-size: 14px;
      color: #c00;
    }
  }

  // 过渡动画
  &.large:not(.enter),
  &.leave {
    .img-wrap,
    .gray-bg-wrap {
      transition: all ${aniTime}s;
    }
  }

  &.enter,
  &.leave,
  &.large {
    .inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
    }
  }
  // 放大态
  &.large {
    .inner {
      background: #fff;
    }

    .img-wrap {
      cursor: default;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 35%;
      transform: translate(100px, -50%);
    }

    .gray-bg-wrap {
      position: absolute;
      width: 100%;
      height: 60%;
      top: 40%;
      left: 0;
    }

    .text-wrap {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-300px);

      .title {
        position: absolute;
        font-size: 36px;
        transform: translateY(-44px);
        opacity: 0;
        animation: ${textAni} 0.8s ${aniTime}s;
        animation-fill-mode: forwards;
      }
      .sub {
        position: absolute;
        font-size: 16px;
        transform: translateY(12px);
        opacity: 0;
        animation: ${textAni} 0.8s ${aniTime * 1.3}s;
        animation-fill-mode: forwards;
      }

      &:after {
        content: '';
        display: block;
        width: 40px;
        height: 8px;
        background: #333;
        opacity: 0;
        animation: ${textAni} 0.8s ${aniTime}s;
        animation-fill-mode: forwards;
      }
    }

    .btn-close {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 4px;
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background: #333;
        border-radius: 2px;
      }
      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }

  // 第一帧状态/最后一帧状态
  &.large.enter,
  &.leave {
    .img-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 240px;
      transform: ${(props) => `translate(${props.imgLeft}px, ${props.imgTop}px)`};
    }
    .gray-bg-wrap {
      position: absolute;
      width: ${(props) => props.bgWidth}px;
      height: ${(props) => props.bgHeight}px;
      top: ${(props) => props.bgTop}px;
      left: ${(props) => props.bgLeft}px;
    }
    .text-wrap {
      opacity: 0;
    }
  }
`;
