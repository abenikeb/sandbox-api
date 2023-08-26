import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('forumPost')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Public()
  create(@Body() createPostDto: CreatePostDto) {
    // console.log('createPostDto', createPostDto);
    console.log(createPostDto);
    // return this.postService.create(createPostDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
