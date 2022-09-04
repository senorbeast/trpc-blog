import nodemailer from "nodemailer";

export async function sendLoginEmail({
    email,
    url,
    token,
}: {
    email: string;
    url: string;
    token: string;
}) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", //Preview email
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <fred.do@example.com>',
        to: email,
        subject: "Verify you email and Login",

        html: `Login by clicking here <a href="${url}/login#token=${token}">Login</a>`,
        // html: `Login by clicking here <a href="${url}/login?token=123">Login</a>`,

        // Query String ?token=123 is going to get saved in the browser history
        // Hash #token=123 is not going to get saved in the browser history
    });

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
