import React from "react";

function StudentCard({
  student,
  onEdit,
  onDelete
}) {

  const isPlaced =
    student.status === "Placed";


  return (

    <article className="student-card">


      <div className="student-card-top">

        <div>

          <h3>
            {student.name}
          </h3>

          <span
            className={
              isPlaced
                ? "status placed"
                : "status not-placed"
            }
          >

            {student.status}

          </span>

        </div>


        <div className="card-actions">

          <button

            className="edit-button"

            onClick={() =>
              onEdit(student)
            }

          >
            Edit
          </button>


          <button

            className="delete-button"

            onClick={() =>
              onDelete(student.id)
            }

          >
            Delete
          </button>

        </div>

      </div>


      <div className="student-details">


        <div>

          <span>
            Company
          </span>

          <strong>
            {student.company ||
              "Not Available"}
          </strong>

        </div>


        <div>

          <span>
            Role
          </span>

          <strong>
            {student.role ||
              "Not Available"}
          </strong>

        </div>


        <div>

          <span>
            Package
          </span>

          <strong>

            {student.package > 0
              ? `${student.package} LPA`
              : "Not Available"}

          </strong>

        </div>


      </div>

    </article>

  );

}

export default StudentCard;