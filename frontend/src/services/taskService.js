const BASE_URL = "http://localhost:8080/api/tasks";

export const getTasks = async () => {
  const response = await fetch(
    BASE_URL + `/user/${localStorage.getItem("userId")}`
  );
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const data = await response.json();
  console.log(data.tasks);
  return data.tasks;
};

export const createTask = async (task) => {
  const response = await fetch(BASE_URL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  console.log(response);
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
  console.log(response);
  return response.json();
};
