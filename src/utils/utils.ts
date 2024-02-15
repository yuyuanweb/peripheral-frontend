import moment from 'moment';
import { message } from 'antd';

/**
 * 检验是否为 URL
 */
export const URL_REG =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => URL_REG.test(path);

/**
 * 获得格式化日期字符串
 * @param time
 */
export const formatDateStr = (time: any) => {
  if (!time) {
    return '';
  }
  return moment(time).format('yyyy-MM-DD');
};

/**
 * 获得格式化日期时间字符串（年-月-日 时-分）
 * @param time
 * @param format
 */
export const formatPartDateTimeStr = (time: any, format = 'yyyy-MM-DD HH:mm') => {
  if (!time) {
    return '';
  }
  return moment(time).format(format);
};

/**
 * 获得格式化日期时间字符串
 * @param time
 * @param format
 */
export const formatDateTimeStr = (time: any, format = 'yyyy-MM-DD HH:mm:ss') => {
  if (!time) {
    return '';
  }
  return moment(time).format(format);
};

/**
 * 判断是否为移动设备
 */
export const isMobile = () => {
  const deviceWidth = document.querySelector('body')?.offsetWidth;
  return deviceWidth && deviceWidth < 480;
};

/**
 * 根据字符获取颜色
 * @param char 字符
 * @returns 颜色
 */
export function getColorByCharacter(char: string) {
  const colors = [
    '#ffadad',
    '#ffd6a5',
    '#1296db',
    '#45da1f',
    '#a0c4ff',
    '#1a98cd',
    '#bdb2ff',
    '#ffc6ff',
  ];

  if (!char) {
    return colors[0];
  }
  // 检查输入是否为单个字符
  if (char.length !== 1) {
    // eslint-disable-next-line no-param-reassign
    char = char[0];
  }

  // 获取字符的 Unicode 编码
  const unicode = char.charCodeAt(0);

  // 根据编码计算颜色索引
  const colorIndex = unicode % colors.length;

  // 返回对应颜色
  return colors[colorIndex];
}

/**
 * 通用错误提示方法
 * @param customText 自定义文本
 * @param e 错误对象
 * @param type 提示类型，默认为'error'
 * @returns 返回提示结果
 */
export function commonErrorTip(customText: string, e: any, type = 'error') {
  if (!e.message) return;
  if (type === 'error') {
    return message.error(customText + e.message);
  } else {
    return message.warning(customText + e.message);
  }
}

/**
 * 复制到剪切板
 * @param text 复制的文本
 * @param isTip 是否提示
 * @param successText 复制成功提示文本
 * @returns
 */
export const copyTextToClipboard = async (
  text: string,
  isTip = true,
  successText = '已复制到剪贴板',
) => {
  if ('clipboard' in navigator && navigator.clipboard && 'writeText' in navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      if (isTip) {
        message.success(successText);
      }
      return;
    } catch (err) {
      console.error('无法复制到剪贴板', err);
    }
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textarea);
    message.success('已复制到剪贴板');
  } catch (err) {
    console.error('无法复制到剪贴板', err);
  }
};
