import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './entity/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }
  @Get('feature-report')
  async getFeatureReport() {
    console.log("Get Report");
    return this.studentsService.Report();
  }
  @Get(':sbd')
  async getStudentBySbd(@Param('sbd') sbd: string): Promise<Student> {
    console.log("Get student");
    return this.studentsService.findOne(sbd);
  }
}
