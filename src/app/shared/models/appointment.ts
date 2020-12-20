export interface IAppointment {
  id: string;
  active: boolean;
  withDetails: boolean;
  dateIni: string;
  timeIni?: string;
  dateEnd?: string;
  timeEnd?: string;
  desc?: string;
}

export class Appointment implements IAppointment {

  public static IMAGE_DEFAULT = 'assets/images/appointments/default.png';
  public static HOUR_DEFAULT = '00:00';
  public static PATH_URL = 'fechas';

  constructor(
    public id: string,
    public active: boolean,
    public withDetails: boolean,
    public dateIni: string,
    public timeIni?: string,
    public dateEnd?: string,
    public timeEnd?: string,
    public desc?: string
     ) {
  }

  static InitDefault(id: string): Appointment {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const todayStr = today.toISOString().substr(0, 10);
    const basicAppointment = new Appointment(
      id,
      true,
      false,
      todayStr,
      Appointment.HOUR_DEFAULT,
      todayStr,
      Appointment.HOUR_DEFAULT,
      'Hoy'
    );

    return basicAppointment;
  }
}
