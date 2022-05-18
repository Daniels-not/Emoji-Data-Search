import { useState, useEffect } from 'react';
import EmojiData from './json/emojis.json';
import {
  Input,
  Container,
  Stack,
  Alert,
  AlertIcon,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';


const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [Copy, setCopy] = useState("");

  useEffect(()=>{
    try {
      const newData = EmojiData.filter(emoji => emoji.title.toLowerCase().includes(search.toLowerCase()));
      // if newData does not includes any emoji, setError to true
      if(newData.length === 0) {
        setError("No results found for 😢 " + search);
      }else {
        setData(newData);
        setError("");
      }
    } catch (error) {
      setError(error.message);
    }
  },[search])
  
  return (
    <Container maxW='container.sm'>
      <Text fontSize='6xl'>Emoji Data Search 🐱‍🏍</Text>
      <Stack spacing={4}>
        <Input                 
          placeholder="Emoji name ..."
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          mb={'3'}/>
      </Stack>

      {error && 
        <Alert status='error' mt={'2'}>
          <AlertIcon />
          {error}   
        </Alert>
      }

      {
        Copy === "Emoji copied to clipboard 🙌" && 
        <Alert status='success' mt={'2'}>
          <AlertIcon />
          {Copy}
        </Alert>
      }

      {data.map(emoji =>
          // <div className="card" key={emoji.title}>
          //   <div className="card-body" onClick={() => {navigator.clipboard.writeText(emoji.symbol);alert("Emoji Copy")}}>
          //     {emoji.symbol} {emoji.title}
          //   </div>
          // </div>

          <Box>

            <Flex flex={1}>
              <Box flex={1}>
              <Text key={emoji.title} fontSize='4xl' onClick={() => {navigator.clipboard.writeText(emoji.symbol); setCopy("Emoji copied to clipboard 🙌")}}>{emoji.symbol}</Text>
              </Box>
              <Box flex={1}>
                <Text fontSize={'2xl'}>{emoji.title}</Text>
              </Box>
            </Flex>
          </Box>
        )}
    </Container>
  )
}

export default App;
