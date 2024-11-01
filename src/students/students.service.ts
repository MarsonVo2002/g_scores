import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { IsNull, LessThan, MoreThanOrEqual, Not, Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,) { }
    async findOne(sbd: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { sbd } });
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
    async findTopTen(): Promise<Student[]> {
        try {
            const students = await this.studentRepository.find({
                where: {
                    toan: Not(IsNull()),
                    vat_li: Not(IsNull()),
                    hoa_hoc: Not(IsNull()),
                },
            });
            return students
            .sort((a, b) =>
                ((b.hoa_hoc ?? 0) + (b.toan ?? 0) + (b.vat_li ?? 0)) -
                ((a.hoa_hoc ?? 0) + (a.toan ?? 0) + (a.vat_li ?? 0))
            )
            .slice(0, 10);
        } catch (error) {
            throw new NotFoundException("Can't find top ten student");
        }

    }
}
