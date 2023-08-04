export default function getDataOrAriaProps(props) {
  return Object.keys(props).reduce((prev, key) => {
    if ((key.startsWith('data-') || key.startsWith('aria-') || key === 'role') && !key.startsWith('data-__')) {
      prev[key] = props[key];
    }
    return prev;
  }, {});
}