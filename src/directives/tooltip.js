import {} from '@/services/color';
import store from '@/store';

class Directive {
  // colorMappingUnwatch;
  // colorModeUnwatch;
  // contentElement;
  // pointerElement;
  // targetElement;
  // unsubscribe;
  // wrapperElement;

  // constructor(el, binding) {
  //   const marker = Date.now().toString();

  //   this.targetElement = el;
  //   this.contentElement = document.createElement('div');
  //   this.pointerElement = document.createElement('div');
  //   this.wrapperElement = document.createElement('div');

  //   this.contentElement.classList.toggle('content', true);
  //   this.pointerElement.classList.toggle('pointer', true);
  //   this.wrapperElement.classList.toggle('wabisque-directive-tooltip', true);

  //   this.wrapperElement.appendChild(this.contentElement);
  //   this.wrapperElement.appendChild(this.pointerElement);

  //   this.targetElement.addEventListener('mouseleave', (function() {
  //     this.setPosition(false);
  //     this.wrapperElement.classList.toggle('state:active', false);
  //   }).bind(this));
  //   this.targetElement.addEventListener('mouseover', (function() {
  //     this.setPosition(false);
  //     this.wrapperElement.classList.toggle('state:active', true);
  //   }).bind(this));

  //   this.targetElement.setAttribute('data-wabisque-tooltip-directive', marker);
  //   store.commit('system/SET', {
  //     payload: {
  //       general: {
  //         storage: {
  //           directives: {
  //             tooltip: {[marker]: this}
  //           }
  //         }
  //       }
  //     }
  //   });

  //   this.unsubscribe = store.subscribe((function(mutation) {
  //     if(mutation.type == 'preferences/SET') {
  //       let bindingValue = this.wrapperElement.hasAttribute('data-binding-value') ? JSON.parse(this.wrapperElement.dataset.bindingValue) : null;

  //       bindingValue = {
  //         backgroundColor: colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background'),
  //         textColor: colorService.toCleanRgb(bindingValue?.textColor) || colorService.contrast((colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background')), 2)
  //       };

  //       this.wrapperElement.style.setProperty('--background-color', bindingValue.backgroundColor);
  //       this.wrapperElement.style.setProperty('--text-color', bindingValue.textColor);
  //     }
  //   }).bind(this));
  //   this.colorModeUnwatch = store.watch(function(state, getters) {
  //     return getters['preferences/activeColorMode'];
  //   }, (function() {
  //     let bindingValue = this.wrapperElement.dataset.bindingValue;

  //     bindingValue = {
  //       backgroundColor: colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background'),
  //       textColor: colorService.toCleanRgb(bindingValue?.textColor) || colorService.contrast((colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background')), 2)
  //     };

  //     this.wrapperElement.style.setProperty('--background-color', bindingValue.backgroundColor);
  //     this.wrapperElement.style.setProperty('--text-color', bindingValue.textColor);
  //   }).bind(this));
  //   this.colorMappingUnwatch = store.watch(function(state) {
  //     return state.preferences.color.activeMapping;
  //   }, (function() {
  //     let bindingValue = this.wrapperElement.hasAttribute('data-binding-value') ? JSON.parse(this.wrapperElement.dataset.bindingValue) : null;

  //     bindingValue = {
  //       backgroundColor: colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background'),
  //       textColor: colorService.toCleanRgb(bindingValue?.textColor) || colorService.contrast((colorService.toCleanRgb(bindingValue?.backgroundColor) || colorService.contrast('background')), 2)
  //     };

  //     this.wrapperElement.style.setProperty('--background-color', bindingValue.backgroundColor);
  //     this.wrapperElement.style.setProperty('--text-color', bindingValue.textColor);
  //   }).bind(this));

  //   this.update(binding);
  // }

  // setPosition(restart) {
  //   let currentPositionIndex = parseInt(this.wrapperElement.dataset.currentPositionIndex);
  //   const positions = JSON.parse(this.wrapperElement.dataset.positions);

  //   restart = !!restart;

  //   if(currentPositionIndex >= positions.length && !restart) return;

  //   restart && (currentPositionIndex = 0);

  //   const currentPosition = positions[currentPositionIndex];
  //   const offset = parseInt(this.wrapperElement.dataset.offset);
  //   const overlay = document.querySelector(this.wrapperElement.dataset.overlay);
  //   const overlayContent = document.querySelector(overlay.dataset.content);
  //   const overlayOffsetBottom = parseInt(overlay.dataset.offsetBottom);
  //   const overlayOffsetLeft = parseInt(overlay.dataset.offsetLeft);
  //   const overlayOffsetRight = parseInt(overlay.dataset.offsetRight);
  //   const overlayOffsetTop = parseInt(overlay.dataset.offsetTop);
  //   let left = 0;
  //   let shift = 0;
  //   let top = 0;

