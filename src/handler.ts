import { Handler, APIGatewayEvent } from 'aws-lambda';
import { BusService } from './service/BusService';
import { CalendarService } from './service/CalendarService';
import { NoticeService } from './service/NoticeService';
import { ShuttleService } from './service/ShuttleService';

const dolphin: Handler = async (event: APIGatewayEvent) => {
  const path = event.path;
  const querystring = event.pathParameters ? event.pathParameters.bstopid : null
  const busService = new BusService();
  const shuttleService = new ShuttleService();

  if (querystring == null) {
    // 운행중인 모든 버스
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: busService.getAllNode(),
        path: path,
      }),
    };
  }

  if (querystring != null) {
    // 특정 정류장의 도착 정보
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: busService.getSpecificNode(querystring),
        path: path,
      }),
    };
  }

  if (path === '/calendar') {
    // 학사 일정
    const calendarService = new CalendarService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: calendarService.getAcademicCalendar(),
        path: path,
      }),
    };
  }

  if (path === '/notices') {
    // 학사 일정
    const noticeService = new NoticeService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: await noticeService.getMainNotice(),
        path: path,
      }),
    };
  }

  if (path === '/shuttle/next') {
    // 다음 셔틀
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: shuttleService.getNextShuttle(),
        path: path,
      }),
    };
  }

  if (path === '/shuttle/today') {
    // 그 날의 모든 셔틀
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: shuttleService.getDayShuttle(),
        path: path,
      }),
    };
  }

  if (path === '/timetable/190') {
    // 특정 정류장의 도착 정보
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: busService.getDepart190(),
        path: path,
      }),
    };
  }

  if (path === '/timetable/shuttle') {
    // 모든 셔틀
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: shuttleService.getAllShuttle(),
        path: path,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: 'success',
      path: path,
    }),
  };
};

export { dolphin };
