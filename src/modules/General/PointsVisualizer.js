import Module from '../../class/Module';
import {common} from '../Common';

const
  createElements = common.createElements.bind(common)
;

class GeneralPointsVisualizer extends Module {
  constructor() {
    super();
    this.info = {
      description: `
      <ul>
        <li>Displays a green bar in the account button at the header of any page that represents the amount of points that you have.</li>
      </ul>
    `,
      id: `pv`,
      load: this.pv,
      name: `Points Visualizer`,
      sg: true,
      type: `general`
    };
  }

  pv() {
    this.pv_setStyle();
    this.esgst.modules.generalLevelProgressVisualizer.joinStyles();
  }

  pv_setStyle() {
    const points = Math.min(400, this.esgst.points);
    const percentage = points / 400 * 100;
    const progress = parseInt(percentage * 1.86); // 186px is the width of the button
    const firstBar = `${progress}px`;
    const secondBar = `${Math.max(0, progress - 157)}px`; // 157px is the width of the button without the arrow
    this.esgst.pvStyleArray = [{
      selector: `.esgst-lpv-container`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar, #609f60) ${firstBar}, transparent ${firstBar})`,
          `var(--esgst-lpv-button, linear-gradient(#8a92a1 0px, #757e8f 8px, #4e5666 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container .nav__button--is-dropdown:hover`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-hover, #6dac6d) ${firstBar}, transparent ${firstBar})`,
          `var(--esgst-lpv-button-hover, linear-gradient(#9ba2b0 0px, #8c94a3 8px, #596070 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container .nav__button--is-dropdown-arrow:hover`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-hover, #6dac6d) ${secondBar}, transparent ${secondBar})`,
          `var(--esgst-lpv-button-hover, linear-gradient(#9ba2b0 0px, #8c94a3 8px, #596070 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container .nav__button--is-dropdown-arrow.is-selected`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar, #609f60) ${secondBar}, transparent ${secondBar})`,
          `var(--esgst-lpv-arrow, linear-gradient(#4e525f 0px, #434857 5px, #2b2e3a 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container.is-selected .nav__button--is-dropdown`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-hover, #6dac6d) ${firstBar}, transparent ${firstBar})`,
          `var(--esgst-lpv-button-selected, linear-gradient(#d0d5de 0px, #c9cdd7 5px, #9097a6 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container.is-selected .nav__button--is-dropdown-arrow`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-hover, #6dac6d) ${secondBar}, transparent ${secondBar})`,
          `var(--esgst-lpv-button-selected, linear-gradient(#d0d5de 0px, #c9cdd7 5px, #9097a6 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container.is-selected .nav__button--is-dropdown:hover`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-selected, #7ab97a) ${firstBar}, transparent ${firstBar})`,
          `var(--esgst-lpv-button-selected-hover, linear-gradient(#f0f1f5 0px, #d1d4de 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container.is-selected .nav__button--is-dropdown-arrow:hover:not(.is-selected)`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-selected, #7ab97a) ${secondBar}, transparent ${secondBar})`,
          `var(--esgst-lpv-button-selected-hover, linear-gradient(#f0f1f5 0px, #d1d4de 100%))`
        ]
      }]
    }, {
      selector: `.esgst-lpv-container.is-selected .nav__button--is-dropdown-arrow.is-selected`,
      rules: [{
        name: `background-image`,
        values: [
          `linear-gradient(to right, var(--esgst-lpv-bar-selected, #7ab97a) ${secondBar}, transparent ${secondBar})`,
          `var(--esgst-lpv-arrow-selected, linear-gradient(#4e525f 0px, #434857 5px, #2b2e3a 100%))`
        ]
      }]
    }];
  }
}

export default GeneralPointsVisualizer;