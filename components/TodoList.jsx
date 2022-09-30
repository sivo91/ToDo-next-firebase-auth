import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
 

  const { user } = useAuth() || {};
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }

  const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };


  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully", status: "success" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "done" ? "pending" : "done";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == "done" ? "success" : "warning",
    });
  };

  return (
 
    <Box mt={5}>
        {/*  md = medium size  3 col */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {
        todos &&
        todos.map((todo) => (
            <Box
              key={todo.id}
              p={3}
              boxShadow="2xl"
              shadow={"dark-lg"}
              transition="0.2s"
              _hover={{ boxShadow: "sm" }}
            >
              <Heading as="h3" fontSize={"xl"}>
                {todo.title}{" "}
                
               {/*  trash icon */}
                <Badge
                  color="red.500"
                  cursor={'pointer'}
                  bg="inherit"
                  mt={3}
                  fontSize={27}
                  transition={"0.2s"}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.4)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  <FaTrash />
                </Badge>

                <Badge
                  color={todo.status == "pending" ? "gray.500" : "green.500"}
                  bg="inherit"
                  transition={"0.4s"}
                  mt={2}
                  ms={3}
                  me={1}
                  cursor={'pointer'}
                  fontSize={35}
                  _hover={{
                    bg: "inherit",
                    transform: "scale(1.2)",
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>

                <Badge
                  float="right"
                  opacity="0.8"
                  fontSize={25}
                  padding={2}
                  bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                >
                  {todo.status}
                </Badge>
              </Heading>
              <Text>{todo.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box> 
    
  );
};

export default TodoList;