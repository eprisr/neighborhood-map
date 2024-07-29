import { useRef, useCallback, useEffect, useState } from 'react';

const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null);

  const setStateCallback = useCallback(
    (newState, cb) => {
      cbRef.current = cb;
      setState(newState);
    },
    []
	);
	
	function isFunction(cbRef) {
		return typeof cbRef === 'function';
	}

  useEffect(() => {
    if (isFunction(cbRef?.current)) {
      cbRef?.current?.(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
};

export default useStateCallback;