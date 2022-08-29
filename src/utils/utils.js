// html转文本
export const html2Text = (html) => {
  const regexp = /<[^>]+>/g;
  const text = html.replace(regexp, '');
  return text;
}