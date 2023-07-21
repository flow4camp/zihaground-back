import { SubwayRoom } from './subwayRoom.entity';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { ChatMessageService } from './chatMessage.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: true,
})
export class SubwayRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  //   constructor(private readonly chatMessageService: ChatMessageService) {
  //     console.log('ChatGateway constructor');
  //   }
  constructor() {
    console.log('ChatGateway constructor');
  }
  @WebSocketServer() server: Server;

  connectedUsers: Map<string, Socket> = new Map();
  subwayRoomUsers: Map<number, Socket[]> = new Map();

  //------------------------[ Connection ]-----------------------------

  //연결 되었을 때
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(
      `[ Connected ]---- userId :  ${userId}, clientId : ${client.id}`,
    );
    this.connectedUsers.set(userId, client);
    this.server.emit('user-connected', userId);
  }

  //연결이 끊겼을 때
  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    console.log(
      `[ ! disconnected ] userId :  ${userId}, clienti\Id : ${client.id}`,
    );
    //subwayRoom User 리스트에서 제거
    this.subwayRoomUsers.forEach((sockets, roomId) => {
      const updatedSockets = sockets.filter(
        (socket) => socket.id !== client.id,
      );
      if (updatedSockets.length === 0) {
        this.subwayRoomUsers.delete(roomId);
      } else {
        //같은 방 유저에게 소켓 전송
        updatedSockets.forEach((socket) => {
          socket.emit('user-exited ', userId);
        });
        this.subwayRoomUsers.set(roomId, updatedSockets);
      }
    });
    //connected 리스트에서 제거
    this.connectedUsers.delete(userId);
    this.server.emit('user-disconnected', userId);
  }

  //------------------------[ Handle Subway Room ]-----------------------------

  //유저가 방에 들어왔을 때
  @SubscribeMessage('enter-room')
  handleEnterRoom(client: Socket, chatRoomId: number) {
    const userId = client.handshake.query.userId as string;
    let isDuplicate = false;
    if (!this.subwayRoomUsers.has(chatRoomId)) {
      this.subwayRoomUsers.set(chatRoomId, []);
    }
    //중복 방지
    const userSockets = this.subwayRoomUsers.get(chatRoomId);
    userSockets.forEach((user) => {
      if (user.id === client.id) {
        isDuplicate = true;
        return;
      }
    });
    if (isDuplicate) {
      return;
    }
    userSockets.push(client);
    console.log(
      `[ Enter ]--------- userId :  ${userId} entered the room no.${chatRoomId}`,
    );
    //같은 방 유저에게 소켓 전송
    userSockets.forEach((user) => {
      user.emit('user-entered', userId);
    });
  }

  //유저가 방에서 나갔을 때
  @SubscribeMessage('exit-room')
  handleExitRoom(client: Socket, chatRoomId: number) {
    const userId = client.handshake.query.userId as string;
    console.log(
      `[ Exit ]--------- userId :  ${userId} exited the room no.${chatRoomId}`,
    );
    this.subwayRoomUsers.forEach((sockets, roomId) => {
      const updatedSockets = sockets.filter(
        (socket) => socket.id !== client.id,
      );
      if (updatedSockets.length === 0) {
        this.subwayRoomUsers.delete(roomId);
      } else {
        //같은 방 유저에게 소켓 전송
        console.log(updatedSockets.length);
        updatedSockets.forEach((socket) => {
          socket.emit('user-exited', userId);
        });
        this.subwayRoomUsers.set(roomId, updatedSockets);
      }
    });
  }

  //유저로부터 메세지를 받았을 때
  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, data: any[]) {
  //     this._handleMessage(client, data[0], data[1], data[2], data[3]);
  //   }
  //   async _handleMessage(
  //     client: Socket,
  //     chatRoomId: number,
  //     type: number,
  //     message: string,
  //     profileImage: string,
  //   ) {
  //     const userId = client.handshake.query.userId as string;
  //     console.log(
  //       `[ Message ]------- userId :  ${userId}, roomId : ${chatRoomId}, message: : ${message}`,
  //     );
  //     await this.chatMessageService.create(userId, {
  //       chatRoomId: chatRoomId,
  //       type: type,
  //       contents: message,
  //       profileImage: profileImage,
  //     });
  //     //같은 방 유저에게 소켓 전송
  //     const userSockets = this.subwayRoomUsers.get(chatRoomId);
  //     if (userSockets !== undefined) {
  //       userSockets.forEach((user) => {
  //         user.emit('message', {
  //           message: message,
  //           from: userId,
  //           type: type,
  //           profileImage: profileImage,
  //           createAt: new Date(),
  //         });
  //       });
  //     }
  //   }

  //------------------------[ Handle Chat User List ]-----------------------------
  //접속중인 유저 리스트 보기
  @SubscribeMessage('get-user-list')
  handleGetUserList(client: Socket, chatRoomId: number) {
    const userId = client.handshake.query.userId as string;
    console.log(
      `[ Get User List ]- userId :  ${userId}, roomId : ${chatRoomId}\n`,
    );
    const userSockets = this.subwayRoomUsers.get(chatRoomId);
    if (userSockets !== undefined) {
      const userList = userSockets.map((user) => user.handshake.query.userId);
      client.emit('user-list', userList);
    }
    console.log(`[ User List ]----- ${userSockets}\n`);
    client.emit('user-list', []);
  }
}
