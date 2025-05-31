import nodemailer from "nodemailer";

class Mailer {
  constructor(host, port, username, password) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }
  async sendOtp(name, email, otp) {
    const { host, port, username, password } = await this;
    const transports = await nodemailer.createTransport({
      host: host,
      port: port,
      secure: port == 465 ? true : false,
      auth: {
        user: username,
        pass: password,
      },
    });
    transports.sendMail();
  }
}
