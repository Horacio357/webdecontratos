export interface ContractData {
  locadorName: string;
  locadorDni: string;
  locatarioName: string;
  locatarioDni: string;
  propertyAddress: string;
  rentAmount: number;
  durationMonths: number;
  startDate: string;
}

export const templates = {
  alquiler: (data: ContractData) => `
CONTRATO DE LOCACIÓN DE INMUEBLE CON DESTINO HABITACIONAL

En la Ciudad de Buenos Aires, a los ${new Date().toLocaleDateString('es-AR')} días del mes de ${new Date().toLocaleString('es-AR', { month: 'long' })} de ${new Date().getFullYear()}, entre el Sr./Sra. ${data.locadorName}, DNI ${data.locadorDni}, con domicilio en ..., en adelante denominado "EL LOCADOR", por una parte; y el Sr./Sra. ${data.locatarioName}, DNI ${data.locatarioDni}, con domicilio en ..., en adelante denominado "EL LOCATARIO", por la otra parte, se conviene en celebrar el presente contrato de locación sujeto a las siguientes cláusulas:

PRIMERA: OBJETO. EL LOCADOR cede en locación al LOCATARIO y éste acepta, el inmueble sito en ${data.propertyAddress}, con destino exclusivo a vivienda familiar.

SEGUNDA: PLAZO. El plazo de la locación se fija en ${data.durationMonths} meses, comenzando su vigencia el día ${data.startDate}...

TERCERA: PRECIO. El precio de la locación se fija en la suma mensual de $${data.rentAmount}. El mismo se ajustará conforme a la normativa vigente...

CUARTA: CUMPLIMIENTO CCyC. El presente contrato se rige por lo dispuesto en el Código Civil y Comercial de la Nación Argentina...

(Continúa clausulado estándar...)
`,
  comodato: (data: any) => `...`,
  poder: (data: any) => `...`,
};

export type TemplateId = keyof typeof templates;
