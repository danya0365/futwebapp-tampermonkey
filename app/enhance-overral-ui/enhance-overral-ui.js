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

  }

  _mutationHandler(mutationRecords) {
    mutationRecords.forEach(function (mutation) {
      if ($(mutation.target).hasClass('DetailView') && $(mutation.target)
        .find('.DetailPanel') && mutation.addedNodes.length > 0) {
        if (this.getSettings()['show-google-link'].toString() !== 'true') {
          return;
        }

        let selectedItem = this._getSelectedItem();
        if (selectedItem == null || selectedItem.resourceId === 0) {
          return;
        }

        const googleLink = $(mutation.target).find('#googleLink');
        googleLink.remove();

        $(mutation.target).find('.DetailPanel > .ut-button-group').prepend(`<button id="googleLink" data-resource-id="${selectedItem.resourceId}" class="list"><span class="btn-text">Google Link</span><span class="btn-subtext"></span></button>`);

        $('#googleLink').bind('click', async () => {
          let btn = $('#googleLink');
          btn.find('.btn-text').html('Searching on Google ...');

          selectedItem = this._getSelectedItem();
          btn = $('#googleLink');
          if (btn.data('resource-id') === selectedItem.resourceId) {
              btn.find('.btn-text').html('Google Link');
              analytics.trackEvent('Test', 'Google Link', btn.data('resource-id'));
              window.open("https://www.google.com/?resource-id=" + btn.data('resource-id'));
          }
        });

      }
    }, this);
  }

  /* eslint-disable class-methods-use-this */
  _getSelectedItem() {
    const listController = getAppMain().getRootViewController()
      .getPresentedViewController().getCurrentViewController()
      .getCurrentController()._listController;
    if (listController) {
      return listController.getIterator().current();
    }

    const currentController = getAppMain().getRootViewController()
      .getPresentedViewController().getCurrentViewController()
      .getCurrentController()._rightController._currentController;
    if (currentController && currentController._viewmodel) {
      const current = currentController._viewmodel.current();

      return current._item ? current._item : current;
    }

    return null;
  }

  deactivate(state) {
    super.deactivate(state);
  }
}
