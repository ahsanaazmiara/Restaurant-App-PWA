/* eslint-disable linebreak-style */

// Function to register the service worker
const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in the browser');
    return;
  }

  try {
    // Dynamically import the Workbox library only when needed
    const { Workbox } = await import('workbox-window');

    // Initialize and register the service worker
    const wb = new Workbox('./sw.bundle.js');
    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
  }
};

export default swRegister;
