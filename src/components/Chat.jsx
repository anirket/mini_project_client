import React, { useContext, useEffect,useState } from 'react'
import { MdSend } from "react-icons/md";
import { RoomnameContext } from './Contexts/RoomContext';
import io from "socket.io-client";
import { socketurl } from '../utils/connectionPort'
import { useAuth0 } from '@auth0/auth0-react'
import FormatDate from './Extras/FormatDate';
import { MdModeEdit } from "react-icons/md";
import Modal from 'react-modal';
import uuid from 'react-uuid'
import { AiTwotoneDelete } from "react-icons/ai";
let filteredmessages = [];
Modal.setAppElement("#root");

const Chat = () => {
    let socket, messagestore = [];
    const { user } = useAuth0();
    const { roomname } = useContext(RoomnameContext);
    const [chats, setchats] = useState([])
    const [message, setmessage] = useState("")
    const [roomsize, setroomsize] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [editingid, seteditingid] = useState("");
    const [editingmsg, seteditingmsg] = useState("");
    const [loadoldmessages,setloadoldmessages] = useState(true);


    //Socket connection and setup
    useEffect(() => {
        socket = io(socketurl);
        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        let data = {
            name: user.name,
            oauthid: user.sub,
            room: roomname
        }

        socket.emit("join_room", data);
        socket.on("old_chats",(data)=>{
            messagestore = data;
            setloadoldmessages(false);
            setchats([messagestore])
            scrollmessages();
            
        })

        socket.on('recieve_message', (data) => {
            addmessagestoarray(data);
        })

        socket.on("trigger_edit", (data) => {
            editmsgfromotheruser(data);
        })

        socket.on("trigger_delete", (data) => {
            deletemessagefromotherusers(data);
        })

        socket.on('room_size', (roomsize) => {
            setroomsize(roomsize[roomname])
        })

    }, [])


    //Automatic Scroll to bottom
    useEffect(() => {
        scrollmessages();
    }, [])


    //send message
    function sendmessage(e) {
        e.preventDefault();
        if (message.length === 0) {
            return;
        }
        else {
            if (!socket) {
                socket = io(socketurl);
            }
            let messagedata = {
                id: uuid(),
                oauthid: user.sub,
                roomname,
                message,
                date: Date.now(),
                name: user.name,
                edited: false
            }

            socket.emit('message', messagedata);
            setmessage("")
        }
    }

    //scroll messagess
    function scrollmessages() {
        const messagediv = document.querySelector(".chats");
        messagediv.scrollTop = messagediv.scrollHeight;
    }

    //recieve and add message to array
    function addmessagestoarray(data) {
        if (filteredmessages.length !== 0) {
            messagestore = filteredmessages
        }
        messagestore.push(data)
        setchats([messagestore])
        scrollmessages();
    }

    //toggle modal
    const toggleModal = (e) => {
        setIsOpen(!isOpen);
    }


    //save edited message
    const saveeditingmsg = () => {
        chats.map((chatmessages) => {
            chatmessages.map((msg) => {
                if (msg.id === editingid) {
                    msg.message = editingmsg;
                    msg.edited = true;
                }
            })
        })
        if (!socket) {
            socket = io(socketurl);
        }
        let edit = {
            editmsgid: editingid,
            editmsg: editingmsg,
            roomname
        }
        socket.emit("edit_message", edit);

        toggleModal();
    }

    //retrieve message to be edited
    const retrievemessage = (e) => {
        let id;
        if (e.target.tagName === "svg") {
            id = e.target.parentElement.id;
        }
        if (e.target.tagName === "path") {
            id = e.target.parentElement.parentElement.id;
        }
        seteditingid(id)
        chats.map((chatmessages) => {
            chatmessages.map((msg) => {
                if (msg.id === id) {
                    seteditingmsg(msg.message);
                }
            })
        })
        toggleModal();
    }


    //recieve and update edited message from other users
    const editmsgfromotheruser = (data) => {

        messagestore.map((msg) => {
            if (msg.id === data.editmsgid) {
                msg.message = data.editmsg
                msg.edited = true;
            }
        })
        chats.map((chatmessages) => {
            chatmessages.map((msg) => {
                if (msg.id === data.editmsgid) {
                    msg.message = data.editmsg;
                    msg.edited = true;

                }
            })
        })

        setchats([messagestore])
        scrollmessages();
    }

    //delete message
    const deletemessage = (e) => {
        let id;
        if (e.target.tagName === "svg") {
            id = e.target.parentElement.id;
        }
        if (e.target.tagName === "path") {
            id = e.target.parentElement.parentElement.id;
        }

        messagestore = filteredmessages;
        chats.map((chatmessages) => {
            filteredmessages =
                chatmessages.filter((msg) => {
                    return msg.id !== id;
                })
        })
        setchats([filteredmessages])
        if (!socket) {
            socket = io(socketurl);
        }
        let deletemessageid = {
            id,
            roomname
        }
        socket.emit("delete_message", deletemessageid);
        scrollmessages();
    }


    // delete msg from other users
    function deletemessagefromotherusers({ id }) {
        messagestore.map((msg, index) => {
            if (msg.id === id) {
                messagestore.splice(index, 1);
            }
        })
        filteredmessages = messagestore;
        setchats([messagestore])
        scrollmessages();
    }

    return (

        <div className="chatwrapper bg-gray-200 flex justify-center items-center">
            <div className="coversationwrapper bg-white rounded-lg border-2 border-gray-400 relative">
                <div className="online div bg-green-400 p-3 rounded-t-lg font-semibold text-white  flex justify-between pr-5">

                    <h2 className="roomname">{roomname}</h2>
                    <h2>Online -<span className="pl-2">{roomsize}</span></h2>
                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel={"My dialog"}
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                >
                    <div className="flex justify-center flex-col items-center">
                        <div className="md:text-3xl text-2xl mt-5">EDIT MESSAGE</div>
                        <input value={editingmsg} onChange={(e) => seteditingmsg(e.target.value)} className="editinginput mt-32 border-2 border-black" type="text" />
                        <div className="flex justify-around w-80 mt-32 text-white">
                            <button className="p-3 rounded-lg bg-green-500" onClick={saveeditingmsg}>Save</button>
                            <button className="p-3 rounded-lg bg-red-500" onClick={toggleModal}>Cancel</button>
                        </div>
                    </div>
                </Modal>
                <div className="chats overflow-scroll pb-3">
                    {loadoldmessages && <div className="md:text-xl text-lg justify-center items-center">Loading old Messages from server...</div>}
                    {
                        chats.map((chatmessages) => (
                            chatmessages.map((messages, index) => {
                                if (messages.oauthid !== user.sub) {
                                    return (
                                        <div key={index} className="">
                                            <div className="chatmessages bg-black mt-2 rounded-tl-lg rounded-tr-lg rounded-br-lg ml-2">

                                                <div className="flex bg-gray-200 items-center justify-between px-2 rounded-tl-lg rounded-tr-lg text-sm py-1 font-semibold">
                                                    <div>{messages.name.split(" ")[0]}</div>
                                                </div>
                                                <div className="p-4 text-white">
                                                    {messages.message}
                                                </div>
                                                <div className="bg-gray-400 font-semibold rounded-br-lg flex justify-between pl-1"><FormatDate dateToFormat={messages.date} />
                                                    {messages.edited && <div className="text-white text-sm p-1  pr-1">Edited</div>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div key={index} className="flex justify-end mr-2">
                                            <div key={index} className="chatmessages bg-black mt-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg ml-2 ">
                                                <div className="flex bg-gray-200 items-center justify-between px-2 rounded-tl-lg rounded-tr-lg text-sm py-1 font-semibold">
                                                    <div>{messages.name.split(" ")[0]}</div>

                                                    <div className="flex justify-center items-center">
                                                        <div id={messages.id} className="text-xl cursor-pointer hover:text-blue-500 mr-4" onClick={(e) => retrievemessage(e)}>
                                                            <MdModeEdit />
                                                        </div>
                                                        <div id={messages.id} className="text-xl cursor-pointer hover:text-red-500" onClick={(e) => deletemessage(e)}>
                                                            <AiTwotoneDelete />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="p-4 text-white">
                                                    {messages.message}
                                                </div>
                                                <div className="bg-gray-400 rounded-bl-lg font-semibold flex justify-between pl-1"><FormatDate dateToFormat={messages.date} />
                                                    {messages.edited && <div className="text-white text-sm p-1  pr-1">Edited</div>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ))
                    }
                </div>
                <form onSubmit={sendmessage} className="inputfield  absolute bottom-0 flex items-center justify-center">
                    <input value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Start Typing..." className="p-3 inputfield border-2 border-gray-700 rounded-bl-lg" type="text" />
                    <button type="submit" className="bg-gray-300 p-4 border-r-2 border-b-2 border-t-2 border-gray-700 rounded-br-lg">
                        <MdSend />
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Chat
