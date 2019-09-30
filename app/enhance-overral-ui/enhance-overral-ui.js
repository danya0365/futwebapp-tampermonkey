/* global
gPopupClickShield
enums
controllers
utils
*/

import { BaseScript } from '../core';
import { EnhanceOverralUiSettings } from './settings-entry';

export class EnhanceOverralUi extends BaseScript {

  constructor() {
    super(EnhanceOverralUiSettings.id);
  }

  activate(state) {
    super.activate(state);
  }

  onScreenRequest(screenId) {
    super.onScreenRequest(screenId);
    const settings = this.getSettings();

    if (settings.isActive) {

    }
  }

  deactivate(state) {
    super.deactivate(state);
  }
}
