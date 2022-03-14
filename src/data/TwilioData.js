import axios from "../utils/axios";

const GetRoomToken = async (token, roomid) => {
  const { data } = await axios.request({
    url: "/teachers/get-room-token",
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: { roomid: roomid },
  });
  return data;
};

export const useTwilioData = () => ({ GetRoomToken });
