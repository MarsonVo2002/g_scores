import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,) { }
    async findOne(sbd: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { sbd } });
        this.studentRepository.count
        if (!student) {
            throw new NotFoundException(`Student with sbd ${sbd} not found`);
        }
        return student;
    }
    async Report(): Promise<Record<string, Record<string, number>>> {
        const report: Record<string, Record<string, number>> = {};
        const subjects = [
            'toan',
            'ngu_van',
            'ngoai_ngu',
            'vat_li',
            'hoa_hoc',
            'sinh_hoc',
            'lich_su',
            'dia_li',
            'gdcd'
        ];
        for (const subject of subjects) {
            const counts = {
                'Excellent': await this.studentRepository.count({
                    where: { [subject]: MoreThanOrEqual(8) },
                }),
                'Good': await this.studentRepository.count({
                    where: {
                        [subject]: MoreThanOrEqual(6),
                        [subject]: LessThan(8),
                    },
                }),
                'Average': await this.studentRepository.count({
                    where: {
                        [subject]: MoreThanOrEqual(4),
                        [subject]: LessThan(6),
                    },
                }),
                'Poor': await this.studentRepository.count({
                    where: { [subject]: LessThan(4) },
                }),
            };

            report[subject] = counts;
        }
        return report
    }
}
