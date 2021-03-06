using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace WebApplicationBasic.Middleware.WebSocketManager
{
    public class MulticastSocketHandler : WebSocketHandler
    {
        public MulticastSocketHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);
            // var socketId = WebSocketConnectionManager.GetId(socket);
            // await SendMessageToAllAsync($"{socketId} is now connected");
        }

        public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            await SendMessageToAllAsync(message);
        }
    }
}