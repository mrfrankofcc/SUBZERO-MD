FROM node:20-bookworm
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/mrfrankofcc/SUBZERO-MD.git /home/node/SUBZERO-MD
WORKDIR /home/node/SUBZERO-MD
RUN chmod -R 777 /home/node/SUBZERO-MD/
RUN yarn install --network-concurrency 1 --ignore-engines
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
