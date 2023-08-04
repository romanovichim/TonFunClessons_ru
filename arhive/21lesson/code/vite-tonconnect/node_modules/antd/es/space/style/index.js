import { genComponentStyleHook } from '../../theme/internal';
import genSpaceCompactStyle from './compact';
const genSpaceStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: 'inline-flex',
      '&-rtl': {
        direction: 'rtl'
      },
      '&-vertical': {
        flexDirection: 'column'
      },
      '&-align': {
        flexDirection: 'column',
        '&-center': {
          alignItems: 'center'
        },
        '&-start': {
          alignItems: 'flex-start'
        },
        '&-end': {
          alignItems: 'flex-end'
        },
        '&-baseline': {
          alignItems: 'baseline'
        }
      },
      [`${componentCls}-item`]: {
        '&:empty': {
          display: 'none'
        }
      }
    }
  };
};
// ============================== Export ==============================
export default genComponentStyleHook('Space', token => [genSpaceStyle(token), genSpaceCompactStyle(token)]);