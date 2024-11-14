from livereload import Server
import os

server = Server()

# Observa solo los archivos HTML y CSS en subdirectorios específicos
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.css'):
            path = os.path.join(root, file)
            server.watch(path)

# Inicia el servidor
server.serve(root='.', host='0.0.0.0', port=8000)
