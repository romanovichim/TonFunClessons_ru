import warning from '../_util/warning';
const Icon = () => {
  process.env.NODE_ENV !== "production" ? warning(false, 'Icon', 'Empty Icon') : void 0;
  return null;
};
export default Icon;