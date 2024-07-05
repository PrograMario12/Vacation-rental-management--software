import { z } from "zod";

export const createRequestSchema = z.object({
  empleado_id: z.string().nonempty(),
  fecha_inicio: z.string().nonempty(),
  fecha_fin: z.string().nonempty(),
  tipo: z.string().nonempty(),
  horas: z.string().nonempty(),
});

export const updateRequestSchema = z.object({
    empleado_id: z.number().positive().refine(n => Number.isInteger(n), {
      message: "empleado_id must be an integer",
    }).optional(),
    fecha_inicio: z.string().nonempty().optional(),
    fecha_fin: z.string().optional(),
    estado: z.string().optional(),
    tipo: z.string().optional(),
    horas: z.number().positive().refine(n => Number.isInteger(n), {
      message: "horas must be an integer",
    }).optional(),
  });
  