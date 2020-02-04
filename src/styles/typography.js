const typographyReset = `
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`;

const variables = `
  --ll-typo-headline-font-family: bennet-banner, 'Bennet Banner', Georgia, serif;
  --ll-typo-main-font-family: 'Karla', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --ll-typo-h1-size: 36px;
  --ll-typo-h4-size: 24px;
  --ll-typo-body-size: 18px;
  --ll-typo-small-size: 12px;
  `;

const HeadlineBase = `
  ${variables}
  ${typographyReset}
  font-family: var(--ll-typo-headline-font-family);
  font-weight: 800;
  margin: 0;
`;

const Base = `
  ${variables}
  ${typographyReset}
  font-family: var(--ll-typo-main-font-family);
  font-weight: 400;
`;

const h1 = `
  ${HeadlineBase}
  font-size: var(--ll-typo-h1-size);
  line-height: 1.16;
`;

const h4 = `
  ${Base}
  font-size: var(--ll-typo-h4-size);
  line-height: 1.16;
`;

const bodyText = `
  ${Base}
  font-size: var(--ll-typo-body-size);
  line-height: 1.25;
`;

const buttonText = `
  ${h4}
  margin: 0;
  line-height: 1;
`;

const smallText = `
  ${Base}
  font-size: var(--ll-typo-small-size);
  margin: 0;
  line-height: 1;
`;


export const H1 = h1;
export const H4 = h4;
export const BodyText = bodyText;
export const ButtonText = buttonText;
export const SmallText = smallText;
