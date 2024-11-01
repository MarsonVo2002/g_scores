import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entity/student.entity';
@Injectable()
export class SeedService {

    constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {

    }
    async seed(filepath: string): Promise<void> {
        await this.studentRepository.clear();
        const data = [];
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (row) => {
                const modifiedRow = {
                    sbd: row['sbd'],
                    toan: row['toan'] ? parseFloat(row['toan']) : null,
                    ngu_van: row['ngu_van'] ? parseFloat(row['ngu_van']) : null,
                    ngoai_ngu: row['ngoai_ngu'] ? parseFloat(row['ngoai_ngu']) : null,
                    vat_li: row['vat_li'] ? parseFloat(row['vat_li']) : null,
                    hoa_hoc: row['hoa_hoc'] ? parseFloat(row['hoa_hoc']) : null,
                    sinh_hoc: row['sinh_hoc'] ? parseFloat(row['sinh_hoc']) : null,
                    lich_su: row['lich_su'] || null,
                    dia_li: row['dia_li'] || null,
                    gdcd: row['gdcd'] || null,
                    ma_ngoai_ngu: row['ma_ngoai_ngu'] || null
                };

                data.push(modifiedRow);

            })
            .on('end', async () => {
                console.log('All rows processed. Data:', data);
                const chunkSize = 5000; // Adjust based on your database limits
                for (let i = 0; i < data.length; i += chunkSize) {
                    const chunk = data.slice(i, i + chunkSize);
                    try {
                        await this.studentRepository.insert(chunk); // Insert in batches
                        console.log(`Inserted records ${i + 1} to ${Math.min(i + chunkSize, data.length)}`);
                    } catch (error) {
                        console.error('Error saving data to database:', error.message);
                    }
                }
            });
    }
}
