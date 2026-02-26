import http.server
import socketserver
import os

os.chdir("/Users/mohammedalsaeedi/Documents/\u0634\u0631\u0643\u0629 \u0645\u0634\u0627\u0631\u064a \u0628\u0646 \u0628\u0646\u062f\u0631 \u0628\u0646 \u062c\u0644\u0648\u064a \u0644\u0644\u0645\u062d\u0627\u0645\u0627\u0629")

PORT = 3456
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
