// html转文本
export const html2Text = (html) => {
  const preReg = /<pre>[\s\S]*<\/pre>/g;
  const regexp = /<[^>]+>/g;
  const text = html.replace(preReg, '').replace(regexp, '');
  return text;
}