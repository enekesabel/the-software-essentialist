import express from 'express';
import { StudentsController, ClassesController, StudentAssignmentsController, AssignmentsController, ClassEnrollmentsController } from './controller';
import { AssignmentsService, ClassEnrollmentsService, ClassesService, StudentAssignmentsService, StudentsService } from './service';
import { errorHandler } from './middleware';
import { AssingmentsRepository, ClassesRepository } from './persistence';
import { prisma } from './database';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Persistence
const assignmentsRepository = new AssingmentsRepository(prisma);
const classesRepository = new ClassesRepository(prisma);

// Services
const studentsService = new StudentsService();
const classesService = new ClassesService(assignmentsRepository, classesRepository);
const studentAssignmentsService = new StudentAssignmentsService(assignmentsRepository);
const assignmentsService = new AssignmentsService(assignmentsRepository);
const classEnrollmentsService = new ClassEnrollmentsService(classesRepository);

// Controllers
const studentsController = new StudentsController(studentsService);
const classesController = new ClassesController(classesService);
const studentAssignmentsController = new StudentAssignmentsController(studentAssignmentsService);
const assignmentsController = new AssignmentsController(assignmentsService);
const classEnrollmentsController = new ClassEnrollmentsController(classEnrollmentsService);

// API Endpoints
app.use('/students', studentsController.router);
app.use('/classes', classesController.router);
app.use('/student-assignments', studentAssignmentsController.router);
app.use('/assignments', assignmentsController.router);
app.use('/class-enrollments', classEnrollmentsController.router);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
