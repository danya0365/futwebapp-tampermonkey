import { SettingsEntry } from '../core';

export class EnhanceOverralUiSettings extends SettingsEntry {
  static id = 'enhance-overral-ui';
  constructor() {
    super('enhance-overral-ui', 'Enhance Overral UI');

    this.addSetting('Show Google Link on Player Detail', 'show-google-link', false, 'checkbox');
  }
}
