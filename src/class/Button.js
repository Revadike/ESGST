import {common} from '../modules/Common';

const
  getFeatureTooltip = common.getFeatureTooltip.bind(common)
;

export default class Button {
  constructor(context, position, details) {
    this.callbacks = details.callbacks;
    this.states = this.callbacks.length;
    this.icons = details.icons;
    this.id = details.id;
    this.index = details.index;
    this.titles = details.titles;
    this.button = common.createElements_v2(context, position, [
      [`div`, { class: details.className }]
    ]);
    // noinspection JSIgnoredPromiseFromCall
    this.change();
    return this;
  }

  async change(mainCallback, index = this.index, event) {
    if (index >= this.states) {
      index = 0;
    }
    this.index = index + 1;
    this.button.title = getFeatureTooltip(this.id, this.titles[index]);
    common.createElements_v2(this.button, `inner`, [
      [`i`, { class: `fa ${this.icons[index]}` }]
    ]);
    if (mainCallback) {
      if (await mainCallback(event)) {
        // noinspection JSIgnoredPromiseFromCall
        this.change();
      } else {
        common.createElements_v2(this.button, `inner`, [
          [`i`, { class: `fa fa-times esgst-red`, title: `Unable to perform action` }]
        ]);
      }
    } else if (this.callbacks[index]) {
      this.button.firstElementChild.addEventListener(`click`, this.change.bind(this, this.callbacks[index], undefined));
    }
  }
}
