import mitt from 'mitt';

type Events = {
  serverStarting: void;
  serverReady: void;
};

const apiEvents = mitt<Events>();
export default apiEvents;
