import { SubwayRoom } from './subwayRoom.entity';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SubwayRoomService } from './subwayRoom.service';
import { UserService } from '../user/user.service';
// import { ChatMessageService } from './chatMessage.service';

@WebSocketGateway({
  namespace: 'game',
  cors: true,
})
export class SubwayRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  //   constructor(private readonly chatMessageService: ChatMessageService) {
  //     console.log('ChatGateway constructor');
  //   }
  constructor(
    private readonly subwayRoomService: SubwayRoomService,
    private readonly userService: UserService,
  ) {
    console.log('ChatGateway constructor');
  }
  @WebSocketServer() server: Server;

  waitingUsers: Map<string, Socket> = new Map();
  playingUsers: Map<number, Socket> = new Map();
  playingGames: Map<number, SubwayRoom> = new Map();

  //------------------------[ Connection ]-----------------------------

  //연결 되었을 때
  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    const subwayId = client.handshake.query.subwayId as string;
    console.log(
      `[ Connected ]---- userId :  ${userId}, subwayId : ${subwayId}`,
    );
    const waitingUser = this.waitingUsers.get(subwayId);
    if (waitingUser === undefined) {
      this.waitingUsers.set(subwayId, client);
      client.emit('game-waiting');
    } else {
      // this.connectedUsers.set(String(userId), client);
      const fir = await this.userService.findById(
        Number(waitingUser.handshake.query.userId),
      );
      const sec = await this.userService.findById(Number(userId));
      const game = await this.subwayRoomService.create({
        subwayNum: subwayId,
        users: [fir, sec],
      });
      game.firSocket = waitingUser;
      game.secSocket = client;
      console.log(
        `[ Matching ]---- userId :  ${userId}, subwayId : ${subwayId}`,
      );
      this.playingGames.set(game.id, game);
      this.waitingUsers.delete(subwayId);
      waitingUser.emit('game-start', {
        opp: sec,
        gameId: game.id,
        turn: true,
      });
      client.emit('game-start', { opp: fir, gameId: game.id, turn: false });
    }
  }

  //연결이 끊겼을 때
  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const subwayId = client.handshake.query.subwayId as string;
    console.log(
      `[ ! disconnected ] userId :  ${userId}, clientiId : ${client.id}`,
    );
    this.playingUsers.delete(Number(userId));
    this.waitingUsers.delete(subwayId);
    this.playingGames.forEach((game, roomId) => {
      if (game.firSocket.id === client.id) {
        game.secSocket.emit('game-win');
        game.secSocket.disconnect();
        this.playingGames.delete(roomId);
      }
      if (game.secSocket.id === client.id) {
        game.firSocket.emit('game-win');
        game.firSocket.disconnect();
        this.playingGames.delete(roomId);
      }
    });
  }

  @SubscribeMessage('game-select')
  handleGameSelect(client: Socket, data: any[]) {
    this._handleGameSelect(client, data);
  }
  async _handleGameSelect(client: Socket, data: any[]) {
    const userId = client.handshake.query.userId as string;
    const subwayRoomId = data[0] as string;
    const select = data[1] as number;
    // console.log(subwayRoomId);
    const game = this.playingGames.get(Number(subwayRoomId));
    // console.log(game);
    if (userId === game.firSocket.handshake.query.userId) {
      //waiting
      if (game.secSelect === null || game.secSelect === undefined) {
        game.firSelect = select;
        this.playingGames.set(Number(subwayRoomId), game);
        return;
      } else {
        //match
        if (game.secSelect === select) {
          // fir's turn
          if (game.turn % 2 === 0) {
            game.firSocket.emit('game-match-win', select);
            game.secSocket.emit('game-match-lose', select);
            game.secHp -= 10;
          } else {
            // sec's turn
            game.firSocket.emit('game-match-lose', select);
            game.secSocket.emit('game-match-win', select);
            game.firHp -= 10;
          }
          //mismatch
        } else {
          // fir's turn
          if (game.turn % 2 === 0) {
            game.firSocket.emit('game-mismatch-lose', game.secSelect);
            game.secSocket.emit('game-mismatch-win', select);
            game.firHp -= 10;
          } else {
            // sec's turn
            game.firSocket.emit('game-mismatch-win', game.secSelect);
            game.secSocket.emit('game-mismatch-lose', select);
            game.secHp -= 10;
          }
        }
        game.turn++;
        this.playingGames.set(Number(subwayRoomId), game);
      }
    } else {
      if (game.firSelect === null || game.firSelect === undefined) {
        game.secSelect = select;
        this.playingGames.set(Number(subwayRoomId), game);
        return;
      } else {
        //match
        if (game.firSelect === select) {
          // fir's turn
          if (game.turn % 2 === 0) {
            game.firSocket.emit('game-match-win', select);
            game.secSocket.emit('game-match-lose', select);
            game.secHp -= 10;
          } else {
            // sec's turn
            game.firSocket.emit('game-match-lose', select);
            game.secSocket.emit('game-match-win', select);
            game.firHp -= 10;
          }
          //mismatch
        } else {
          // fir's turn
          if (game.turn % 2 === 0) {
            game.firSocket.emit('game-mismatch-lose', select);
            game.secSocket.emit('game-mismatch-win', game.firSelect);
            game.firHp -= 10;
          } else {
            // sec's turn
            game.firSocket.emit('game-mismatch-win', select);
            game.secSocket.emit('game-mismatch-lose', game.firSelect);
            game.secHp -= 10;
          }
        }
        game.turn++;
        this.playingGames.set(Number(subwayRoomId), game);
      }
    }
    game.firSelect = null;
    game.secSelect = null;
    console.log(`-- fir : ${game.firHp}, sec : ${game.secHp} ----`);
    if (game.firHp === 0) {
      game.firSocket.emit('game-over');
      game.secSocket.emit('game-win');
      this.playingGames.delete(Number(subwayRoomId));
      game.firSocket.disconnect();
      game.secSocket.disconnect();
    }
    if (game.secHp === 0) {
      game.firSocket.emit('game-win');
      game.secSocket.emit('game-over');
      this.playingGames.delete(Number(subwayRoomId));
      game.firSocket.disconnect();
      game.secSocket.disconnect();
    }
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
  // @SubscribeMessage('get-user-list')
  // handleGetUserList(client: Socket, chatRoomId: number) {
  //   const userId = client.handshake.query.userId as string;
  //   console.log(
  //     `[ Get User List ]- userId :  ${userId}, roomId : ${chatRoomId}\n`,
  //   );
  //   const userSockets = this.subwayRoomUsers.get(chatRoomId);
  //   if (userSockets !== undefined) {
  //     const userList = userSockets.map((user) => user.handshake.query.userId);
  //     client.emit('user-list', userList);
  //   }
  //   console.log(`[ User List ]----- ${userSockets}\n`);
  //   client.emit('user-list', []);
  // }
}
