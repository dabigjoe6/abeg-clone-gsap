//debounce function
function debounce(fn, debounce_TIME_OUT) {
  console.log('debouncing')
  let timeOut;
  let alreadyRanOnUpdate = false;

  function setAlreadyRanOnUpdate(bool) {
    alreadyRanOnUpdate = bool;
  }

  const fnCaller = (args) => {
    clearTimeout(timeOut);

    !alreadyRanOnUpdate && fn(args);

    setAlreadyRanOnUpdate(true);

    timeOut = setTimeout(() => {
      setAlreadyRanOnUpdate(false);
    }, debounce_TIME_OUT);
  };

  return fnCaller;
}
