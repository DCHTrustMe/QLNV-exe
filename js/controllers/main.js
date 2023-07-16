let staffs = [];
let isSubmitted = false;
// Hàm init khởi tạo ds nv
init();
function init() {
  staffs = JSON.parse(localStorage.getItem("staffs") || []);
  staffs = staffs.map((value) => {
    return new Staff(
      value.id,
      value.name,
      value.email,
      value.pass,
      value.workDay,
      value.salary,
      value.regency,
      value.workTimes
    );
  });

  display(staffs);
}

// Hàm thêm nhân viên
function addStaff() {
  isSubmitted = true;
  let staff = validate();
  if (!staff) {
    return;
  }
  staffs.push(staff);
  localStorage.setItem("staffs", JSON.stringify(staffs));
  display(staffs);

  resetform();
}

// Hàm tìm nhân viên
function findStaff() {
  let search = document.querySelector("#searchName").value;
  search = search.trim().toLowerCase();

  let newStaff = staffs.filter((value) => {
    let classification = value.classification().trim().toLowerCase();
    return classification.includes(search);
  });

  display(newStaff);
}

// Hàm xóa nhân viên
function deleteStaff(staffID) {
  staffs = staffs.filter((value) => {
    return value.id !== staffID;
  });

  localStorage.setItem("staffs", JSON.stringify(staffs));

  display(staffs);
}

// Hàm chọn nhân viên
function selectStaff(staffID) {
  let staff = staffs.find((value) => {
    return value.id === staffID;
  });

  document.querySelector("#tknv").value = staff.id;
  document.querySelector("#name").value = staff.name;
  document.querySelector("#email").value = staff.email;
  document.querySelector("#password").value = staff.pass;
  document.querySelector("#datepicker").value = staff.workDay;
  document.querySelector("#luongCB").value = staff.salary;
  document.querySelector("#chucvu").value = staff.regency;
  document.querySelector("#gioLam").value = staff.workTimes;

  document.querySelector("#tknv").disabled = true;
  document.querySelector("#btnThemNV").disabled = true;

  $("#myModal").modal("show");
}

// Hàm cập nhật nhân viên
function updateStaff() {
  isSubmitted = true;
  let staff = validate();
  if (!staff) {
    return;
  }

  let index = staffs.findIndex((value) => {
    return value.id === staff.id;
  });

  staffs[index] = staff;

  localStorage.setItem("staffs", JSON.stringify(staffs));

  display(staffs);
  resetform();
  $("#myModal").modal("hide");
}

// Hàm hiển thị ra giao diện
function display(staffs) {
  let html = staffs.reduce((result, value) => {
    return (
      result +
      `
            <tr>
                <td>${value.id}</td>
                <td>${value.name}</td>
                <td>${value.email}</td>
                <td>${value.workDay}</td>
                <td>${value.regency}</td>
                <td>${value.calcSalary()}</td>
                <td>${value.classification()}</td>
                <td>
                    <button 
                        class="btn btn-success" 
                        onclick="selectStaff('${value.id}')"
                    >   
                        Update
                    </button>
                    <button 
                        class="btn btn-danger" 
                        onclick=" deleteStaff('${value.id}')"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `
    );
  }, "");
  document.getElementById("tableDanhSach").innerHTML = html;
}

// Hàm resetform
function resetform() {
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#gioLam").value = "";

  document.querySelector("#tbTKNV").style.display = "none";
  document.querySelector("#tbTen").style.display = "none";
  document.querySelector("#tbEmail").style.display = "none";
  document.querySelector("#tbMatKhau").style.display = "none";
  document.querySelector("#tbNgay").style.display = "none";
  document.querySelector("#tbLuongCB").style.display = "none";
  document.querySelector("#tbChucVu").style.display = "none";
  document.querySelector("#tbGiolam").style.display = "none";

  document.querySelector("#tknv").disabled = false;
  document.querySelector("#btnThemNV").disabled = false;
}
// Close Button
function closebtn() {
  resetform();
}

// Hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

// Hàm check ID
function isID(value) {
  let regex = /^[0-9]{4,6}$/;
  return regex.test(value);
}

// Hàm check Name
function isName(value) {
  let regex = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
  return regex.test(value);
}

// Hàm check Email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// Hàm check mm/dd/yyyy
function isworkDay(value) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return regex.test(value);
}

// hàm check Pass
function isPass(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;
  return regex.test(value);
}

