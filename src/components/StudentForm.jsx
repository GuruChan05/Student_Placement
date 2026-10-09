
import React, { useEffect, useState } from "react";

function StudentForm({
  students,
  onAddStudent,
  editingStudent,
  onUpdateStudent,
  onCancelEdit
}) {
  const existingStudents = students || [];

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [packageValue, setPackageValue] = useState("");
  const [status, setStatus] = useState("Placed");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name || "");
      setCompany(editingStudent.company || "");
      setRole(editingStudent.role || "");
      setPackageValue(
        editingStudent.package > 0
          ? String(editingStudent.package)
          : ""
      );
      setStatus(editingStudent.status || "Placed");
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingStudent]);

  function resetForm() {
    setName("");
    setCompany("");
    setRole("");
    setPackageValue("");
    setStatus("Placed");
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    // 1. Validate student name
    if (!name.trim()) {
      newErrors.name = "Please enter the student name.";
    }

    // 2. Validate placement details
    if (status === "Placed") {
      if (!company.trim()) {
        newErrors.company = "Please enter the company name.";
      }

      if (!role.trim()) {
        newErrors.role = "Please enter the job role.";
      }

      const packageNumber = Number(packageValue);

      if (
        packageValue.trim() === "" ||
        !Number.isFinite(packageNumber) ||
        packageNumber <= 0
      ) {
        newErrors.package =
          "Enter a valid package greater than 0.";
      }
    }

    // Stop if basic validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 3. Check for duplicate records
    const normalizedName = name.trim().toLowerCase();
    const normalizedCompany =
      status === "Placed"
        ? company.trim().toLowerCase()
        : "";
    const normalizedRole =
      status === "Placed"
        ? role.trim().toLowerCase()
        : "";

    const isDuplicate = (students || []).some((student) => {
  // Allow the same name when editing the existing record
  if (
    editingStudent &&
    String(student.id) === String(editingStudent.id)
  ) {
    return false;
  }

  return (
    (student.name || "").trim().toLowerCase() ===
    name.trim().toLowerCase()
  );
});

if (isDuplicate) {
  setErrors((previous) => ({
    ...previous,
    duplicate: "A student with this name already exists!",
  }));
  return;
}
    // 4. Prepare student data
    const studentData = {
      id: editingStudent
        ? editingStudent.id
        : Date.now(),

      name: name.trim(),

      company:
        status === "Placed"
          ? company.trim()
          : "",

      role:
        status === "Placed"
          ? role.trim()
          : "",

      package:
        status === "Placed"
          ? Number(packageValue)
          : 0,

      status
    };

    // 5. Add or update the student
    if (editingStudent) {
      onUpdateStudent(studentData);
    } else {
      onAddStudent(studentData);
    }

    resetForm();
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <div>
          <h2>
            {editingStudent ? "Edit Student" : "Add Student"}
          </h2>

          <p>
            {editingStudent
              ? "Update student information."
              : "Enter placement information."}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="student-form"
        noValidate
      >
        <div className="field">
          <label htmlFor="studentName">
            Student Name
          </label>

          <input
            id="studentName"
            type="text"
            placeholder="e.g. Rahul Kumar"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((previous) => ({
                ...previous,
                name: "",
                duplicate: ""
              }));
            }}
            aria-invalid={Boolean(errors.name)}
          />

          {errors.name && (
            <p className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="company">
            Company
          </label>

          <input
            id="company"
            type="text"
            placeholder="e.g. TCS"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              setErrors((previous) => ({
                ...previous,
                company: "",
                duplicate: ""
              }));
            }}
            aria-invalid={Boolean(errors.company)}
          />

          {errors.company && (
            <p className="field-error" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="jobRole">
            Job Role
          </label>

          <input
            id="jobRole"
            type="text"
            placeholder="e.g. Software Developer"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setErrors((previous) => ({
                ...previous,
                role: "",
                duplicate: ""
              }));
            }}
            aria-invalid={Boolean(errors.role)}
          />

          {errors.role && (
            <p className="field-error" role="alert">
              {errors.role}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="package">
            Package (LPA)
          </label>

          <input
            id="package"
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 6.5"
            value={packageValue}
            onChange={(event) => {
              setPackageValue(event.target.value);
              setErrors((previous) => ({
                ...previous,
                package: "",
                duplicate: ""
              }));
            }}
            aria-invalid={Boolean(errors.package)}
          />

          {errors.package && (
            <p className="field-error" role="alert">
              {errors.package}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="placementStatus">
            Placement Status
          </label>

          <select
            id="placementStatus"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setErrors({});
            }}
          >
            <option value="Placed">Placed</option>
            <option value="Not Placed">Not Placed</option>
          </select>
        </div>

        {errors.duplicate && (
          <p
            className="field-error duplicate-error"
            role="alert"
          >
            {errors.duplicate}
          </p>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>

          {editingStudent && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StudentForm;