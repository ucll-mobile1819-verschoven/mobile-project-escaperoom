import asyncio
import websockets

master = None
slave = None

async def server(websocket, path):
    global master
    global slave

    isSlave = False
    isMaster = False
    
    try:
        while(True):
            
            x = (await websocket.recv()).split()
            action = x[0]
            
            print(action)
            
            if action == 'OPEN':
                if not master:
                    isMaster = True
                    master = websocket
                    await master.send('{"type" : "MASTER"}')
                elif not slave:
                    isSlave = True
                    slave = websocket
                    await slave.send('{"type" : "SLAVE"}')
                    await master.send('{"action" : "REFRESH"}')
                    
            elif action == 'CLOSE':
                if isMaster:
                    await master.send('{"action" : "CLOSE"}')
                    master = None
                    return
                if isSlave:
                    await slave.send('{"action" : "CLOSE"}')
                    slave = None
                    return

            elif action == 'MOVE' and master:
                await master.send(x[1])
                
            elif action == 'GAME' and slave:
                await slave.send(x[1])
    finally:
        if isMaster:
            master = None
        if isSlave:
            slave = None


start_server = websockets.serve(server, '192.168.0.121', 9898)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
