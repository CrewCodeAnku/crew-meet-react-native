import {useState, useEffect, useCallback} from 'react';

function useForm(stateSchema: any, validationSchema: any = {}, callback: any) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isInputFieldRequired && !stateValue) || stateError;
    });
    return hasErrorInState;
  }, [state, validationSchema]);

  useEffect(() => {
    setDisable(true);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const handleOnChange = useCallback(
    (eventname: any, eventvalue: any) => {
      setIsDirty(true);
      const name = eventname;
      const value = eventvalue;
      let error = '';
      if (validationSchema[name].required) {
        if (value instanceof Array) {
          if (value.length === 0) {
            error = 'This is required field.';
          }
        } else {
          if (!value) {
            error = 'This is required field.';
          }
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error;
        }
      }

      setState((prevState: any) => ({
        ...prevState,
        [name]: {value, error},
      }));
    },
    [validationSchema],
  );

  const handleOnSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!validateState()) {
        callback(state);
      }
    },
    [state, callback, validateState],
  );

  return {state, disable, handleOnChange, handleOnSubmit};
}

export default useForm;
