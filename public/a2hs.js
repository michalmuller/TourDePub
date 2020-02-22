// let deferredPrompt;

//     window.addEventListener('beforeinstallprompt', function(event) {
//       // Prevent Chrome 67 and earlier from automatically showing the prompt
//       e.preventDefault();
//       // Stash the event so it can be triggered later.
//       deferredPrompt = e;
//     });

//     // Installation must be done by a user gesture! Here, the button click
//     btnAdd.addEventListener('click', (e) => {
//       // hide our user interface that shows our A2HS button
//       btnAdd.style.display = 'none';
//       // Show the prompt
//       deferredPrompt.prompt();
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice
//         .then((choiceResult) => {
//           if (choiceResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//           } else {
//             console.log('User dismissed the A2HS prompt');
//           }
//           deferredPrompt = null;
//         });
//     });

// // Detects if device is on iOS 
// const isIos = () => {
//   const userAgent = window.navigator.userAgent.toLowerCase();
//   return /iphone|ipad|ipod/.test(userAgent);
// }
// // Detects if device is in standalone mode
// const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// // Checks if should display install popup notification:
// if (isIos() && !isInStandaloneMode()) {
//   this.setState({ showInstallMessage: true });
// }