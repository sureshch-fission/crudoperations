const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const StudentData = require("./student.json");


const app = express();
const PORT = 5000;
app.use(bodyParser.json());


//GET Data From the JSON file
app.get("/student", (req, res) => {
    res.send(StudentData)
});

//POST Data into JSON File

app.post("/student", (req, res) => {
    const EnteredData = req.body
    const data = StudentData;
    const StudentFinalData = [EnteredData, ...data];
    saveStudentData(StudentFinalData);
    res.send(StudentFinalData);
    StudentData.push(EnteredData)
});


//PUT is used to Update the data

app.put('/student/:id', (req, res) => {
    const id = Number(req.params.id);
    const Name = req.body.StudentName;
    const Rank = req.body.StudentRank;

    const student = StudentData.filter(Student => Student.id === id);

    if (student) {


        const updatedData = StudentData.map(student => {
            if (student.id === id) {
                student.StudentName = Name;
                student.StudentRank = Rank;
            }

            return student;

        });
        saveStudentData(updatedData)

    } else {
        console.log("Something went wrong")
    }
    res.send(student)

});


//DELETE is used to delete the Student data

app.delete('/student/:id', (req, res) => {
    const id = Number(req.params.id);
    const studentDeleted = StudentData.filter(Student => Student.id !== id);
    console.log(studentDeleted)
    if (studentDeleted) {
        saveStudentData(studentDeleted)
        res.send(studentDeleted)
    } else {
        res.send(`student with this ${id} is Not Available`);
    }


})


//Save the Student Data into JSON file
const saveStudentData = (studentData) => {
    const dataJSON = JSON.stringify(studentData);
    fs.writeFileSync("student.json", dataJSON);
};

app.listen(PORT, () => console.log(`Server is Starting at PORT ${PORT}`));



