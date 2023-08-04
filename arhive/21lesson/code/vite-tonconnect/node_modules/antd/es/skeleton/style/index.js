import { Keyframes } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
const skeletonClsLoading = new Keyframes(`ant-skeleton-loading`, {
  '0%': {
    backgroundPosition: '100% 50%'
  },
  '100%': {
    backgroundPosition: '0 50%'
  }
});
const genSkeletonElementCommonSize = size => ({
  height: size,
  lineHeight: `${size}px`
});
const genSkeletonElementAvatarSize = size => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonColor = token => ({
  background: token.skeletonLoadingBackground,
  backgroundSize: '400% 100%',
  animationName: skeletonClsLoading,
  animationDuration: token.skeletonLoadingMotionDuration,
  animationTimingFunction: 'ease',
  animationIterationCount: 'infinite'
});
const genSkeletonElementInputSize = size => Object.assign({
  width: size * 5,
  minWidth: size * 5
}, genSkeletonElementCommonSize(size));
const genSkeletonElementAvatar = token => {
  const {
    skeletonAvatarCls,
    color,
    controlHeight,
    controlHeightLG,
    controlHeightSM
  } = token;
  return {
    [`${skeletonAvatarCls}`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color
    }, genSkeletonElementAvatarSize(controlHeight)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: '50%'
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
  };
};
const genSkeletonElementInput = token => {
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return {
    [`${skeletonInputCls}`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementInputSize(controlHeight)),
    [`${skeletonInputCls}-lg`]: Object.assign({}, genSkeletonElementInputSize(controlHeightLG)),
    [`${skeletonInputCls}-sm`]: Object.assign({}, genSkeletonElementInputSize(controlHeightSM))
  };
};
const genSkeletonElementImageSize = size => Object.assign({
  width: size
}, genSkeletonElementCommonSize(size));
const genSkeletonElementImage = token => {
  const {
    skeletonImageCls,
    imageSizeBase,
    color,
    borderRadiusSM
  } = token;
  return {
    [`${skeletonImageCls}`]: Object.assign(Object.assign({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM
    }, genSkeletonElementImageSize(imageSizeBase * 2)), {
      [`${skeletonImageCls}-path`]: {
        fill: '#bfbfbf'
      },
      [`${skeletonImageCls}-svg`]: Object.assign(Object.assign({}, genSkeletonElementImageSize(imageSizeBase)), {
        maxWidth: imageSizeBase * 4,
        maxHeight: imageSizeBase * 4
      }),
      [`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: {
        borderRadius: '50%'
      }
    }),
    [`${skeletonImageCls}${skeletonImageCls}-circle`]: {
      borderRadius: '50%'
    }
  };
};
const genSkeletonElementButtonShape = (token, size, buttonCls) => {
  const {
    skeletonButtonCls
  } = token;
  return {
    [`${buttonCls}${skeletonButtonCls}-circle`]: {
      width: size,
      minWidth: size,
      borderRadius: '50%'
    },
    [`${buttonCls}${skeletonButtonCls}-round`]: {
      borderRadius: size
    }
  };
};
const genSkeletonElementButtonSize = size => Object.assign({
  width: size * 2,
  minWidth: size * 2
}, genSkeletonElementCommonSize(size));
const genSkeletonElementButton = token => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color
  } = token;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
    [`${skeletonButtonCls}`]: Object.assign({
      display: 'inline-block',
      verticalAlign: 'top',
      background: color,
      borderRadius: borderRadiusSM,
      width: controlHeight * 2,
      minWidth: controlHeight * 2
    }, genSkeletonElementButtonSize(controlHeight))
  }, genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls)), {
    [`${skeletonButtonCls}-lg`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightLG))
  }), genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`)), {
    [`${skeletonButtonCls}-sm`]: Object.assign({}, genSkeletonElementButtonSize(controlHeightSM))
  }), genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`));
};
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonImageCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    color,
    padding,
    marginSM,
    borderRadius,
    skeletonTitleHeight,
    skeletonBlockRadius,
    skeletonParagraphLineHeight,
    controlHeightXS,
    skeletonParagraphMarginTop
  } = token;
  return {
    [`${componentCls}`]: {
      display: 'table',
      width: '100%',
      [`${componentCls}-header`]: {
        display: 'table-cell',
        paddingInlineEnd: padding,
        verticalAlign: 'top',
        // Avatar
        [`${skeletonAvatarCls}`]: Object.assign({
          display: 'inline-block',
          verticalAlign: 'top',
          background: color
        }, genSkeletonElementAvatarSize(controlHeight)),
        [`${skeletonAvatarCls}-circle`]: {
          borderRadius: '50%'
        },
        [`${skeletonAvatarCls}-lg`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightLG)),
        [`${skeletonAvatarCls}-sm`]: Object.assign({}, genSkeletonElementAvatarSize(controlHeightSM))
      },
      [`${componentCls}-content`]: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'top',
        // Title
        [`${skeletonTitleCls}`]: {
          width: '100%',
          height: skeletonTitleHeight,
          background: color,
          borderRadius: skeletonBlockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: controlHeightSM
          }
        },
        // paragraph
        [`${skeletonParagraphCls}`]: {
          padding: 0,
          '> li': {
            width: '100%',
            height: skeletonParagraphLineHeight,
            listStyle: 'none',
            background: color,
            borderRadius: skeletonBlockRadius,
            '+ li': {
              marginBlockStart: controlHeightXS
            }
          }
        },
        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: '61%'
        }
      },
      [`&-round ${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          borderRadius
        }
      }
    },
    [`${componentCls}-with-avatar ${componentCls}-content`]: {
      // Title
      [`${skeletonTitleCls}`]: {
        marginBlockStart: marginSM,
        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: skeletonParagraphMarginTop
        }
      }
    },
    // Skeleton element
    [`${componentCls}${componentCls}-element`]: Object.assign(Object.assign(Object.assign(Object.assign({
      display: 'inline-block',
      width: 'auto'
    }, genSkeletonElementButton(token)), genSkeletonElementAvatar(token)), genSkeletonElementInput(token)), genSkeletonElementImage(token)),
    // Skeleton Block Button, Input
    [`${componentCls}${componentCls}-block`]: {
      width: '100%',
      [`${skeletonButtonCls}`]: {
        width: '100%'
      },
      [`${skeletonInputCls}`]: {
        width: '100%'
      }
    },
    // With active animation
    [`${componentCls}${componentCls}-active`]: {
      [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonImageCls}
      `]: Object.assign({}, genSkeletonColor(token))
    }
  };
};
// ============================== Export ==============================
export default genComponentStyleHook('Skeleton', token => {
  const {
    componentCls
  } = token;
  const skeletonToken = mergeToken(token, {
    skeletonAvatarCls: `${componentCls}-avatar`,
    skeletonTitleCls: `${componentCls}-title`,
    skeletonParagraphCls: `${componentCls}-paragraph`,
    skeletonButtonCls: `${componentCls}-button`,
    skeletonInputCls: `${componentCls}-input`,
    skeletonImageCls: `${componentCls}-image`,
    imageSizeBase: token.controlHeight * 1.5,
    skeletonTitleHeight: token.controlHeight / 2,
    skeletonBlockRadius: token.borderRadiusSM,
    skeletonParagraphLineHeight: token.controlHeight / 2,
    skeletonParagraphMarginTop: token.marginLG + token.marginXXS,
    borderRadius: 100,
    skeletonLoadingBackground: `linear-gradient(90deg, ${token.color} 25%, ${token.colorGradientEnd} 37%, ${token.color} 63%)`,
    skeletonLoadingMotionDuration: '1.4s'
  });
  return [genBaseStyle(skeletonToken)];
}, token => {
  const {
    colorFillContent,
    colorFill
  } = token;
  return {
    color: colorFillContent,
    colorGradientEnd: colorFill
  };
});