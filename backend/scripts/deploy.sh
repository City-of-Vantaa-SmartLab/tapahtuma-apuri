#!/bin/bash

ssh -i scripts/private-key.pem FILL_ME_IN@FILL_ME_IN "sudo rm -R product && mkdir product"

echo "[DEPLOY SCRIPT 1/3] Copying to EC2 (including build) ... "
scp -r -i scripts/private-key.pem package.json build src yarn.lock migrations env webpack.config.js webpack.prod.config.js FILL_ME_IN@FILL_ME_IN:/home/FILL_ME_IN/product

echo "[DEPLOY SCRIPT 2/3] Restaring the remote..."
ssh -i scripts/private-key.pem FILL_ME_IN@FILL_ME_IN "cd product && . ./env/production.sh && yarn install && yarn migrate-prod && yarn global add pm2 && pm2 flush && pm2 start src/server --env production"
echo "[DEPLOY SCRIPT 3/3] Deployment done."