import { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getUserId } from '../cookie';
import { postMessage } from '../api';


declare var process: {
    env: {
      [key: string]: string | undefined;
    };
  };

  interface KeukenbladFormData {
    materiaal: string;
    lengte: number,
    breedte: number,
    spatrand: boolean;
    vensterbank: boolean;
    boorGaten: number;
    WCD: boolean
    randAfwerking: boolean;
    Wasbak: boolean;
    zeepDispenser: boolean;
    achterWand: boolean;
    prijs: number;
  }

function Chatbot() {
  const [messages, setMessages] = useState<any>([
    {
      message: "Hallo, waar kan ik u mee helpen? Als je een offerte wilt starten zeg dan 'ik wil een offerte'.",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const initialState = {
    materiaal: 'Graniet',
    lengte: 0,
    breedte: 0,
    spatrand: false,
    vensterbank: false,
    boorGaten: 0,
    WCD: false,
    randAfwerking: false,
    Wasbak: false,
    zeepDispenser: false,
    achterWand: false,
    prijs: 0
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState<KeukenbladFormData>(initialState);

  const handleSend = async (message:any) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    let user_id = await getUserId();
    setIsTyping(true);
    await postMessage(user_id, message).then(response => {
      console.log(response)
      const chatBotReply = {
        message: response,
        sender: "ChatGPT",
        senttime: new Date().toLocaleTimeString()
      };
      const allMessages = [...newMessages, chatBotReply];
      setMessages(allMessages);
      setIsTyping(false);
    });
  };

  useEffect(() => {
    if(formData.materiaal === "Graniet") return
    if(formData.prijs == 0) generatePrice(formData);
    else{
      localStorage.setItem('offerteData', JSON.stringify(formData));
      navigate('/offerte');
    }
  }, [formData]);
  
  const generatePrice = (data: KeukenbladFormData) => {
    console.log("data sent to generate price:", data)

    let price = 0;
    price += data.boorGaten * 5;
    if (data.WCD) price += 13.50;
    if (data.Wasbak) price += 97.50 + 70 + 10.70 + 151.50;
    if (data.zeepDispenser) price += 10.70;
    if (data.randAfwerking) price += data.lengte * 28;
    if (data.spatrand) price += 300;
    if (data.vensterbank) price += 300;

    if(data.materiaal === 'Noble Desiree Grey Matt'){
      price += data.lengte * data.breedte * 247.52;
      if (data.achterWand) price += data.lengte * 309.40;
      
    }
    else if(data.materiaal === 'Noble Carrara Verzoet'){
      price += data.lengte * data.breedte * 258.4;
      if (data.achterWand) price += data.lengte * 258.4;
    }
    else if(data.materiaal === 'Taurus Terazzo White Verzoet'){
      price += data.lengte * data.breedte * 239.4;
      if (data.achterWand) price += data.lengte * 298.5;
    }
    else if(data.materiaal === 'Taurus Terazzo Black'){
      price += data.lengte * data.breedte *228.5;
      if (data.achterWand) price += data.lengte * 289.5;
    }

    else if(data.materiaal === 'Glencoe Verzoet'){
      price += data.lengte * data.breedte * 305.5;
      if (data.achterWand) price += data.lengte * 315.6;
    }

    setFormData({...data, prijs: price});

  }
 

  useEffect(() => {
    if(messages[messages.length - 1].sender !== "ChatGPT") return;
    const lastMessage = messages[messages.length - 1].message;
    if (lastMessage.indexOf("Dit is uw ingevulde offerte:") === 0)
    {

      interface OfferteData {
        [key: string]: string;
    }
    
    const offerteData: OfferteData = lastMessage.split("\n").slice(2, -1).reduce((acc: OfferteData, line: string) => {
        const [key, value] = line.split(": ");
        acc[key.trim()] = value.trim();
        return acc;
    }, {});

    console.log("offerteData from gpt", offerteData);

    setFormData({
      materiaal: offerteData["materiaal"].slice(1, -2),
      lengte: parseInt(offerteData["lengte"][0]),
      breedte: parseFloat(offerteData["breedte"][0]),
      spatrand:offerteData["spatrand"]==="true,",
      vensterbank: offerteData["vensterbank"]==="true,",
      boorGaten: parseFloat(offerteData["boorgaten"][0]),
      WCD: offerteData["WCD"]==="true,",
      randAfwerking: offerteData["randafwerking"]==="true,",
      Wasbak: offerteData["wasbak"]==="true,",
      zeepDispenser: offerteData["zeepdispenser"]==="true,",
      achterWand: offerteData["achterwand"]==="true,",
      prijs: 0
    })
      
    }


  }, [messages]);

  return (
    <div className='pt-8 '>
    <Header/>
    <div className="App w-full h-screen flex justify-center items-center bg-gradient-to-b from-white to-blue-100 overflow-hidden">
      <div style={{ position:"relative", height: "600px", width: "900px"  }} className='shadow-md rounded-md'>
        <MainContainer>
          <ChatContainer>       
            <MessageList
                
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="LLM is aan het denken..." /> : null}
            >
              {messages.map((message:any, i:any) => {
                //console.log(message)
                
                return message.sender == "ChatGPT" ? <Message key={i} model={{
                  message: message.message,
                  position: 0,
                  sender: message.sender,
                  sentTime: new Date().toLocaleTimeString(),
                  direction: "incoming"
                
                }} /> : <Message key={i} model={message} />
                
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
    </div>
  )
}

export default Chatbot


