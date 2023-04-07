# p5JS_ArtPanels

Defifa.net p5js Art Panels to hold tournament art and dynamic scorecard from onchain data.

## Overview
This is a p5js sketch that renders a scorecard and art panels for the Defifa.net tournament. The scorecard is rendered from onchain data and the art panels are rendered from a json file.

defifa tokenUriResolver is used to pull in onchain stats from the Defifa tournament and will build an encoded html file that contains the NFT artwork and a dynamic scorecard. We are using scripty.sol to build the html output. https://int-art.gitbook.io/scripty.sol/ 

## Local Development of Art Panels (ie not using the onchain data)
Clone repo and launch index.html in browser.
Edit sketch.js to change the art panels.

font.js is a font file for the scorecard. It is a base64 encoded version of the font file. To update the font file for local use go to https://cpsls.app/

This repo represents the onchain data as global variables. At time of tournament launch the onchain data will be pulled in from the tokenUriResolver and the global variables will be populated. The global variables are used to render the scorecard and art panels.

## Deployment

See Defifa repo for contract deployment instructions.
Art work is deployed to IPFS and the tokenUriResolver is updated with the IPFS hash.

sketch.js is deployed to ETHFS and DefifaDelegate.sol is updated with the ETHFS file name.

## TODO
- Deploy scripts to remove global variables as they are provided by Defifa contracts
- Minimize the size of the font file
- Add a way to update the font file during create flow

## License
MIT License
