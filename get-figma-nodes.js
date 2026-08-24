require('dotenv').config();
const https = require('https');
const fs = require('fs');

const API_KEY = process.env.FIGMA_TOKEN;
const FILE_KEY = 'GHTvpoM4HvoxzVgNA4ebt6';
const NODE_IDS = '2444:3898,2444:3901,2444:3904,2444:3907,2473:7542';

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${FILE_KEY}/nodes?ids=${NODE_IDS}`,
    headers: {
        'X-Figma-Token': API_KEY
    }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const response = JSON.parse(data);
        const parsedNodes = Object.keys(response.nodes).map(id => {
            const doc = response.nodes[id].document;
            return {
                id,
                name: doc.name,
                type: doc.type,
                absoluteBoundingBox: doc.absoluteBoundingBox,
                style: doc.style
            };
        });
        fs.writeFileSync('figma-parsed.json', JSON.stringify(parsedNodes, null, 2), 'utf8');
    });
});
