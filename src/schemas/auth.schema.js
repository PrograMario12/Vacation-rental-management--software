import {z} from 'zod';

export const signupSchema = z.object({
    empleado_id: z.string().refine(n => Number.isInteger(parseInt(n)), {
        message: 'empleado_id debe ser un entero',
    }),
    email: z.string().email({
        message: 'Invalid email format'
    }), 
    contrasena_hash: z.string().min(6)
});

export const signinSchema = z.object({
    empleado_id: z.string().refine(n => Number.isInteger(parseInt(n)), {
        message: 'empleado_id debe ser un entero',
    }),
    contrasena_hash: z.string().min(6 ,{
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
});
