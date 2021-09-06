import { toCleanRgb } from '@/services/color';
import store from '@/store';

const idGenerator = (function*() {
  let increment = 0;

  while(true) {
    yield `w-directive-scrollbar-${increment}`;
    increment++;
  }
})()

class Directive {
  constructor(el, binding) {
    const el_ref = el;
    const id = idGenerator.next().value;
    const scroll_x_ref = document.createElement('div');
    const scrollXStates = {
      clicked: false,
      disabled: false,
      hidden: true,
      hovered: false,
      inactive: false
    };
    const scroll_y_ref = document.createElement('div');
    const scrollYStates = {
      clicked: false,
      disabled: false,
      hidden: true,
      hovered: false,
      inactive: false
    };
    const thumb_x_ref = document.createElement('div');
    const thumb_y_ref = document.createElement('div');

    let arg;
    let color;
    let maximumScrollLength;
    let minimumScrollLength;
    let mounted = false;
    let oldBinding = binding;

    this.mount = function() {
      if(mounted) return;

      el_ref.append(scroll_x_ref, scroll_y_ref);
      mounted = true;
    }

    this.unmount = function() {
      if(!mounted) return;

      scroll_x_ref.remove();
      scroll_y_ref.remove();
      mounted = false;
    }

    this.update = function(currentBinding) {
      if(!currentBinding) return;

      arg = currentBinding.arg ?? '';
      color = toCleanRgb(currentBinding.value?.color) || toCleanRgb('primary');
      maximumScrollLength = isNaN(currentBinding.value?.maximumScrollLength) ? '100%' : `${parseFloat(currentBinding.value.maximumScrollLength)}px`;
      minimumScrollLength = isNaN(currentBinding.value?.minimumScrollLength) ? '0%' : `${parseFloat(currentBinding.value.minimumScrollLength)}px`;
      oldBinding = currentBinding;

      this.updateInternal();
    }

    this.updateInternal = function() {
      if(!mounted) return;

      if(arg == 'x') scrollYStates.inactive = true;
      else if(arg == 'y') scrollXStates.inactive = true;
      else {
        scrollXStates.inactive = false;
        scrollYStates.inactive = false;
      }

      if(el_ref.clientWidth == el_ref.scrollWidth) scrollXStates.disabled = true;
      else if(!scrollXStates.inactive || scrollXStates.clicked) scrollXStates.disabled = false;

      if(el_ref.clientHeight == el_ref.scrollHeight) scrollYStates.disabled = true;
      else if(!scrollYStates.inactive || scrollYStates.clicked) scrollYStates.disabled = false;

      if(!store.state.SYSTEM.GLOBAL.MATCH_MEDIA.devicePointer) {
        scrollXStates.clicked = false;
        scrollXStates.disabled = false;
        scrollYStates.clicked = false;
        scrollYStates.disabled = false;
      }

      if(scrollXStates.disabled || scrollXStates.inactive) scrollXStates.hovered = false;

      if(scrollYStates.disabled || scrollYStates.inactive) scrollYStates.hovered = false;

      if(scrollXStates.clicked && scrollYStates.clicked) {
        scrollXStates.clicked = false;
        scrollYStates.clicked = false;
      }

      if(scrollXStates.clicked || scrollYStates.clicked) el_ref.setAttribute('w-directive-scrollbar-states-dragging', '');
      else el_ref.removeAttribute('w-directive-scrollbar-states-dragging');

      if(store.state.SYSTEM.GLOBAL.MATCH_MEDIA.devicePointer) el_ref.setAttribute('w-directive-scrollbar-states-has-pointer', '');
      else el_ref.removeAttribute('w-directive-scrollbar-states-has-pointer');

      scroll_x_ref.classList.toggle('state:clicked', scrollXStates.clicked);
      scroll_x_ref.classList.toggle('state:disabled', scrollXStates.disabled);
      scroll_x_ref.classList.toggle('state:hidden', scrollXStates.hidden);
      scroll_x_ref.classList.toggle('state:hovered', scrollXStates.hovered);
      scroll_x_ref.classList.toggle('state:inactive', scrollXStates.inactive);
      scroll_x_ref.classList.toggle('state:scroll-y-active', !scrollYStates.disabled);
      scroll_x_ref.classList.toggle('state:scroll-y-hovered', scrollYStates.hovered);
      scroll_x_ref.style.setProperty('--anchor-x', `${-el_ref.scrollLeft}px`);
      scroll_x_ref.style.setProperty('--anchor-y', `${-el_ref.scrollTop}px`);
      scroll_x_ref.style.setProperty('--color', color);
      scroll_x_ref.style.setProperty('--maximum-scroll-length', maximumScrollLength);
      scroll_x_ref.style.setProperty('--minimum-scroll-length', minimumScrollLength);
      scroll_x_ref.style.setProperty('--progress', `${el_ref.scrollLeft * (scroll_x_ref.clientWidth - thumb_x_ref.clientWidth) / (el_ref.scrollWidth - el_ref.clientWidth)}px`);
      scroll_x_ref.style.setProperty('--total-length', el_ref.scrollWidth);
      scroll_x_ref.style.setProperty('--visible-length', el_ref.clientWidth);

      scroll_y_ref.classList.toggle('state:clicked', scrollYStates.clicked);
      scroll_y_ref.classList.toggle('state:disabled', scrollYStates.disabled);
      scroll_y_ref.classList.toggle('state:hidden', scrollYStates.hidden);
      scroll_y_ref.classList.toggle('state:hovered', scrollYStates.hovered);
      scroll_y_ref.classList.toggle('state:inactive', scrollYStates.inactive);
      scroll_y_ref.classList.toggle('state:scroll-x-active', !scrollXStates.disabled);
      scroll_y_ref.classList.toggle('state:scroll-x-hovered', scrollXStates.hovered);
      scroll_y_ref.style.setProperty('--anchor-x', `${-el_ref.scrollLeft}px`);
      scroll_y_ref.style.setProperty('--anchor-y', `${-el_ref.scrollTop}px`);
      scroll_y_ref.style.setProperty('--color', color);
      scroll_y_ref.style.setProperty('--maximum-scroll-length', maximumScrollLength);
      scroll_y_ref.style.setProperty('--minimum-scroll-length', minimumScrollLength);
      scroll_y_ref.style.setProperty('--progress', `${el_ref.scrollTop * (scroll_y_ref.clientHeight - thumb_y_ref.clientHeight) / (el_ref.scrollHeight - el_ref.clientHeight)}px`);
      scroll_y_ref.style.setProperty('--total-length', el_ref.scrollHeight);
      scroll_y_ref.style.setProperty('--visible-length', el_ref.clientHeight);
    }

    el_ref.setAttribute('w-directive-scrollbar', id);

    scroll_x_ref.classList.toggle('scroll-x', true);
    scroll_x_ref.append(thumb_x_ref);

    scroll_y_ref.classList.toggle('scroll-y', true);
    scroll_y_ref.append(thumb_y_ref);

    thumb_x_ref.classList.toggle('thumb', true);
    thumb_y_ref.classList.toggle('thumb', true);

    store.commit('SYSTEM/GLOBAL/DIRECTIVES/SCROLLBAR/SET', {[id]: this});

    store.watch(function(state, getters) {
      return getters['PREFERENCES/COLOR/actualActiveMode'];
    }, (function() {
      this.update(oldBinding);
    }).bind(this));

    store.watch(function(state) {
      return state.PREFERENCES.COLOR.activeMapping;
    }, (function() {
      this.update(oldBinding);
    }).bind(this));

    store.watch(function(state) {
      return state.SYSTEM.GLOBAL.MATCH_MEDIA.devicePointer;
    }, (function() {
      this.updateInternal();
    }).bind(this));

    addEventListener('mousemove', (function(event) {
      if(scrollXStates.clicked) el_ref.scrollBy(event.movementX * (el_ref.scrollWidth - el_ref.clientWidth) / (scroll_x_ref.clientWidth - thumb_x_ref.clientWidth), 0);
      else if(scrollYStates.clicked) el_ref.scrollBy(0, event.movementY * (el_ref.scrollHeight - el_ref.clientHeight) / (scroll_y_ref.clientHeight - thumb_y_ref.clientHeight));
    }).bind(this));

    addEventListener('mouseup', (function() {
      scrollXStates.clicked = false;
      scrollYStates.clicked = false;
      this.updateInternal();
    }).bind(this));

    el_ref.addEventListener('mouseleave', (function() {
      scrollXStates.hidden = true;
      scrollYStates.hidden = true;
      this.updateInternal();
    }).bind(this));

    el_ref.addEventListener('mouseover', (function() {
      scrollXStates.hidden = false;
      scrollYStates.hidden = false;
      this.updateInternal();
    }).bind(this));

    el_ref.addEventListener('scroll', (function() {
      this.updateInternal();
    }).bind(this));

    scroll_x_ref.addEventListener('mousedown', (function(event) {
      if(event.clientX < thumb_x_ref.getBoundingClientRect().left) {
        el_ref.scrollBy({
          behavior: 'smooth',
          left: -el_ref.clientWidth
        });
      } else if(event.clientX > thumb_x_ref.getBoundingClientRect().right) {
        el_ref.scrollBy({
          behavior: 'smooth',
          left: el_ref.clientWidth
        });
      }
    }).bind(this));

    scroll_x_ref.addEventListener('mouseleave', (function() {
      scrollXStates.hovered = false;
      this.updateInternal();
    }).bind(this));

    scroll_x_ref.addEventListener('mouseover', (function() {
      scrollXStates.hovered = true;
      this.updateInternal();
    }).bind(this));

    scroll_y_ref.addEventListener('mousedown', (function(event) {
      if(event.clientY < thumb_y_ref.getBoundingClientRect().top) {
        el_ref.scrollBy({
          behavior: 'smooth',
          top: -el_ref.clientHeight
        });
      } else if(event.clientY > thumb_y_ref.getBoundingClientRect().bottom) {
        el_ref.scrollBy({
          behavior: 'smooth',
          top: el_ref.clientHeight
        });
      }
    }).bind(this));

    scroll_y_ref.addEventListener('mouseleave', (function() {
      scrollYStates.hovered = false;
      this.updateInternal();
    }).bind(this));

    scroll_y_ref.addEventListener('mouseover', (function() {
      scrollYStates.hovered = true;
      this.updateInternal();
    }).bind(this));

    thumb_x_ref.addEventListener('mousedown', (function() {
      scrollXStates.clicked = true;
      this.updateInternal();
    }).bind(this));

    thumb_y_ref.addEventListener('mousedown', (function() {
      scrollYStates.clicked = true;
      this.updateInternal();
    }).bind(this));
  }
}

export default {
  mounted(el, binding) {
    const directive = store.state.SYSTEM.GLOBAL.DIRECTIVES.SCROLLBAR[el.getAttribute('w-directive-scrollbar')] ?? new Directive(el, binding);

    directive?.mount?.();
    directive?.update?.(binding);
  },
  unmounted(el, binding) {
    const directive = store.state.SYSTEM.GLOBAL.DIRECTIVES.SCROLLBAR[el.getAttribute('w-directive-scrollbar')];

    directive?.unmount?.();
  },
  updated(el, binding) {
    const directive = store.state.SYSTEM.GLOBAL.DIRECTIVES.SCROLLBAR[el.getAttribute('w-directive-scrollbar')];

    directive?.update?.(binding);
  }
}