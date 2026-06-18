import { io } from "socket.io-client"


const CreateSocket = () => {
    if(window.location.hostname === "localhost") {
        io(`http://localhost:3000`) 
    } else {
        return io("/", {path: "/api/socket.io"});
    }
}

export default CreateSocket;