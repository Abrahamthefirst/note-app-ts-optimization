// I want it to get the value in localstorage and return it as the default value
// if there's no value in local storage it should return the initial value
// update the value in local storage when the state value changes

import { useEffect, useState } from 'react';

export const useLocalStorage = <T,>(key: string, initValue: T) => {
  const getLocalValue = (key: string, initValue: any) => {
    const stringLocalValue = localStorage.getItem(key);
    if (stringLocalValue == null || stringLocalValue == undefined)
      return initValue;
    else {
      const parsedValue = JSON.parse(stringLocalValue);
      if (typeof parsedValue === 'function') return parsedValue();
      else return parsedValue;
    }
  };

  const [value, setValue] = useState(getLocalValue(key, initValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};
