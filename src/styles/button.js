export const ButtonStyles = (size) => `
  border: 2px solid outset var(--ll-button-border-color, transparent);
  border-radius: var(--ll-button-border-radius, var(--ll-border-radius--xl));
  color: var(--ll-button-text-color, white);
  background: var(--ll-button-fill, var(--ll-gradient-greenblue));
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${size === 'small' ? '48px' : '54px'};
  outline: none;
  cursor: pointer;
  user-select: none;
  transition: 0.2s box-shadow ease, 0.2s color ease, 0.2s background-color ease;
  margin: 0;
`;
