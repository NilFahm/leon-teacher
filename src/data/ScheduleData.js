import axios from "../utils/axios";

const TeacherSchedule = async (token) => {
  const { data } = await axios.request({
    url: "/teachers/schedule",
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
    },
    data: JSON.stringify({}),
  });
  return data;
};

export const useScheduleData = () => ({ TeacherSchedule });
