import { AtlPage } from './app.po';

describe('atl App', () => {
  let page: AtlPage;

  beforeEach(() => {
    page = new AtlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
