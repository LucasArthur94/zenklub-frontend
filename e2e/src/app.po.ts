import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateToPage(path: string): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/${path}`);
  }

  async getByProfessionalName(): Promise<string> {
    return element(by.xpath('//h1')).getText();
  }
}
