/*
Title: NodeBucket
Author: Professor Krasso
Date: September 2020
Modified By: Kimberly Pierce
Description: WEB 450 NodeBucket
*/

import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
