import styled from 'styled-components';

export const Block = styled.div<{ height?: number }>`
  width: 280px;
  height: ${(props) => (props.height ? props.height + 'px' : 'auto')};
  margin-bottom: 20px;

  .inner {
    position: relative;
    padding-top: 130px;
    background: #fff;
  }

  .img-wrap {
    cursor: zoom-in;
    position: absolute;
    top: 0;
    left: 20px;
    width: 240px;
    transform: translate(0, 0);
    transition: all 0.3s;
    z-index: 1;
    img {
      width: 100%;
    }
  }

  .text-wrap {
    position: relative;
    height: 260px;
    background: #dddd;
    margin-bottom: 20px;
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
  &.large {
    .inner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding-top: 40%;
      z-index: 999;
    }
    .img-wrap {
      top: 50%;
      left: 50%;
      transform: translate(100px, -50%);
    }
    .text-wrap {
      height: 100%;
      .title {
      }
      .sub {
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
