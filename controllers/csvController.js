const Student = require('../models/student');
const Score = require('../models/score');
const Interview = require('../models/interview');
const Result = require('../models/result');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let csvData = [
  {
    studentName: '',
    studentStatus: '',
    dsaScore: '',
    webDScore: '',
    reactScore: '',
    interviewDate: '',
    interviewCompany: '',
    interviewResult: '',
  },
];

module.exports.makeCsvFile = async function (req, res) {
  const students = await Student.find({});
  const scores = await Score.find({}).populate('student');
  const interviews = await Interview.find({}).populate('students');
  const results = await Result.find({});

  const studentScore = scores.map((score) => {
    let newObject = {
      studentName: score.student.name,
      studentStatus: score.student.status,
      dsaScore: score.dsaScore,
      webDScore: score.webDScore,
      reactScore: score.reactScore,
    };
    return newObject;
  });

  const studentInterview = interviews.map((interview) => {
    const students = interview.students.map((student) => {
      let findStudent = studentScore.find((sc) => {
        return sc.studentName === student.name;
      });

      let onlyStudentInfo = {
        ...findStudent,
        interviewDate: interview.date,
        interviewCompany: interview.companyName,
      };

      return onlyStudentInfo;
    });

    let newObjectWithInterviewInfo = students;

    return newObjectWithInterviewInfo;
  });

  const dataWithSingleArray = [].concat(...studentInterview);

  const dataWithResult = dataWithSingleArray.map((student) => {
    const result = results.find((result) => {
      return result.studentName === student.studentName;
    });

    let newObj = {
      ...student,
      interviewResult: result?.result || "Did'nt Attempt",
    };

    return newObj;
  });

  // Define the CSV writer

  const csvWriter = createCsvWriter({
    path: 'data.csv', // Name of the CSV file
    header: [
      { id: 'studentName', title: 'Student Name' },
      { id: 'studentStatus', title: 'Student Status' },
      { id: 'dsaScore', title: 'DSA Score' },
      { id: 'webDScore', title: 'webD Score' },
      { id: 'reactScore', title: 'React Score' },
      { id: 'interviewDate', title: 'Interview Date' },
      { id: 'interviewCompany', title: 'Interview Company' },
      { id: 'interviewResult', title: 'Interview Result' },
    ],
  });

  // Write the data to the CSV file

  await csvWriter.writeRecords(dataWithResult);

  res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  res.setHeader('Content-Type', 'text/csv');
  res.download('data.csv', 'data.csv');

  res.redirect('/');
};
