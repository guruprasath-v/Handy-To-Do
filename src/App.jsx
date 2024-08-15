import db from './config/fbConfig.js';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { AddIcon, CheckIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { 
  Heading,
   Input,
   Button,
   Box, 
   Flex, 
   Text, 
   Spacer, 
   FormControl,
   HStack, 
   VStack, 
   Icon, 
   Checkbox, 
   useToast
  } from '@chakra-ui/react';

  import bgImage from './assets/todo.jpg';



  const bgStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }



function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [toUpdatedId, setToUpdatedId] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const toast = useToast()
  const colRef = collection(db, 'tasks');

  useEffect(() => {
    const taskList = [];
    onSnapshot(colRef, (doc) => {
      const taskList = [];
      doc.docs.map(task => {
        taskList.push({id:task.id, ...task.data()});
      })
      setTasks(taskList);
    }
    );

  }, []);
  


  const addTask = async (e) => {
    e.preventDefault();
    console.log("Adding task: ", task);
    addDoc(colRef, {taskDesc: task, taskStatus: 'pending'})
    .then(() => {
      setTask('');
      toast({
        title: "Task added.",
        description: "Your task has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    })
  }


  const setUpdateTask = async (id) => {
    console.log(id);
    setToUpdatedId(id);
    const toBeUpdated = tasks.find(task => id === task.id);
    setTask(toBeUpdated.taskDesc);
    console.log("clicked")
  }


  const updateTask = async () => {
    if(!task){
      toast({
        title: "Task cannot be empty.",
        description: "Please enter a task to update.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return;
    }
    const docRef = doc(db, 'tasks', toUpdatedId);
    updateDoc(docRef, {
      taskDesc: task
    }).then(() => {
      setTask('');
      toast({
        title: "Task updated.",
        description: "Your task has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
  }


  const deleteTask = (id) => {
    console.log(id);
    const docRef = doc(db, 'tasks', id);
    deleteDoc(docRef).then(() => {
      toast({
        title: "Task deleted.",
        description: "Your task has been deleted successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    })
  }




  const updateStatus = (id, oldState) => {
    const docRef = doc(db, 'tasks', id);
    updateDoc(docRef, {
      taskStatus: `${oldState === 'pending' ? 'completed' : 'pending'}`
    }).then(() => {
      toast({
        title: "Task Status Updated.",
        description: "Your Completion status has been updated successfully.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })

    })

  }






  return (
      <Flex justify='center' align="center" height='100vh' sx={bgStyles}>
        <Box bg="gray.50" maxW="1000px" height="fit-content" p="20px" minW="100px" borderRadius="10px">
          <Heading textAlign={'center'} as="h1"> Your To Do's </Heading>
          <form onSubmit={addTask}>
            <FormControl id="task" p='40px'>
              <HStack spacing="40px">
                <Input type="text" placeholder="Add your task" w="500px" h="60px" fontSize="20px" value={task} onChange={e=>setTask(e.target.value)} isRequired/>
                <VStack spacing='15px'>
                  <Button isDisabled={!!toUpdatedId} type='submit' variant="outline">
                    <Icon as={AddIcon} color='teal.500' />
                  </Button>
                  <Button isDisabled={!toUpdatedId} variant="outline" onClick={ updateTask }>
                    <Icon as={CheckIcon} color='teal.500' />
                  </Button>
                </VStack>
              </HStack>
            </FormControl>
          </form>

          <Heading px="40px">
            Pending Tasks
          </Heading>

          <Box mx='40px' borderBottom="1px dotted gray" marginBottom="30px" paddingBottom="20px">
            {tasks && tasks
            .filter(task => task.taskStatus === 'pending')
            .map(task => (
              <Box key={task.id} p='10px' bg='gray.100' borderRadius='5px' my='10px'>
                <HStack spacing={'10px'}>
                <Checkbox 
                    size="md" 
                    colorScheme='orange' 
                    border="orange" 
                    isChecked={task.taskStatus === 'completed'} 
                    onChange={() => 
                      confirm(task.taskStatus === 'completed' ? 
                        `Are you sure you want to restore this task?` : 
                        `Have you completed the task?`) && updateStatus(task.id, task.taskStatus)}
                  >
                  </Checkbox>
                  <Text>{task.taskDesc}</Text>
                  <Spacer />
                  <Button variant="outline" onClick={(e) => setUpdateTask(task.id)}>
                    <Icon as={EditIcon} color="teal.500"></Icon>
                  </Button>
                  <Button variant="outline" onClick={(e) => {
                    confirm("Are you sure you want to delete this task?") && deleteTask(task.id);
                  }}>
                    <Icon as={DeleteIcon} color="red.400"></Icon>
                  </Button>
                </HStack>
              </Box>
            ))}
          </Box>


          {/* Completed Tasks */}

          <Heading px="40px">
            Completed Tasks
          </Heading>

          <Box mx='40px'>
          {tasks && tasks
            .filter(task => task.taskStatus === 'completed')  // Filter out completed tasks
            .map(task => (
              <Box key={task.id} p='10px' bg='gray.100' borderRadius='10px' my='10px'>
                <HStack spacing='10px'>
                  <Checkbox 
                    size="md" 
                    colorScheme='orange' 
                    border="orange" 
                    isChecked={task.taskStatus === 'completed'} 
                    onChange={() => 
                      confirm(task.taskStatus === 'completed' ? 
                        `Are you sure you want to restore this task?` : 
                        `Have you completed the task?`) && updateStatus(task.id, task.taskStatus)}
                  />
                  <Text as={task.taskStatus === 'completed' ? 'del' : 'span'}>
                    {task.taskDesc}
                  </Text>
                  <Spacer />
                  <Button variant="outline" onClick={(e) => {
                    confirm("Are you sure you want to delete this task?") && deleteTask(task.id);
                  }}>
                    <Icon as={DeleteIcon} color="teal.500" />
                  </Button>
                </HStack>
              </Box>
            ))}
        </Box>



        </Box>
      </Flex>
  )
}

export default App
