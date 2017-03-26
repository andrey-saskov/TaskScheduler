using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace WebApplicationBasic.Handlers
{
    public class SocketHandler
    {
        private static readonly ConcurrentBag<WebSocket> sockets = new ConcurrentBag<WebSocket>();
        WebSocket socket;

        SocketHandler(WebSocket socket)
        {
            this.socket = socket;
        }

        async Task EchoLoop()
        {
            var buffer = new byte[4096];
            var seg = new ArraySegment<byte>(buffer);
            while (this.socket.State == WebSocketState.Open)
            {
                var incoming = await this.socket.ReceiveAsync(seg, CancellationToken.None);
                var outgoing = new ArraySegment<byte>(buffer, 0, incoming.Count);
                foreach(var socket in sockets) {
                    if (socket.State == WebSocketState.Open) {
                        await socket.SendAsync(outgoing, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                }
            }
        }

        static async Task Acceptor(HttpContext context, Func<Task> n)
        {
             if (!context.WebSockets.IsWebSocketRequest)
                return;

            var socket = await context.WebSockets.AcceptWebSocketAsync();
            var h = new SocketHandler(socket);
            sockets.Add(socket);
            await h.EchoLoop();
        }

        public static void Map(IApplicationBuilder app)
        {
            app.Use(SocketHandler.Acceptor);
        }
    }
}