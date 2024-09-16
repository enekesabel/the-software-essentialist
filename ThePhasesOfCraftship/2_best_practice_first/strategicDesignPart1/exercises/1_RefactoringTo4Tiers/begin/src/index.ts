import express from 'express';
import { StudentsController, ClassesController, StudentAssignmentsController, AssignmentsController, ClassEnrollmentsController } from './controller';
import { AssignmentsService, StudentsService } from './service';
import { errorHandler } from './middleware';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// API Endpoints

const studentsService = new StudentsService();
const studentsController = new StudentsController(studentsService);
app.use('/students', studentsController.router);

const classesController = new ClassesController();
app.use('/classes', classesController.router);

const studentAssignmentsController = new StudentAssignmentsController();
app.use('/student-assignments', studentAssignmentsController.router);

const assignmentsService = new AssignmentsService();
const assignmentsController = new AssignmentsController(assignmentsService);
app.use('/assignments', assignmentsController.router);

const classEnrollmentsController = new ClassEnrollmentsController();
app.use('/class-enrollments', classEnrollmentsController.router);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
