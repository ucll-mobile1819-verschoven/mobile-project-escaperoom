import socketserver

master = None
slave = None

class MyTCPHandler(socketserver.StreamRequestHandler):

    def handle(self):
        action = self.rfile.readline().strip()
        print(action)
        
        if action == 'OPEN':
            if not master:
                master = self.wfile
                master.write('{"type" : "MASTER"}')
            elif not slave:
                slave = self.wfile
                slave.write('{"type" : "SLAVE"}')
                master.write('{"action" : "REFRESH"}')
                
        elif action == 'CLOSE':
            if master:
                master.write('{"action" : "CLOSE"}')
                master = None
            if slave:
                slave.write('{"action" : "CLOSE"}')
                slave = None

        elif action == 'MOVE' and master:
            master.write(self.rfile.readline().strip())
            
        elif action == 'GAME' and slave:
            slave.write(self.rfile.readline().strip())
            

if __name__ == "__main__":
    HOST, PORT = "192.168.0.121", 9898

    server = socketserver.TCPServer((HOST, PORT), MyTCPHandler)

    server.serve_forever()
