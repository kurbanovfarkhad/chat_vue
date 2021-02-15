import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
var stompClient = null;
const handlers = [];

export function connect() {
    const socket = new SockJS('http://192.168.1.217:8080/websocket');
    stompClient = Stomp.over(() => {
        return socket;
    });
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/activity', message => {
            console.error(JSON.parse(message.body))
            handlers.forEach(handler => handler(JSON.parse(message.body)));
        });
    });
}

export function addHandler(handler) {
    handlers.push(handler);
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function sendMessage(message) {
    stompClient.send("/app/changeMessage", {}, JSON.stringify(message));
}
