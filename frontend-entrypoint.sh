#!/usr/bin/env sh
set -eu

envsubst '${API_GATEWAY_SVC_SERVICE_PORT} ${API_GATEWAY_SVC_SERVICE_HOST}' < /usr/local/nginx/conf/nginx.conf.template > /usr/local/nginx/conf/nginx.conf

exec "$@"