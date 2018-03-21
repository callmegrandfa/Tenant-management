FROM google/debian:wheezy

# ��װ��������
RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates

RUN mkdir /nodejs && curl http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

# ��װ NPM
RUN apt-get install npm

# ��װ Vue �� Cli
RUN npm install vue && \
	npm install --global vue-cli

# �� NodeJs ��ӵ���������
ENV PATH $PATH:/nodejs/bin

WORKDIR /opt/web
COPY ./ .

RUN npm install
ENTRYPOINT ["npm","build"]