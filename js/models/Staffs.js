function Staff(id, name, email, pass, workDay, salary, regency, workTimes) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.pass = pass;
  this.workDay = workDay;
  this.salary = salary;
  this.regency = regency;
  this.workTimes = workTimes;
}
Staff.prototype.calcSalary = function () {
  if (this.regency === "Sếp") {
    return (this.salary * 3).toLocaleString();
  } else if (this.regency === "Trưởng phòng") {
    return (this.salary * 2).toLocaleString();
  } else if (this.regency === "Nhân viên") {
    return this.salary.toLocaleString();
  } else {
    ("Vui lòng chọn chức vụ");
  }
};
Staff.prototype.classification = function () {
  if (this.workTimes >= 192) {
    return "Xuất Sắc";
  } else if (this.workTimes >= 176) {
    return "Giỏi";
  } else if (this.workTimes >= 160) {
    return "Khá";
  } else {
    return "Trung Bình";
  }
};
