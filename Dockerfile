FROM nginx:latest
 
# Copy angular files
COPY app /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/

