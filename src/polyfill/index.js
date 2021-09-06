import PositionObserver from '@/polyfill/position-observer';

function main() {
  window.PositionObserver = PositionObserver;
}

export default main;
