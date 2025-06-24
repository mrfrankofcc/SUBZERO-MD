FROM node:20-bullseye
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/mrfrankofcc/SUBZERO-MD.git /home/node/JINX-BOT 
WORKDIR /home/node/JINX-BOT 
RUN chmod -R 777 /home/node/JINX-BOT/
RUN yarn install --network-concurrency 1 --ignore-engines
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
