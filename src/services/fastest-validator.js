import fastestValidator from 'fastest-validator';

const validator = new fastestValidator({
  useNewCustomCheckerFunction: true,
  messages: {notNull: 'The \'{field}\' must not be null!'}
});

export default validator;
