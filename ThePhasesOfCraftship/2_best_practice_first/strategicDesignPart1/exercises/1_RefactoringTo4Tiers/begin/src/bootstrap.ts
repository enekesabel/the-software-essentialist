
import express, { Express } from 'express';
import { StudentsController, ClassesController, StudentAssignmentsController, AssignmentsController, ClassEnrollmentsController } from './controller';
import { AssignmentsService, ClassEnrollmentsService, ClassesService, StudentAssignmentsService, StudentsService } from './service';
import { errorHandler } from './middleware';
import { AssingmentsRepository, ClassEnrollmentsRepository, ClassesRepository, StudentAssignmentsRepository, StudentsRepository } from './persistence';
import { prisma } from './database';

export class Server {  

  private app: Express;

  constructor() {
    const cors = require('cors');
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());

    // Persistence
    const assignmentsRepository = new AssingmentsRepository(prisma);
    const classesRepository = new ClassesRepository(prisma);
    const classEnrollmentsRepository = new ClassEnrollmentsRepository(prisma);
    const studentsRepository = new StudentsRepository(prisma);
    const studentAssignmentsRepository = new StudentAssignmentsRepository(prisma);

    // Services
    const studentsService = new StudentsService(studentsRepository, studentAssignmentsRepository);
    const classesService = new ClassesService(assignmentsRepository, classesRepository);
    const studentAssignmentsService = new StudentAssignmentsService(assignmentsRepository, studentsRepository, studentAssignmentsRepository);
    const assignmentsService = new AssignmentsService(assignmentsRepository);
    const classEnrollmentsService = new ClassEnrollmentsService(classesRepository, classEnrollmentsRepository, studentsRepository);

    // Controllers
    const studentsController = new StudentsController(studentsService);
    const classesController = new ClassesController(classesService);
    const studentAssignmentsController = new StudentAssignmentsController(studentAssignmentsService);
    const assignmentsController = new AssignmentsController(assignmentsService);
    const classEnrollmentsController = new ClassEnrollmentsController(classEnrollmentsService);

    // API Endpoints
    this.app.use('/students', studentsController.router);
    this.app.use('/classes', classesController.router);
    this.app.use('/student-assignments', studentAssignmentsController.router);
    this.app.use('/assignments', assignmentsController.router);
    this.app.use('/class-enrollments', classEnrollmentsController.router);

    this.app.use(errorHandler);
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });    
  }
}




