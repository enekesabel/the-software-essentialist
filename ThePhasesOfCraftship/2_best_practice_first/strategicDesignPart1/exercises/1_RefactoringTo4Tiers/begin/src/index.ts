import express from 'express';
import { StudentsController, ClassesController, StudentAssignmentsController, AssignmentsController, ClassEnrollmentsController } from './controller';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// API Endpoints

const studentsController = new StudentsController();
app.use('/students', studentsController.router);

const classesController = new ClassesController();
app.use('/classes', classesController.router);

const studentAssignmentsController = new StudentAssignmentsController();
app.use('/student-assignments', studentAssignmentsController.router);

const assignmentsController = new AssignmentsController();
app.use('/assignments', assignmentsController.router);

const classEnrollmentsController = new ClassEnrollmentsController();
app.use('/class-enrollments', classEnrollmentsController.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
