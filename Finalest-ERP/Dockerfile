FROM google/debian:wheezy

# 安装基础工具
RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates

RUN mkdir /nodejs && curl http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

# 安装 NPM
RUN apt-get install npm

# 安装 Vue 和 Cli
RUN npm install vue && \
	npm install --global vue-cli

# 将 NodeJs 添加到环境变量
ENV PATH $PATH:/nodejs/bin

WORKDIR /opt/web
COPY ./ .

RUN npm install
ENTRYPOINT ["npm","build"]