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

IMPORTANT - IPFS pinning and gateway is required for the art panels to be rendered. Update sketch.js with the IPFS baseURI to meet your needs.

sketch.js is deployed to ETHFS and DefifaDelegate.sol is updated with the ETHFS file name.

Example of solidity code setting global variables that are passed into the p5js sketch.

```solidity
bytes memory controllerScript = abi.encodePacked(
           'let artWorkIPFS ="',
            artWorkIPFS,
           '";',
            'let scoreCardIPFS ="',
            scoreCardIPFS,
           '";',
            'let buttonImageIPFS ="',
            buttonImageIPFS,
           '";',
           'let txt_1 ="',
            _title,
           '".toUpperCase();let txt_1Size =',
            _titleFontSize,
           ';let txt_1Color = "#17e4f1";let txt_1_x = 40;let txt_1_y = 80;',
           'let txt_4 ="',
             _team,
           '";let txt_4Size =',
            _fontSize,
            ';let txt_4Color = "#fea282";let txt_4_x = 40;let txt_4_y = 130;',
           'let txt_2 ="GAME PHASE: ',
            _gamePhase.toString(), ' OF 4',
           '";let txt_2Size =20;let txt_2Color = "#17e4f1";let txt_2_x = 40;let txt_2_y = 220;',
            'let txt_3 ="',
            _gamePhaseText,
           '";let txt_3Size = 20;let txt_3Color = "#fea282";let txt_3_x = 40;let txt_3_y = 250;',
            'let txt_5 ="TOKEN ID: ',
            _tokenId.toString(),
           '";let txt_5Size = 16;let txt_5Color = "#FFFFFF";let txt_5_x = 40;let txt_5_y = 370;',
            'let txt_6 ="RARITY: ',
            _rarityText,
           '";let txt_6Size = 16;let txt_6Color = "#FFFFFF";let txt_6_x = 40;let txt_6_y = 400;',
            'let font = "data:font/truetype;charset=utf-8;base64,',
            DefifaFontImporter.getSkinnyFontSource(),
            '";',
           // When local testing the p5js js code here.
           // Mainnet deploy remove global constants, minimize and rename file, save to ethfs.xyz, calc buffer size for solidity
        );
        ```
## TODO
- Deploy scripts to remove global variables as they are provided by Defifa contracts
- Minimize the size of the font file. Consider using 
```bash
curl -X POST -s --data-urlencode 'sketch.js' https://javascript-minifier.com/raw > my.min.js
```
- Store on ethjs.xyz
- Add a way to update the font file during create flow

## License
MIT License
