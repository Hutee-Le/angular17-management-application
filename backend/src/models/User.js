class User {
    constructor(id, name, mobNumber, age, email, password, gender, uploadPhoto, role, activated, address) {
      this.id = id;
      this.name = name;
      this.mobNumber = mobNumber;
      this.age = age;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.uploadPhoto = uploadPhoto;
      this.role = role;
      this.activated = activated;
      this.address = address;
    }
  }
  
  export default User;