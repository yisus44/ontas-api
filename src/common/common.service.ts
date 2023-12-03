import { Injectable } from '@nestjs/common';
@Injectable()
export class CommonService {
  parseDurationToMilliseconds(duration: string): number {
    const durationRegex = /^(\d+)([smhdwMy])$/;
    const [, value, unit] = duration.match(durationRegex);
    const unitToMilliseconds: Record<string, number> = {
      s: 1000, // seconds
      m: 60000, // minutes
      h: 3600000, // hours
      d: 86400000, // days
      w: 604800000, // weeks
      M: 2592000000, // months (approximation: 30 days)
      y: 31536000000, // years (approximation: 365 days)
    };
    const milliseconds = parseInt(value) * unitToMilliseconds[unit];
    return milliseconds;
  }

  parseDate(hourToBeExecuted: string, dateToBeExecuted: string) {
    const timeComponents = hourToBeExecuted.split(':');
    const hour = Number(timeComponents[0]);
    const minute = Number(timeComponents[1]);
    const second = Number(timeComponents[2]);
    const dateComponents = dateToBeExecuted.split('-');
    const year = Number(dateComponents[0]);
    const month = Number(dateComponents[1]) - 1;
    const day = Number(dateComponents[2]);
    const executionDate = new Date(year, month, day, hour, minute, second);
    return {
      hour,
      minute,
      second,
      year,
      month,
      day,
      executionDate,
    };
  }

  replaceDays(atWeekdays: string): string {
    const days = {
      L: 'Lunes',
      M: 'Martes',
      Mr: 'Miércoles',
      J: 'Jueves',
      V: 'Viernes',
      S: 'Sábado',
      D: 'Domingo',
    };

    const values = atWeekdays.split(',').map((valor) => valor.trim());

    const replacedDays = values.map((valor: keyof typeof days, index) => {
      return (
        days[valor] +
        (index === values.length - 1 && values.length > 1 ? '' : ',')
      );
    });

    if (values.length >= 2) {
      const lastCommaIndex = replacedDays.lastIndexOf(',');
      replacedDays[lastCommaIndex] = ' y';
    }

    return replacedDays.join(' ');
  }

}
