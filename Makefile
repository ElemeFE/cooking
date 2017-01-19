bootstrap:
	./node_modules/.bin/lerna bootstrap
	cd packages/cooking-cli; \
	sh scripts/bootstrap.sh; \
	npm i

bootstrap-cn:
	cd packages/cooking; \
	npm --registry=https://registry.npm.taobao.org i; \
	npm --registry=https://registry.npm.taobao.org i babel-core babel-loader \
	css-loader file-loader postcss postcss-loader html-loader html-webpack-plugin \
	json-loader style-loader url-loader webpack webpack-dev-server \
	extract-text-webpack-plugin@beta; \
	cd ../cooking-cli; \
	sh scripts/bootstrap.sh; \
	npm --registry=https://registry.npm.taobao.org i