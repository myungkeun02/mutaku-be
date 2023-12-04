// import { Controller, Post, Get, Body, Param } from '@nestjs/common';
// import { GameService } from './game.service';
// import { SubmitAnswerDto, EndGameDto } from './dto';
// import { PlayGameDto } from './dto/play-game.dto';

// @Controller('games')
// export class GameController {
//   constructor(private readonly gameService: GameService) {}

//   @Get(':roomId/play')
//   async playGame(
//     @Param('roomId') roomId: number,
//     @Body() playGameDto: PlayGameDto,
//   ) {
//     return this.gameService.playGame(roomId, playGameDto);
//   }

//   @Post(':roomId/submit')
//   async submitAnswer(
//     @Param('roomId') roomId: number,
//     @Body() submitAnswerDto: SubmitAnswerDto,
//   ) {
//     return this.gameService.submitAnswer(roomId, submitAnswerDto);
//   }

//   @Post(':roomId/end')
//   async endGame(
//     @Param('roomId') roomId: number,
//     @Body() endGameDto: EndGameDto,
//   ) {
//     return this.gameService.endGame(roomId, endGameDto);
//   }
// }
