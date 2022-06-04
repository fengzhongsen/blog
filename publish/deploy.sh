cd ~/blog
git checkout .

echo "Pulling newest code from github..."
git pull

echo "Installing dependent packages..."
yarn

echo "Building..."
yarn build

echo "Uploading..."
cp -rf docs/.vuepress/dist/ /usr/share/nginx/html/fblog
cp -f publish/nginx.conf /etc/nginx/conf.d/fblog.conf

echo "Soon be completed."
nginx reload -S

echo "Completed!"