# 基础镜像
FROM node:lts-alpine as server-base
ENV TZ=Asia/Shanghai
WORKDIR /opt/app
COPY taobao.sh ./
RUN sh taobao.sh && apk update && apk add --no-cache tzdata && apk add bash && rm taobao.sh

# 下载运行需要的依赖
FROM server-base as server-prod-deps
COPY package.json ./
RUN yarn --production

# 下载编译需要的依赖
FROM server-base AS server-build-deps
COPY package.json ./
RUN yarn

# 编译代码
FROM server-build-deps AS server-build
COPY . .
RUN yarn build

# 生成镜像
FROM server-base
COPY --from=server-prod-deps /opt/app/node_modules ./node_modules
COPY --from=server-build /opt/app/dist ./
CMD ["node", "main.js"]
