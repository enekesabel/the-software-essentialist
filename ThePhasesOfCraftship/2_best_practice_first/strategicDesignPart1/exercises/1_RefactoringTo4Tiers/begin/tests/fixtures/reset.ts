import { prisma } from "../../src/database";

async function resetDatabase() {
  const deleteAllClassGradeReports = prisma.classGradeReport.deleteMany();
  const deleteAllReportCards = prisma.reportCard.deleteMany();
  const deleteAllStudentAssignments = prisma.studentAssignment.deleteMany();
  const deleteAllClassEnrollments = prisma.classEnrollment.deleteMany();
  const deleteAllAssignments = prisma.assignment.deleteMany();
  const deleteAllClasses = prisma.class.deleteMany();
  const deleteAllStudents = prisma.student.deleteMany();

  try {
    await prisma.$transaction([
      deleteAllReportCards,
      deleteAllClassGradeReports,
      deleteAllClassEnrollments,
      deleteAllStudentAssignments,
      deleteAllAssignments,
      deleteAllClasses,
      deleteAllStudents,
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export { resetDatabase };
