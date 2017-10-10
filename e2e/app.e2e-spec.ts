import { PianohintPage } from './app.po';

describe('pianohint App', () => {
  let page: PianohintPage;

  beforeEach(() => {
    page = new PianohintPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
