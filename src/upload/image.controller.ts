import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  @Get(':filename')
  serveImage(@Param('filename') filename, @Res() res): void {
    res.sendFile(filename, { root: join(__dirname, '../..', 'uploads') });
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  UploadedFile(@UploadedFile() File: Express.Multer.File): any {
    const URL = `http://143.248.200.195:80/image/${File.filename}`;
    console.log(URL);
    return { url: URL };
  }
}
