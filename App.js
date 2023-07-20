import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const TaskItem = ({ item, index, onDelete, onEdit }) => {
  return (
    <View style={styles.taskItemContainer}>
      <Text style={styles.taskText}>{item}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(index)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(index)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TodoListApp = () => {
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      if (editIndex !== -1) {
        const updatedTasks = [...tasksList];
        updatedTasks[editIndex] = task;
        setTasksList(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasksList([...tasksList, task]);
      }
      setTask("");
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasksList.filter((_, idx) => idx !== index);
    setTasksList(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTask(tasksList[index]);
    setEditIndex(index);
  };

  const handleTextInputSubmit = () => {
    handleAddTask();
  };

  const renderTaskItem = ({ item, index }) => (
    <TaskItem
      item={item}
      index={index}
      onDelete={handleRemoveTask}
      onEdit={handleEditTask}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
          onSubmitEditing={handleTextInputSubmit}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>
            {editIndex === -1 ? "Add" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasksList}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.tasksList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginRight: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tasksList: {
    flex: 1,
  },
  taskItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  taskText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "orange",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TodoListApp;
