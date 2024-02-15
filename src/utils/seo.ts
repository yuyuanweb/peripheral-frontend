const removeDefaultMetaDesc = () => {
  const metaDescDefault = document.querySelector('meta[name=description]');
  // 删除掉默认的 metaDescDefault
  if (metaDescDefault) {
    metaDescDefault.remove();
  }
};
export { removeDefaultMetaDesc };
