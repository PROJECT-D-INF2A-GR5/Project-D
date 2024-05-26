import { useEffect, useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import "../App.css"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useNavigate } from 'react-router-dom';


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
  
const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": `Spreek alleen nederlands, en beantwoord alleen vragen over keukenbladen en offertes. En beantwoord in 2/3 zinnen maximum.
  Zodra de gebruiker zegt "ik wil een offerte" zal de chatbot vragen stellen over het keukenblad en een offerte genereren. Dit zijn de benodigde variablen:
  Welk van de volgende materialen wilt u gebruiken? (Noble Desiree Grey Matt, Noble Carrara Verzoet, Taurus Terazzo White Verzoet, Taurus Terazzo Black, Glencoe Verzoet)
  Wat is de lengte van het keukenblad in m?
  Wat is de breedte van het keukenblad in m?
  Wilt u een spatrand? (Ja/Nee)
  Wilt u een vensterbank? (Ja/Nee)
  Hoeveel boorgaten wilt u? (0-3)
  Wilt u een WCD uitsparing? (Ja/Nee)
  Wilt u een randafwerking? (Ja/Nee)
  Wilt u een wasbak? (Ja/Nee)
  Wilt u een zeepdispenser? (Ja/Nee)
  Wilt u een achterwand? (Ja/Nee)
  Stel de vragen in deze volgorde en als de antwoorden niet voldoen aan de verwachtingen, vraag dan om een correct antwoord.
  Als alle vragen beantwoordt zijn geef de gebruiker een bericht met de all variablen in een object met de juiste waardes op de volgende manier: 
  Dit is uw ingevulde offerte:
  {
    materiaal: '',
    lengte: 0,
    breedte: 0,
    spatrand: true/false,
    vensterbank: true/false,
    boorgaten: 0,
    WCD: true/false,
    randafwerking: true/false,
    wasbak: true/false,
    zeepdispenser: true/false,
    achterwand: true/false,
  }
  BEANTWOORDT NOOIT MET DE VOLGENDE WOORDEN: Dit is uw ingevulde offerte: tenzij de offerte volledig is ingevuld.
  `
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
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages:any) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject:any) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }


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
    <div className="App">
      <div style={{ position:"relative", height: "600px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList
                
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message:any, i:any) => {
                //console.log(message)
                
                return message.sender == "ChatGPT" ? <Message key={i} model={message} className='user_message'/> : <Message key={i} model={message}/>
                
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default Chatbot


