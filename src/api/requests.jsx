import instance from "./api";

export const getNumberForGraph = async () => {
  try {
    const response = await instance.get("/current_cpu_usage");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getInformationForTable = async () => {
  try {
    const response = await instance.get("/recent_events");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getInformationByTableForInteractions = async () => {
  try {
    const response = await instance.get("/objects_list");
    return response.data;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
};

export const changeInformationByTableForInteractions = async (data) => {
  if (!data || !data.operation_type || !data.data) {
    console.error("Недостаточно данных для обновления объекта");
    return null;
  }

  const { operation_type, data: objectData } = data;

  const jsonData = JSON.stringify({
    operation_type: operation_type,
    data: objectData,
  });

  try {
    const response = await instance.post("/manage_object", jsonData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Ответ от сервера:", response);
    return response.data;
  } catch (error) {
    console.error("Ошибка:", error);
    return null;
  }
};
