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

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    this._observer = new MutationObserver(this._mutationHandler.bind(this));
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

  _mutationHandler(mutationRecords) {
    mutationRecords.forEach(function (mutation) {
      if ($(mutation.target).hasClass('DetailView') && $(mutation.target)
        .find('.DetailPanel') && mutation.addedNodes.length > 0) {
        if (this.getSettings()['show-link-to-player'].toString() !== 'true') {
          return;
        }

        let selectedItem = this._getSelectedItem();
        if (selectedItem == null || selectedItem.resourceId === 0) {
          return;
        }

        const futbinPlayerLink = $(mutation.target).find('#futbinPlayerLink');
      }
    }, this);
  }

  deactivate(state) {
    super.deactivate(state);
  }
}
