import express from 'express';
import { StudentsController, ClassesController, StudentAssignmentsController, AssignmentsController, ClassEnrollmentsController } from './controller';
import { AssignmentsService, ClassEnrollmentsService, ClassesService, StudentsService } from './service';
import { errorHandler } from './middleware';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// API Endpoints

const studentsService = new StudentsService();
const studentsController = new StudentsController(studentsService);
app.use('/students', studentsController.router);

const classesService = new ClassesService();
const classesController = new ClassesController(classesService);
app.use('/classes', classesController.router);

const studentAssignmentsController = new StudentAssignmentsController();
app.use('/student-assignments', studentAssignmentsController.router);

const assignmentsService = new AssignmentsService();
const assignmentsController = new AssignmentsController(assignmentsService);
app.use('/assignments', assignmentsController.router);

const classEnrollmentsService = new ClassEnrollmentsService();
const classEnrollmentsController = new ClassEnrollmentsController(classEnrollmentsService);
app.use('/class-enrollments', classEnrollmentsController.router);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