  //   switch(currentPosition) {
  //     case 'bottom': {
  //       left = this.targetElement.getBoundingClientRect().left + this.targetElement.getBoundingClientRect().width * 0.5 + overlay.scrollLeft - this.wrapperElement.getBoundingClientRect().width * 0.5;
  //       top = this.targetElement.getBoundingClientRect().bottom + overlay.scrollTop - offset;

  //       if(top + this.wrapperElement.getBoundingClientRect().height > overlayContent.getBoundingClientRect().height - overlayOffsetBottom) {
  //         this.wrapperElement.setAttribute('data-current-position-index', (currentPositionIndex + 1).toString());
  //         return this.setPosition(false);
  //       }

  //       if(this.wrapperElement.getBoundingClientRect().width > overlayContent.getBoundingClientRect().width - overlayOffsetLeft - overlayOffsetRight) shift = (this.wrapperElement.getBoundingClientRect().width - overlayContent.getBoundingClientRect().width) / 2 - left;
  //       else if(left + this.wrapperElement.getBoundingClientRect().width > overlayContent.getBoundingClientRect().width - overlayOffsetRight) shift = overlayContent.getBoundingClientRect().width - overlayOffsetRight - left - this.wrapperElement.getBoundingClientRect().width;
  //       else if(left < overlayOffsetLeft) shift = overlayOffsetLeft - left;

  //       break;
  //     }
  //     case 'left': {
  //       left = this.targetElement.getBoundingClientRect().left + overlay.scrollLeft + offset - this.wrapperElement.getBoundingClientRect().width;
  //       top = this.targetElement.getBoundingClientRect().top + this.targetElement.getBoundingClientRect().height * 0.5 + overlay.scrollTop - this.wrapperElement.getBoundingClientRect().height * 0.5;

  //       if(left < overlayOffsetLeft) {
  //         this.wrapperElement.setAttribute('data-current-position-index', (currentPositionIndex + 1).toString());
  //         return this.setPosition(false);
  //       }

  //       if(this.wrapperElement.getBoundingClientRect().height > overlayContent.getBoundingClientRect().height - overlayOffsetBottom - overlayOffsetTop) shift = (this.wrapperElement.getBoundingClientRect().height - overlayContent.getBoundingClientRect().height) / 2 - top;
  //       else if(top + this.wrapperElement.getBoundingClientRect().height > overlayContent.getBoundingClientRect().height - overlayOffsetBottom) shift = overlayContent.getBoundingClientRect().height - overlayOffsetBottom - top - this.wrapperElement.getBoundingClientRect().height;
  //       else if(top < overlayOffsetTop) shift = overlayOffsetTop - top;

  //       break;
  //     }
  //     case 'right': {
  //       left = this.targetElement.getBoundingClientRect().right + overlay.scrollLeft - offset;
  //       top = this.targetElement.getBoundingClientRect().top + this.targetElement.getBoundingClientRect().height * 0.5 + overlay.scrollTop - this.wrapperElement.getBoundingClientRect().height * 0.5;

  //       if(left + this.wrapperElement.getBoundingClientRect().width > overlayContent.getBoundingClientRect().width - overlayOffsetRight) {
  //         this.wrapperElement.setAttribute('data-current-position-index', (currentPositionIndex + 1).toString());
  //         return this.setPosition(false);
  //       }

  //       if(this.wrapperElement.getBoundingClientRect().height > overlayContent.getBoundingClientRect().height - overlayOffsetBottom - overlayOffsetTop) shift = (this.wrapperElement.getBoundingClientRect().height - overlayContent.getBoundingClientRect().height) / 2 - top;
  //       else if(top + this.wrapperElement.getBoundingClientRect().height > overlayContent.getBoundingClientRect().height - overlayOffsetBottom) shift = overlayContent.getBoundingClientRect().height - overlayOffsetBottom - top - this.wrapperElement.getBoundingClientRect().height;
  //       else if(top < overlayOffsetTop) shift = overlayOffsetTop - top;

  //       break;
  //     }
  //     case 'top': {
  //       left = this.targetElement.getBoundingClientRect().left + this.targetElement.getBoundingClientRect().width * 0.5 + overlay.scrollLeft - this.wrapperElement.getBoundingClientRect().width * 0.5;
  //       top = this.targetElement.getBoundingClientRect().top + overlay.scrollTop + offset - this.wrapperElement.getBoundingClientRect().height;

  //       if(top < overlayOffsetTop) {
  //         this.wrapperElement.setAttribute('data-current-position-index', (currentPositionIndex + 1).toString());
  //         return this.setPosition(false);
  //       }

