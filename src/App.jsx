import React, { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import StudentForm from "./components/StudentForm";
import StudentCard from "./components/StudentCard";
import Statistics from "./components/Statistics";

const STORAGE_KEY = "student-placement-tracker";

function App() {

  // ==========================================
  // STUDENT DATA
  // ==========================================

  const [students, setStudents] = useState(() => {

    try {

      const savedStudents =
        localStorage.getItem(STORAGE_KEY);

      return savedStudents
        ? JSON.parse(savedStudents)
        : [];

    } catch {

      return [];

    }

  });


  // ==========================================
  // SEARCH
  // ==========================================

  const [searchText, setSearchText] =
    useState("");


  // ==========================================
  // FILTER
  // ==========================================

  const [statusFilter, setStatusFilter] =
    useState("All");


  // ==========================================
  // SORT
  // ==========================================

  const [sortOption, setSortOption] =
    useState("name-asc");


  // ==========================================
  // EDIT
  // ==========================================

  const [editingStudent, setEditingStudent] =
    useState(null);


  // ==========================================
  // LOCAL STORAGE
  // ==========================================

  useEffect(() => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(students)
    );

  }, [students]);


  // ==========================================
  // ADD STUDENT
  // ==========================================

  function addStudent(student) {

    setStudents((currentStudents) => [

      ...currentStudents,

      student

    ]);

  }


  // ==========================================
  // UPDATE STUDENT
  // ==========================================

  function updateStudent(updatedStudent) {

    setStudents((currentStudents) =>

      currentStudents.map((student) =>

        student.id === updatedStudent.id
          ? updatedStudent
          : student

      )

    );

    setEditingStudent(null);

  }


  // ==========================================
  // DELETE STUDENT
  // ==========================================

  function deleteStudent(id) {

    const student = students.find(
      (student) => student.id === id
    );

    if (!student) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${student.name}'s record?`
    );

    if (!confirmed) {
      return;
    }

    setStudents((currentStudents) =>

      currentStudents.filter(
        (student) => student.id !== id
      )

    );

  }


  // ==========================================
  // CLEAR ALL
  // ==========================================

  function clearAllStudents() {

    if (students.length === 0) {

      alert(
        "No student records available."
      );

      return;

    }

    const confirmed = window.confirm(
      "Delete ALL student records?"
    );

    if (!confirmed) {
      return;
    }

    setStudents([]);

    setEditingStudent(null);

  }


  // ==========================================
  // STATISTICS
  // ==========================================

  const statistics = useMemo(() => {

    const placed = students.filter(
      (student) =>
        student.status === "Placed"
    );


    const notPlaced = students.filter(
      (student) =>
        student.status === "Not Placed"
    );


    const totalPackage = placed.reduce(
      (total, student) =>
        total + Number(student.package || 0),
      0
    );


    const averagePackage =
      placed.length > 0
        ? totalPackage / placed.length
        : 0;


    const highestPackage =
      placed.length > 0
        ? Math.max(
            ...placed.map(
              (student) =>
                Number(student.package || 0)
            )
          )
        : 0;


    const placementPercentage =
      students.length > 0
        ? (placed.length / students.length) * 100
        : 0;


    return {

      total: students.length,

      placed: placed.length,

      notPlaced: notPlaced.length,

      averagePackage,

      highestPackage,

      placementPercentage

    };

  }, [students]);


  // ==========================================
  // SEARCH + FILTER + SORT
  // ==========================================

  const displayedStudents = useMemo(() => {

    const search =
      searchText.toLowerCase().trim();


    // SEARCH + FILTER

    const filtered = students.filter(
      (student) => {

        const matchesSearch =

          student.name
            .toLowerCase()
            .includes(search)

          ||

          student.company
            .toLowerCase()
            .includes(search)

          ||

          student.role
            .toLowerCase()
            .includes(search);


        const matchesStatus =

          statusFilter === "All"

          ||

          student.status === statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );


    // SORT

    return [...filtered].sort(
      (a, b) => {

        switch (sortOption) {

          case "name-desc":

            return b.name.localeCompare(
              a.name
            );


          case "package-high":

            return (
              Number(b.package) -
              Number(a.package)
            );


          case "package-low":

            return (
              Number(a.package) -
              Number(b.package)
            );


          case "name-asc":

          default:

            return a.name.localeCompare(
              b.name
            );

        }

      }
    );

  }, [
    students,
    searchText,
    statusFilter,
    sortOption
  ]);


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="app">

      <Header />


      <main>

        {/* ADD / EDIT FORM */}

     <StudentForm
  students={students}
  onAddStudent={addStudent}
  editingStudent={editingStudent}
  onUpdateStudent={updateStudent}
  onCancelEdit={() => setEditingStudent(null)}
/>


        {/* STATISTICS */}

        <Statistics

          total={statistics.total}

          placed={statistics.placed}

          notPlaced={statistics.notPlaced}

          average={statistics.averagePackage}

          highest={statistics.highestPackage}

          percentage={
            statistics.placementPercentage
          }

        />


        {/* RECORDS */}

        <section className="records-section">

          <div className="section-heading">

            <div>

              <h2>
                Student Records
              </h2>

              <p>
                {displayedStudents.length} records shown
              </p>

            </div>


            <button
              className="clear-button"
              onClick={clearAllStudents}
            >
              Clear All
            </button>

          </div>


          {/* SEARCH / FILTER / SORT */}

          <div className="controls">

            <input

              type="text"

              placeholder="Search by name, company or role"

              value={searchText}

              onChange={(event) =>
                setSearchText(
                  event.target.value
                )
              }

            />


            <select

              value={statusFilter}

              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }

            >

              <option value="All">
                All Students
              </option>

              <option value="Placed">
                Placed
              </option>

              <option value="Not Placed">
                Not Placed
              </option>

            </select>


            <select

              value={sortOption}

              onChange={(event) =>
                setSortOption(
                  event.target.value
                )
              }

            >

              <option value="name-asc">
                Name A-Z
              </option>

              <option value="name-desc">
                Name Z-A
              </option>

              <option value="package-high">
                Package High-Low
              </option>

              <option value="package-low">
                Package Low-High
              </option>

            </select>

          </div>


          {/* STUDENT LIST */}

          <div className="student-list">

            {displayedStudents.length === 0 ? (

              <div className="empty">

                <h3>
                  No students found
                </h3>

                <p>
                  Add a student or change
                  your search/filter.
                </p>

              </div>

            ) : (

              displayedStudents.map(
                (student) => (

                  <StudentCard

                    key={student.id}

                    student={student}

                    onEdit={setEditingStudent}

                    onDelete={deleteStudent}

                  />

                )
              )

            )}

          </div>

        </section>

      </main>

    </div>

  );

}

export default App;