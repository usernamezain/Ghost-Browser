FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY=:1

# Install KasmVNC/X11 dependencies and other requirements
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    sudo \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxtst6 \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libxss1 \
    libasound2 \
    xvfb \
    x11vnc \
    openbox \
    novnc \
    websockify \
    && rm -rf /var/lib/apt/lists/*

# Assuming Ghost Browser is placed in /opt/ghost-browser/
# In a real scenario, we would COPY or download the built binary here
RUN mkdir -p /opt/ghost-browser

WORKDIR /opt/ghost-browser

# Create a non-root user for security
RUN useradd -m -s /bin/bash ghostuser && \
    chown -R ghostuser:ghostuser /opt/ghost-browser

USER ghostuser

# Create a startup script
RUN echo '#!/bin/bash\n\
export DISPLAY=:1\n\
Xvfb :1 -screen 0 1920x1080x24 &\n\
sleep 2\n\
openbox-session &\n\
x11vnc -display :1 -nopw -listen localhost -xkb -ncache 10 -ncache_cr -forever &\n\
websockify --web=/usr/share/novnc/ --wrap-mode=ignore 8080 localhost:5900 &\n\
/opt/ghost-browser/ghost-browser\n\
' > /tmp/start.sh && chmod +x /tmp/start.sh

EXPOSE 8080

ENTRYPOINT ["/tmp/start.sh"]
