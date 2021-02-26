import styled, { keyframes } from 'styled-components';

const textAni = keyframes`
  0%{
    opacity:0
  }
  100%{
    opacity:1
  }
`;

interface IBlockProps {
  isLarge: boolean;
  isActive: boolean;
  wrapHeight: number;
  imgLeft: number;
  imgTop: number;
}

export const Block = styled.div<Partial<IBlockProps>>`
  width: 280px;
  height: ${(props) => (props.isLarge ? props.wrapHeight + 'px' : 'auto')};
  margin-bottom: 20px;

  .inner {
    position: relative;
    background: #fff0;
    padding-top: 140px;
    transition: background 0.3s; // 替代透明遮罩
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
    background-clip: content-box;
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

  // 放大态
  &.active {
    .img-wrap {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 240px;
      transform: ${(props) => `translate(${props.imgLeft}px, ${props.imgTop}px)`};
      transition: all 0.3s;
    }
  }

  &.large {
    .inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      padding-top: 40vh;
      background: #fff;
    }

    .img-wrap {
      cursor: default;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 35%;
      transform: translate(100px, -50%);
    }

    .gray-bg-wrap {
      height: 100%;
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
        animation: ${textAni} 0.8s 0.3s;
        animation-fill-mode: forwards;
      }
      .sub {
        position: absolute;
        font-size: 16px;
        transform: translateY(12px);
        opacity: 0;
        animation: ${textAni} 0.8s 0.5s;
        animation-fill-mode: forwards;
      }

      &:after {
        content: '';
        display: block;
        width: 40px;
        height: 8px;
        background: #333;
        opacity: 0;
        animation: ${textAni} 0.8s 0.3s;
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
`;
