rm -rf ./dist &&
parcel build -d ./dist --public-url ./ ./index.html &&
cp ./dist/index.html ./index.html &&
cp ./dist/*.js ./ && cp ./dist/*.css ./
