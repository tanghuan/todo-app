
# 基础镜像
FROM node:lts-alpine as client-base
ENV TZ=Asia/Shanghai
WORKDIR /opt/app
COPY taobao.sh ./
RUN sh taobao.sh

# 下载编译需要的依赖
FROM client-base AS client-build-deps
COPY package.json ./
RUN yarn

# 编译代码
FROM client-build-deps AS client-build
COPY . .
RUN yarn build

# 生成镜像
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=client-build /opt/app/build /usr/share/nginx/html
