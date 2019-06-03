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
            
            if action == 'OPEN' and not isMaster and not isSlave:
                if not master:
                    print('Master is assigned')
                    isMaster = True
                    master = websocket
                    await master.send('{"type" : "MASTER"}')
                elif not slave:
                    print('Slave is assigned')
                    isSlave = True
                    slave = websocket
                    await slave.send('{"type" : "SLAVE"}')
                    await master.send('{"action" : "REFRESH"}')

            elif action == 'MOVE' and master:
                await master.send(x[1])
                
            elif action == 'GAME' and slave:
                await slave.send(x[1])
    finally:
        if isMaster:
            print('Master disconnected')
            master = None
        if isSlave:
            print('Slave disconnected')
            slave = None


start_server = websockets.serve(server, '192.168.25.25', 9898)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
