# React + Vite + Tailwind
## Intentional Bug : Camera Stream
> The device's camera stream fails to shut off once a picture is taken due to a hardware resource leak. The camera continues to record in the background as the user interface moves on to the next screen (to dashboard), this is frequently indicated by the active light on the user's webcam. This occurs when the capture function or the unmounting of the camera component do not explicitly stop the MediaStreamTrack.

> I selected this bug because it highlights the importance of proper garbage collection and lifecycle management in React. When dealing with external browser APIs (like WebRTC or media devices), React cannot automatically clean up hardware connections when a component unmounts. In order to avoid memory leaks, battery depletion, and user privacy issues, this bug illustrates a real-world situation where a developer must remember to manually disconnect connections.

## Virtualization calculation
`const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);`

`let renderedNodesCount = Math.floor(windowHeight / itemHeight) + 2 * overscan;`

`renderedNodesCount = Math.min(numberOfItems - startIndex, renderedNodesCount); `
