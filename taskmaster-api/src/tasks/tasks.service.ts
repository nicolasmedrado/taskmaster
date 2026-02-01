import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}
  
  async create(createTaskDto: CreateTaskDto) {
  const created = await this.taskModel.create(createTaskDto);
  return created;
  }

  async findAll({ page, limit }: PaginationDto) {
  const safePage = Math.max(page ?? 1, 1);

  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 50;
  const safeLimit = Math.min(Math.max(limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);

  const skip = (safePage - 1) * safeLimit;

  return this.taskModel
    .find()
    .skip(skip)
    .limit(safeLimit)
    .lean();
}


  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
