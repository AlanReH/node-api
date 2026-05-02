class User {
  constructor(id, email, name, phone, password, tax_id, created_at, addresses) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.tax_id = tax_id;
    this.created_at = created_at;
    this.addresses = addresses;
  }
}

module.exports = User;