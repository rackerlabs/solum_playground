FROM nginx:latest

# Copy angular files
COPY app /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/

# Open port and start nginx
# EXPOSE 80
# CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

