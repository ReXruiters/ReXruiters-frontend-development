export function parseResponse(text) {
  let display = text, jd = null, assessment = null;
  const jdM = text.match(/%%%JD_START%%%([\s\S]*?)%%%JD_END%%%/);
  if (jdM) { jd = jdM[1].trim(); display = display.replace(jdM[0], '').trim(); }
  const asM = text.match(/%%%ASSESSMENT_START%%%([\s\S]*?)%%%ASSESSMENT_END%%%/);
  if (asM) { assessment = asM[1].trim(); display = display.replace(asM[0], '').trim(); }
  return { display, jd, assessment };
}