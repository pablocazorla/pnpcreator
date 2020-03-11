import U from 'utils';

const pageSizes = {
  'A3_0': {
    width: U.mmToPx(297),
    height: U.mmToPx(420)
  },
  'A3_1': {
    width: U.mmToPx(420),
    height: U.mmToPx(297)
  },
  'A4_0': {
    width: U.mmToPx(210),
    height: U.mmToPx(297)
  },
  'A4_1': {
    width: U.mmToPx(297),
    height: U.mmToPx(210)
  }
};

export default pageSizes;