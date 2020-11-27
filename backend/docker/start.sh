docker-compose -f docker/stack.yml up -d
npm run migrate up
node docker/addMock