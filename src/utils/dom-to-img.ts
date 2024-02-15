import { message } from 'antd';
import html2canvas from 'html2canvas';

/**
 * 将 DOM 元素转为图片,注意 需要创建一个放 url 的 img 元素，用来替换原来的 DOM 元素
 * @param id DOM 元素id
 * @returns
 */
export const getCurrPosterImageUrl = async (id: string) => {
  const element = document.getElementById(id) as HTMLElement;
  if (!element) return message.warn('无法找到 DOM 元素');
  try {
    // 使用html2canvas生成图像
    html2canvas(element, { useCORS: true, allowTaint: true, scale: 2 }).then((canvas) => {
      // 将canvas转换为DataURL
      const dataURL = canvas.toDataURL('image/png');
      // 设置生成的图像URL给img标签
      const canvasImage = document.getElementById('canvasImage') as any;
      if (!canvasImage) return;
      canvasImage.src = dataURL;
    });
  } catch (e) {
    console.log(e);
  }
};
/**
 * 下载 dom 元素为图片
 * @param elementId DOM 元素id
 * @param fileName 下载图片的文件名
 * @returns
 */
export const downloadDOMElementAsImage = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId) as HTMLElement;
  if (!element) return message.warn('无法找到 DOM 元素');
  try {
    // 将 DOM 元素转换为 canvas
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      // 提高清晰度
      scale: 2,
    });
    // 将 canvas 转换为数据 URL
    const dataUrl = canvas.toDataURL('image/png');
    // 创建一个临时的 <a> 元素，设置其 href 为数据 URL 并设置 download 属性
    const link = document.createElement('a');
    link.style.visibility = 'hidden';
    link.href = dataUrl;
    link.download = fileName;

    // 将 <a> 元素添加到 DOM，触发点击事件，然后从 DOM 中移除
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: any) {
    message.error('无法将 DOM 元素转换为图片并下载', error);
  }
};
