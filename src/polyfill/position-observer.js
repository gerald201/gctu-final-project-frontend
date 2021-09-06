class PositionObserver {
  constructor(callback) {
    if(typeof callback != 'function') throw new Error(`Provided callback must be a function. '${typeof callback}' provided.`);

    const keys = [
      'bottom',
      'left',
      'right',
      'top',
      'x',
      'y'
    ];
    const map = new Map();

    function loop() {
      const changedEntries = [];
  
      map
        .forEach(function(values, element) {
  
          const check = keys
            .some(function(key) {
              return values[key] != element.getBoundingClientRect()[key];
            });
  
          if(check) {
            const position = keys
              .reduce(function(accumuator, key) {
                accumuator[key] = element.getBoundingClientRect()[key];
                return accumuator;
              }, {});
              
            changedEntries.push({
              position,
              target: element
            });
          }
        });
  
      if(changedEntries.length) {
        changedEntries.forEach(function(entry) {
          map.set(entry.target, Object.assign({}, entry.position));
        });
        callback(changedEntries, this);
      }
  
      requestAnimationFrame(loop);
    }

    this.disconnect = function() {
      map.clear();
    }

    this.observe = function(element) {
      if(!(element instanceof HTMLElement)) throw new Error('\'element\' provided must be instance of \'HTMLElement\'.');

      if(map.has(element)) return;

      const values = keys
        .reduce(function(accumuator, key) {
          accumuator[key] = 0;
          return accumuator;
        }, {});

      map.set(element, values);
    }

    this.unobserve = function(element) {
      if(!(element instanceof HTMLElement)) throw new Error('\'element\' provided must be instance of \'HTMLElement\'.');
  
      if(!map.has(element)) return;
  
      map.delete(element);
    }

    loop();
  }
}

export default PositionObserver;