  //       if(this.wrapperElement.getBoundingClientRect().width > overlayContent.getBoundingClientRect().width - overlayOffsetLeft - overlayOffsetRight) shift = (this.wrapperElement.getBoundingClientRect().width - overlayContent.getBoundingClientRect().width) / 2 - left;
  //       else if(left + this.wrapperElement.getBoundingClientRect().width > overlayContent.getBoundingClientRect().width - overlayOffsetRight) shift = overlayContent.getBoundingClientRect().width - overlayOffsetRight - left - this.wrapperElement.getBoundingClientRect().width;
  //       else if(left < overlayOffsetLeft) shift = overlayOffsetLeft - left;

  //       break;
  //     }
  //   }

  //   positions
  //     .forEach(function(position) {
  //       this.wrapperElement.classList.toggle(`attr:position:${position}`, position == currentPosition);
  //     }, this);

  //   this.wrapperElement.style.setProperty('--left', `${left}px`);
  //   this.wrapperElement.style.setProperty('--shift', `${shift}px`);
  //   this.wrapperElement.style.setProperty('--top', `${top}px`);

  //   this.wrapperElement.setAttribute('data-current-position-index', currentPositionIndex.toString());
  // }

  // unmount() {
  //   this.unsubscribe();
  //   this.colorMappingUnwatch();
  //   this.colorModeUnwatch();

  //   if(this.wrapperElement.hasAttribute('data-overlay')) {
  //     const overlay = document.querySelector(this.wrapperElement.dataset.overlay);
  //     const overlayContent = document.querySelector(overlay.dataset.content);

  //     overlayContent.contains(this.wrapperElement) && overlayContent.removeChild(this.wrapperElement);
  //   }

  //   store.commit('system/DESTROY', {
  //     payload: {
  //       general: {
  //         storage: {
  //           directives: {
  //             tooltip: {[this.targetElement.dataset.wabisqueTooltipDirective]: true}
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // update(binding) {
  //   const oldBindingValueStringified = this.targetElement.dataset.wabisqueScrollbarDirectiveBindingValue;

  //   if(!(this.targetElement.hasAttribute('data-wabisque-tooltip-directive-binding-value') && JSON.stringify(binding.value) == oldBindingValueStringified)) {
  //     const validPositions = [
  //       'right',
  //       'bottom',
  //       'left',
  //       'top'
  //     ];
  //     const bindingValue = {
  //       text: binding.value?.text || '',
  //       positions: !(Array.isArray(binding.value?.positions) && binding.value.positions.length) ? Array.from(validPositions) : (
  //         binding.value.positions
  //           .filter(function(position) {
  //             return validPositions.includes(position);
  //           }).length ? binding.value.positions
  //           .filter(function(position) {
  //             return validPositions.includes(position);
  //           }) : Array.from(validPositions)
  //       ),
  //       offset: isNaN(binding.value?.offset) ? 0 : parseInt(binding.value.offset),
  //       backgroundColor: colorService.toCleanRgb(binding.value?.backgroundColor) || colorService.contrast('background'),
  //       textColor: colorService.toCleanRgb(binding.value?.textColor) || colorService.contrast((colorService.toCleanRgb(binding.value?.backgroundColor) || colorService.contrast('background')), 2)
  //     };

  //     this.contentElement.innerText = bindingValue.text;
  //     this.wrapperElement.setAttribute('data-offset', bindingValue.offset.toString());
  //     this.wrapperElement.setAttribute('data-positions', JSON.stringify(bindingValue.positions));
      
  //     this.wrapperElement.style.setProperty('--background-color', bindingValue.backgroundColor);
  //     this.wrapperElement.style.setProperty('--text-color', bindingValue.textColor);

  //     this.wrapperElement.setAttribute('data-binding-value', JSON.stringify(binding.value));
  //   }

  //   const overlayTarget = this.targetElement.closest('[data-overlay]');

  //   if(overlayTarget && this.wrapperElement.dataset.wabisqueTooltipDirectiveOverlay != overlayTarget.dataset.overlay) {
  //     if(this.wrapperElement.hasAttribute('data-overlay')) {
  //       const oldOverlay = document.querySelector(this.wrapperElement.dataset.overlay);
  //       const oldOverlayContent = document.querySelector(oldOverlay.dataset.content);

  //       oldOverlayContent.contains(this.wrapperElement) && oldOverlayContent.removeChild(this.wrapperElement);
  //     }

  //     const overlay = document.querySelector(overlayTarget.dataset.overlay);
  //     const overlayContent = document.querySelector(overlay.dataset.content);

  //     overlayContent.contains(this.wrapperElement) || overlayContent.appendChild(this.wrapperElement);
  //     this.wrapperElement.setAttribute('data-overlay', overlayTarget.dataset.overlay);
  //     this.setPosition(true);
  //   }
  // }
}

export default {
  // mounted(el, binding) {
  //   new Directive(el, binding);
  // },
  // updated(el, binding) {
  //   const directive = store.state.system.general.storage.directives.tooltip[el.dataset.wabisqueTooltipbarDirective];

  //   directive?.update?.(binding);
  // }
}