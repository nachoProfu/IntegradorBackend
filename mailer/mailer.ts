import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailPass = process.env.PASSEMAIL;


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:'mierisbakery@gmail.com',
        pass: mailPass
    },
    from: 'mierisbakery@gmail.com'
});


export const sendEmail = async (to:string):Promise<void> =>{

    const optionMail = {
        from: '"MierisBakery" mierisbakery@gmail.com',
        to,
        subject: "Bienvenido a la comunidad de MierisBakery",
        text: `El usuario se ha creado con exito.
               Ya Puedes navegar y comprar en nuestro sitio.` 
    };

    try {
        await transporter.sendMail(optionMail);
        console.log("Email enviado");
        
    } catch (error) {
        console.log("Error al enviar email: ",error);
        
    }
};