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
  try {
    const response = await instance.post("/manage_object", data);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Ошибка на сервере:", response);
      return null;
    }
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return null;
  }
};

export const requestData = async (setTableCells, setCells) => {
  try {
    const response = await getInformationByTableForInteractions();
    if (response && response.objects) {
      setTableCells(response.objects);
      setCells(response.objects);
    } else {
      console.error("Ошибка получения данных с сервера");
    }
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
};