// Hàm check Salary
function isSalary(value) {
  let numSalary = value * 1;
  if (Number.isInteger(numSalary)) {
    if (numSalary >= 1000000 && numSalary <= 20000000) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Hàm check regency
function isRegency(value) {
  if (value === "Chọn chức vụ" || value === "") {
    return false;
  } else {
    return true;
  }
}

// Hàm check workTime
function isWorkTimes(value) {
  let numWorkTime = value * 1;
  if (Number.isInteger(numWorkTime)) {
    if (numWorkTime >= 80 && numWorkTime <= 200) {
      return true;
    } else {
      return false;
    }
  } else [false];
}

// Hàm kiểm tra thông tin của nv
function validate() {
  let id = document.querySelector("#tknv").value;
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let pass = document.querySelector("#password").value;
  let workDay = document.querySelector("#datepicker").value;
  let salary = document.querySelector("#luongCB").value;
  let regency = document.querySelector("#chucvu").value;
  let workTimes = document.querySelector("#gioLam").value;

  let isValid = true;
  let spanId = document.getElementById("tbTKNV");
  if (!isRequired(id)) {
    isValid = false;
    spanId.innerHTML = "Mã Nhân Viên không để trống";
    spanId.style.display = "block";
  } else if (!isID(id)) {
    isValid = false;
    spanId.innerHTML = "Mã Nhân Viên không hợp lệ";
    spanId.style.display = "block";
  }

  let spanName = document.getElementById("tbTen");
  if (!isRequired(name)) {
    isValid = false;
    spanName.innerHTML = "Tên Nhân Viên không để trống";
    spanName.style.display = "block";
  } else if (!isName(name)) {
    isValid = false;
    spanName.innerHTML = "Tên Nhân Viên không hợp lệ";
    spanName.style.display = "block";
  }

  let spanEmail = document.getElementById("tbEmail");
  if (!isRequired(email)) {
    isValid = false;
    spanEmail.innerHTML = "Email Nhân Viên không để trống";
    spanEmail.style.display = "block";
  } else if (!isEmail(email)) {
    isValid = false;
    spanEmail.innerHTML = "Email Nhân Viên không hợp lệ";
    spanEmail.style.display = "block";
  }

  let spanPass = document.getElementById("tbMatKhau");
  if (!isRequired(pass)) {
    isValid = false;
    spanPass.innerHTML = "Mật Khẩu không để trống";
    spanPass.style.display = "block";
  } else if (!isPass(pass)) {
    isValid = false;
    spanPass.innerHTML = "Mật Khẩu không hợp lệ";
    spanPass.style.display = "block";
  }

  let spanWorkDay = document.getElementById("tbNgay");
  if (!isRequired(workDay)) {
    isValid = false;
    spanWorkDay.innerHTML = "Ngày làm không để trống";
    spanWorkDay.style.display = "block";
  } else if (!isworkDay(workDay)) {
    isValid = false;
    spanWorkDay.innerHTML = "Ngày làm không hợp lệ ";
    spanWorkDay.style.display = "block";
  }

  let spanSalary = document.getElementById("tbLuongCB");
  if (!isRequired(salary)) {
    isValid = false;
    spanSalary.innerHTML = "Lương cơ bản không để trống";
    spanSalary.style.display = "block";
  } else if (!isSalary(salary)) {
    isValid = false;
    spanSalary.innerHTML = "Lương cơ bản không hợp lệ";
    spanSalary.style.display = "block";
  }

  let spanRegency = document.getElementById("tbChucVu");
  if (!isRegency(regency)) {
    isValid = false;
    spanRegency.innerHTML = "Chức vụ không để trống";
    spanRegency.style.display = "block";
  }

  let spanWorkTimes = document.getElementById("tbGiolam");
  if (!isRequired(workTimes)) {
    isValid = false;
    spanWorkTimes.innerHTML = "Giờ làm không để trống";
    spanWorkTimes.style.display = "block";
  } else if (!isWorkTimes(workTimes)) {
    isValid = false;
    spanWorkTimes.innerHTML = "Giờ làm không hợp lệ ";
    spanWorkTimes.style.display = "block";
  }

  if (isValid) {
    let staff = new Staff(
      id,
      name,
      email,
      pass,
      workDay,
      +salary,
      regency,
      +workTimes
    );
    return staff;
  }
  return undefined;
}

// Oninput
document.getElementById("tknv").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Mã không để trống";
  }
};

document.getElementById("name").oninput = (event) => {
  if (!isSubmitted) return;

  let nameSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    nameSpan.innerHTML = "";
  } else {
    nameSpan.innerHTML = "Tên không để trống";
  }
};

document.getElementById("email").oninput = (event) => {
  if (!isSubmitted) return;

  let emailSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    emailSpan.innerHTML = "";
  } else {
    emailSpan.innerHTML = "Email không để trống";
  }
};

document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) return;

  let passSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    passSpan.innerHTML = "";
  } else {
    passSpan.innerHTML = "Password không để trống";
  }
};

document.getElementById("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  let workDaySpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    workDaySpan.innerHTML = "";
  } else {
    workDaySpan.innerHTML = "Ngày làm không để trống";
  }
};

document.getElementById("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  let salarySpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    salarySpan.innerHTML = "";
  } else {
    salarySpan.innerHTML = "Lương cơ bản không để trống";
  }
};

document.getElementById("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  let regencySpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    regencySpan.innerHTML = "";
  } else {
    regencySpan.innerHTML = "Chức vụ không để trống";
  }
};

document.getElementById("gioLam").oninput = (event) => {
  if (!isSubmitted) return;
  let workTimeSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    workTimeSpan.innerHTML = "";
  } else {
    workTimeSpan.innerHTML = "Giờ Làm không để trống";
  }
};
