#!/bin/bash
set -euo pipefail

# Initializes the environment before the first deployment.
# This needs to be run only once.

ssh -i scripts/private-key.pem ec2-user@18.198.50.112 << EOF
  sudo yum update -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 16
  npm i -g yarn
  npm i -g pm2
  mkdir product
EOF