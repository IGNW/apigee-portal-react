import { getMuiTheme } from './theme';

describe('theme', () => {
  it('should get a theme', () => {
    const lightTheme = getMuiTheme('light');
    expect(lightTheme.palette).toBeDefined();
    const darkTheme = getMuiTheme('dark');
    expect(darkTheme.palette).toBeDefined();
    expect(darkTheme).not.toEqual(lightTheme);
  });
});
