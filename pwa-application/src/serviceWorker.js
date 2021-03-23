const serviceWorkerInitialised = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js');
      // const registrations = await navigator.serviceWorker.register('sw.js');
      // console.log('Service Worker registered');
      // console.log(registrations);
    } catch (err) {
      // console.log('Registration Failed');
      console.log(err);
    }
  }
};

export default serviceWorkerInitialised;
