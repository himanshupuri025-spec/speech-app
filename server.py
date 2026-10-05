"""
Simple local development server for VoxPulse TTS Studio.
Runs an HTTP server on port 8000 and opens the browser automatically.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS headers and disable caching for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    handler = CustomHTTPHandler
    
    # Try preferred port, or fall back if in use
    for port in [PORT, 8080, 8888, 5000]:
        try:
            with socketserver.TCPServer(("", port), handler) as httpd:
                url = f"http://localhost:{port}/index.html"
                print(f"==================================================")
                print(f" VoxPulse TTS Studio is running at: {url}")
                print(f" Press Ctrl+C to stop the server.")
                print(f"==================================================")
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError:
            print(f"Port {port} is busy, trying next port...")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
