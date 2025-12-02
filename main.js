/**
 * WordPress dependencies
 */
import { store, getElement } from '@wordpress/interactivity';

let downTime;

const { actions } = store('core/cover', {
  actions: {
    startTimer() {
      downTime = +new Date();
    },
    handleClick(e) {
      const upTime = +new Date();
      const timeDiff = upTime - downTime;
      const isTextSelected = window.getSelection().toString().length > 0;
      if (timeDiff < 200 && !isTextSelected) {
        actions.triggerLink(e);
      }
    },
    handleEnter(e) {
      const { ref } = getElement();
      if (e.key === 'Enter' && e.target === ref) {
        actions.triggerLink(e);
      }
    },
    triggerLink(e) {
      const { attributes } = getElement();
      const href = attributes['data-card-href'];
      const isInteractiveElement =
        e.target.closest('a') || e.target.closest('button');

      if (!isInteractiveElement && href) {
        window.location.href = href;
      }
    },
  },
});
