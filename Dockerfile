FROM node:16


ENV APP_ROOT /home/app
ENV SRC_DIR ./node_modules ./public ./src

#ENV NODE_OPTIONS "--max_old_space_size=4096"
WORKDIR $APP_ROOT
COPY . $APP_ROOT

# replace with yarn since NPM I is breaking
#RUN npm i
#RUN npm install next
#RUN npm run build

RUN yarn
RUN yarn add next
RUN yarn run build

EXPOSE 3000
CMD ["npm", "start", "-p" ,"3000"]
