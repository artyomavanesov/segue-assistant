export const themeSwitcher = (theme) => {
  const themeIndex = theme ? theme - 1 : 1;
  const style = document.createElement('style');
  style.textContent = `:root {
    --color-1-1: ${themes[themeIndex][0]};
    --color-1-2: ${themes[themeIndex][1]};
    --color-2-1: ${themes[themeIndex][2]};
    --color-2-2: ${themes[themeIndex][3]};
  }`
  document.head.appendChild(style);
};

const themes = [
  ['rgba(183, 158, 242, 1)', 'rgba(255, 253, 209, 1)', 'rgba(24, 24, 32, 1)', 'rgba(26, 27, 36, 1)'],
  ['rgba(227, 190, 97, 1)', 'rgba(158, 193, 207, 1)', 'rgba(21, 25, 53, 1)', 'rgba(34, 38, 67, 1)'],
  ['rgba(254, 95, 67, 1)', 'rgba(205, 201, 230, 1)', 'rgba(41, 6, 27, 1)', 'rgba(58, 15, 41, 1)'],
  ['rgba(224, 163, 102, 1)', 'rgba(248, 234, 225, 1)', 'rgba(123, 23, 44, 1)', 'rgba(35, 75, 47, 1)']
];

